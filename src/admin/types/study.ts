export interface IAdminSubject {
  _id: string;
  id: string;
  name: string;
  icon: string;
  color: string;
  categoryId?: { _id: string; name: string } | string;
  description: string;
  order: number;
  isActive: boolean;
  materialCount: number;
}

export interface IAdminStudyMaterial {
  id: string;
  title: string;
  description: string;
  subject: string | { _id: string; name: string };
  category: string;
  chapter: string;
  thumbnail: string;
  duration: number;
  author: string;
  tags: string[];
  content: string;
  pdfUrl: string;
  videoUrl: string;
  isActive: boolean;
  createdAt: string;
}

export interface IAdminStudyState {
  subjects: IAdminSubject[];
  materials: IAdminStudyMaterial[];
  loading: boolean;
  error: string | null;
  subjectForm: { name: string; icon: string; color: string; description: string };
  materialForm: {
    title: string; description: string; subject: string;
    category: string; chapter: string; duration: number;
    author: string; tags: string; content: string; pdfUrl: string; videoUrl: string; isActive: boolean;
    pdfUpload: { name: string; type: string; data: string } | null;
  };
}
