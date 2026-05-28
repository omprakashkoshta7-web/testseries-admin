export interface IEnrollmentItem {
  _id: string;
  userId: { _id: string; name: string; email: string; phone?: string };
  testId: { _id: string; name: string; category: string; subject?: string; duration: number };
  enrolledAt: string;
}

export interface IEnrollmentsData {
  enrollments: IEnrollmentItem[];
  total: number;
  page: number;
  totalPages: number;
}
