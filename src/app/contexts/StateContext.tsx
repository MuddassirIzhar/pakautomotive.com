"use client";
import { createContext, useContext, useReducer } from "react";

export const StateContext =  createContext<any>(null);

export const StateProvider = ({initialState, reducer, children}:{initialState:any, reducer:any, children:any}) => (
    <StateContext.Provider value={useReducer(reducer, initialState)}>
        {children}
    </StateContext.Provider>
);

export const useStateProvider = () => useContext(StateContext);