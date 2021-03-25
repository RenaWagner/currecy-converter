import { apiUrl } from "../../config/constants";
import axios from "axios";
import { appLoading, appDoneLoading, setMessage } from "../appState/actions";

export const fetchHistoricalData = (
  startDate,
  endDate,
  currencyFrom,
  currencyTo
) => async (dispatch, getState) => {
  try {
    dispatch(appLoading);
    const res = await axios.get(
      `${apiUrl}/history?start_at=${startDate}&end_at=${endDate}&symbols=${currencyFrom},${currencyTo}`
    );

    const result = res.data.rates; //this is an object

    const historicalDates = Object.keys(result); //this is an array

    const historicalRate = historicalDates.map((date) => {
      return { date: date, rate: result[date].USD / result[date].JPY };
    });
    console.log(historicalRate);
    dispatch(historicalDataResult(historicalRate));
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

export const historicalDataResult = (data) => ({
  type: "historicalRate/historicalDataResult",
  payload: data,
});
