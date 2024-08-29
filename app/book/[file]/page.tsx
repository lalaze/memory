"use client";

import React, { useState, useEffect, useRef } from "react";
import { ReactReader } from "react-reader";
import { usePathname, useSearchParams } from "next/navigation";
import { saveSelection, selectionList } from "@/utils/selection";
import type { Contents, Rendition } from "epubjs";
import { useFetchBook } from '@/utils/api'
import SelecTools from "@/components/selectTools";
import { darkReaderTheme, lightReaderTheme } from "./styleType";
import { updateTheme, useTheme, useTools } from './bookUtils';
import { SelectionList } from '@/models/selection'

export default function Book() {
  const [location, setLocation] = useState<string | number>(0);
  const [rendition, setRendition] = useState<Rendition | undefined>(undefined);
  const [selections, setSelections] = useState<SelectionList[]>([]);
  const [saveCfi, setCfi] = useState<string[]>([])
  const [bookUrl, setBookUrl] = useState('')
  const [show, setShow] = useState(false)
  const [paragraph, setParagraph] = useState<string>('')
  let isDraging = false
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const file = (pathname.split("/").pop() as String).split('?')[0] || ''
  const id = searchParams.get('id') || ''
  const { url, hash } = useFetchBook(file, id)
  const showRef = useRef(show);
  const { theme } = useTheme(rendition)

  const clickOpen = (e: MouseEvent, cfiRange: string) => {
    const s = selections.filter((item) => item.cfi === cfiRange)[0]
    setState({
      x: sState.x,
      y: sState.y,
      ...s,
    })
    setShow(true)
  }

  const { sState, setState, deleteFunc } = useTools(showRef.current, setShow, rendition, clickOpen)

  const changeSelecetionsTool = () => {
    setShow(!showRef.current)
  }

  let mouseDown = () => {
    if (showRef.current) {
      changeSelecetionsTool()
    } else {
      isDraging = true
    }
  }

  const mouseUp = (e: MouseEvent) => {
    if (isDraging) {
      isDraging = false
    }
    sState.x = e.offsetX
    sState.y = e.clientY
    setState(sState)
  }

  useEffect(() => {
    showRef.current = show
  }, [show]);

  useEffect(() => {
    setBookUrl(url);
  }, [url, hash]);

  const initS = async () => {
    const data: SelectionList[] = await selectionList(file, paragraph)
    setSelections(data)
    setCfi(data.map((item: any) => item))
  }

  useEffect(() => {
    initS()
  }, [paragraph])

  useEffect(() => {
    if (saveCfi.length > 0 && rendition) {
      initSelection()
    }
  }, [saveCfi])

  const initSelection = () => {
    if (rendition) {
      saveCfi.forEach((item: any) => {
        rendition.annotations.add(
          "highlight",
          item.cfi,
          {},
          (e: MouseEvent) => clickOpen(e, item.cfi),
          "hl",
          { fill: item.color, "fill-opacity": "0.5", "mix-blend-mode": "multiply" }
        );
      })

    }
  }

  async function setRenderSelection(cfiRange: string, contents: Contents) {
    if (rendition) {
      const text = rendition.getRange(cfiRange).toString()
      rendition.annotations.add(
        "highlight",
        cfiRange,
        {},
        (e: MouseEvent) => clickOpen(e, cfiRange),
        "hl",
        { fill: sState.color, "fill-opacity": "0.5", "mix-blend-mode": "multiply" }
      );
      const selection = contents.window.getSelection();
      selection?.removeAllRanges();
      const res = await saveSelection(file, cfiRange, sState.color, [], '', text)
      setState({
        ...sState,
        ...res
      })
      setSelections((list) => {
        return list.concat({
          ...sState,
          ...res
        });
      });

      if (sState.x) {
        changeSelecetionsTool()
      }
    }
  }

  useEffect(() => {
    if (rendition) {
      const r = rendition as any;
      initSelection()
      rendition.on("selected", setRenderSelection);

      return () => {
        rendition?.off("selected", setRenderSelection);
      };
    }
  }, [setSelections, rendition]);

  const locationChanged = (epubcfi: string) => {
    setLocation(epubcfi);
    const c = epubcfi.split('/')
    const cfiBase = [c[1], c[2]].join('/')
    setParagraph(cfiBase)

    if (rendition) {
      setShow(false)
      const contents: any = rendition.getContents()
      contents[0].document.onmousedown = mouseDown
      contents[0].document.onmouseup = mouseUp
    }
  }

  return (
    <div className="h-full relative">
      {show && <SelecTools key="selection" x={sState.x} y={sState.y} deleteFunc={deleteFunc}></SelecTools>}
      <ReactReader
        url={bookUrl}
        location={location}
        showToc={true}
        epubInitOptions={{
          openAs: 'epub',
        }}
        readerStyles={theme === "dark" ? darkReaderTheme : lightReaderTheme}
        locationChanged={locationChanged}
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
