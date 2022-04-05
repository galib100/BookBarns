import axios from "axios";

const BASE_URL = "http://localhost:5000/api/";
// const TOKEN = JSON.parse(JSON.parse(localStorage.getItem("persist:root")).user).currentUser.accessToken;
const TOKEN = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjYyM2JkY2I5MzJlNGQ2NjUxMWFlOWE1MSIsImlzQWRtaW4iOnRydWUsImlhdCI6MTY0ODI2MDk3MiwiZXhwIjoxNjQ4NTIwMTcyfQ.5fgUij4-SlWiNaEjZ-IsStNA5CZvhfSKjSbRX07rM-I'
export const publicRequest = axios.create({
  baseURL: BASE_URL,
});

export const userRequest = axios.create({
  baseURL: BASE_URL,
  headers: { token: `Bearer ${TOKEN}` },
});
