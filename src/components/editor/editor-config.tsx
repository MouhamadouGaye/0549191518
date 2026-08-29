// "use client";

// // import { useEditor } from "@tiptap/react";
// // import StarterKit from "@tiptap/starter-kit";
// // import Placeholder from "@tiptap/extension-placeholder";
// // import TextAlign from "@tiptap/extension-text-align";
// // import Link from "@tiptap/extension-link";
// // import Underline from "@tiptap/extension-underline";

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
//         {
//           type: "paragraph",
//           content: [
//             {
//               type: "text",
//               text: "Commencez à écrire votre document ici...",
//             },
//           ],
//         },
//       ],
//     },
//   });
// }
// ("use client");

import { useEditor } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import Placeholder from "@tiptap/extension-placeholder";
import TextAlign from "@tiptap/extension-text-align";
import Link from "@tiptap/extension-link";
import Underline from "@tiptap/extension-underline";

export function useDocumentEditor() {
  return useEditor({
    immediatelyRender: false,

    extensions: [
      StarterKit,

      Underline,

      TextAlign.configure({
        types: ["heading", "paragraph"],
      }),

      Link.configure({
        openOnClick: false,
        autolink: true,
        linkOnPaste: true,
      }),

      Placeholder.configure({
        placeholder: "Commencez à écrire...",
      }),
    ],

    content: {
      type: "doc",
      content: [
        {
          type: "heading",
          attrs: {
            textAlign: null,
            level: 1,
          },
          content: [
            {
              type: "text",
              text: "Mon document",
            },
          ],
        },
        {
          type: "paragraph",
          content: [
            {
              type: "text",
              text: "Commencez à écrire votre document ici...",
            },
          ],
        },
      ],
    },
  });
}
