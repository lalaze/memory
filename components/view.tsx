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
import Nav from './nav'
import { Session } from "next-auth";

interface GlobalState {
  componentName: string;
  setComponentName: Dispatch<SetStateAction<string>>;
  card: Cards | null;
  handleClick: Function,
  setCard: Dispatch<SetStateAction<Cards | null>>;
  session: Session;
  searchValue: string;
  setSearchValue: Dispatch<SetStateAction<string>>;
}

const GlobalStateContext = createContext<GlobalState | undefined>(undefined);

export default function View({ session }: { session: Session }) {
  const [componentName, setComponentName] = useState("new");
  const [searchValue, setSearchValue] = useState<string>('');
  const [card, setCard] = useState<Cards | null>(null);

  const handleClick = (name: string) => {
    setCard(null)
    setComponentName(name);
  }

  return (
    <div className="bg-zinc-900 flex flex-col h-screen">
      {/* <pre>{JSON.stringify(session, null, 2)}</pre> */}
      <GlobalStateContext.Provider
        value={{ componentName, setComponentName, card, setCard, session, handleClick, searchValue, setSearchValue }}
      >
        <Nav></Nav>
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
