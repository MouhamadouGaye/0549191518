"use client";

import { EditorContent } from "@tiptap/react";

import { EditorToolbar } from "./editor-toolbar";

import styles from "./document-editor.module.css";
import { useDocumentEditor } from "./editor-config";

export function DocumentEditor() {
  const editor = useDocumentEditor();

  if (!editor) {
    return null;
  }

  return (
    <div className={styles.editor}>
      <EditorToolbar editor={editor} />

      <div className={styles.content}>
        <EditorContent editor={editor} />
      </div>
    </div>
  );
}
