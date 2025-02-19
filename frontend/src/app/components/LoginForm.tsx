"use client";

import { FormEvent } from "react";
import { signIn } from "next-auth/react";
import { useSearchParams } from "next/navigation";

export default function LoginFormComponent() {
  const searchParams = useSearchParams();

  const error = searchParams.get("error");

  async function login(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);

    const data = {
      email: formData.get("email"),
      password: formData.get("password"),
    };

    signIn("credentials", {
      ...data,
      callbackUrl: "/calendar",
    });
  }
  return (
    <div className="h-screen flex justify-center items-center bg-slate-600">
      <form
        className="flex flex-col gap-4 items-center bg-slate-100 size-96 p-10"
        onSubmit={login}
      >
        <h2 className="text-xl">Faça seu login</h2>
        <input
          type="email"
          name="email"
          className="px-3 py-2 w-full mt-3"
          placeholder="Email"
        />
        <input
          type="password"
          name="password"
          className="px-3 py-2 w-full"
          placeholder="Senha"
        />
        {error === "CredentialsSignin" && (
          <span className="text-red-500">
            Erro no login. Verifique seus dados.
          </span>
        )}
        <button
          type="submit"
          className="mt-7 bg-slate-800 py-2 px-5 text-white font-bold"
        >
          Login
        </button>
        <a href="/register">Quero me cadastrar</a>
      </form>
    </div>
  );
}
