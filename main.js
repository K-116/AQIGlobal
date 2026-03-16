const API_KEY = "dce83802631bba6f570c6e79b8be951e";

document.addEventListener('DOMContentLoaded', function () {
    updateDateTime();
    function updateDateTime() {
        const now = new Date();
        document.getElementById("date").textContent = now.toLocaleDateString();

        console.log("Date updated:", now.toLocaleDateString());
}
    updateDateTime();
    setInterval(updateDateTime, 1000);
    function getAQIInfo(aqi) {
        if (aqi <= 50)
            return {
            color: "#17e600",
            status: "Good",
            risk: "LOW",
            desc: "Air quality is satisfactory ",
            };
        if (aqi <= 100)
            return {
            color: "#ffeb3b",
            status: "Moderate",
            risk: "LOW",
            desc: "If you are sensitive to pollution, consider reducing your activity level or shorten the amount of time you are active outdoors.",
            };
        if (aqi <= 150)
            return {
            color: "#ff8c00",
            status: "Unhealthy for sensitive groups",
            risk: "MEDIUM",
            desc: "Air quality will effect sensitive groups",
            };
        if (aqi <= 200)
            return {
            color: "#ff0000",
            status: "Unhealthy",
            risk: "HIGH",
            desc: "Everyone may experience effects",
            };
        if (aqi <= 300)
            return {
            color: "#6c27b0",
            status: "Very Unhealthy",
            risk: "HIGH",
            desc: "Health alert conditions",
            };
        return {
            color: "#880e4f",
            status: "Hazardous",
            risk: "Emergency conditions,",
            desc: "",
        };
        }
     


    function updateUI(aqiData, cityName) {

        const aqi = Math.round(aqiData.list[0].main.aqi * 50); 
        const info = getAQIInfo(aqi);

        document.getElementById("risk").textContent = info.risk;
        document.getElementById("mainAqi").textContent = aqi;
        document.getElementById("aqistat").textContent = info.status;
        document.getElementById("mainAqi").style.color = info.color;
        document.getElementById("risk-desc").textContent = info.desc;
        document.getElementById("location").textContent = cityName;

        const comp = aqiData.list[0].components;
        const pollutants = [
            { name: "PM2.5", val: comp.pm2_5 }, 
            { name: "PM10", val: comp.pm10 },   
            { name: "O3", val: comp.o3 },      
        ];
        document.getElementById("pollutant").textContent = pollutants.reduce((m, p) =>
            p.val > m.val ? p : m
        ).name;
        

    }

    async function fetchAQI(city) {
    try {
        document.getElementById("loading").style.display = "block";

       
        const geoRes = await fetch(
        `https://api.openweathermap.org/geo/1.0/direct?q=${city}&limit=1&appid=${API_KEY}`
        );
        const geoData = await geoRes.json();

        if (!geoData.length) {
        alert("That city isn't found");
        return;
        }

        const { lat, lon, name, country } = geoData[0];
        const cityName = `${name}, ${country}`;

        
        const aqiRes = await fetch(
        `https://api.openweathermap.org/data/2.5/air_pollution?lat=${lat}&lon=${lon}&appid=${API_KEY}`
        );
        const aqiData = await aqiRes.json();
        
        
        updateUI(aqiData, cityName);

    } catch (error) {
        alert("Your API int working!!!");
        console.error("An error occurred:", error);
    } finally {
        document.getElementById("loading").style.display = "none";
    }
    }

    
    document.getElementById("citySearch").addEventListener("keypress", (e) => {
        if (e.key === "Enter" && e.target.value.trim()) {
            fetchAQI(e.target.value.trim());
        }
    });
    document.querySelector(".btn").addEventListener("click", () => {
    const searchInput = document.getElementById("citySearch");
    if (searchInput.value.trim()) {
        fetchAQI(searchInput.value.trim());
        }
    });
    fetchAQI("New york");
});


