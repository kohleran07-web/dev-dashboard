// src/context/AppStateContext.jsx
import { createContext, useContext, useMemo, useReducer } from "react";
import { useLocalStorage } from "../hooks/useLocalStorage.js";

const AppStateContext = createContext(null);

const initialState = {
  learningItems: [],
  tasks: [],
  ktSessions: [],
};

function appReducer(state, action) {
  switch (action.type) {
    case "ADD_LEARNING":
      return {
        ...state,
        learningItems: [...state.learningItems, action.payload],
      };
    case "ADD_TASK":
      return {
        ...state,
        tasks: [...state.tasks, action.payload],
      };
    case "TOGGLE_TASK":
      return {
        ...state,
        tasks: state.tasks.map((t) =>
          t.id === action.payload ? { ...t, done: !t.done } : t
        ),
      };
    case "ADD_KT_SESSION":
      return {
        ...state,
        ktSessions: [...state.ktSessions, action.payload],
      };
    default:
      return state;
  }
}

export function AppStateProvider({ children }) {
  const [persisted, setPersisted] = useLocalStorage(
    "dev-dashboard",
    initialState
  );

  const [state, dispatchBase] = useReducer(appReducer, persisted);

  // Wrap dispatch to also persist
  const dispatch = (action) => {
    const nextState = appReducer(state, action);
    setPersisted(nextState);
    return dispatchBase(action);
  };

  const value = useMemo(() => ({ state, dispatch }), [state]);

  return (
    <AppStateContext.Provider value={value}>
      {children}
    </AppStateContext.Provider>
  );
}

export function useAppState() {
  const ctx = useContext(AppStateContext);
  if (!ctx) {
    throw new Error("useAppState must be used inside AppStateProvider");
  }
  return ctx;
}
