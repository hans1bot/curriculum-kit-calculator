export const formatCurrency = (value) => {
  return new Intl.NumberFormat("es-GT", {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  }).format(value);
};

export const formatInteger = (value) => {
  return new Intl.NumberFormat("es-GT", {
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(value);
};
