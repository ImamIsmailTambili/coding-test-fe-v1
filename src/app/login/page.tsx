"use client";

import { useRouter } from "next/navigation";
import { useEffect, useState, type FormEvent } from "react";
import { Button } from "@/components/Button";
import { TextField } from "@/components/TextField";
import { DEMO_ACCOUNT, useAuth } from "@/context/AuthContext";
import { validateLogin, type LoginErrors } from "@/utils/processors";

export default function LoginPage() {
  const { email: session, ready, login } = useAuth();
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState<LoginErrors>({});
  const [formError, setFormError] = useState("");

  useEffect(() => {
    if (ready && session) router.replace("/products");
  }, [ready, session, router]);

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    const found = validateLogin(email, password);
    setErrors(found);
    setFormError("");
    if (Object.keys(found).length) return;
    if (login(email, password)) router.replace("/products");
    else setFormError("Email atau password salah.");
  };

  return (
    <div className="grid min-h-screen md:grid-cols-2">
      <section className="flex flex-col justify-end gap-3 bg-[#8B9A6E] px-6 py-8 md:p-16">
        <h1 className="max-w-sm text-[#F7F2EB] text-4xl lg:text-5xl font-bold leading-tight tracking-tight">
          Dashboard Admin
        </h1>
        <p className="text-[#EAE2D6]">
          Masuk untuk melihat data dari DummyJSON.
        </p>
      </section>
      <form
        className="grid w-full max-w-sm gap-4 self-center justify-self-center py-8"
        onSubmit={handleSubmit}
        noValidate
      >
        <h2 className="text-[#8B9A6E] text-2xl font-bold tracking-tight">
          Masuk
        </h2>
        {formError && (
          <p className="text-sm text-danger" role="alert">
            {formError}
          </p>
        )}
        <TextField
          label="Email"
          type="email"
          autoComplete="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          error={errors.email}
        />
        <TextField
          label="Password"
          type="password"
          autoComplete="current-password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          error={errors.password}
        />
        <Button className="bg-[#8B9A6E] text-[#F7F2EB]" type="submit">
          Masuk
        </Button>
        <p className="text-sm text-muted">
          Akun demo:{" "}
          <code className="rounded border border-line bg-surface px-1.5">
            {DEMO_ACCOUNT.email}
          </code>{" "}
          /{" "}
          <code className="rounded border border-line bg-surface px-1.5">
            {DEMO_ACCOUNT.password}
          </code>
        </p>
      </form>
    </div>
  );
}
