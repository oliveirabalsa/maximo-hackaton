import {
    HandlerFunc,
    Context, 
} from "https://deno.land/x/abc@v1.0.0-rc2/mod.ts";

import connectionDatabase from "../../database/connection.ts";
import { ErrorHandler } from "../../utils/handleError.ts";
import Tasks from '../../model/tasks.ts'

const database = connectionDatabase.findDatabase;
const tasks = database.collection("tasks");

export const getTasks: HandlerFunc = async (data: Context) => {
    try {
        const existTask: Tasks[] = await tasks.find();

        if (existTask) {
            const list = existTask.length
                ? existTask.map((item: any) => {
                    const { _id: { $oid }, title, description, user_id } = item;

                    console.log('item :>> ', item);
                    return { id: $oid, title, description, user_id };
                }) : [];

            return data.json(list, 200);
        }
    } catch (error) {
        throw new ErrorHandler(error.message, error.status || 500);
    }
};

