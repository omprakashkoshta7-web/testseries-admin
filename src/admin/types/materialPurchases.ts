export interface IMaterialPurchaseItem {
  _id: string;
  userId: { _id: string; name: string; email: string; phone?: string };
  materialId: { _id: string; title: string; category?: string; pricing?: { plan: string; price: number } };
  amount: number;
  purchasedAt: string;
}

export interface IMaterialPurchasesData {
  purchases: IMaterialPurchaseItem[];
  total: number;
  page: number;
  totalPages: number;
}
