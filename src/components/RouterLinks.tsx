// src/components/RouterLinks.tsx
import React from "react";

export function Link({
  href,
  className,
  children
}: {
  href: string;
  className?: string;
  children: React.ReactNode;
}) {
  return (
    <a
      href={"#" + href}
      className={className}
      onClick={(e) => {
        // default hash navigation works; nothing else required
      }}
    >
      {children}
    </a>
  );
}
