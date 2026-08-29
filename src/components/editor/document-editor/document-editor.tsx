"use client";

import { EditorContent } from "@tiptap/react";

import { EditorToolbar } from "../editor-toolbar/editor-toolbar";

import styles from "./document-editor.module.css";
import { useDocumentEditor } from "../editor-config";
import { EditorPage } from "../editor-page/editor-page";

export function DocumentEditor() {
  const editor = useDocumentEditor();

  if (!editor) {
    return null;
  }

  return (
    <div className={styles.editor}>
      <EditorToolbar editor={editor} />

      <EditorPage>
        <EditorContent editor={editor} />
      </EditorPage>
    </div>
  );
}
