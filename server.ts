import { Application } from "https://deno.land/x/abc@v1.0.0-rc2/mod.ts";
import { ErrorMiddleware } from "./utils/handleError.ts";

import {
  getAllUsers,
  createUser,
  getUser,
  updateUser,
  deleteUser,
} from "./controllers/Users/index.ts";

import {
  getTasks,
  createTask,
} from "./controllers/Tasks/index.ts";

const app = new Application();

app.use(ErrorMiddleware);

app
  .get("/users", getAllUsers)
  .post("/users", createUser)
  .get("/user/:id", getUser)
  .put("/user/:id", updateUser)
  .delete("/user/:id", deleteUser)
  .get("/tasks", getTasks)
  .post("/newTask", createTask)
  .start({ port: 4000 });

console.log(`server listening on http://localhost:4000`);
