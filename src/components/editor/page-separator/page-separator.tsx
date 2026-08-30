"use client";

import styles from "./page-separators.module.css";

type PageSeparatorsProps = {
  pageHeight: number;
  pageCount: number;
};

export function PageSeparators({ pageHeight, pageCount }: PageSeparatorsProps) {
  if (pageCount <= 1) {
    return null;
  }

  return (
    <div className={styles.container} aria-hidden="true">
      {Array.from({ length: pageCount - 1 }, (_, index) => (
        <div
          key={index}
          className={styles.separator}
          style={{
            top: `${pageHeight * (index + 1)}px`,
          }}
        />
      ))}
    </div>
  );
}
