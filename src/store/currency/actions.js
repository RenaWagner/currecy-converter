import { apiUrl } from "../../config/constants";
import axios from "axios";
import { appLoading, appDoneLoading, setMessage } from "../appState/actions";

export const fetchCurrencyRate = (
  date,
  currencyFrom,
  currencyTo,
  inputAmount
) => async (dispatch, getState) => {
  try {
    dispatch(appLoading);
    if (currencyFrom === "EUR") {
      const res = await axios.get(`${apiUrl}/${date}?symbols=${currencyTo}`);
      const resultAmount = inputAmount * res.data.rates[currencyTo];
      const result = {
        currencyFrom: "EUR",
        inputAmount: inputAmount,
        currencyTo: currencyTo,
        resultAmount: resultAmount,
      };
      dispatch(currencyResult(result));
    } else if (currencyTo === "EUR") {
      const res = await axios.get(`${apiUrl}/${date}?symbols=${currencyFrom}`);

      const resultAmount = inputAmount / res.data.rates[currencyFrom];
      const result = {
        currencyFrom: currencyFrom,
        inputAmount: inputAmount,
        currencyTo: "EUR",
        resultAmount: resultAmount,
      };
      dispatch(currencyResult(result));
    } else {
      const res = await axios.get(
        `${apiUrl}/${date}?symbols=${currencyFrom},${currencyTo}`
      );

      const resultAmount =
        (inputAmount / res.data.rates[currencyFrom]) *
        res.data.rates[currencyTo];
      const result = {
        currencyFrom: currencyFrom,
        inputAmount: inputAmount,
        currencyTo: currencyTo,
        resultAmount: resultAmount,
      };
      // console.log(result);
      dispatch(currencyResult(result));
    }
    dispatch(appDoneLoading());
  } catch (error) {
    if (error.response) {
      console.log(error.response.data.message);
      dispatch(setMessage("danger", true, error.response.data.message));
    } else {
      console.log(error.message);
      dispatch(setMessage("danger", true, error.message));
    }
    dispatch(appDoneLoading());
  }
};

export const currencyResult = (data) => ({
  type: "currency/currencyResult",
  payload: data,
});

export const fetchAllCurrencies = () => async (dispatch, getState) => {
  try {
    const res = await axios.get(`${apiUrl}/latest`);
    dispatch(allCurrenciesResult(res.data.rates));
  } catch (error) {
    if (error.response) {
      console.log(error.response.data.message);
      dispatch(setMessage("danger", true, error.response.data.message));
    } else {
      console.log(error.message);
      dispatch(setMessage("danger", true, error.message));
    }
    dispatch(appDoneLoading());
  }
};

export const allCurrenciesResult = (data) => ({
  type: "currency/allCurrenciesResult",
  payload: data,
});
