import { Editor, useEditorState } from "@tiptap/react";
import { BubbleMenu } from "@tiptap/react/menus";
import {
  Bold,
  Code,
  Heading1,
  Heading2,
  HighlighterIcon,
  Italic,
  List,
  ListOrdered,
} from "lucide-react";
interface Props {
  editor: Editor | null;
}
export default function EditorBubbleMenu({ editor }: Props) {
  if (!editor) return null;
  const editorState = useEditorState({
    editor,
    selector: ({ editor }) => ({
      isH1: editor?.isActive("heading", { level: 1 }) ?? false,
      isH2: editor?.isActive("heading", { level: 2 }) ?? false,
      isBold: editor?.isActive("bold") ?? false,
      isItalic: editor?.isActive("italic") ?? false,
      isbullet: editor?.isActive("bulletList") ?? false,
      isOrdered: editor?.isActive("orderedList") ?? false,
      isSnippet: editor?.isActive("codeBlock") ?? false,
      ishighLighted: editor?.isActive("highlight") ?? false,
    }),
  });
  return (
    <BubbleMenu
      editor={editor}
      className="bg-white  shadow-lg flex gap-4 px-2 py-1 rounded-lg "
    >
      <button
        onClick={() => {
          editor.chain().focus().toggleHeading({ level: 1 }).run();
        }}
        className={`px-2 py-1 cursor-pointer rounded  ${editorState.isH1 ? "bg-[#00687A]/80 text-white " : "hover:bg-[#00687A]/10"}`}
      >
        <Heading1 />
      </button>
      <button
        onClick={() => {
          editor.chain().focus().toggleHeading({ level: 2 }).run();
        }}
        className={`px-2 py-1 cursor-pointer rounded  ${editorState.isH2 ? "bg-[#00687A]/80 text-white " : "hover:bg-[#00687A]/10"}`}
      >
        <Heading2 />
      </button>
      <button
        onClick={() => {
          editor.chain().focus().toggleBold().run();
        }}
        className={`px-2 py-1 cursor-pointer rounded  ${editorState.isBold ? "bg-[#00687A]/80 text-white " : "hover:bg-[#00687A]/10"}`}
      >
        <Bold />
      </button>
      <button
        onClick={() => {
          editor.chain().focus().toggleItalic().run();
        }}
        className={`px-2 py-1 cursor-pointer rounded  ${editorState.isItalic ? "bg-[#00687A]/80 text-white " : "hover:bg-[#00687A]/10"}`}
      >
        <Italic />
      </button>
      <button
        onClick={() => {
          editor.chain().focus().toggleHighlight().run();
        }}
        className={`px-2 py-1 cursor-pointer rounded  ${editorState.ishighLighted ? "bg-[#00687A]/80 text-white " : "hover:bg-[#00687A]/10"}`}
      >
        <HighlighterIcon />
      </button>
      <button
        onClick={() => {
          editor.chain().focus().toggleCodeBlock().run();
        }}
        className={`px-2 py-1 cursor-pointer rounded  ${editorState.isSnippet ? "bg-[#00687A]/80 text-white " : "hover:bg-[#00687A]/10"}`}
      >
        <Code />
      </button>
    </BubbleMenu>
  );
}
