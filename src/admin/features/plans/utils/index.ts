export const formatPrice = (price: number): string => `Rs. ${price.toLocaleString()}`;

export const formatDiscount = (originalPrice: number, price: number): number => {
  if (originalPrice <= 0) return 0;
  return Math.round(((originalPrice - price) / originalPrice) * 100);
};
