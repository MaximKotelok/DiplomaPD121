import { GetAllPharmaCompanies, GetPharmaCompanyById, UpsertPharmaCompany, ClassHeader } from "../utils/Constants";
import { postToServer, getFromServer} from "../utils/Queries";

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
    return await getFromServer("getPharmaComapnyAdmin", { companyId: companyId })
}