import { CheckCircle2, XCircle } from "lucide-react";
import type { ToastType } from "../../types";

interface ToastNotificationProps {
  toasts: ToastType[];
  onRemove: (id: string) => void;
}

export function ToastNotification({
  toasts,
  onRemove,
}: ToastNotificationProps) {
  if (toasts.length === 0) return null;

  return (
    <div className="pointer-events-none fixed bottom-4 right-4 z-40 flex w-[360px] flex-col gap-2">
      {toasts.map((t) => (
        <div
          key={t.id}
          className={`pointer-events-auto flex items-start gap-2 rounded-xl border p-3 shadow ${
            t.type === "err"
              ? "border-red-500/40 bg-red-500/10"
              : "border-emerald-400/40 bg-emerald-400/10"
          }`}
        >
          {t.type === "err" ? (
            <XCircle className="mt-0.5 h-4 w-4 text-red-300" />
          ) : (
            <CheckCircle2 className="mt-0.5 h-4 w-4 text-emerald-300" />
          )}
          <div className="text-sm">{t.msg}</div>
          <button
            className="ml-auto text-xs opacity-70 hover:opacity-100"
            onClick={() => onRemove(t.id)}
          >
            dismiss
          </button>
        </div>
      ))}
    </div>
  );
}
