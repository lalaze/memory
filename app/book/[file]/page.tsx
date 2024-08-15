"use client";

import React, { useState, useEffect } from "react";
import { ReactReader } from "react-reader";
import { usePathname } from "next/navigation";
import type { Contents, Rendition } from "epubjs";
import { IReactReaderStyle, ReactReaderStyle } from "./styleType";

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

const lightReaderTheme: IReactReaderStyle = {
  ...ReactReaderStyle,
  readerArea: {
    ...ReactReaderStyle.readerArea,
    transition: undefined,
  },
};

const darkReaderTheme: IReactReaderStyle = {
  ...ReactReaderStyle,
  arrow: {
    ...ReactReaderStyle.arrow,
    color: "white",
  },
  arrowHover: {
    ...ReactReaderStyle.arrowHover,
    color: "#ccc",
  },
  readerArea: {
    ...ReactReaderStyle.readerArea,
    backgroundColor: "#000",
    transition: undefined,
  },
  titleArea: {
    ...ReactReaderStyle.titleArea,
    color: "#ccc",
  },
  tocArea: {
    ...ReactReaderStyle.tocArea,
    background: "#111",
  },
  tocButtonExpanded: {
    ...ReactReaderStyle.tocButtonExpanded,
    background: "#222",
  },
  tocButtonBar: {
    ...ReactReaderStyle.tocButtonBar,
    background: "#fff",
  },
  tocButton: {
    ...ReactReaderStyle.tocButton,
    color: "white",
  },
};

export default function Book() {
  const [location, setLocation] = useState<string | number>(0);
  const [rendition, setRendition] = useState<Rendition | undefined>(undefined);
  const [selections, setSelections] = useState<ITextSelection[]>([]);
  const pathname = usePathname();
  const file = pathname.split("/").pop();
  // const file = window.location.href.split('/').pop()

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
        console.log(list)
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
      rendition.on("selected", setRenderSelection);
      // setRenderSelection('epubcfi(/6/6!/4/2[pgepubid00003]/14')
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
