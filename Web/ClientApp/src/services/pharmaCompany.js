import { GetAllPharmaCompanies, GetPharmaCompanyById, UpsertPharmaCompany, ClassHeader } from "../utils/Constants";
import { postToServer, getFromServer, deleteFromServer} from "../utils/Queries";

export async function getAllPharmaCompanies() {
    return await getFromServer(GetAllPharmaCompanies)
} 
export async function getPharmaCompanyById(companyId) {
    return await getFromServer(GetPharmaCompanyById, { companyId: companyId })
}
export async function upsertPharmaCompany(company) {
    return await postToServer(UpsertPharmaCompany, {
        ...company,
    }, ClassHeader);
}
export async function upsertPharmaCompanyAdmin(user) {
    return await postToServer("PharmaCompany/UpsertPharmaCompanyAdmin", {
        ...user,
    }, ClassHeader)
}
export async function getPharmaComapnyAdmin(companyId) {
    return await getFromServer(`PharmaCompany/GetPharmaComapnyAdmin/${companyId}`)
}
export async function deletePharmaCompany(id){
    return await deleteFromServer(`PharmaCompany/DeletePharmaCompany/${id}`,  {})
}