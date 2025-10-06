import { useState } from "react";
import type { ToastType } from "../types";

export function useToasts() {
  const [toasts, setToasts] = useState<ToastType[]>([]);

  const push = (msg: string, type?: "ok" | "err") =>
    setToasts((t: ToastType[]) => [
      ...t,
      { id: Math.random().toString(36).slice(2), msg, type },
    ]);

  const remove = (id: string) =>
    setToasts((t: ToastType[]) => t.filter((x: ToastType) => x.id !== id));

  return { toasts, push, remove };
}
