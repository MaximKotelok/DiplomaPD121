import { getFromServer } from "../utils/Queries";

export async function getAllProductConfirm(){
    return await getFromServer(
        `ProductConfirm`
        )
}
