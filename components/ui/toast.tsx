"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useRef,
  useState,
  type ReactNode,
} from "react";
import { AnimatePresence, motion } from "framer-motion";
import { AlertCircle, CheckCircle2, Info, X } from "lucide-react";

import { cn } from "@/lib/utils";

type ToastVariant = "success" | "error" | "info";

type ToastOptions = {
  title: string;
  description?: string;
  variant?: ToastVariant;
  duration?: number;
};

type ToastItem = ToastOptions & {
  id: string;
  variant: ToastVariant;
};

type ToastContextValue = {
  toast: (options: ToastOptions) => string;
  dismiss: (id: string) => void;
};

const ToastContext = createContext<ToastContextValue | null>(null);

const icons = {
  success: CheckCircle2,
  error: AlertCircle,
  info: Info,
};

const tone = {
  success: "text-emerald-600 dark:text-emerald-400",
  error: "text-red-600 dark:text-red-400",
  info: "text-brand",
};

export function ToastProvider({ children }: { children: ReactNode }) {
  const [toasts, setToasts] = useState<ToastItem[]>([]);
  const timers = useRef(new Map<string, ReturnType<typeof setTimeout>>());

  const dismiss = useCallback((id: string) => {
    const timer = timers.current.get(id);

    if (timer) {
      clearTimeout(timer);
      timers.current.delete(id);
    }

    setToasts((current) => current.filter((item) => item.id !== id));
  }, []);

  const toast = useCallback(
    (options: ToastOptions) => {
      const id =
        typeof crypto !== "undefined" && "randomUUID" in crypto
          ? crypto.randomUUID()
          : `${Date.now()}-${Math.random().toString(36).slice(2)}`;
      const item: ToastItem = {
        ...options,
        id,
        variant: options.variant ?? "info",
      };

      setToasts((current) => [...current, item]);

      const duration = options.duration ?? 4000;

      if (duration > 0) {
        const timer = setTimeout(() => {
          timers.current.delete(id);
          dismiss(id);
        }, duration);

        timers.current.set(id, timer);
      }

      return id;
    },
    [dismiss],
  );

  useEffect(() => {
    const activeTimers = timers.current;

    return () => {
      activeTimers.forEach((timer) => clearTimeout(timer));
      activeTimers.clear();
    };
  }, []);

  const value = useMemo(() => ({ toast, dismiss }), [toast, dismiss]);

  return (
    <ToastContext.Provider value={value}>
      {children}

      <div className="pointer-events-none fixed right-4 bottom-4 z-[100] flex w-[calc(100vw-2rem)] max-w-md flex-col items-end gap-2 sm:right-6 sm:bottom-6">
        <AnimatePresence initial={false}>
          {toasts.map((item) => {
            const Icon = icons[item.variant];

            return (
              <motion.div
                key={item.id}
                layout
                initial={{ opacity: 0, y: 12, scale: 0.98 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: 8, scale: 0.98 }}
                transition={{ duration: 0.2, ease: "easeOut" }}
                role="status"
                aria-live="polite"
                className="pointer-events-auto flex w-full items-start gap-3 rounded-2xl border border-neutral-200/80 bg-white/80 p-3 pl-4 font-sans shadow-[0_8px_30px_rgb(0,0,0,0.04)] backdrop-blur-2xl transition-colors dark:border-neutral-800/80 dark:bg-neutral-950/80 dark:shadow-[0_8px_32px_rgb(0,0,0,0.4)]"
              >
                <Icon
                  className={cn("mt-0.5 h-4 w-4 shrink-0", tone[item.variant])}
                  aria-hidden="true"
                />

                <div className="min-w-0 flex-1">
                  <p className="text-sm font-medium tracking-tight text-neutral-950 dark:text-neutral-50">
                    {item.title}
                  </p>
                  {item.description ? (
                    <p className="mt-0.5 text-[13px] leading-relaxed text-neutral-600 dark:text-neutral-400">
                      {item.description}
                    </p>
                  ) : null}
                </div>

                <button
                  type="button"
                  onClick={() => dismiss(item.id)}
                  aria-label="Dismiss notification"
                  className="flex size-6 shrink-0 items-center justify-center rounded-full text-neutral-400 transition-colors hover:bg-neutral-100 hover:text-neutral-950 dark:text-neutral-500 dark:hover:bg-neutral-800 dark:hover:text-neutral-50"
                >
                  <X className="h-3.5 w-3.5" />
                </button>
              </motion.div>
            );
          })}
        </AnimatePresence>
      </div>
    </ToastContext.Provider>
  );
}

export function useToast() {
  const context = useContext(ToastContext);

  if (!context) {
    throw new Error("useToast must be used within ToastProvider");
  }

  return context;
}
