"use client";

import { SaveUser } from "@/api/UserData";
import Link from "next/link";
import { redirect } from "next/navigation";
import { FormEvent } from "react";

export default function UserRegister() {
  async function register(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    const data = {
      name: formData.get("name")?.toString() ?? "",
      email: formData.get("email")?.toString() ?? "",
      password: formData.get("password")?.toString() ?? "",
    };

    await SaveUser(data.name, data.email, data.password);

    redirect("/");
  }

  return (
    <div className="h-screen flex justify-center items-center bg-slate-600">
      <form
        className="flex flex-col gap-2 items-center bg-slate-100 size-96 p-10"
        onSubmit={register}
      >
        <h2 className="text-xl mb-4">Faça o seu cadastro</h2>
        <input
          type="text"
          name="name"
          className="px-3 py-2 w-full"
          placeholder="Nome"
        />
        <input
          type="email"
          name="email"
          className="px-3 py-2 w-full"
          placeholder="Email"
        />
        <input
          type="password"
          name="password"
          className="px-3 py-2 w-full"
          placeholder="Senha"
        />
        <button
          type="submit"
          className="bg-slate-800 py-2 px-5 mt-3 text-white font-bold"
        >
          Cadastrar
        </button>
        <Link href="/" className="border-2 p-2">
          Voltar para a página inicial
        </Link>
      </form>
    </div>
  );
}
