"use client";

import { EditorContent } from "@tiptap/react";

import styles from "./pagination-view.module.css";
import { EditorPage } from "../editor-page/editor-page";

type PaginationViewProps = {
  editor: Parameters<typeof EditorContent>[0]["editor"];
  pageCount: number;
};

export function PaginationView({ editor, pageCount }: PaginationViewProps) {
  const pages = Math.max(1, pageCount);

  return (
    <div className={styles.document}>
      {Array.from({ length: pages }, (_, index) => (
        <div key={index} className={styles.pageGroup}>
          <EditorPage>
            {index === 0 && <EditorContent editor={editor} />}
          </EditorPage>

          {index < pages - 1 && (
            <div className={styles.separator} aria-hidden="true" />
          )}
        </div>
      ))}
    </div>
  );
}
