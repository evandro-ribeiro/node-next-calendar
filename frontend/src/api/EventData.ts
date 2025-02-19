import axios from "axios";

export async function SaveEvent(title: string, start: string, end: string) {
  await axios
    .post("http://localhost:8080/event", {
      title: title,
      start: start,
      end: end,
    })
    .then((res) => res.data)
    .catch((error) => console.log(error));
}

export async function GetAllEvents(id: number) {
  return await axios
    .get(`http://localhost:8080/event/${id}`)
    .then((res) => res.data)
    .catch((error) => console.log(error));
}

export async function RemoveEvent(id: number) {
  await axios
    .delete(`http://localhost:8080/event/${id}`)
    .then((res) => console.log(res.data))
    .catch((error) => console.log(error));
}

export async function EditEvent(
  title: string,
  start: string,
  end: string,
  id: string
) {
  await axios
    .put(`http://localhost:8080/event/${id}`, {
      title: title,
      start: start,
      end: end,
    })
    .then((res) => res.data)
    .catch((error) => console.log(error));
}
