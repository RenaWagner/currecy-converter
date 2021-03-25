const initialState = {
  allCurrencies: [],
  convertedCurrency: [],
};

export default (state = initialState, action) => {
  switch (action.type) {
    case "currency/currencyResult": {
      return {
        ...state,
        convertedCurrency: action.payload,
      };
    }
    case "currency/allCurrenciesResult": {
      const data = action.payload;
      const currencies = Object.keys(data);
      return {
        ...state,
        allCurrencies: [...currencies],
      };
    }
    default:
      return state;
  }
};
