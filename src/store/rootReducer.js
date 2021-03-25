import { combineReducers } from "redux";
import appState from "./appState/reducer";
import currency from "./currency/reducer";
import historicalRate from "./historicalRate/reducer";

export default combineReducers({
  appState,
  currency,
  historicalRate,
});
