import { GetAllBrands, GetRecomendedBrands, Success } from "../utils/Constants";
import { postToServer, getFromServer} from "../utils/Queries";

export async function checkIsAuth() {
    return ((await postToServer("isAuth")).status == Success);
} 

