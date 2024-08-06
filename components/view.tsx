"use client";

import Content from "./content";
import {
  useState,
  useContext,
  useEffect,
  createContext,
  Dispatch,
  SetStateAction,
} from "react";
import { Cards } from "../models/cards";

interface GlobalState {
  componentName: string;
  setComponentName: Dispatch<SetStateAction<string>>;
  card: Cards | null;
  handleClick: Function,
  setCard: Dispatch<SetStateAction<Cards | null>>;
}

const GlobalStateContext = createContext<GlobalState | undefined>(undefined);

export default function View() {
  const [componentName, setComponentName] = useState("new");
  const [card, setCard] = useState<Cards | null>(null);

  const handleClick = (name: string) => {
    setCard(null)
    setComponentName(name);
  }

  return (
    <div className="bg-zinc-900 flex flex-col h-screen">
      {/* <pre>{JSON.stringify(session, null, 2)}</pre> */}
      <GlobalStateContext.Provider
        value={{ componentName, setComponentName, card, setCard, handleClick }}
      >
        <div className="content-height">
          <Content></Content>
        </div>
      </GlobalStateContext.Provider>
    </div>
  );
}

export const useGlobalState = (): GlobalState => {
  const context = useContext(GlobalStateContext);
  if (!context) {
    throw new Error("useGlobalState must be used within a GlobalStateProvider");
  }
  return context;
};
