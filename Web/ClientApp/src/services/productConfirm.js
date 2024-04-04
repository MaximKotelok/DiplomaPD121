import { getFromServer, postToServer } from "../utils/Queries";

export async function getAllProductConfirm(page = 1){
    return await postToServer(
        `ProductConfirm`,
        {
            productPerPage: 1,
            page: page
        }
        )
}
