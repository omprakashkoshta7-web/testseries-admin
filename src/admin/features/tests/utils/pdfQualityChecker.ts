export type ExtractionQuality = 'excellent' | 'good' | 'poor' | 'critical';

export interface QualityCheckResult {
  quality: ExtractionQuality;
  score: number;
  brokenSymbols: string[];
  issues: string[];
  needsOCR: boolean;
  recommendedAction: 'use' | 'review' | 'ocr' | 'reject';
  confidence: number;
}

const BROKEN_CHARS_PATTERNS = {
  replacement: /\uFFFD/g,
  box: /□/g,
  solidBox: /■/g,
  thinBox: /▢/g,
  dotBox: /▪/g,
  newlineBox: /[\u25a1\u25a0\u25ab\u25ad]/g,
};

const MATH_SYMBOLS = {
  integral: '\u222b',
  sqrt: '\u221a',
  pi: '\u03c0',
  infinity: '\u221e',
  plus_minus: '\u00b1',
  multiply: '\u00d7',
  divide: '\u00f7',
  leq: '\u2264',
  geq: '\u2265',
  neq: '\u2260',
  arrow: '\u2192',
  derivative: '\u2202',
  delta: '\u0394',
  sigma: '\u03a3',
  lambda: '\u03bb',
  theta: '\u03b8',
  alpha: '\u03b1',
  beta: '\u03b2',
  gamma: '\u03b3',
};

export const PUA_START = 0xE000;
export const PUA_END = 0xF8FF;
export const PUA_REGEX = /[\uE000-\uF8FF]/g;

const DEFAULT_PUA_MAP: Record<string, string> = {
  '\uf020': ' ', '\uf021': '!', '\uf022': '"', '\uf023': '#',
  '\uf024': '$', '\uf025': '%', '\uf026': '&', '\uf027': "'",
  '\uf028': '(', '\uf029': ')', '\uf02a': '*', '\uf02b': '+',
  '\uf02c': ',', '\uf02d': '\u2212', // minus sign −
  '\uf02e': '.', '\uf02f': '/',
  '\uf030': '0', '\uf031': '1', '\uf032': '2', '\uf033': '3',
  '\uf034': '4', '\uf035': '5', '\uf036': '6', '\uf037': '7',
  '\uf038': '8', '\uf039': '9',
  '\uf03a': ':', '\uf03b': ';', '\uf03c': '<', '\uf03d': '=',
  '\uf03e': '>', '\uf03f': '?', '\uf040': '@',
  '\uf041': 'A', '\uf042': 'B', '\uf043': 'C', '\uf044': 'D',
  '\uf045': 'E', '\uf046': 'F', '\uf047': 'G', '\uf048': 'H',
  '\uf049': 'I', '\uf04a': 'J', '\uf04b': 'K', '\uf04c': 'L',
  '\uf04d': 'M', '\uf04e': 'N', '\uf04f': 'O',
  '\uf050': 'P', '\uf051': 'Q', '\uf052': 'R', '\uf053': 'S',
  '\uf054': 'T', '\uf055': 'U', '\uf056': 'V', '\uf057': 'W',
  '\uf058': 'X', '\uf059': 'Y', '\uf05a': 'Z',
  '\uf05b': '[', '\uf05c': '\\', '\uf05d': ']', '\uf05e': '^', '\uf05f': '_',
  '\uf060': '`',
  '\uf061': 'a', '\uf062': 'b', '\uf063': 'c', '\uf064': 'd',
  '\uf065': 'e', '\uf066': 'f', '\uf067': 'g', '\uf068': 'h',
  '\uf069': 'i', '\uf06a': 'j', '\uf06b': 'k', '\uf06c': 'l',
  '\uf06d': 'm', '\uf06e': 'n', '\uf06f': 'o',
  '\uf070': 'p', '\uf071': 'q', '\uf072': 'r', '\uf073': 's',
  '\uf074': 't', '\uf075': 'u', '\uf076': 'v', '\uf077': 'w',
  '\uf078': 'x', '\uf079': 'y', '\uf07a': 'z',
  '\uf07b': '{', '\uf07c': '|', '\uf07d': '}', '\uf07e': '~',
  // Math operators (non-conflicting PUA codepoints)
  '\uf0b4': '\u00d7', // ×
  '\uf0b8': '\u00f7', // ÷
  '\uf0b1': '\u00b1', // ±
  '\uf0d7': '\u00b7', // · (middle dot / dot product)
  '\uf0e7': '\u22c5', // ⋅ (dot operator)
  '\uf0b0': '\u00b0', // °
  '\uf0e9': '\u2190', // ←
  '\uf0ea': '\u2191', // ↑
  '\uf0eb': '\u2192', // →
  '\uf0ec': '\u2193', // ↓
  '\uf0ed': '\u2194', // ↔
  '\uf0ce': '\u2113', // ℓ
  // Bracket/delimiter PUA chars (common in LaTeX math)
  '\uf0e6': '(',  // large left paren
  '\uf0e8': '(',  // alternative left paren
  '\uf0f6': ')',  // large right paren
  '\uf0f7': ')',  // alternative right paren
  '\uf0f8': ')',  // alternative right paren
  '\uf0f9': ')',  // alternative right paren
  '\uf0fa': ')',  // alternative right paren
  // Additional math notation PUA chars (common in equation fonts)
  '\uf0bc': '\u2026', // … (ellipsis / ...)
  '\uf0b2': '\u00b2', // ² (superscript 2)
  '\uf0b3': '\u00b3', // ³ (superscript 3)
  '\uf0a9': '\u00a9', // © (copyright) — sometimes appears in PDF metadata
  '\uf0ae': '\u00ae', // ® — sometimes appears in PDF metadata
};

export function hasPuaChars(text: string): boolean {
  if (!text || typeof text !== 'string') return false;
  PUA_REGEX.lastIndex = 0;
  return PUA_REGEX.test(text);
}

export function countPuaChars(text: string): number {
  if (!text || typeof text !== 'string') return 0;
  PUA_REGEX.lastIndex = 0;
  const matches = text.match(PUA_REGEX);
  return matches ? matches.length : 0;
}

const PUA_BASE_CANDIDATES = [0xF020, 0xF000, 0xE000, 0xE020];

function buildPuaAsciiMap(base: number): Record<string, string> {
  const map: Record<string, string> = {};
  for (let ascii = 0x20; ascii <= 0x7E; ascii++) {
    const pua = String.fromCharCode(base + ascii - 0x20);
    map[pua] = String.fromCharCode(ascii);
  }
  return map;
}

function scoreMappedText(text: string): number {
  if (!text || text.length === 0) return 0;
  let score = 0;
  for (const ch of text) {
    const code = ch.charCodeAt(0);
    if (code >= 0x20 && code <= 0x7E) score += 2;
    else if (code >= 0x0900 && code <= 0x097F) score += 1;
    else if (code >= 0x03B1 && code <= 0x03C9) score += 1;
    else if (code >= 0x0391 && code <= 0x03A9) score += 1;
    else if (code >= 0x2200 && code <= 0x22FF) score += 1;
    else if (code === 0xFFFD || (code >= 0xE000 && code <= 0xF8FF)) score -= 3;
    else if (code < 0x20 && code !== 0x0A && code !== 0x0D) score -= 2;
  }
  return score;
}

function autoDetectPuaMap(text: string): Record<string, string> | null {
  if (!hasPuaChars(text)) return null;
  let bestMap: Record<string, string> | null = null;
  let bestScore = -Infinity;
  for (const base of PUA_BASE_CANDIDATES) {
    const candidate = buildPuaAsciiMap(base);
    const mapped = text.replace(PUA_REGEX, (m) => candidate[m] ?? m);
    const s = scoreMappedText(mapped);
    if (s > bestScore) {
      bestScore = s;
      bestMap = candidate;
    }
  }
  const mapped = text.replace(PUA_REGEX, (m) => bestMap![m] ?? m);
  if (scoreMappedText(mapped) <= scoreMappedText(text)) return null;
  return bestMap;
}

export function mapPuaToSymbols(text: string, customMap?: Record<string, string>): string {
  if (!text || typeof text !== 'string') return '';
  let result = text.normalize('NFKC');
  const explicitMap = customMap ? { ...DEFAULT_PUA_MAP, ...customMap } : DEFAULT_PUA_MAP;
  const autoMap = autoDetectPuaMap(result);
  const mergedMap = autoMap ? { ...autoMap, ...explicitMap } : explicitMap;
  result = result.replace(PUA_REGEX, (match) => mergedMap[match] ?? match);
  return result;
}

const MATH_KEYWORDS = [
  'integral', 'int', 'sqrt', 'pi', 'infinity', 'inf',
  'theta', 'alpha', 'beta', 'gamma', 'delta', 'sigma',
  'lambda', 'omega', 'phi', 'mu', 'epsilon',
  'equation', 'formula', 'function', 'graph',
  'vector', 'matrix', 'determinant', 'differentiate',
  'solve', 'prove', 'evaluate', 'calculate',
  'sin', 'cos', 'tan', 'log', 'ln',
];

const MATH_SYMBOL_CHARS = new Set(
  Object.values(MATH_SYMBOLS).flatMap(s => [...s])
);

export function isBrokenText(text: string): boolean {
  if (!text || typeof text !== 'string') return false;
  if (BROKEN_CHARS_PATTERNS.replacement.test(text)) return true;
  const boxCount = (text.match(BROKEN_CHARS_PATTERNS.newlineBox) || []).length;
  if (boxCount > Math.max(3, text.length * 0.03)) return true;
  if (/[\x00-\x08\x0b\x0c\x0e-\x1f\x7f]/g.test(text)) return true;
  const puaCount = countPuaChars(text);
  if (puaCount > Math.max(2, text.length * 0.02)) return true;
  return false;
}

export function hasCorruptedMathSymbols(text: string): boolean {
  if (!text || typeof text !== 'string') return false;

  const textLower = text.toLowerCase();
  const hasMathKeywords = MATH_KEYWORDS.some(kw => textLower.includes(kw));
  if (!hasMathKeywords) return false;

  let issues = 0;
  if (textLower.includes('sqrt') && !text.includes('\u221a')) issues++;
  if (textLower.includes('integral') && !text.includes('\u222b')) issues++;
  if ((textLower.includes('infinity') || textLower.includes('inf')) && !text.includes('\u221e')) issues++;
  if (textLower.includes('theta') && !text.includes('\u03b8')) issues++;
  if (textLower.includes('alpha') && !text.includes('\u03b1')) issues++;
  if (textLower.includes('beta') && !text.includes('\u03b2')) issues++;
  if (textLower.includes('delta') && !text.includes('\u0394') && !text.includes('\u03b4')) issues++;
  if (textLower.includes('sigma') && !text.includes('\u03a3') && !text.includes('\u03c3')) issues++;
  if (textLower.includes('pi') && !text.includes('\u03c0')) issues++;

  if (issues >= 2) return true;

  const puaCount = countPuaChars(text);
  if (puaCount >= 2) return true;

  return false;
}

export function checkExtractionQuality(text: string): QualityCheckResult {
  if (!text || typeof text !== 'string' || text.trim().length === 0) {
    return {
      quality: 'critical',
      score: 0,
      brokenSymbols: [],
      issues: ['Empty or invalid text'],
      needsOCR: true,
      recommendedAction: 'reject',
      confidence: 1,
    };
  }

  const issues: string[] = [];
  const brokenSymbols: string[] = [];
  let score = 100;

  const replacementCount = (text.match(BROKEN_CHARS_PATTERNS.replacement) || []).length;
  if (replacementCount > 0) {
    issues.push(`Found ${replacementCount} replacement characters (\uFFFD) — text corrupt`);
    brokenSymbols.push('UFFFD');
    score -= replacementCount * 3;
  }

  const boxCount = (text.match(BROKEN_CHARS_PATTERNS.newlineBox) || []).length;
  const boxPercentage = (boxCount / text.length) * 100;
  if (boxCount > 3) {
    issues.push(`Found ${boxCount} box characters (${boxPercentage.toFixed(1)}%) — glyphs missing`);
    brokenSymbols.push('BOX_CHARS');
    score -= Math.min(35, boxCount * 0.8);
  }

  const controlCharCount = (text.match(/[\x00-\x08\x0b\x0c\x0e-\x1f\x7f]/g) || []).length;
  if (controlCharCount > 0) {
    issues.push(`Found ${controlCharCount} control characters — encoding issue`);
    brokenSymbols.push('CONTROL_CHARS');
    score -= controlCharCount * 1;
  }

  const puaCount = countPuaChars(text);
  if (puaCount > 0) {
    issues.push(`Found ${puaCount} Private Use Area characters — font-specific symbol corruption`);
    brokenSymbols.push('PUA_CHARS');
    score -= puaCount * 3;
    if (puaCount > 5) score -= 15;
  }

  const textLower = text.toLowerCase();
  const hasMathKeywords = MATH_KEYWORDS.some(kw => textLower.includes(kw));

  if (hasMathKeywords) {
    const mathIssues: string[] = [];

    if (textLower.includes('sqrt') && !text.includes('\u221a')) mathIssues.push('\u221a sqrt');
    if ((textLower.includes('integral') || textLower.includes('int ')) && !text.includes('\u222b')) mathIssues.push('\u222b integral');
    if ((textLower.includes('infinity') || textLower.includes('inf ')) && !text.includes('\u221e')) mathIssues.push('\u221e infinity');
    if (textLower.includes('theta') && !text.includes('\u03b8')) mathIssues.push('\u03b8 theta');
    if (textLower.includes('alpha') && !text.includes('\u03b1')) mathIssues.push('\u03b1 alpha');
    if (textLower.includes('beta') && !text.includes('\u03b2')) mathIssues.push('\u03b2 beta');
    if (textLower.includes('delta') && !text.includes('\u0394') && !text.includes('\u03b4')) mathIssues.push('\u0394/\u03b4 delta');
    if (textLower.includes('pi') && !text.includes('\u03c0')) mathIssues.push('\u03c0 pi');
    if (textLower.includes('sigma') && !text.includes('\u03a3') && !text.includes('\u03c3')) mathIssues.push('\u03a3/\u03c3 sigma');

    if (mathIssues.length > 0) {
      issues.push(`Math symbols corrupted: ${mathIssues.join(', ')}`);
      brokenSymbols.push('MATH_SYMBOLS');
      score -= mathIssues.length * 8;
    }

    const vectorPattern = /[a-zA-Z]\s*[=:]\s*[a-zA-Z]\s*[\+\-]\s*\d+/g;
    const vectorMatches = text.match(vectorPattern);
    if (vectorMatches && vectorMatches.length > 2) {
      const arrowContext = text.match(/[a-zA-Z]\s*[=:]\s*[a-zA-Z]/g);
      if (arrowContext && arrowContext.length > 2 && !text.includes('\u2192') && !text.includes('->')) {
        issues.push('Vector notation detected but arrow (→) symbol missing');
        if (!brokenSymbols.includes('MATH_SYMBOLS')) brokenSymbols.push('MATH_SYMBOLS');
        score -= 5;
      }
    }
  }

  const nonAsciiRatio = ((text.match(/[^\x20-\x7E\u0900-\u097F\u0100-\u017F\u03b1-\u03c9\u0391-\u03a9\u2200-\u22FF\u00b0-\u00ff]/g) || []).length / text.length) * 100;
  if (nonAsciiRatio > 30 && score > 60 && !hasMathKeywords) {
    issues.push(`High non-ASCII ratio: ${nonAsciiRatio.toFixed(1)}%`);
    score -= 10;
  }

  let quality: ExtractionQuality = 'excellent';
  let recommendedAction: 'use' | 'review' | 'ocr' | 'reject' = 'use';
  let needsOCR = false;

  if (score >= 90) {
    quality = 'excellent';
    recommendedAction = 'use';
  } else if (score >= 70) {
    quality = 'good';
    recommendedAction = 'review';
  } else if (score >= 40) {
    quality = 'poor';
    recommendedAction = 'ocr';
    needsOCR = true;
  } else {
    quality = 'critical';
    recommendedAction = 'reject';
    needsOCR = true;
  }

  if (brokenSymbols.includes('PUA_CHARS')) {
    needsOCR = true;
    if (quality === 'excellent' || quality === 'good') {
      quality = 'poor';
    }
    recommendedAction = 'ocr';
  }

  if (brokenSymbols.includes('MATH_SYMBOLS') && score < 85) {
    needsOCR = true;
    if (quality === 'excellent' || quality === 'good') {
      quality = 'poor';
    }
    recommendedAction = 'ocr';
  }

  if (brokenSymbols.length > 0 && score < 80) {
    needsOCR = true;
    recommendedAction = 'ocr';
  }

  return {
    quality,
    score: Math.max(0, Math.min(100, score)),
    brokenSymbols,
    issues,
    needsOCR,
    recommendedAction,
    confidence: Math.min(1, score / 100),
  };
}

export function normalizeText(text: string): string {
  if (!text || typeof text !== 'string') return '';
  return text
    .normalize('NFKC')
    .replace(/\uFFFD/g, ' ')
    .replace(/[\u25a1\u25a0\u25ab\u25ad\u2610]/g, ' ')
    .replace(/[ \t]+/g, ' ')
    .replace(/[\r\n]+/g, '\n')
    .trim();
}

export function cleanTextForJson(text: string): string {
  return text
    .normalize('NFKC')
    .replace(/\uFFFD/g, '')
    .replace(/[\u25a1\u25a0\u25ab\u25ad\u2610]/g, '')
    .replace(/\s+/g, ' ')
    .trim();
}

export function textToHtml(text: string): string {
  const cleaned = cleanTextForJson(text);
  const escaped = cleaned
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;');
  const withMath = escaped
    .replace(/\u221a/g, '&radic;')
    .replace(/\u222b/g, '&int;')
    .replace(/\u221e/g, '&infin;')
    .replace(/\u03c0/g, '&pi;')
    .replace(/\u00b1/g, '&plusmn;')
    .replace(/\u2264/g, '&le;')
    .replace(/\u2265/g, '&ge;')
    .replace(/\u2260/g, '&ne;')
    .replace(/\u2192/g, '&rarr;')
    .replace(/\u00d7/g, '&times;')
    .replace(/\u00f7/g, '&divide;')
    .replace(/\u00b2/g, '<sup>2</sup>')
    .replace(/\u00b3/g, '<sup>3</sup>')
    .replace(/\u2070/g, '<sup>0</sup>')
    .replace(/\u00b9/g, '<sup>1</sup>')
    .replace(/\u2074/g, '<sup>4</sup>')
    .replace(/\u2075/g, '<sup>5</sup>')
    .replace(/\u2076/g, '<sup>6</sup>')
    .replace(/\u2077/g, '<sup>7</sup>')
    .replace(/\u2078/g, '<sup>8</sup>')
    .replace(/\u2079/g, '<sup>9</sup>')
    .replace(/\u207b/g, '<sup>-</sup>');
  return `<p>${withMath}</p>`;
}

export function textToLatex(text: string): string {
  const cleaned = cleanTextForJson(text);
  return cleaned
    .replace(/\u221a/g, '\\sqrt{}')
    .replace(/\u222b/g, '\\int ')
    .replace(/\u221e/g, '\\infty ')
    .replace(/\u03c0/g, '\\pi ')
    .replace(/\u00b1/g, '\\pm ')
    .replace(/\u2264/g, '\\le ')
    .replace(/\u2265/g, '\\ge ')
    .replace(/\u2260/g, '\\ne ')
    .replace(/\u2192/g, '\\to ')
    .replace(/\u00d7/g, '\\times ')
    .replace(/\u00f7/g, '\\div ')
    .replace(/\u00b2/g, '^2')
    .replace(/\u00b3/g, '^3')
    .replace(/\u2070/g, '^0')
    .replace(/\u00b9/g, '^1')
    .replace(/\u2074/g, '^4')
    .replace(/\u2075/g, '^5')
    .replace(/\u2076/g, '^6')
    .replace(/\u2077/g, '^7')
    .replace(/\u2078/g, '^8')
    .replace(/\u2079/g, '^9')
    .replace(/\u207b/g, '^{-}')
    .replace(/\u03b1/g, '\\alpha ')
    .replace(/\u03b2/g, '\\beta ')
    .replace(/\u03b3/g, '\\gamma ')
    .replace(/\u03b8/g, '\\theta ')
    .replace(/\u0394/g, '\\Delta ')
    .replace(/\u03a3/g, '\\Sigma ')
    .replace(/\u03bb/g, '\\lambda ')
    .replace(/\u03c3/g, '\\sigma ')
    .replace(/\u03c6/g, '\\phi ')
    .replace(/\u03bc/g, '\\mu ')
    .replace(/\u03b5/g, '\\epsilon ')
    .replace(/\u03c9/g, '\\omega ')
    .replace(/\u2220/g, '\\angle ')
    .replace(/\u22a5/g, '\\perp ')
    .replace(/\u2225/g, '\\parallel ')
    .replace(/\u2234/g, '\\therefore ')
    .replace(/\u2235/g, '\\because ')
    .trim();
}

export function formatQualityDisplay(result: QualityCheckResult) {
  const statusIcon: Record<ExtractionQuality, string> = {
    excellent: '\u2713',
    good: '~',
    poor: '\u26a0',
    critical: '\u2717',
  };
  const statusLabel: Record<ExtractionQuality, string> = {
    excellent: 'Excellent',
    good: 'Good',
    poor: 'Poor',
    critical: 'Critical',
  };
  const statusColor: Record<ExtractionQuality, string> = {
    excellent: 'text-green-600',
    good: 'text-blue-600',
    poor: 'text-amber-600',
    critical: 'text-red-600',
  };
  return {
    icon: statusIcon[result.quality],
    label: statusLabel[result.quality],
    color: statusColor[result.quality],
    score: result.score,
    message: result.issues.length > 0 ? result.issues[0] : 'Text extracted successfully',
  };
}

export function getOCRRecommendation(result: QualityCheckResult): string {
  if (!result.needsOCR) return '';
  if (result.brokenSymbols.includes('PUA_CHARS')) {
    return 'Font-specific PUA symbols detected. PUA-to-symbol mapping applied for recovery.';
  }
  if (result.brokenSymbols.includes('MATH_SYMBOLS')) {
    return 'Math symbols corrupted. OCR recommended for proper math notation extraction.';
  }
  if (result.brokenSymbols.includes('UFFFD')) {
    return 'Replacement characters detected. OCR recommended for better results.';
  }
  if (result.brokenSymbols.includes('BOX_CHARS')) {
    return 'Multiple unrecognized characters. OCR would provide better extraction.';
  }
  return 'Text quality is low. Consider using OCR for better results.';
}

export function getRecommendedOCRProvider(
  text: string,
): 'mathpix' | 'pix2text' | 'nougat' | 'tesseract' {
  const textLower = text.toLowerCase();
  const isMath = MATH_KEYWORDS.some(kw => textLower.includes(kw))
    || Object.values(MATH_SYMBOLS).some(sym => text.includes(sym))
    || /\d+\s*[+\-*/^=]\s*\d/.test(text);
  if (isMath) return 'mathpix';
  return 'pix2text';
}
