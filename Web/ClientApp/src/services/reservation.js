import { ClassHeader, GetAllBrands, GetRecomendedBrands, Success, itemsPerPageForAdmin } from "../utils/Constants";
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
    {concreteProducts:concreteProducts, 
        Phone:phone, 
        Email:email}, ClassHeader);
    if(res.status === Success){
        removePharmacyFromCart(pharmacyId);    
        return true;
    }
    return false;
} 

export async function getPharmacyReservations(page) {
    let res = await postToServer("Reservation/GetPharmacyReservations", 
    {
        itemsPerPage: itemsPerPageForAdmin,
        page:page
    }, ClassHeader);
    return res;
} 

export async function getReservation(id) {
    let res = await getFromServer("Reservation/GetReservation", 
    {
        id:id
    }, ClassHeader);
    return res;
}

export async function setOrderStatus(reservationId, statusId) {
    return await postToServer("Reservation/SetOrderStatus",{statusId, reservationId});    
} 

export async function getAllReservationsStatuses() {
    return await getFromServer("Reservation/GetAllReservationsStatuses");
    
} 
export async function getReservations() {
    return await getFromServer("Reservation/GetReservations");
    
} 
