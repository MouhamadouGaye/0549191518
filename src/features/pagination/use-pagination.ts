"use client";

import { useEffect } from "react";

import type { Editor } from "@tiptap/react";

import { PaginationEngine } from "./pagination-engine";

export function usePagination(editor: Editor | null) {
  useEffect(() => {
    if (!editor) {
      return;
    }

    const engine = new PaginationEngine();

    const measure = () => {
      const element = document.querySelector(".ProseMirror");

      if (!(element instanceof HTMLElement)) {
        return;
      }

      const styles = window.getComputedStyle(element);

      const lineHeight = Number.parseFloat(styles.lineHeight);

      const availableHeight = element.clientHeight || lineHeight;

      const result = engine.measure(element, availableHeight);

      if (result.hasOverflow) {
        console.log("PAGE OVERFLOW", result);
      }
    };

    measure();

    editor.on("update", measure);

    return () => {
      editor.off("update", measure);
    };
  }, [editor]);
}
