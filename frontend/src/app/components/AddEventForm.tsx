"use client";

import { SaveEvent } from "@/api/EventData";
import { FormEvent } from "react";

export default function AddEventForm() {
  const handleClickBtn = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const form = event.target as HTMLFormElement;

    const title = (form.elements.namedItem("title") as HTMLInputElement).value;
    const start = (form.elements.namedItem("start") as HTMLInputElement).value;
    const end = (form.elements.namedItem("end") as HTMLInputElement).value;

    await SaveEvent(title, start, end);

    setTimeout(() => {
      window.location.reload();
    }, 1000);
  };

  return (
    <form
      className="flex gap-6 items-center"
      onSubmit={(e) => handleClickBtn(e)}
    >
      <label htmlFor="title">
        <b>Título:</b>{" "}
        <input
          type="text"
          placeholder="Digite o nome do evento"
          name="title"
          className="border-gray-200 border-2 py-1 px-4"
        />
      </label>
      <label htmlFor="start">
        <b>Data inicial:</b>{" "}
        <input
          type="datetime-local"
          placeholder="Digite a data inicial do evento"
          name="start"
          className="border-gray-200 border-2 p-1"
        />
      </label>
      <label htmlFor="end">
        <b>Data final:</b>{" "}
        <input
          type="datetime-local"
          placeholder="Digite a data final do evento"
          name="end"
          className="border-gray-200 border-2 p-1"
        />
      </label>
      <button className="bg-slate-300 p-2 rounded-md">Criar Evento</button>
    </form>
  );
}
