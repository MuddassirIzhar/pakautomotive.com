"use client";

import { useEffect, useRef } from "react";
import { BlockToolConstructable } from "@editorjs/editorjs";
import EditorJS from "@editorjs/editorjs";
import Header from "@editorjs/header";
import List from "@editorjs/list";
import Paragraph from "@editorjs/paragraph";
import ImageTool from "@editorjs/image";
import LinkTool from "@editorjs/link";
import Quote from "@editorjs/quote";
import Table from "@editorjs/table";
import Delimiter from "@editorjs/delimiter";
import Underline from "@editorjs/underline";
import CodeTool from "@editorjs/code";
import Embed from "@editorjs/embed";
import Marker from "@editorjs/marker";
import Checklist from "@editorjs/checklist";


export default function Editor({ submissionCallback }: { submissionCallback: () => void }) {
  const editorRef = useRef<EditorJS | null>(null);

  useEffect(() => {
    if (!editorRef.current) {
      editorRef.current = new EditorJS({
        holder: "editorjs",
        autofocus: true,
        tools: {
          header: {
            class: Header as unknown as BlockToolConstructable,
            inlineToolbar: true,
            config: { levels: [1, 2, 3], defaultLevel: 2 },
          },
          paragraph: { class: Paragraph as unknown as BlockToolConstructable, inlineToolbar: true },
          list: { class: List as unknown as BlockToolConstructable, inlineToolbar: true },
          image: {
            class: ImageTool,
            config: { endpoints: { byFile: "/api/upload", byUrl: "/api/fetchUrl" } },
          },
          linkTool: { class: LinkTool, config: { endpoint: "/api/link" } },
          quote: { class: Quote, inlineToolbar: true },
          table: { class: Table as unknown as BlockToolConstructable, inlineToolbar: true },
          delimiter: Delimiter,
          underline: Underline,
          code: CodeTool,
          embed: Embed,
          marker: Marker,
          checklist: { class: Checklist, inlineToolbar: true },
        },
        onReady: () => {
          document.querySelectorAll(".ce-block__content").forEach((block) => {
            const element = block as HTMLElement;
            element.style.maxWidth = "100%"; // Set block max width
            element.style.margin = "0 auto"; // Center block
          });
        },
        onChange: (api, event) => {
          // console.log('Now I know that Editor\'s content changed!', event)
          submissionCallback();
        }
      });
    }

    return () => {
      if (editorRef.current) {
        editorRef.current.destroy();
        editorRef.current = null;
      }
    };
  }, []);

  return (
    <div className="border p-4 rounded-lg bg-white shadow">
      <div id="editorjs" className="min-h-[300px]" />
    </div>
  );
}
