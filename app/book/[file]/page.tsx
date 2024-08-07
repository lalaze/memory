"use client";

import React, { useState, useEffect } from "react";
import { ReactReader } from "react-reader";
import type { Contents, Rendition } from "epubjs";

type ITextSelection = {
  text: string;
  cfiRange: string;
};

export default function Book() {
  const [location, setLocation] = useState<string | number>(0);
  const [rendition, setRendition] = useState<Rendition | undefined>(undefined);
  const [selections, setSelections] = useState<ITextSelection[]>([]);

  const file = window.location.href.split('/').pop()

  function setRenderSelection(cfiRange: string, contents: Contents) {
    if (rendition) {
      setSelections((list) =>
        list.concat({
          text: rendition.getRange(cfiRange).toString(),
          cfiRange,
        })
      );
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
      return () => {
        rendition?.off("selected", setRenderSelection);
      };
    }
  }, [setSelections, rendition]);

  return (
    <div style={{ height: "100vh" }}>
      <ReactReader
        url={`http://localhost:3000/api/download/${file}`}
        location={location}
        showToc={true}
        locationChanged={(epubcfi: string) => {
          setLocation(epubcfi);
        }}
        getRendition={(_rendition: Rendition) => {
          console.log('zeze gg', _rendition)
          setRendition(_rendition);
        }}
      />
    </div>
  );
}
