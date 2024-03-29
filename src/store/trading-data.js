import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  current_price: 1000,
  order_type: "LIMIT",
  pairs: "BTCUSDT",
  tradeForm: {
    formIsValid: { buy: false, sell: false },
    errorMessages: {
      buy: { stop: [], price: [], amount: [], form: [] },
      sell: { stop: [], price: [], amount: [], form: [] },
    },
    buy: {
      stop: { value: "", isValid: false, isToched: false },
      price: { value: "", isValid: false, isToched: false },
      amount: { value: "", isValid: false, isToched: false },
    },
    sell: {
      stop: { value: "", isValid: false, isToched: false },
      price: { value: "", isValid: false, isToched: false },
      amount: { value: "", isValid: false, isToched: false },
    },
  },
  trade_history: [],
};

const tradingSlice = createSlice({
  name: "trading-data",
  initialState,
  reducers: {
    changeOrderType(state, action) {
      state.order_type = action.payload;
    },
    updateInputs(state, action) {
      const { formType, value } = action.payload;
      state.tradeForm[formType] = value;
    },
    updateOneInput(state, action) {
      const { formType, inputName, value } = action.payload;
      state.tradeForm[formType][inputName] = value;
    },
    newErrorMessage(state, action) {
      const { formType, updatedPart, errMes } = action.payload;
      state.tradeForm.errorMessages[formType][updatedPart] = errMes;
    },
    formIsValid(state, action) {
      const { formType, isValid } = action.payload;
      state.tradeForm.formIsValid[formType] = isValid;
    },
    addTradeHistory(state, action) {
      state.trade_history.unshift(action.payload);
    },
    clearHistory(state) {
      state.trade_history = [];
    },
    setPairs(state, action) {
      state.pairs = action.payload;
    },
  },
});

export const tradingActions = tradingSlice.actions;

export default tradingSlice.reducer;
