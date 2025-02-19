import AddEventForm from "@/app/components/AddEventForm";
import Calendar from "@/app/components/Calendar";
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import { GetUserId } from "@/api/UserData";
import Navbar from "../components/Navbar";

export default async function UserCalendar() {
  const session = await getServerSession();

  if (!session) {
    redirect("/");
  }

  let idObject = { id: 0 };

  if (session.user?.email) {
    idObject = await GetUserId(session.user?.email);
  }

  return (
    <section className="bg-slate-100 flex flex-col items-center gap-6 mx-auto pb-10">
      <Navbar />
      <Calendar idClient={idObject.id} />
      <AddEventForm />
    </section>
  );
}
