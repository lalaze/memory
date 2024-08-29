import type { Contents, Rendition } from "epubjs";
import { useState, useEffect } from 'react'
import { selectToolsStateAtom } from "@/store/index";
import { saveSelection, updateSelection } from "@/utils/selection";
import { useAtom } from "jotai";
import { deleteSelection } from "@/utils/selection"
import showToast from "@/components/toast"

type ITheme = "light" | "dark";

export function updateTheme(rendition: Rendition, theme: ITheme) {
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

export const useTheme = (rendition: Rendition | undefined, dependencies = []) => {
  const [theme, setTheme] = useState<ITheme>("dark");

  useEffect(() => {
    const r = rendition as any;
    if (rendition && r.current) {
      updateTheme(r.current, theme);
    }
  }, [theme]);

  return { theme }
}

export const useTools = (show: boolean, setShow: Function, rendition: Rendition | undefined, clickOpen: Function, dependencies = []) => {
  const [sState, setState] = useAtom(selectToolsStateAtom);

  useEffect(() => {
    if (rendition && show) {
      rendition.annotations.remove(sState.cfi, 'highlight')
      rendition.annotations.add(
        "highlight",
        sState.cfi,
        {},
        (e: MouseEvent) => clickOpen(e, sState.cfi),
        "hl",
        { fill: sState.color, "fill-opacity": "0.5", "mix-blend-mode": "multiply" }
      );
      updateSelection(sState.id, {
        ...sState
      })
    }
  }, [sState.color])

  const deleteFunc = async () => {
    const res = await deleteSelection(sState.id)
    if (res && rendition) {
      showToast('delete success', 'success')
      rendition.annotations.remove(sState.cfi, 'highlight')
      setShow(false)
    } else {
      showToast('delete error', 'error')
    }
  }

  return { sState, setState, deleteFunc }
}
