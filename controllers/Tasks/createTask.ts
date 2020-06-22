import {
  HandlerFunc,
  Context,
} from "https://deno.land/x/abc@v1.0.0-rc2/mod.ts";

import connectionDatabase from "../../database/connection.ts";
import { ErrorHandler } from "../../utils/handleError.ts";

const database = connectionDatabase.findDatabase;
const tasks = database.collection("tasks");

export const createTask: HandlerFunc = async (data: Context) => {
  try {
    if (data.request.headers.get("content-type") !== "application/json") {
      throw new ErrorHandler("Body invalido", 422);
    }
    const body = await data.body();

    console.log("body :>> ", body);
    if (!Object.keys(body).length) {
      throw new ErrorHandler("O body não pode estar vazio!!", 400);
    }
    const { title, description, user_id } = body;

    const response = await tasks.insertOne({
      title,
      description,
      user_id,
    });

    return data.json({message: "Tarefa cadastrado com sucesso", response}, 201);
  } catch (error) {
    throw new ErrorHandler(error.message, error.status || 500);
  }
};
