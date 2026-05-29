export interface IExamSection {
  _id: string;
  categoryId: { _id: string; name: string; slug: string } | string;
  title: string;
  subtitle: string;
  icon: string;
  order: number;
  createdAt: string;
  updatedAt: string;
}
