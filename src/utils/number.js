export const thousandsSeparators = (number) => {
  return number.toLocaleString("en-US", { style: "decimal" });
};
