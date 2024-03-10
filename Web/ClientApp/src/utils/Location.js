import { getFromServer } from "./Queries"
import { getCookie, setCookie } from "./Cookies"

export function getCity(position) {
    return new Promise((resolve, reject) => {
        const latitude = position.coords.latitude;
        const longitude = position.coords.longitude;

        const apiKey = '2308afc1d1d64a2c841d5c0dd1f2ce66';
        const apiUrl = `https://api.opencagedata.com/geocode/v1/json?q=${latitude}+${longitude}&key=${apiKey}&language=uk`;

        fetch(apiUrl)
            .then(response => response.json())
            .then(data => {
                const city = data.results[0].components._normalized_city;

                // Make a request to your backend to check if the city exists
                fetch(`https://localhost:7133/api/City/Name/${city}`)
                    .then(response => {
                        if (response.ok) {
                            // City exists in the database, resolve with it
                            resolve(city);
                        } else {
                            // City doesn't exist in the database, set default city
                            const defaultCity = "Львів"; // Set your default city here
                            resolve(defaultCity);
                        }
                    })
                    .catch(error => {
                        console.error('Error checking city:', error);
                        // In case of error, resolve with default city
                        const defaultCity = "Львів"; // Set your default city here
                        resolve(defaultCity);
                    });
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
                    try {
                        const position = await new Promise((resolve, reject) => {
                            navigator.geolocation.getCurrentPosition(resolve, reject);
                        });

                        const city = await getCity(position);

                        console.log("City:", city);

                        setCookie("city", city);
                    } catch (error) {
                        // Error handling in case user denies geolocation permission
                        console.error("Error getting location:", error);
                        const defaultCity = "Львів"; // Set your default city here
                        setCookie("city", defaultCity);
                        console.log("Default city set:", defaultCity);
                    }
                } else {
                    const defaultCity = "Львів"; // Set your default city here
                    setCookie("city", defaultCity);
                    console.log("Default city set:", defaultCity);
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
