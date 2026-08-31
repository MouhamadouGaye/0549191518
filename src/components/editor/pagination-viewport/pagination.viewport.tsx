// "use client";

// import { useEditor } from "@tiptap/react";

// import StarterKit from "@tiptap/starter-kit";
// import Placeholder from "@tiptap/extension-placeholder";
// import TextAlign from "@tiptap/extension-text-align";
// import Link from "@tiptap/extension-link";
// import Underline from "@tiptap/extension-underline";

// export function useDocumentEditor() {
//   return useEditor({
//     immediatelyRender: false,

//     extensions: [
//       StarterKit,

//       Underline,

//       TextAlign.configure({
//         types: ["heading", "paragraph"],
//       }),

//       Link.configure({
//         openOnClick: false,
//         autolink: true,
//         linkOnPaste: true,
//       }),

//       Placeholder.configure({
//         placeholder: "Commencez à écrire...",
//       }),
//     ],

//     content: {
//       type: "doc",

//       content: [
//         {
//           type: "heading",

//           attrs: {
//             textAlign: null,
//             level: 1,
//           },

//           content: [
//             {
//               type: "text",
//               text: "Mon document",
//             },
//           ],
//         },

//         ...Array.from({ length: 40 }, (_, index) => ({
//           type: "paragraph",

//           content: [
//             {
//               type: "text",

//               text: `Ceci est le paragraphe ${
//                 index + 1
//               }. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.`,
//             },
//           ],
//         })),
//       ],
//     },
//   });
// }
"use client";

import type { Editor } from "@tiptap/react";
import { EditorContent } from "@tiptap/react";

import styles from "./pagination-viewport.module.css";

type PaginationViewportProps = {
  editor: Editor;
  pageIndex: number;
  pageHeight: number;
};

export function PaginationViewport({
  editor,
  pageIndex,
  pageHeight,
}: PaginationViewportProps) {
  return (
    <div
      className={styles.viewport}
      style={{
        height: pageHeight,
      }}
    >
      <div
        className={styles.content}
        style={{
          transform: `translateY(-${pageIndex * pageHeight}px)`,
        }}
      >
        {" "}
        <EditorContent editor={editor} />{" "}
      </div>{" "}
    </div>
  );
}
