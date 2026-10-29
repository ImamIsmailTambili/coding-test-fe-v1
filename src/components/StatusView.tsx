import type { ReactNode } from "react";
import { Button } from "./Button";

interface Props {
  loading: boolean;
  error: string | null;
  isEmpty: boolean;
  emptyTitle?: string;
  emptyHint?: string;
  onRetry?: () => void;
  children: ReactNode;
}

export function Spinner() {
  return (
    <span
      aria-hidden="true"
      className="h-7 w-7 animate-spin rounded-full border-[3px] border-line border-t-accent motion-reduce:animate-none"
    />
  );
}

const box = "grid justify-items-center gap-2 px-4 py-16 text-center text-muted";
const title = "text-lg font-bold text-ink";

/** Satu tempat untuk menangani state loading, error, dan data kosong. */
export function StatusView({
  loading,
  error,
  isEmpty,
  emptyTitle = "Belum ada data",
  emptyHint,
  onRetry,
  children,
}: Props) {
  if (loading) {
    return (
      <div className={box} role="status" aria-live="polite">
        <Spinner />
        <p>Memuat data…</p>
      </div>
    );
  }
  if (error) {
    return (
      <div className={box} role="alert">
        <p className={`${title} text-danger`}>Data gagal dimuat</p>
        <p>{error}</p>
        {onRetry && (
          <Button variant="ghost" onClick={onRetry}>
            Coba lagi
          </Button>
        )}
      </div>
    );
  }
  if (isEmpty) {
    return (
      <div className={box}>
        <p className={title}>{emptyTitle}</p>
        {emptyHint && <p>{emptyHint}</p>}
      </div>
    );
  }
  return <>{children}</>;
}
