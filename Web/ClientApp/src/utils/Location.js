import { getFromServer } from "./Queries"
import { setCookie } from "./Cookies"
import L from 'leaflet';

export function getCity(position) {
    const latitude = position.coords.latitude;
    const longitude = position.coords.longitude;


    const apiKey = '2308afc1d1d64a2c841d5c0dd1f2ce66';
    const apiUrl = `https://api.opencagedata.com/geocode/v1/json?q=${latitude}+${longitude}&key=${apiKey}`;

    fetch(apiUrl)
        .then(response => response.json())
        .then(data => {
            const city = data.results[0].components.city;
            console.log(`City: ${city}`);
            setCookie("city", city);
        })
        .catch(error => console.error('Error:', error));
}

export async function showLocation(city, map) {

    if (city == '')
        return;

    let serverCity = await getFromServer(`City/Name/${city}`);

    const latitude = serverCity.data.latitude;
    const longitude = serverCity.data.longitude;
    
    map.setView([latitude, longitude], 13);
}
