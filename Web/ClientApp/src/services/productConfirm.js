import { getFromServer, postToServer } from "../utils/Queries";

export async function getAllProductConfirm(page = 1, search = ""){
    return await postToServer(
        `ProductConfirm`,
        {
            itemsPerPage: 1,
            page: page,
            search: search
        }
        )
}
