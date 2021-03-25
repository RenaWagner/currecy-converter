export const selectRoundedResult = (reduxState) => {
  const clonedConvertedCurrency = reduxState.currency?.convertedCurrency;
  const rounded = Math.round(clonedConvertedCurrency.resultAmount * 100) / 100;
  const roundedResult = { ...clonedConvertedCurrency, resultAmount: rounded };
  return roundedResult;
};

export const selectAllCurrecies = (reduxState) =>
  reduxState.currency?.allCurrencies;
