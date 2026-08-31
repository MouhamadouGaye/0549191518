// // "use client";

// // import type { Editor } from "@tiptap/react";

// // import styles from "./pagination-layout.module.css";
// // import { EditorPage } from "../editor-page/editor-page";

// // type PaginationLayoutProps = {
// //   pageCount: number;
// //   children: React.ReactNode;
// // };

// // export function PaginationLayout({
// //   pageCount,
// //   children,
// // }: PaginationLayoutProps) {
// //   return (
// //     <div className={styles.document}>
// //       <EditorPage>{children}</EditorPage>

// //       {Array.from({ length: pageCount - 1 }, (_, index) => (
// //         <div key={index} className={styles.pageSeparator} />
// //       ))}

// //       {pageCount > 1 &&
// //         Array.from({ length: pageCount - 1 }, (_, index) => (
// //           <EditorPage key={`page-${index + 1}`}>
// //             <div />
// //           </EditorPage>
// //         ))}
// //     </div>
// //   );
// // }
// "use client";

// import type { ReactNode } from "react";

// import { EditorPage } from "../editor-page/editor-page";

// import styles from "./pagination-layout.module.css";
// import { PageGap } from "../page-gap/page.gap";

// type PaginationLayoutProps = {
//   pageCount: number;
//   children: ReactNode;
// };

// export function PaginationLayout({
//   pageCount,
//   children,
// }: PaginationLayoutProps) {
//   const visiblePageCount = Math.max(1, pageCount);

//   return (
//     <div className={styles.document}>
//       {Array.from({ length: visiblePageCount }, (_, index) => (
//         <div key={index} className={styles.pageGroup}>
//           {" "}
//           <EditorPage>{index === 0 && children} </EditorPage>
//           {index < visiblePageCount - 1 && <PageGap />}
//         </div>
//       ))}
//     </div>
//   );
// }
"use client";

import type { Editor } from "@tiptap/react";
import { EditorContent } from "@tiptap/react";

import { EditorPage } from "../editor-page/editor-page";

import styles from "./pagination-layout.module.css";
import { PageGap } from "../page-gap/page.gap";

type PaginationLayoutProps = {
  editor: Editor;
  pageCount: number;
};

export function PaginationLayout({ editor, pageCount }: PaginationLayoutProps) {
  const pages = Math.max(1, pageCount);

  return (
    <div className={styles.document}>
      {" "}
      <EditorPage>
        {" "}
        <div className={styles.source}>
          {" "}
          <EditorContent editor={editor} />{" "}
        </div>{" "}
      </EditorPage>
      {Array.from({ length: pages - 1 }, (_, index) => (
        <PageGap key={`gap-${index}`} />
      ))}
      {pages > 1 &&
        Array.from({ length: pages - 1 }, (_, index) => (
          <EditorPage key={`page-${index + 1}`}>
            <div />
          </EditorPage>
        ))}
    </div>
  );
}
