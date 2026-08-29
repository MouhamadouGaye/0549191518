"use client";

import { EditorContent } from "@tiptap/react";

import { EditorToolbar } from "../editor-toolbar/editor-toolbar";

import styles from "./document-editor.module.css";
import { useDocumentEditor } from "../editor-config";
import { EditorPage } from "../editor-page/editor-page";
import { usePagination } from "@/src/features/pagination/use-pagination";
import { useState } from "react";

export function DocumentEditor() {
  const [editorElement, setEditorElement] = useState<HTMLElement | null>(null);
  const editor = useDocumentEditor();

  usePagination(editor, editorElement);

  if (!editor) {
    return null;
  }

  return (
    <div className={styles.editor}>
      <EditorToolbar editor={editor} />

      <EditorPage>
        <EditorContent
          editor={editor}
          ref={(element) => {
            setEditorElement(element);
          }}
        />
      </EditorPage>
    </div>
  );
}
