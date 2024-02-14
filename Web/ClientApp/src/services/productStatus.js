import { getFromServer } from "../utils/Queries";

export async function getAllStatuses(){
    return await getFromServer(
        `ProductStatus`
        )
}
