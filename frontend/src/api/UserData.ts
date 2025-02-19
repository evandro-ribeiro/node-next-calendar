import axios from "axios";

export async function SaveUser(name: string, email: string, password: string) {
  await axios
    .post("http://localhost:8080/user", {
      name: name,
      email: email,
      password: password,
    })
    .then((res) => console.log(res.data))
    .catch((error) => console.log(error));
}

export async function GetUser(email: string, password: string) {
  return axios
    .post("http://localhost:8080/user/login", {
      email: email,
      password: password,
    })
    .then((res) => res.data)
    .catch((error) => console.log(error));
}

export async function GetUserId(email: string) {
  return axios
    .get(`http://localhost:8080/user/${email}`)
    .then((res) => res.data)
    .catch((error) => console.log(error));
}
