import { http } from "./http";
import "./websocket/client";

// Defining the port that server is running
http.listen(3333, () => console.log("Server is running on port 3333"));