import reducer from "./reducer";
export * as actionCreators from "./action";
export type AppState = ReturnType<typeof reducer>;
export * from "./store";
