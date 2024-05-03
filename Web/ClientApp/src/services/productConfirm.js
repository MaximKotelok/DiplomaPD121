import { itemsPerPageForAdmin } from "../utils/Constants";
import { getFromServer, postToServer } from "../utils/Queries";

export async function getAllProductConfirm(page = 1, search = ""){
    return await postToServer(
        `ProductConfirm`,
        {
            itemsPerPage: itemsPerPageForAdmin,
            page: page,
            search: search
        }
        )
}
