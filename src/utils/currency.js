export const currencyToString = (currency) => {
  switch (currency) {
    case "USD":
      return "US Dollar";
    case "IDR":
      return "Rupiah";
    case "EUR":
      return "Euro";
    default:
      return currency;
  }
};

export const currencyToPrefix = (currency) => {
  switch (currency) {
    case "USD":
      return "$";
    case "IDR":
      return "Rp";
    case "EUR":
      return "€";
    default:
      return currency;
  }
};
