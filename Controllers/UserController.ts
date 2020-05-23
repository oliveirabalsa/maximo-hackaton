import { IUser } from "../model/User";

const addUser = async (
    { request, response }: { request: any, response: any },
) => {
    const body = await request.body();
    const user: IUser = body.value;

    user.create_at = new Date();
    user.update_at = new Date();

    response.body = { message: "Usúario criado com sucesso!" };
    response.status = 200;
}

export { addUser };