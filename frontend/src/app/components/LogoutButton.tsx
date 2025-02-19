"use client";

import { signOut } from "next-auth/react";

export default function LogoutButton() {
  return (
    <button
      className="bg-cyan-700 py-2 px-4 m-2 text-white rounded-lg hover:bg-cyan-900"
      onClick={() => signOut()}
    >
      Sair
    </button>
  );
}
