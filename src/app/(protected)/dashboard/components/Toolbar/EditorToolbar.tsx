import {
  Bold,
  Code,
  Heading1,
  Heading2,
  HighlighterIcon,
  Image,
  Italic,
  Link,
  List,
  ListOrdered,
  Plus,
} from "lucide-react";
import { Editor, useEditorState } from "@tiptap/react";
import { useRef, useState } from "react";
interface Props {
  editor: Editor | null;
}
export default function EditorToolBar({ editor }: Props) {
  const fileInputRef = useRef<HTMLInputElement>(null);
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
  }) ?? {
    isH1: false,
    isH2: false,
    isBold: false,
    isItalic: false,
    isbullet: false,
    isOrdered: false,
    isSnippet: false,
    ishighLighted: false,
  };
  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const formData = new FormData();
    formData.append("file", file);
    const res = await fetch("/api/uploads", {
      method: "POST",
      body: formData,
    });
    const data = await res.json();
    editor
      ?.chain()
      .focus()
      .setImage({
        src: data.url,
      })
      .run();
    e.target.value = "";
  };
  const [showLinkInput, setShowLinkInput] = useState(false);
  const [link, setLink] = useState("");

  return (
    <div className="flex flex-row overflow-x-scroll sm:overflow-hidden bg-white px-2 shadow-lg rounded-lg items-start gap-4 py-2">
      <button
        type="button"
        className={`px-2 py-1 cursor-pointer rounded  ${editorState.isH1 ? "bg-[#00687A]/80 text-white " : "hover:bg-[#00687A]/10"}`}
        onClick={(e) => {
          e.preventDefault();
          editor?.chain().focus().toggleHeading({ level: 1 }).run();
        }}
      >
        <Heading1 />
      </button>
      <button
        type="button"
        className={`px-2 py-1 cursor-pointer rounded ${editorState.isH2 ? "bg-[#00687A]/80 text-white" : "hover:bg-[#00687A]/10"}`}
        onClick={(e) => {
          e.preventDefault();
          editor?.chain().focus().toggleHeading({ level: 2 }).run();
        }}
      >
        <Heading2 />
      </button>
      <button
        type="button"
        className={`px-2 py-1 cursor-pointer rounded  ${editorState.isBold ? "bg-[#00687A]/80 text-white" : "hover:bg-[#00687A]/10"} `}
        onClick={(e) => {
          e.preventDefault();
          editor?.chain().focus().toggleBold().run();
        }}
      >
        <Bold />
      </button>
      <button
        type="button"
        className={`px-2 py-1 cursor-pointer rounded ${editorState.isItalic ? "bg-[#00687A]/80 text-white" : "hover:bg-[#00687A]/10"}`}
        onClick={(e) => { e.preventDefault(); editor?.chain().focus().toggleItalic().run(); }}
      >
        <Italic />
      </button>
      <button
        type="button"
        className={`px-2 py-1 cursor-pointer rounded ${editorState.isbullet ? "bg-[#00687A]/80 text-white" : "hover:bg-[#00697A]/10"}`}
        onClick={(e) => { e.preventDefault(); editor?.chain().focus().toggleBulletList().run(); }}
      >
        <List />
      </button>
      <button
        type="button"
        className={`px-2 py-1 cursor-pointer rounded ${editorState.isOrdered ? "bg-[#00687A]/80 text-white" : "hover:bg-[#00687A]/10"}`}
        onClick={(e) => { e.preventDefault(); editor?.chain().focus().toggleOrderedList().run(); }}
      >
        <ListOrdered />
      </button>
      <button
        type="button"
        className={`px-2 py-1 cursor-pointer rounded ${editorState.isSnippet ? "bg-[#00687A]/80 text-white" : "hover:bg-[#00687A]/10"}`}
        onClick={(e) => { e.preventDefault(); editor?.chain().focus().toggleCodeBlock().run(); }}
      >
        <Code />
      </button>
      <button
        type="button"
        className={`px-2 py-1 cursor-pointer rounded ${editorState.ishighLighted ? "bg-[#00687A]/80 text-white" : "hover:bg-[#00687A]/10"}`}
        onClick={(e) => { e.preventDefault(); editor?.chain().focus().toggleHighlight().run(); }}
      >
        <HighlighterIcon />
      </button>
      <div>
        <input
          ref={fileInputRef}
          type="file"
          accept="image/*"
          className="hidden"
          onChange={handleImageUpload}
        />
      </div>
      <button
        type="button"
        onClick={(e) => { e.preventDefault(); fileInputRef.current?.click(); }}
        className={`px-2 py-1 cursor-pointer rounded hover:bg-[#00687A]/40 `}
      >
        <Image />
      </button>
      <div className="relative hidden">
        <button
          type="button"
          onClick={(e) => { e.preventDefault(); setShowLinkInput((prev) => !prev); }}
          className={`px-2 py-1 cursor-pointer rounded hover:bg-[#00687A]/40`}
        >
          <Link />
        </button>
        {showLinkInput && (
          <div className="absolute top-full left-0 mt-2 bg-white shadow-lg border rounded-lg p-3 flex gap-2 z-50">
            <input
              autoFocus
              className="border rounded px-2 py-1 outline-none"
              type="url"
              placeholder="https://example.com"
              value={link}
              onChange={(e) => setLink(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === "Enter") {
                  e.preventDefault();
                  if (!link) return;
                  editor?.chain().focus().setLink({ href: link }).run();
                  setLink("");
                  setShowLinkInput(false);
                }
                if (e.key === "Escape") {
                  setShowLinkInput(false);
                  setLink("");
                }
              }}
            />
            <button
              type="button"
              className="bg-[#00687A] text-white px-3 rounded"
              onClick={() => {
                if (!link) return;
                editor?.chain().focus().setLink({ href: link }).run();
                setLink("");
                setShowLinkInput(false);
              }}
            >
              <Plus />
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
