

const API_KEY = "dce83802631bba6f570c6e79b8be951e";

document.addEventListener('DOMContentLoaded', function () {
    updateDateTime();
    function updateDateTime() {
        const now = new Date();
        document.getElementById("date").textContent = now.toLocaleDateString();
  // You can add a datetime element if needed, or remove this function
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
            risk: "",
            desc: "If you are sensitive to pollution, consider reducing your activity level or shorten the amount of time you are active outdoors.",
            };
        if (aqi <= 150)
            return {
            color: "#ff8c00",
            status: "Unhealthy for sensitive",
            risk: "MEDIUM",
            desc: "Air quality will effect sensitive groups",
            };
        if (aqi <= 200)
            return {
            color: "#ff0000",
            status: "Unhealthy",
            risk: "75%",
            desc: "Everyone may experience effects",
            };
        if (aqi <= 300)
            return {
            color: "#6c27b0",
            status: "Very Unhealthy",
            risk: "90%",
            desc: "Health alert conditions",
            };
        return {
            color: "#880e4f",
            status: "Hazardous",
            risk: "HIGH",
            desc: "Emergency conditions",
        };
        }
        // 

/* =======================
    UPDATE UI
======================= */
// Updates the HTML elements with the fetched AQI data
    function updateUI(aqiData, cityName) {
  // The API returns an index from 1 to 5 for AQI. We scale it up.
  const aqi = Math.round(aqiData.list[0].main.aqi * 50); 
  const info = getAQIInfo(aqi);

  // Update risk and location information
  document.getElementById("risk").textContent = info.risk;
  document.getElementById("aqistat").textContent = info.status;
  document.getElementById("mainAqi").style.color = info.color;
  document.getElementById("risk-desc").textContent = info.desc;
  document.getElementById("location").textContent = cityName;


  // Find the pollutant with the highest concentration
  const comp = aqiData.list[0].components;
  const pollutants = [
    { name: "PM2.5", val: comp.pm2_5 }, 
    { name: "PM10", val: comp.pm10 },   
    { name: "O3", val: comp.o3 },      
  ];
  document.getElementById("pollutant").textContent = pollutants.reduce((m, p) =>
    p.val > m.val ? p : m
  ).name;
  
  // NOTE: Elements for temperature, humidity, and wind are no longer updated here.
    }

/* =======================
    FETCH AQI (CITY ONLY)
======================= */
    async function fetchAQI(city) {
    try {
        document.getElementById("loading").style.display = "block";

        // 1. Get Latitude and Longitude (Geo-location)
        const geoRes = await fetch(
        `https://api.openweathermap.org/geo/1.0/direct?q=${city}&limit=1&appid=${API_KEY}`
        );
        const geoData = await geoRes.json();

        if (!geoData.length) {
        alert("City not found");
        return;
        }

        const { lat, lon, name, country } = geoData[0];
        const cityName = `${name}, ${country}`;

        // 2. Get Air Quality Index (AQI) Data
        // We removed the weather fetch call completely.
        const aqiRes = await fetch(
        `https://api.openweathermap.org/data/2.5/air_pollution?lat=${lat}&lon=${lon}&appid=${API_KEY}`
        );
        const aqiData = await aqiRes.json();
        
        // 3. Update the UI
        // We pass only the AQI data and city name.
        updateUI(aqiData, cityName);

    } catch (error) {
        alert("Error fetching AQI data. Check your network or API Key.");
        console.error("An error occurred:", error);
    } finally {
        document.getElementById("loading").style.display = "none";
    }
    }

    /* =======================
        SEARCH INPUT
    ======================= */
    // Listens for the Enter key press in the search box
    document.getElementById("citySearch").addEventListener("keypress", (e) => {
        if (e.key === "Enter" && e.target.value.trim()) {
            fetchAQI(e.target.value.trim());
        }
    });

    /* =======================
        DEFAULT CITY
    ======================= */
    fetchAQI("Jakarta, Indonesia");
});


