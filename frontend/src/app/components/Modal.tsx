"use client";

import { EditEvent, RemoveEvent } from "@/api/EventData";
import React, { FormEvent, useState } from "react";
import { MouseEventHandler } from "react";

export default function ModalComponent({
  isOpen,
  close,
  title,
  start,
  end,
  id,
}: {
  isOpen: boolean;
  close: MouseEventHandler<HTMLButtonElement>;
  title: string;
  start: string;
  end: string;
  id: string;
}) {
  const [isEditable, setIsEditable] = useState(false);

  const handleDelete = async () => {
    // COLOCAR UMA OPÇÃO PARA CONFIRMAR SE DESEJA DELETAR O EVENTO
    await RemoveEvent(Number(id));
    setTimeout(() => {
      window.location.reload();
    }, 500);
  };

  const handleSubmitEditedEvent = async (event: FormEvent<HTMLFormElement>) => {
    const form = event.target as HTMLFormElement;

    const title = (form.elements.namedItem("title") as HTMLInputElement).value;
    const start = (form.elements.namedItem("start") as HTMLInputElement).value;
    const end = (form.elements.namedItem("end") as HTMLInputElement).value;

    await EditEvent(title, start, end, id);

    setTimeout(() => {
      window.location.reload();
    }, 500);
  };

  function formatDate(dateString: string) {
    const date = new Date(dateString);

    const day = String(date.getDate()).padStart(2, "0");
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const year = date.getFullYear();
    const hours = String(date.getHours()).padStart(2, "0");
    const minutes = String(date.getMinutes()).padStart(2, "0");

    return `${day}/${month}/${year} - ${hours}:${minutes}h`;
  }

  if (isOpen && !isEditable) {
    return (
      <div className="fixed flex flex-col gap-4 size-96 p-10 mx-80 z-10 bg-slate-700 text-white">
        <h2 className="text-center">
          <b>Dados do Evento</b>
        </h2>
        <span>
          <b>Nome: </b> {title}
        </span>
        <span>
          <b>Data inicial: </b> {formatDate(start)}
        </span>
        <span>
          <b>Data final:</b> {formatDate(end)}
        </span>
        <span>
          <b>Identificador:</b> {id}
        </span>
        <div className="flex gap-6 justify-center pt-4">
          <button
            className="bg-neutral-400 py-2 px-4"
            onClick={() => setIsEditable(true)}
          >
            Editar
          </button>
          <button className="bg-red-400 py-2 px-4" onClick={handleDelete}>
            Deletar
          </button>
        </div>
        <button className="bg-slate-400 w-1/3 mx-auto p-1" onClick={close}>
          Fechar
        </button>
      </div>
    );
  }

  if (isOpen && isEditable) {
    return (
      <form
        className="fixed flex flex-col gap-4 size-96 mt-20 p-10 mx-80 z-10 bg-slate-700 text-white"
        onSubmit={(e) => handleSubmitEditedEvent(e)}
      >
        <h2 className="text-center">
          <b>Editar Evento</b>
        </h2>
        <label>
          <b>Nome: </b>
          <input type="text" name="title" className="text-gray-900 p-1" />
        </label>
        <label>
          <b>Data inicial: </b>{" "}
          <input
            type="datetime-local"
            name="start"
            className="text-gray-900 p-1"
          />
        </label>
        <label>
          <b>Data final:</b>{" "}
          <input
            type="datetime-local"
            name="end"
            className="text-gray-900 p-1"
          />
        </label>
        <div className="flex gap-6 justify-center pt-4">
          <button
            className="bg-slate-400 w-1/3 mx-auto p-1"
            onClick={() => setIsEditable(false)}
            type="button"
          >
            Cancelar
          </button>
          <button className="bg-neutral-400 w-1/3 mx-auto p-1" type="submit">
            Salvar
          </button>
        </div>
      </form>
    );
  }

  return null;
}
