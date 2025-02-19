"use client";

import { EventClickArg } from "@fullcalendar/core";
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import interactionPlugin, { DateClickArg } from "@fullcalendar/interaction";
import brLocale from "@fullcalendar/core/locales/pt-br";
import { GetAllEvents } from "@/api/EventData";
import { useState } from "react";
import ModalComponent from "./Modal";

export type EventType = {
  event_name: string;
  event_start_date: string;
  event_end_date: string;
  event_id: number;
};

export default function Calendar({ idClient }: { idClient: number }) {
  const [modalIsOpen, setIsOpen] = useState(false);
  const [selectedEvent, setSelectedEvent] = useState<{
    title: string;
    start: string;
    end: string;
    id: string;
  } | null>(null);

  const handleDateClick = async (arg: DateClickArg) => {
    alert(arg.dateStr);
  };

  const getEventList = async () => {
    const eventList: Array<EventType> = await GetAllEvents(idClient);
    return eventList.map((item) => {
      return {
        title: item.event_name,
        start: item.event_start_date,
        end: item.event_end_date,
        id: item.event_id,
      };
    });
  };

  const handleEventClick = (arg: EventClickArg) => {
    setSelectedEvent({
      title: arg.event.title,
      start: arg.event.start?.toISOString() || "",
      end: arg.event.end?.toISOString() || "",
      id: arg.event.id,
    });
  };

  return (
    <div className="w-3/4 bg-white p-3 rounded-md">
      {selectedEvent && (
        <ModalComponent
          isOpen={modalIsOpen}
          close={() => setIsOpen(false)}
          title={selectedEvent.title}
          start={selectedEvent.start}
          end={selectedEvent.end}
          id={selectedEvent.id}
        />
      )}
      <FullCalendar
        locale={brLocale}
        plugins={[dayGridPlugin, interactionPlugin]}
        initialView="dayGridMonth"
        headerToolbar={{
          left: "prev next today",
          center: "title",
          right: "dayGridMonth dayGridWeek dayGridDay",
        }}
        dateClick={handleDateClick}
        nowIndicator={true}
        editable={true}
        selectable={true}
        selectMirror={true}
        // EXEMPLO DE EVENTO INICIAL
        initialEvents={[
          { title: "nice event", start: new Date(), resourceId: "a" },
        ]}
        height={"auto"}
        eventClick={(arg: EventClickArg) => {
          // ABRIR MODAL QUANDO CLICA NO EVENTO
          setIsOpen(true);
          handleEventClick(arg);
        }}
        events={() => getEventList()}
      />
    </div>
  );
}
