import * as pdfjsLib from 'pdfjs-dist';
import pdfWorkerUrl from 'pdfjs-dist/build/pdf.worker.mjs?url';
import { checkExtractionQuality, isBrokenText, hasCorruptedMathSymbols, normalizeText, cleanTextForJson, textToHtml, textToLatex, mapPuaToSymbols, type QualityCheckResult } from './pdfQualityChecker';

pdfjsLib.GlobalWorkerOptions.workerSrc = pdfWorkerUrl;

type PdfTextToken = {
  text: string;
  rawText: string;
  x: number;
  y: number;
  width: number;
  height: number;
  font: string;
};

export interface PdfExtractionResult {
  pages: string[];
  fullText: string;
  quality: QualityCheckResult;
  pageCount: number;
  requiresOCR: boolean;
  isMathContent: boolean;
  html: string;
  latex: string;
}

export interface ParsedQuestion {
  text: string;
  html: string;
  latex: string;
  type: string;
  subject: string;
  topic: string;
  difficulty: string;
  options: Array<{ label: string; text: string; html?: string; latex?: string }>;
  correctAnswer: string;
  marks: number;
  negativeMarks: number;
  explanation: string;
  isActive: boolean;
}

const isTextItem = (item: unknown): item is {
  str: string;
  transform?: number[];
  width?: number;
  height?: number;
  fontName?: string;
} => Boolean(item && typeof item === 'object' && 'str' in item);

export const sanitizeExtractedText = (value: string) =>
  value
    .replace(/\u00a0/g, ' ')
    .replace(/[ \t]+/g, ' ')
    .replace(/\s+\n/g, '\n')
    .replace(/\n\s+/g, '\n')
    .replace(/\n{3,}/g, '\n\n')
    .trim();

export const normalizeQuestionText = (value: string) =>
  value
    .replace(/^\s*(?:Q(?:uestion)?\.?\s*)?\d{1,3}\s*[\).:-]?\s+/i, '')
    .replace(/\s+/g, ' ')
    .trim();

const superscriptMap: Record<string, string> = {
  '-': '\u207b',
  '0': '\u2070',
  '1': '\u00b9',
  '2': '\u00b2',
  '3': '\u00b3',
  '4': '\u2074',
  '5': '\u2075',
  '6': '\u2076',
  '7': '\u2077',
  '8': '\u2078',
  '9': '\u2079',
};

const subscriptMap: Record<string, string> = {
  '0': '\u2080', '1': '\u2081', '2': '\u2082', '3': '\u2083', '4': '\u2084',
  '5': '\u2085', '6': '\u2086', '7': '\u2087', '8': '\u2088', '9': '\u2089',
};

const replacementGlyphPattern = /[\u0000-\u0008\u000b\u000c\u000e-\u001f\u007f\u00a0\u25a1\u25a0\u25ab\u25ad\u2610\ufffd]+/g;
const corruptGlyphPattern = /[\u25a1\u25a0\u25ab\u25ad\u2610\ufffd]/;

export const normalizeExtractedMathGlyphs = (value: string) =>
  String(value || '')
    .replace(/\u00a0/g, ' ')
    .replace(/[“”]/g, '"')
    .replace(/[‘’]/g, "'")
    .replace(/\u2212/g, '-')
    .replace(/\u00d7/g, 'x')
    .replace(/\u00f7/g, '/')
    .replace(/[·•]/g, '.')
    .replace(/\s*<=\s*/g, ' \u2264 ')
    .replace(/\s*>=\s*/g, ' \u2265 ')
    .replace(/\s*!=\s*/g, ' \u2260 ')
    .replace(/\s*\+-\s*/g, ' \u00b1 ')
    .replace(/\b(infinity|inf)\b/gi, '\u221e')
    .replace(/\btherefore\b/gi, '\u2234')
    .replace(/\bbecause\b/gi, '\u2235')
    .replace(/\bangle\b/gi, '\u2220')
    .replace(/\bperpendicular\b/gi, '\u22a5')
    .replace(/\bparallel\b/gi, '\u2225')
    .replace(/\b(alpha)\b/gi, '\u03b1')
    .replace(/\b(beta)\b/gi, '\u03b2')
    .replace(/\b(gamma)\b/gi, '\u03b3')
    .replace(/\b(theta)\b/gi, '\u03b8')
    .replace(/\b(lambda)\b/gi, '\u03bb')
    .replace(/\b(omega)\b/gi, '\u03c9')
    .replace(/\b(phi)\b/gi, '\u03c6')
    .replace(/\b(pi)\b/gi, '\u03c0')
    .replace(/\b(mu)\b/gi, '\u03bc')
    .replace(/\b(epsilon)\b/gi, '\u03b5')
    .replace(/\bDelta\b/g, '\u0394')
    .replace(/\bSigma\b/g, '\u03a3')
    .replace(/\bsigma\b/g, '\u03c3')
    .replace(/\bsqrt\(([^)]+)\)/gi, '\u221a($1)')
    .replace(/\bsqrt\s+([A-Za-z0-9]+)/gi, '\u221a$1')
    .replace(/\bintegral\b/gi, '\u222b')
    .replace(/\s*->\s*/g, ' \u2192 ')
    .replace(/\s*<-\s*/g, ' \u2190 ')
    .replace(/\b([A-Za-z])\s*\^\s*(-?\d+)/g, (_match, base: string, power: string) => `${base}${power.split('').map((char) => superscriptMap[char] || char).join('')}`)
    .replace(/\^(-?\d+)/g, (_match, power: string) => power.split('').map((char) => superscriptMap[char] || char).join(''))
    .replace(/\b([xyabmn])\s*2\b/g, '$1\u00b2')
    .replace(/\b([xyabmn])\s*3\b/g, '$1\u00b3')
    .replace(/(?<=\d)\s*[xX]\s*(?=\d|[A-Za-z])/g, ' \u00d7 ')
    .replace(/^(\s*)[^\w\s(]*\s*(?=\d+\s*[A-Za-z]\s*[\u25a1\u25a0\ufffd])/g, '$1\u222b ')
    .replace(/^(\s*)[^\w\s(]*\s*(?=\d+\s*[A-Za-z]\s+is\s+equal)/gi, '$1\u222b ')
    .replace(/(\u222b\s*\d+\s*[A-Za-z])\s*[\u25a1\u25a0\ufffd]+\s*(?=\bis equal\b|=|:)/gi, '$1 dx ')
    .replace(/(\u222b\s*[A-Za-z0-9+\-*/^²³⁴⁵⁶⁷⁸⁹⁰\s]+)\s+d\s*([xyabmn])\b/gi, '$1 d$2')
    .replace(/\|\s+/g, '|')
    .replace(/\s+\|/g, '|')
    .replace(replacementGlyphPattern, ' ')
    .replace(/\s+([:;,.])/g, '$1')
    .replace(/[ \t]{2,}/g, ' ')
    .trim();

export const formatExtractedMathText = (value: string) =>
  mapPuaToSymbols(normalizeExtractedMathGlyphs(value))
    .replace(/\btheta\b/gi, '\u03b8')
    .replace(/\balpha\b/gi, '\u03b1')
    .replace(/\bbeta\b/gi, '\u03b2')
    .replace(/\bgamma\b/gi, '\u03b3')
    .replace(/\blambda\b/gi, '\u03bb')
    .replace(/\bomega\b/gi, '\u03c9')
    .replace(/\bDelta\b/g, '\u0394')
    .replace(/\bphi\b/gi, '\u03c6')
    .replace(/\bpi\b/gi, '\u03c0')
    .replace(/\bmu\b/gi, '\u03bc')
    .replace(/\bepsilon\b/gi, '\u03b5')
    .replace(/\bsqrt\(([^)]+)\)/gi, '\u221a($1)')
    .replace(/\bsqrt\s+([A-Za-z0-9]+)/gi, '\u221a$1')
    .replace(/\bintegral\b/gi, '\u222b')
    .replace(/\s*->\s*/g, ' \u2192 ')
    .replace(/\s*<=\s*/g, ' \u2264 ')
    .replace(/\s*>=\s*/g, ' \u2265 ')
    .replace(/\s*\+-\s*/g, ' \u00b1 ')
    .replace(/(?<=^|[^a-zA-Z])([a-zA-Z])(\d+)(?=[^a-zA-Z]|$)/g,
      (_m, letter: string, digits: string) =>
        letter + digits.split('').map((d: string) => subscriptMap[d] || d).join('')
    )
    .replace(/([a-zA-Z\u2080-\u2089])\.([a-zA-Z\u2080-\u2089])/g, '$1\u22c5$2')
    .replace(/\bdegrees\b/gi, '\u00b0')
    .replace(/\bdeg\b/gi, '\u00b0')
    .replace(/\^(-?\d+)/g, (_match, power: string) => power.split('').map((char) => superscriptMap[char] || char).join(''))
    .replace(/\b1\/2\b/g, '\u00bd')
    .replace(/\b1\/3\b/g, '\u2153')
    .replace(/\b2\/3\b/g, '\u2154')
    .replace(/\b1\/4\b/g, '\u00bc')
    .replace(/\b3\/4\b/g, '\u00be')
    .replace(/\s+([:;,.])/g, '$1')
    .replace(/\s{2,}/g, ' ')
    .trim();

export const extractAnswer = (value: string) => {
  const match = value.match(/(?:correct\s+answer|answer|ans)\s*[:.)-\]]?\s*[\[\(]?\s*([A-D1-4])\s*[\]\)]?/i);
  const answer = match?.[1]?.toUpperCase();
  if (!answer) {
    const solMatch = value.match(/(?:^|\s)([A-D])\s*(?:\bans\b|is correct|is the answer)/i);
    if (solMatch) return solMatch[1].toUpperCase();
    return 'A';
  }
  if (/^[1-4]$/.test(answer)) return String.fromCharCode(64 + Number(answer));
  return answer;
};

export const stripAnswerText = (value: string) =>
  value
    .replace(/(?:correct\s+answer|answer|ans)\s*[:.)-\]]?\s*[\[\(]?\s*[A-D1-4]\s*[\]\)]?.*$/gi, '')
    .replace(/\s*sol[.:]?\s*.+$/gis, '')
    .replace(/\s*solution[.:]?\s*.+$/gis, '')
    .trim();

export const extractQuestionMetadata = (value: string) => {
  const read = (label: string) => {
    const match = value.match(new RegExp(`(?:^|\\n)\\s*(?:${label})\\s*[:=-]\\s*([^\\n|]+)`, 'i'));
    return match?.[1]?.replace(/\s+/g, ' ').trim() || '';
  };

  return {
    subject: read('subject'),
    topic: read('topic'),
    difficulty: read('difficulty').toLowerCase(),
    marks: Number(read('marks')) || undefined,
    negativeMarks: Number(read('negative\\s*marks|negative|minus')) || undefined,
  };
};

export const stripQuestionMetadata = (value: string) =>
  value
    .replace(/(?:^|\n)\s*(?:subject|topic|difficulty|marks|negative\s*marks|negative|minus)\s*[:=-]\s*[^\n]+/gi, '\n')
    .trim();

export const parseOptionsFromBlock = (block: string) => {
  const inlineBlock = block.replace(/\n/g, ' ');
  const optionPattern = /(?:^|\s)(?:option\s*)?(?:\(?([A-Da-d1-4])\)?[\).:-]|\(([A-Da-d1-4])\))\s+/gi;
  let matches = Array.from(inlineBlock.matchAll(optionPattern));

  if (matches.length < 2) {
    const lineOptionPattern = /(?:^|\n)\s*(?:option\s*)?([A-Da-d1-4])\s+(.+?)(?=\n\s*(?:option\s*)?[A-Da-d1-4]\s+|\n?$)/gi;
    const lineMatches = Array.from(block.matchAll(lineOptionPattern));
    if (lineMatches.length >= 2) {
      const firstIndex = lineMatches[0].index ?? 0;
      const options = lineMatches.slice(0, 4).map((match, index) => {
        const rawLabel = (match[1] || String(index + 1)).toUpperCase();
        const numericLabel = /^[1-4]$/.test(rawLabel) ? String.fromCharCode(64 + Number(rawLabel)) : rawLabel;
        return { label: numericLabel, text: stripAnswerText(match[2]).replace(/\s+/g, ' ').trim() };
      }).filter((option) => option.text);

      const questionText = normalizeQuestionText(block.slice(0, firstIndex));
      if (options.length >= 2 && questionText) return { questionText, options };
    }
  }

  if (matches.length < 2) return null;

  const firstIndex = matches[0].index ?? 0;
  const questionText = normalizeQuestionText(inlineBlock.slice(0, firstIndex));
  const options = matches.slice(0, 4).map((match, index) => {
    const rawLabel = (match[1] || match[2] || String.fromCharCode(65 + index)).toUpperCase();
    const label = /^[1-4]$/.test(rawLabel) ? String.fromCharCode(64 + Number(rawLabel)) : rawLabel;
    const start = (match.index ?? 0) + match[0].length;
    const end = index + 1 < matches.length ? matches[index + 1].index ?? inlineBlock.length : inlineBlock.length;
    return {
      label,
      text: stripAnswerText(inlineBlock.slice(start, end)).replace(/\s+/g, ' ').trim(),
    };
  }).filter((option) => option.text);

  if (options.length < 2 || !questionText) return null;
  return { questionText, options };
};

export const parseQuestionsFromPdfText = (text: string) => {
  const normalized = sanitizeExtractedText(text);
  if (!normalized) return [];

  const lines = normalized.split(/\n+/).map((line) => line.trim()).filter(Boolean);
  const blocks: string[] = [];
  let current: string[] = [];
  let currentSubject = '';
  let currentTopic = '';
  const questionLinePattern = /^(?:Q(?:uestion)?\.?\s*)?\d{1,3}\s*[\).:-]?\s+\S/i;
  const subjectLinePattern = /^subject\s*[:=-]\s*(.+)$/i;
  const topicLinePattern = /^topic\s*[:=-]\s*(.+)$/i;

  lines.forEach((line) => {
    const subjectMatch = line.match(subjectLinePattern);
    if (subjectMatch && !questionLinePattern.test(line)) {
      currentSubject = subjectMatch[1].trim();
      if (!current.length) return;
    }

    const topicMatch = line.match(topicLinePattern);
    if (topicMatch && !questionLinePattern.test(line)) {
      currentTopic = topicMatch[1].trim();
      if (!current.length) return;
    }

    if (questionLinePattern.test(line) && current.length) {
      blocks.push([currentSubject ? `Subject: ${currentSubject}` : '', currentTopic ? `Topic: ${currentTopic}` : '', ...current].filter(Boolean).join('\n'));
      current = [line];
      return;
    }
    current.push(line);
  });
  if (current.length) blocks.push([currentSubject ? `Subject: ${currentSubject}` : '', currentTopic ? `Topic: ${currentTopic}` : '', ...current].filter(Boolean).join('\n'));

  if (blocks.length <= 1) {
    const inlineMarker = /(?:^|\s)(?:Q(?:uestion)?\.?\s*)?\d{1,3}\s*[\).:-]\s+(?=\S)/gi;
    const markers = Array.from(normalized.replace(/\n/g, ' ').matchAll(inlineMarker));
    if (markers.length > 1) {
      const inlineText = normalized.replace(/\n/g, ' ');
      blocks.splice(0, blocks.length, ...markers.map((marker, index) => {
        const start = marker.index ?? 0;
        const end = index + 1 < markers.length ? markers[index + 1].index ?? inlineText.length : inlineText.length;
        return inlineText.slice(start, end).trim();
      }));
    }
  }

  return blocks
    .map((block) => {
      const meta = extractQuestionMetadata(block);
      const cleanBlock = stripQuestionMetadata(stripAnswerText(block));
      const parsed = parseOptionsFromBlock(cleanBlock);
      if (!parsed) return null;

      const questionText = formatExtractedMathText(parsed.questionText);
      return {
        text: questionText,
        html: textToHtml(questionText),
        latex: textToLatex(questionText),
        type: 'mcq',
        subject: meta.subject,
        topic: meta.topic,
        difficulty: ['easy', 'medium', 'hard'].includes(meta.difficulty) ? meta.difficulty : 'medium',
        options: parsed.options.map((option) => {
          const optText = formatExtractedMathText(option.text);
          return { ...option, text: optText, html: textToHtml(optText), latex: textToLatex(optText) };
        }),
        correctAnswer: extractAnswer(block),
        marks: meta.marks || 1,
        negativeMarks: meta.negativeMarks || 0,
        explanation: '',
        isActive: true,
      };
    })
    .filter(Boolean) as Array<Record<string, any>>;
};

export const extractPdfText = async (file: File): Promise<PdfExtractionResult> => {
  const buffer = await file.arrayBuffer();
  
  // Configure PDF.js for better text extraction
  const document = await pdfjsLib.getDocument({
    data: buffer,
    disableFontFace: false, // Use system fonts when available
    useSystemFonts: true,
    cMapUrl: undefined, // Use built-in CMaps
  }).promise;

  const pages: string[] = [];

  for (let pageNumber = 1; pageNumber <= document.numPages; pageNumber += 1) {
    const page = await document.getPage(pageNumber);
    const content = await page.getTextContent();
    const tokens: PdfTextToken[] = [];

    content.items.forEach((item: unknown) => {
      if (!isTextItem(item)) return;
      const rawText = String(item.str || '');
      if (!rawText.trim()) return;

      const transform = Array.isArray(item.transform) ? item.transform : [];
      const x = Number(transform[4]) || 0;
      const y = Number(transform[5]) || 0;
      const fontSize = Math.hypot(Number(transform[2]) || 0, Number(transform[3]) || 0) || Number(item.height) || 10;
      const text = normalizeExtractedMathGlyphs(rawText);

      tokens.push({
        text,
        rawText,
        x,
        y,
        width: Number(item.width) || Math.max(rawText.length * fontSize * 0.45, 1),
        height: Number(item.height) || fontSize,
        font: String(item.fontName || ''),
      });
    });

    const lines = tokens
      .sort((a, b) => b.y - a.y || a.x - b.x)
      .reduce<PdfTextToken[][]>((groups, token) => {
        const lastLine = groups[groups.length - 1];
        const tolerance = Math.max(2.5, token.height * 0.45);
        if (lastLine && Math.abs(lastLine[0].y - token.y) <= tolerance) {
          lastLine.push(token);
        } else {
          groups.push([token]);
        }
        return groups;
      }, []);

    const pageText = lines
      .map((line) => line
        .sort((a, b) => a.x - b.x)
        .reduce((parts, token, index, sortedLine) => {
          if (!token.text) return parts;

          const previous = sortedLine[index - 1];
          if (previous && parts.length) {
            const gap = token.x - (previous.x + previous.width);
            const averageCharWidth = Math.max(previous.width / Math.max(previous.rawText.length, 1), 3);
            const needsSpace = gap > averageCharWidth * 0.55
              && !/^[,.;:)\]}]/.test(token.text)
              && !/[([{]$/.test(previous.text);

            if (needsSpace && !parts[parts.length - 1].endsWith(' ')) {
              parts.push(' ');
            }
          }

          parts.push(token.text);
          return parts;
        }, [] as string[])
        .join('')
        .replace(/[ \t]{2,}/g, ' ')
        .trim())
      .filter(Boolean)
      .join('\n');

    pages.push(pageText);
  }

  const rawFullText = pages.join('\n').replace(corruptGlyphPattern, ' ');

  const fullText = mapPuaToSymbols(rawFullText);

  const quality = checkExtractionQuality(fullText);

  const normalizedText = normalizeText(fullText);

  const isMathContent = hasCorruptedMathSymbols(fullText) || hasCorruptedMathSymbols(normalizedText);

  const needsOCR = quality.needsOCR || isBrokenText(normalizedText) || isMathContent;

  return {
    pages: pages.map(p => normalizeText(p)),
    fullText: normalizedText,
    quality: { ...quality, needsOCR, recommendedAction: needsOCR ? 'ocr' : quality.recommendedAction },
    pageCount: document.numPages,
    requiresOCR: needsOCR,
    isMathContent,
    html: textToHtml(normalizedText),
    latex: textToLatex(normalizedText),
  };
};
