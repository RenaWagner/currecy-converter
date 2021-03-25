const initialState = {
  rates: [],
};

export default (state = initialState, action) => {
  switch (action.type) {
    case "historicalRate/historicalDataResult": {
      return {
        ...state,
        rates: [...action.payload],
      };
    }
    default:
      return state;
  }
};
