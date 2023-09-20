import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { SearchParamsInterface } from "@/app/interface/AppInterface";


const initialState: SearchParamsInterface = {
  outletId: undefined, 
  date: undefined, 
  timeframe: undefined, 
  startDate: undefined, 
  endDate: undefined, 
  product: undefined,
};

export const appSlice = createSlice({
  name: "app",
  initialState,
  reducers: {
    setOutlet: (state, action: PayloadAction<string | undefined>) => {
        state.outletId = action.payload
    },
    setTimeframe: (state, action: PayloadAction<string | undefined>) => {
        state.timeframe = action.payload
    },
    setStartAndEndDate: (state, action: PayloadAction<{startDate:string|Date, endDate:string|Date} | undefined>) => {
      if(action.payload){
          state.startDate = action.payload?.startDate
          state.endDate = action.payload?.endDate
      }else{
        state.startDate = undefined
        state.endDate = undefined
      }  
    },
    setSingleDate:  (state, action: PayloadAction<string | Date | undefined>) => {
        state.date = action.payload
    },
    setSelectedProduct: (state, action: PayloadAction<string | undefined>) => {
      state.product = action.payload
  },
  },
});

export const { setOutlet, setTimeframe, setStartAndEndDate, setSingleDate, setSelectedProduct  } = appSlice.actions;

export default appSlice.reducer;
