"use client";

import EditorJS from "@editorjs/editorjs";
import Header from "@editorjs/header";
import List from "@editorjs/list";
import Checklist from "@editorjs/checklist";
import { useEffect, useState } from "react";

const Editor = () => {
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    if (!isMounted) return;
    const editor = new EditorJS({
      holder: "editorjs",
      tools: {
        header: Header,
        list: List,
        checklist: Checklist,
      },
    });
  }, [isMounted]);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  return (
    <div
      id="editorjs"
      className="editor w-full overflow-scroll"
    ></div>
  );
};

export default Editor;
