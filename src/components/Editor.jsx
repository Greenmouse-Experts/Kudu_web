import React from "react";
import { Editor, RichUtils, EditorState, Modifier } from "draft-js";
import "draft-js/dist/Draft.css";
import {
  Bold,
  Italic,
  Underline,
  Strikethrough,
  Code,
  Heading1,
  Heading2,
  Quote,
  List,
  ListOrdered,
  Code2,
  AlignLeft,
  AlignCenter,
  AlignRight,
  Link,
  Link2Off,
  Undo,
  Redo,
} from "lucide-react";

const DraftEditor = ({ editorState, setEditorState }) => {
  // Handle inline styles (Bold, Italic, etc.)
  const handleInlineStyle = (style) => {
    setEditorState(RichUtils.toggleInlineStyle(editorState, style));
  };

  // Handle block types (Headings, Lists, Quotes)
  const handleBlockStyle = (blockType) => {
    setEditorState(RichUtils.toggleBlockType(editorState, blockType));
  };

  // Handle adding links
  const addLink = () => {
    const url = prompt("Enter URL:");
    if (!url) return;
    const selection = editorState.getSelection();
    const contentState = editorState.getCurrentContent();
    const contentWithEntity = contentState.createEntity("LINK", "MUTABLE", { url });
    const entityKey = contentWithEntity.getLastCreatedEntityKey();
    const newContentState = Modifier.applyEntity(contentWithEntity, selection, entityKey);
    setEditorState(EditorState.push(editorState, newContentState, "apply-entity"));
  };

  // Handle removing links
  const removeLink = () => {
    const selection = editorState.getSelection();
    if (!selection.isCollapsed()) {
      setEditorState(RichUtils.toggleLink(editorState, selection, null));
    }
  };

  return (
    <div className="border p-4 rounded-md shadow-md w-full mx-auto">
      {/* Toolbar */}
      <div className="flex flex-wrap gap-2 mb-2 border-b pb-2">
        {/* Formatting */}
        <span onClick={() => handleInlineStyle("BOLD")} className="btn"><Bold size={18} /></span>
        <span onClick={() => handleInlineStyle("ITALIC")} className="btn"><Italic size={18} /></span>
        <span onClick={() => handleInlineStyle("UNDERLINE")} className="btn"><Underline size={18} /></span>
        <span onClick={() => handleInlineStyle("STRIKETHROUGH")} className="btn"><Strikethrough size={18} /></span>
        <span onClick={() => handleInlineStyle("CODE")} className="btn"><Code size={18} /></span>

        {/* Headings & Blocks */}
        <span onClick={() => handleBlockStyle("header-one")} className="btn"><Heading1 size={18} /></span>
        <span onClick={() => handleBlockStyle("header-two")} className="btn"><Heading2 size={18} /></span>
        <span onClick={() => handleBlockStyle("blockquote")} className="btn"><Quote size={18} /></span>
        <span onClick={() => handleBlockStyle("unordered-list-item")} className="btn"><List size={18} /></span>
        <span onClick={() => handleBlockStyle("ordered-list-item")} className="btn"><ListOrdered size={18} /></span>
        <span onClick={() => handleBlockStyle("code-block")} className="btn"><Code2 size={18} /></span>

        {/* Text Alignment */}
        <span onClick={() => handleBlockStyle("align-left")} className="btn"><AlignLeft size={18} /></span>
        <span onClick={() => handleBlockStyle("align-center")} className="btn"><AlignCenter size={18} /></span>
        <span onClick={() => handleBlockStyle("align-right")} className="btn"><AlignRight size={18} /></span>

        {/* Links */}
        <span onClick={addLink} className="btn"><Link size={18} /></span>
        <span onClick={removeLink} className="btn"><Link2Off size={18} /></span>

        {/* Undo / Redo */}
        <span onClick={() => setEditorState(EditorState.undo(editorState))} className="btn"><Undo size={18} /></span>
        <span onClick={() => setEditorState(EditorState.redo(editorState))} className="btn"><Redo size={18} /></span>
      </div>

      {/* Editor */}
      <div className="border p-2 min-h-[200px] bg-gray-50">
        <Editor editorState={editorState} onChange={setEditorState} />
      </div>
    </div>
  );
};

export default DraftEditor;
