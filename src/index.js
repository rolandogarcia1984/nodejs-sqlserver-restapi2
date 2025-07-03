import app from "./app.js";
import { PORT_MS } from "./config.js";

app.listen(PORT_MS);

console.log("Server on port", PORT_MS);