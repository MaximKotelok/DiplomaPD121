import { GetAllBrands, GetRecomendedBrands, Success } from "../utils/Constants";
import { getToken } from "../utils/Login";
import { postToServer, getFromServer} from "../utils/Queries";

export function checkIsAuth() {
    return (getToken() && true);
} 

