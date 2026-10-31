"use client";

import { useEffect, useRef, useState } from "react";
import { Check, Copy } from "lucide-react";

export function ProjectCodeBlock({
  code,
  language,
  filename,
}: {
  code: string;
  language?: string;
  filename?: string;
}) {
  const [copied, setCopied] = useState(false);
  const timer = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    return () => {
      if (timer.current) clearTimeout(timer.current);
    };
  }, []);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(code);
      setCopied(true);
      if (timer.current) clearTimeout(timer.current);
      timer.current = setTimeout(() => setCopied(false), 1500);
    } catch {
      // Clipboard access can fail in restricted browsers.
    }
  };

  const lines = code.split("\n");

  return (
    <div className="overflow-hidden rounded-xl border border-neutral-200/80 bg-neutral-950 dark:border-neutral-800/80">
      <div className="flex items-center justify-between gap-4 border-b border-white/10 px-4 py-2.5 font-mono text-[11px] text-neutral-400">
        <span className="min-w-0 truncate">{filename}</span>
        <div className="flex shrink-0 items-center gap-3">
          {language ? (
            <span className="rounded border border-white/10 bg-white/5 px-1.5 py-0.5 uppercase tracking-wider">
              {language}
            </span>
          ) : null}
          <button
            type="button"
            onClick={handleCopy}
            aria-label="Copy code"
            className="inline-flex items-center gap-1 rounded text-neutral-400 transition-colors hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand/50"
          >
            {copied ? (
              <Check className="h-3.5 w-3.5 text-brand" />
            ) : (
              <Copy className="h-3.5 w-3.5" />
            )}
            <span aria-live="polite">{copied ? "Copied" : "Copy"}</span>
          </button>
        </div>
      </div>
      <pre className="overflow-x-auto p-4 font-mono text-[13px] leading-relaxed text-neutral-100">
        <code>
          {lines.map((line, index) => (
            <span
              key={index}
              className="grid grid-cols-[2.5rem_1fr] gap-3 whitespace-pre"
            >
              <span
                aria-hidden="true"
                className="select-none text-right tabular-nums text-neutral-600"
              >
                {index + 1}
              </span>
              <span>{line || " "}</span>
            </span>
          ))}
        </code>
      </pre>
    </div>
  );
}
