"use client";

import { useLexicalComposerContext } from "@lexical/react/LexicalComposerContext";
import { Button } from "@/components/ui/button";
import { useEffect, useState } from "react";
import { Bold, Italic, Underline, List, ListOrdered, Quote, Code, Link, Strikethrough, Minus, Table } from "lucide-react";
import { FORMAT_TEXT_COMMAND, FORMAT_ELEMENT_COMMAND, $getSelection, $isRangeSelection } from "lexical";
import { INSERT_ORDERED_LIST_COMMAND, INSERT_UNORDERED_LIST_COMMAND } from "@lexical/list";
import { TOGGLE_LINK_COMMAND } from "@lexical/link";
import { registerCodeHighlighting } from "@lexical/code";
import { $createQuoteNode } from "@lexical/rich-text";
import { INSERT_HORIZONTAL_RULE_COMMAND } from "@lexical/react/LexicalHorizontalRuleNode";
import { INSERT_TABLE_COMMAND } from "@lexical/table";

export function TextEditorToolbar() {
    const [editor] = useLexicalComposerContext();
    const [isLink, setIsLink] = useState(false);
  
    useEffect(() => {
      registerCodeHighlighting(editor);
    }, []);
  
    return (
      <div className="flex space-x-2 p-2 bg-gray-50 rounded-md shadow-md">
        <Button type="button" size="sm" variant="outline" onClick={() => editor.dispatchCommand(FORMAT_TEXT_COMMAND, "bold")}>
          <Bold size={16} />
        </Button>
        <Button type="button" size="sm" variant="outline" onClick={() => editor.dispatchCommand(FORMAT_TEXT_COMMAND, "italic")}>
          <Italic size={16} />
        </Button>
        <Button type="button" size="sm" variant="outline" onClick={() => editor.dispatchCommand(FORMAT_TEXT_COMMAND, "underline")}>
          <Underline size={16} />
        </Button>
        <Button type="button" size="sm" variant="outline" onClick={() => editor.dispatchCommand(INSERT_UNORDERED_LIST_COMMAND, undefined)}>
          <List size={16} />
        </Button>
        <Button type="button" size="sm" variant="outline" onClick={() => editor.dispatchCommand(INSERT_ORDERED_LIST_COMMAND, undefined)}>
          <ListOrdered size={16} />
        </Button>
        <Button type="button"
            size="sm"
            variant="outline"
            onClick={() => {
                editor.update(() => {
                const selection = $getSelection();
                if ($isRangeSelection(selection)) {
                    const quoteNode = $createQuoteNode();
                    selection.insertNodes([quoteNode]);
                }
                });
            }}
            >
            <Quote size={16} />
        </Button>
        <Button type="button"
          size="sm"
          variant="outline"
          onClick={() => {
            const url = isLink ? null : prompt("Enter URL:");
            setIsLink(!isLink);
            editor.dispatchCommand(TOGGLE_LINK_COMMAND, url);
          }}
        >
          <Link size={16} />
        </Button>
        <Button type="button" size="sm" variant="outline" onClick={() => {editor.dispatchCommand(FORMAT_TEXT_COMMAND, "code")}}>
          <Code size={16} />
        </Button>
      <Button type="button" size="sm" variant="outline" onClick={() => editor.dispatchCommand(FORMAT_TEXT_COMMAND, "bold")}>
        <Bold size={16} />
      </Button>
      <Button type="button" size="sm" variant="outline" onClick={() => editor.dispatchCommand(FORMAT_TEXT_COMMAND, "italic")}>
        <Italic size={16} />
      </Button>
      <Button type="button" size="sm" variant="outline" onClick={() => editor.dispatchCommand(FORMAT_TEXT_COMMAND, "underline")}>
        <Underline size={16} />
      </Button>
      <Button type="button" size="sm" variant="outline" onClick={() => editor.dispatchCommand(FORMAT_TEXT_COMMAND, "strikethrough")}>
        <Strikethrough size={16} />
      </Button>
      <Button type="button" size="sm" variant="outline" onClick={() => editor.dispatchCommand(INSERT_UNORDERED_LIST_COMMAND, undefined)}>
        <List size={16} />
      </Button>
      <Button type="button" size="sm" variant="outline" onClick={() => editor.dispatchCommand(INSERT_ORDERED_LIST_COMMAND, undefined)}>
        <ListOrdered size={16} />
      </Button>
      <Button type="button" size="sm" variant="outline" onClick={() => editor.dispatchCommand(INSERT_HORIZONTAL_RULE_COMMAND, undefined)}>
        <Minus size={16} />
      </Button>
      <Button type="button" size="sm" variant="outline" onClick={() => editor.dispatchCommand(INSERT_TABLE_COMMAND, { rows: "3", columns: "3" })}>
        <Table size={16} />
      </Button>
      </div>
    );
}
