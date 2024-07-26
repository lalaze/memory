"use client";

import EditorJS from "@editorjs/editorjs";
import Header from "@editorjs/header";
import List from "@editorjs/list";
import Checklist from "@editorjs/checklist";
import Quote from "@editorjs/quote";
import Warning from "@editorjs/warning";
import Marker from "@editorjs/marker";
import SimpleImage from "@editorjs/simple-image";
import CodeTool from "@editorjs/code";
import Delimiter from "@editorjs/delimiter";
import InlineCode from "@editorjs/inline-code";
import LinkTool from "@editorjs/link";
import Embed from "@editorjs/Embed";
import Table from "@editorjs/table";
import { useEffect, useState, forwardRef, useImperativeHandle } from "react";
import { useGlobalState } from "./view";

const Editor = ({ editorRef, ...props }: any) => {
  const [isMounted, setIsMounted] = useState(false);
  const [editor, setEditor ] = useState<any>(null)
  const { componentName } = useGlobalState();

  const someSaveMethod = () => {
    // 这里是你的保存逻辑
    console.log("Editor save method called");
  };

  useImperativeHandle(editorRef, () => ({
    editor,
    someSaveMethod,
  }));

  useEffect(() => {
    if (!isMounted) return;
    const editor = new EditorJS({
        holder: "editorjs",
        readOnly: componentName === 'read',
        tools: {
          header: Header,
          image: SimpleImage,
          list: List,
          checklist: Checklist,
          quote: Quote,
          warning: Warning,
          marker: Marker,
          code: CodeTool,
          delimiter: Delimiter,
          inlineCode: InlineCode,
          linkTool: LinkTool,
          embed: Embed,
          table: Table,
        },
      });
      setEditor(editor)
  }, [isMounted]);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  return <div id="editorjs" className="editor w-full overflow-y-scroll"></div>;
};

export default Editor;
