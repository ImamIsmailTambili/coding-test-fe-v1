"use client";

import { useRouter } from "next/navigation";
import { useEffect, type ReactNode } from "react";
import { Layout } from "@/components/Layout";
import { Spinner } from "@/components/StatusView";
import { useAuth } from "@/context/AuthContext";

/** Guard sisi client: halaman di grup (app) hanya untuk pengguna yang sudah login. */
export default function ProtectedLayout({ children }: { children: ReactNode }) {
  const { email, ready } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (ready && !email) router.replace("/login");
  }, [ready, email, router]);

  if (!ready || !email) {
    return (
      <div className="grid justify-items-center gap-2 px-4 py-24" role="status">
        <Spinner />
        <p>Memeriksa sesi…</p>
      </div>
    );
  }
  return <Layout>{children}</Layout>;
}
