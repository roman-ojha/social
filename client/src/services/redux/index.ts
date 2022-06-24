import reducer from "./reducer";
export * as actionCreators from "./action";
export type RootState = ReturnType<typeof reducer>;
export * from "./store";
