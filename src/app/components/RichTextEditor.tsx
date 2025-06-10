import React, { useState } from "react";
import { LexicalComposer } from "@lexical/react/LexicalComposer";
import PlaygroundNodes from "./nodes/PlaygroundNodes";
import PlaygroundEditorTheme from './themes/PlaygroundEditorTheme';
import { SharedHistoryContext } from "./context/SharedHistoryContext";
import {ToolbarContext} from './context/ToolbarContext';
import { TableContext } from "./plugins/TablePlugin";
import Image from "next/image";
import LogoImg from "@/assets/logo.png";
import Settings from "../Settings";
import DocsPlugin from "./plugins/DocsPlugin";
import PasteLogPlugin from "./plugins/PasteLogPlugin";
import TestRecorderPlugin from "./plugins/TestRecorderPlugin";
import TypingPerfPlugin from "./plugins/TypingPerfPlugin";
import { useSettings } from "./context/SettingsContext";
import { isDevPlayground } from "../appSettings";
import LexicalEditor from "./LexicalEditor";
import { $createParagraphNode, $insertNodes, EditorState, LexicalEditor as LexicalEditorMain, LexicalNode } from "lexical";
import { $getRoot, $getSelection } from "lexical";
import { $generateNodesFromDOM, $generateHtmlFromNodes } from "@lexical/html";

// Rich Text Editor Component
interface LexicalEditorProps {
  value: string;
  onChange: (value: string) => void;
}

export default function RichTextEditor({ value, onChange }: LexicalEditorProps) {
  
  const defaultHTML = `
<p class="PlaygroundEditorTheme__paragraph" dir="ltr" style="text-align: center">
    <b>
        <strong class="PlaygroundEditorTheme__textBold" style="font-size: 37px; font-family: Verdana; white-space: pre-wrap">
            History of Toyota Corolla
        </strong>
    </b>
</p>`;

// Define the initial editor configuration
const initialConfig = {
  namespace: "MyEditor",
  theme: PlaygroundEditorTheme,
  onError(error: Error) {
    console.error(error);
  },
  editorState: (editor: LexicalEditorMain) => {
    // const parser = new DOMParser();
    // const dom = parser.parseFromString(defaultHTML, "text/html");

    editor.update(() => {
      // const root = $getRoot();
      // // const nodes = $generateNodesFromDOM(editor, dom);
      // const nodes = customGenerateNodesFromDOM(editor, dom);
      // root.clear(); // Clear the editor state before inserting new nodes
      // root.append(...nodes);

      // In the browser you can use the native DOMParser API to parse the HTML string.
      const parser = new DOMParser();
      const dom = parser.parseFromString(value, "text/html");

      // Once you have the DOM instance it's easy to generate LexicalNodes.
      const nodes = $generateNodesFromDOM(editor, dom);

      // Select the root
      $getRoot().select();

      // Insert them at a selection.
      $insertNodes(nodes); 
    });
  },
  nodes: [...PlaygroundNodes],
};
  const handleEditorChange = (value: string) => {
    onChange(value);
  };
  const {
    settings: {isCollab, emptyEditor, measureTypingPerf},
  } = useSettings();
  return (
    <LexicalComposer initialConfig={initialConfig}>
      <SharedHistoryContext>
        <TableContext>
          <ToolbarContext>
            {/* <header>
              <a href="https://pakautomotive.com" target="_blank" rel="noreferrer">
                <Image src={LogoImg} className="h-28 w-auto mx-auto" priority alt="Logo" />
              </a>
            </header> */}
            <div className="editor-shell flex flex-col min-h-[60px] w-full rounded-md border border-input bg-transparent px-3 py-2 text-base shadow-sm placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50 md:text-sm">
              <LexicalEditor onChange={handleEditorChange} />
            </div>
            {/* <Settings /> */}
            {/* {isDevPlayground() ? <DocsPlugin /> : null} */}
            {/* {isDevPlayground() ? <PasteLogPlugin /> : null} */}
            {/* {isDevPlayground() ? <TestRecorderPlugin /> : null} */}

            {/* {measureTypingPerf ? <TypingPerfPlugin /> : null} */}
          </ToolbarContext>
        </TableContext>
      </SharedHistoryContext>
    </LexicalComposer>
  );
}