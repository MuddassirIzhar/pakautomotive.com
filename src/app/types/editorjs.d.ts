declare module "@editorjs/checklist" {
  import { BlockToolConstructable } from "@editorjs/editorjs";
  const Checklist: BlockToolConstructable;
  export default Checklist;
}

declare module "@editorjs/link" {
  import { BlockToolConstructable } from "@editorjs/editorjs";
  const LinkTool: BlockToolConstructable;
  export default LinkTool;
}

declare module "@editorjs/embed" {
  import { BlockToolConstructable } from "@editorjs/editorjs";
  const Embed: BlockToolConstructable;
  export default Embed;
}
declare module "@editorjs/marker" {
  import { InlineToolConstructable } from "@editorjs/editorjs";
  const Marker: InlineToolConstructable;
  export default Marker;
}
import { TableNode } from 'lexical';

declare module "@lexical/table" {
  interface TableNode {
    setFrozenColumns(value: number): void;
    getFrozenColumns(): number;
  }

  interface TableCellNode {
    setVerticalAlign(align: "top" | "middle" | "bottom"): void;
  }
}
