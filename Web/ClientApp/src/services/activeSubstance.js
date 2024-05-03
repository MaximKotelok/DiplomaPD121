import { GetAllCities, itemsPerPageForAdmin } from "../utils/Constants";
import { postToServer, getFromServer, putToServer} from "../utils/Queries";

export async function getActiveSubstance(id) {
    return await getFromServer(`ActiveSubstance/GetActiveSubstance/${id}`);
} 

export async function getActiveSubstancesCountOfPage(search) {
    return await postToServer(`ActiveSubstance/GetActiveSubstancesCountOfPage`,
    {
        search,
        itemsPerPage: itemsPerPageForAdmin
    });
} 

export async function getAllActiveSubstances(page, search) {
    return await postToServer(`ActiveSubstance/GetAllActiveSubstancesForAdmin`,
    {
        search,
        itemsPerPage: itemsPerPageForAdmin,
        page: page
    });
} 


export async function addActiveSustance(title, isActive) {
    return await postToServer(`ActiveSubstance/AddActiveSubstance`,
    {
        title, isActive
    });
} 

export async function updateActiveSubstanceStatus(id, isActive) {
    return await postToServer(`ActiveSubstance/UpdateActiveSubstanceStatus`,
    {
        id,
        isActive
    });
} 
export async function getListOfMedicineOfActiveSubstance(id) {
    return await postToServer(`ActiveSubstance/GetListOfMedicineOfActiveSubstance`,
    {
        id,
        count: 3
    });
} 

export async function updateActiveSubstance(id, title, isActive) {
    return await putToServer(`ActiveSubstance/UpdateActiveSubstance`,
    {
        id,
        title,
        isActive
    });
} 

