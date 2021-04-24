import { http, io } from "./http";
import "./websocket/client";

http.listen(3333, () => console.log("Server is running on port 3333"));

/*
GET
POST
PUT => change all fields
PATCH => change an specific field
DELETE
*/
