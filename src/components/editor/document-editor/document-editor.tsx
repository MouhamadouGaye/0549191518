// // "use client";

// // import { useEffect, useState } from "react";
// // import { EditorContent } from "@tiptap/react";

// // import styles from "./document-editor.module.css";
// // import { useDocumentEditor } from "../editor-config";
// // import { usePagination } from "@/src/features/pagination/use-pagination";
// // import { mmToPx } from "@/src/lib/utils/utils";
// // import {
// //   PAGE_CONTENT_HEIGHT,
// //   PAGE_DIMENSIONS,
// // } from "@/src/features/pagination/page-dimensions";
// // import { EditorToolbar } from "../editor-toolbar/editor-toolbar";
// // import { EditorPage } from "../editor-page/editor-page";
// // import { PageSeparators } from "../page-separator/page-separator";
// // import { PaginationLayout } from "../pagination-layout/pagination.layout";

// // export function DocumentEditor() {
// //   const editor = useDocumentEditor();

// //   const [editorElement, setEditorElement] = useState<HTMLElement | null>(null);

// //   useEffect(() => {
// //     if (!editor) {
// //       return;
// //     }

// //     setEditorElement(editor.view.dom);
// //   }, [editor]);

// //   const pagination = usePagination(editor, editorElement);

// //   if (!editor) {
// //     return null;
// //   }

// //   const pageContentHeight = mmToPx(PAGE_CONTENT_HEIGHT);

// //   const pageStep =
// //     mmToPx(PAGE_DIMENSIONS.marginTop) +
// //     pageContentHeight +
// //     mmToPx(PAGE_DIMENSIONS.marginBottom);

// //   const pageCount = pagination?.pages.length ?? 1;

// //   return (
// //     <div className={styles.editor}>
// //       <EditorToolbar editor={editor} />

// //       <div className={styles.document}>
// //         {/* <EditorPage>
// //           <PageSeparators pageHeight={pageStep} pageCount={pageCount} />

// //           <EditorContent editor={editor} />
// //         </EditorPage> */}
// //         <PaginationLayout editor={editor} pageCount={pageCount}>
// //           <EditorContent editor={editor} />
// //         </PaginationLayout>
// //       </div>
// //     </div>
// //   );
// // }
// "use client";

// import { useEffect, useState } from "react";
// import { EditorContent } from "@tiptap/react";

// import styles from "./document-editor.module.css";

// import { useDocumentEditor } from "../editor-config";
// import { EditorToolbar } from "../editor-toolbar/editor-toolbar";
// import { EditorPage } from "../editor-page/editor-page";

// export function DocumentEditor() {
//   const editor = useDocumentEditor();

//   const [editorElement, setEditorElement] = useState<HTMLElement | null>(null);

//   useEffect(() => {
//     if (!editor) {
//       return;
//     }

//     setEditorElement(editor.view.dom);
//   }, [editor]);

//   if (!editor) {
//     return null;
//   }

//   return (
//     <div className={styles.editor}>
//       {" "}
//       <EditorToolbar editor={editor} />
//       <div className={styles.document}>
//         <EditorPage>
//           <EditorContent editor={editor} ref={setEditorElement} />
//         </EditorPage>
//       </div>
//     </div>
//   );
// }
"use client";

import { useState } from "react";
import { EditorContent } from "@tiptap/react";

import styles from "./document-editor.module.css";

import { useDocumentEditor } from "../editor-config";
import { EditorToolbar } from "../editor-toolbar/editor-toolbar";
import { EditorPage } from "../editor-page/editor-page";

import { usePagination } from "@/src/features/pagination/use-pagination";

export function DocumentEditor() {
  const editor = useDocumentEditor();

  const [editorElement, setEditorElement] = useState<HTMLElement | null>(null);

  const pagination = usePagination(editor, editorElement);

  if (!editor) {
    return null;
  }

  const pageCount = pagination?.pageCount ?? 1;

  return (
    <div className={styles.editor}>
      {" "}
      <EditorToolbar editor={editor} />
      <div className={styles.document}>
        <EditorPage>
          <EditorContent editor={editor} ref={setEditorElement} />
        </EditorPage>

        {Array.from({ length: pageCount - 1 }, (_, index) => (
          // <EditorPage key={index}>
          //   <div />
          // </EditorPage>
          <div key={index}>
            <div className={styles.pageGap} />

            <EditorPage>
              <div />
            </EditorPage>
          </div>
        ))}
      </div>
    </div>
  );
}
