import { getFromServer } from "./Queries"
import { getCookie, setCookie } from "./Cookies"

export function getCity(position) {
    return new Promise((resolve, reject) => {
        const latitude = position.coords.latitude;
        const longitude = position.coords.longitude;

        const apiKey = '2308afc1d1d64a2c841d5c0dd1f2ce66';
        const apiUrl = `https://api.opencagedata.com/geocode/v1/json?q=${latitude}+${longitude}&key=${apiKey}`;

        fetch(apiUrl)
            .then(response => response.json())
            .then(data => {
                const city = data.results[0].components.city;
                resolve(city);
            })
            .catch(error => {
                console.error('Error:', error);
                reject(error);
            });
    });
}

export function setupLocation() {
    return new Promise(async (resolve, reject) => {
        try {
            let cCity = getCookie("city");
            if (cCity === "") {
                if (navigator.geolocation) {
                    const position = await new Promise((innerResolve, innerReject) => {
                        navigator.geolocation.getCurrentPosition(innerResolve, innerReject);
                    });

                    const city = await getCity(position);

                    console.log("City:", city);

                    setCookie("city", city);
                } else {
                    console.log("Geolocation is not supported by this browser.");
                }
            }
            resolve(); 
        } catch (error) {
            console.error("Error getting location:", error);
            reject(error);
        }
    });
}

export async function showLocation(city, map) {

    if (city == '')
        return;

    let serverCity = await getFromServer(`City/Name/${city}`);

    const latitude = serverCity.data.latitude;
    const longitude = serverCity.data.longitude;
    
    map.setView([latitude, longitude], 13);
}
