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
import {
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  Divider,
  Link,
  Image,
} from "@nextui-org/react";

interface GlobalState {
  componentName: string;
  setComponentName: Dispatch<SetStateAction<string>>;
  card: Cards | null;
  handleClick: Function;
  setCard: Dispatch<SetStateAction<Cards | null>>;
}

const GlobalStateContext = createContext<GlobalState | undefined>(undefined);

export default function View() {
  const [componentName, setComponentName] = useState("new");
  const [card, setCard] = useState<Cards | null>(null);

  const handleClick = (name: string) => {
    setCard(null);
    setComponentName(name);
  };

  return (
    <div className="flex flex-col h-screen">
      {/* <pre>{JSON.stringify(session, null, 2)}</pre> */}
      <Card className="max-w-[400px]">
        <CardHeader className="flex gap-3">
          <Image
            alt="nextui logo"
            height={40}
            radius="sm"
            src="https://avatars.githubusercontent.com/u/86160567?s=200&v=4"
            width={40}
          />
          <div className="flex flex-col">
            <p className="text-md">NextUI</p>
            <p className="text-small text-default-500">nextui.org</p>
          </div>
        </CardHeader>
        <Divider />
        <CardBody>
          <p>Make beautiful websites regardless of your design experience.</p>
        </CardBody>
        <Divider />
        <CardFooter>
          <Link
            isExternal
            showAnchorIcon
            href="https://github.com/nextui-org/nextui"
          >
            Visit source code on GitHub.
          </Link>
        </CardFooter>
      </Card>
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
