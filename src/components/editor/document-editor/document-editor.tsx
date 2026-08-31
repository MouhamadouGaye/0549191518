"use client";

import { useState } from "react";

import styles from "./document-editor.module.css";

import { useDocumentEditor } from "../editor-config";
import { EditorToolbar } from "../editor-toolbar/editor-toolbar";

import { usePagination } from "@/src/features/pagination/use-pagination";
import { mmToPx } from "@/src/lib/utils/utils";
import {
  PAGE_CONTENT_HEIGHT,
  PAGE_DIMENSIONS,
} from "@/src/features/pagination/page-dimensions";
import { PaginationSurface } from "@/src/features/pagination-surface/pagination.surface";

export function DocumentEditor() {
  const editor = useDocumentEditor();

  const [editorElement, setEditorElement] = useState<HTMLElement | null>(null);

  const pagination = usePagination(editor, editorElement);

  if (!editor) {
    return null;
  }

  // const pageCount = pagination?.pageCount ?? 1;

  const pageHeight = mmToPx(PAGE_DIMENSIONS.height);
  const contentHeight = mmToPx(PAGE_CONTENT_HEIGHT);

  return (
    <div className={styles.editor}>
      {" "}
      <EditorToolbar editor={editor} />
      <div className={styles.document}>
        {/* {pagination ? (
          <PaginationSurface
            editor={editor}
            pageCount={pagination.pageCount}
            pageHeight={pageHeight}
            onEditorElement={setEditorElement}
          />
        ) : null} */}
        <PaginationSurface
          editor={editor}
          pageCount={pagination?.pageCount ?? 1}
          pageHeight={pageHeight}
          contentHeight={contentHeight}
          onEditorElement={setEditorElement}
        />
      </div>
    </div>
  );
}
