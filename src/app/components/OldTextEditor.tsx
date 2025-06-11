"use client";

import { LexicalComposer } from "@lexical/react/LexicalComposer";
import { RichTextPlugin } from "@lexical/react/LexicalRichTextPlugin";
import { ContentEditable } from "@lexical/react/LexicalContentEditable";
import { HistoryPlugin } from "@lexical/react/LexicalHistoryPlugin";
import { OnChangePlugin } from "@lexical/react/LexicalOnChangePlugin";
import { EditorState } from "lexical";
import { TextEditorToolbar } from "./TextEditorToolbar";
import { ListPlugin } from "@lexical/react/LexicalListPlugin";
import { LinkPlugin } from "@lexical/react/LexicalLinkPlugin";
import { AutoLinkNode, LinkNode } from "@lexical/link";
import { ListItemNode, ListNode } from "@lexical/list";
import { HeadingNode, QuoteNode } from "@lexical/rich-text";
import { CodeHighlightNode, CodeNode } from "@lexical/code";
import { AutoFocusPlugin } from "@lexical/react/LexicalAutoFocusPlugin";
import { MarkdownShortcutPlugin } from "@lexical/react/LexicalMarkdownShortcutPlugin";
import { CheckListPlugin } from "@lexical/react/LexicalCheckListPlugin";
import { HorizontalRuleNode } from "@lexical/react/LexicalHorizontalRuleNode";
import { TablePlugin } from "@lexical/react/LexicalTablePlugin";
import { CodeHighlightPlugin } from "@/components/editor/plugins/code-highlight-plugin";
import { TableCellNode, TableNode, TableRowNode } from "@lexical/table";
import { HorizontalRulePlugin } from "@lexical/react/LexicalHorizontalRulePlugin";
import { OverflowNode } from "@lexical/overflow";


const theme = {
    paragraph: "mb-2",
    heading: {
      h1: "text-3xl font-bold",
      h2: "text-2xl font-semibold",
      h3: "text-xl font-medium",
    },
    quote: "border-l-4 border-gray-400 pl-4 italic",
    list: {
      nested: {
        listitem: "ml-6",
      },
      ol: "list-decimal pl-6",
      ul: "list-disc pl-6",
    },
    code: "bg-gray-100 p-2 rounded-md font-mono text-sm",
};

const onChange = (editorState: EditorState) => {
  editorState.read(() => {
    // console.log("Editor State:", JSON.stringify(editorState.toJSON()));
  });
};

export const TextEditor = () => {
  const initialConfig = {
    namespace: "LexicalEditor",
    theme,
    onError(error: Error) {
      console.error(error);
    },
    nodes: [
        HeadingNode,
        QuoteNode,
        ListNode,
        ListItemNode,
        LinkNode,
        AutoLinkNode,
        CodeNode,
        CodeHighlightNode,
        HorizontalRuleNode,
        TableNode,
        TableCellNode,
        TableRowNode,
        OverflowNode
    ],
  };

  return (
    <LexicalComposer initialConfig={initialConfig}>
    <div className="border border-gray-300 rounded-md p-4 bg-white shadow-sm min-h-[150px]">
      {/* Toolbar */}
      <TextEditorToolbar />
        <RichTextPlugin
          contentEditable={<ContentEditable className="outline-none min-h-[200px] w-full p-2" />}
          placeholder={<div className="absolute text-gray-400">Start typing...</div>}
          ErrorBoundary={({ children }) => <>{children}</>}
        />
        <HistoryPlugin />
        <AutoFocusPlugin />
        <ListPlugin />
        <LinkPlugin />
        <MarkdownShortcutPlugin />
        <OnChangePlugin onChange={onChange} />
        {/* <OnChangePlugin onChange={(editorState) => // console.log(editorState.toJSON())} /> */}
        <CheckListPlugin />
        <TablePlugin />
        <CodeHighlightPlugin />
        <OnChangePlugin onChange={(editorState) => // console.log(editorState.toJSON())} />
        <HorizontalRulePlugin />
      </div>
    </LexicalComposer>

  );
}
