"use client";

import Content from "./content";
import {
  useState,
} from "react";
import { Cards } from "../models/cards";

export default function View() {
  return (
    <div className="flex flex-col h-screen">
      {/* <pre>{JSON.stringify(session, null, 2)}</pre> */}
      <div className="content-height">
        <Content></Content>
      </div>
    </div>
  );
}
