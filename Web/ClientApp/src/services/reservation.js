import { ClassHeader, GetAllBrands, GetRecomendedBrands, Success } from "../utils/Constants";
import { postToServer, getFromServer} from "../utils/Queries";
import { removePharmacyFromCart } from "./cartService";

export async function postLoggedReserve(concreteProducts, pharmacyId) {
    let res = await postToServer("Reservation/LoggedReserve", {concreteProducts}, ClassHeader);
    if(res.status === Success){
        removePharmacyFromCart(pharmacyId);
        return true;
    }
    return false;
} 

export async function postReservation(concreteProducts, phone, email, pharmacyId) {
    let res = await postToServer("Reservation/Reserve", 
    {ConcreteProducts:concreteProducts, 
        Phone:phone, 
        Email:email}, ClassHeader);
    if(res.status === Success){
        removePharmacyFromCart(pharmacyId);
        return true;
    }
    return false;
} 

export async function getReservations() {
    return await getFromServer("Reservation/GetReservations");
    
} 
