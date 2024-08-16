"use client";

import React, { useState, useEffect } from "react";
import { ReactReader } from "react-reader";
import { usePathname } from "next/navigation";
import type { Contents, Rendition } from "epubjs";
import { darkReaderTheme, lightReaderTheme } from "./styleType";

type ITheme = "light" | "dark";

type ITextSelection = {
  text: string;
  cfiRange: string;
};

function updateTheme(rendition: Rendition, theme: ITheme) {
  const themes = rendition.themes;
  switch (theme) {
    case "dark": {
      themes.override("color", "#fff");
      themes.override("background", "#000");
      break;
    }
    case "light": {
      themes.override("color", "#000");
      themes.override("background", "#fff");
      break;
    }
  }
}

export default function Book() {
  const [location, setLocation] = useState<string | number>(0);
  const [rendition, setRendition] = useState<Rendition | undefined>(undefined);
  const [selections, setSelections] = useState<ITextSelection[]>([]);
  const [saveCfi, setCfi] = useState<string[]>([])
  const pathname = usePathname();
  const file = pathname.split("/").pop();

  const fakeList = [
    "epubcfi(/6/4!/4/8[pgepubid00000],/1:0,/1:32)"
  ]

  useEffect(() => {
    setCfi(fakeList)
  }, [])

  // const file = window.location.href.split('/').pop()

  const initSelection = () => {
    if (rendition) {
      saveCfi.forEach((item: string) => {
        rendition.annotations.add(
          "highlight",
          item,
          {},
          (e: MouseEvent) => console.log("click on selection", item, e),
          "hl",
          { fill: "red", "fill-opacity": "0.5", "mix-blend-mode": "multiply" }
        );
      })

    }
  }

  const [theme, setTheme] = useState<ITheme>("dark");

  useEffect(() => {
    const r = rendition as any;
    if (rendition && r.current) {
      updateTheme(r.current, theme);
    }
  }, [theme]);

  function setRenderSelection(cfiRange: string, contents: Contents) {
    console.log("zeze", cfiRange, contents);
    if (rendition) {
      setSelections((list) => {
        return list.concat({
          text: rendition.getRange(cfiRange).toString(),
          cfiRange,
        });
      });
      rendition.annotations.add(
        "highlight",
        cfiRange,
        {},
        (e: MouseEvent) => console.log("click on selection", cfiRange, e),
        "hl",
        { fill: "red", "fill-opacity": "0.5", "mix-blend-mode": "multiply" }
      );
      const selection = contents.window.getSelection();
      selection?.removeAllRanges();
    }
  }

  useEffect(() => {
    if (rendition) {
      initSelection()
      rendition.on("selected", setRenderSelection);
      return () => {
        rendition?.off("selected", setRenderSelection);
      };
    }
  }, [setSelections, rendition]);

  return (
    <div className="h-full">
      <ReactReader
        url={`/api/download/${file}`}
        location={location}
        showToc={true}
        readerStyles={theme === "dark" ? darkReaderTheme : lightReaderTheme}
        locationChanged={(epubcfi: string) => {
          setLocation(epubcfi);
        }}
        getRendition={(_rendition: Rendition) => {
          updateTheme(_rendition, theme);
          setRendition(_rendition);
          if (rendition) {
            (rendition as any).current = _rendition;
          }
        }}
      />
    </div>
  );
}
