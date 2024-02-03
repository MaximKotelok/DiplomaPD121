import { FileHeader } from "../utils/Constants";
import { postToServer, getFromServer } from "../utils/Queries";

export async function postPhotoToServer(serverUrl, relativePath, file) {
    const formData = new FormData();
    formData.append('relativePath', relativePath);
    formData.append('file', file);

    return await postToServer(serverUrl, formData, FileHeader);
}
 
