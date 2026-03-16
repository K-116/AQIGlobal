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
                risk: "VERY LOW",
                desc: "Air quality poses little or no risk.",
            };
        if (aqi <= 100)
            return {
                color: "#ffeb3b",
                status: "Moderate",
                risk: "LOW",
                desc: "Air quality is at generally acceptable levels.",
            };
        if (aqi <= 150)
            return {
                color: "#ff8c00",
                status: "Unhealthy for sensitive groups",
                risk: "MODERATE",
                desc: "Air quality will affect sensitive groups. People with heart and/or lung disease, diabetes, older adults, and children should stay indoors.",
            };
        if (aqi <= 200)
            return {
                color: "#ff0000",
                status: "Unhealthy",
                risk: "HIGH",
                desc: "Air quality is Unhealthy for the entire population, stay indoors.",
            };
        if (aqi <= 300)
            return {
                color: "#6c27b0",
                status: "Very Unhealthy",
                risk: "VERY HIGH",
                desc: "Health alert conditions, stay indoors.",
            };
        return {
            color: "#880e4f",
            status: "Hazardous",
            risk: "VERY HIGH",
            desc: "Emergency conditions, stay indoors.",
        };
    }
    
    
    function calculatePM25AQI(concentration) {
        if (concentration < 0) return 0;
        if (concentration >= 0 && concentration < 12.1) {
            return Math.round((50 / 12.0) * concentration);
        } else if (concentration >= 12.1 && concentration < 35.5) {
            return Math.round((49 / 23.3) * (concentration - 12.1) + 51);
        } else if (concentration >= 35.5 && concentration < 55.5) {
            return Math.round((49 / 19.9) * (concentration - 35.5) + 101);
        } else if (concentration >= 55.5 && concentration < 150.5) {
            return Math.round((49 / 94.9) * (concentration - 55.5) + 151);
        } else if (concentration >= 150.5 && concentration < 250.5) {
            return Math.round((99 / 99.9) * (concentration - 150.5) + 201);
        } else if (concentration >= 250.5 && concentration < 350.5) {
            return Math.round((99 / 99.9) * (concentration - 250.5) + 301);
        } else {
            return Math.round((99 / 99.9) * (concentration - 350.5) + 401);
        }
    }
    
    
    function calculatePM10AQI(concentration) {
        if (concentration < 0) return 0;
        if (concentration >= 0 && concentration < 55) {
            return Math.round((50 / 54) * concentration);
        } else if (concentration >= 55 && concentration < 155) {
            return Math.round((49 / 100) * (concentration - 55) + 51);
        } else if (concentration >= 155 && concentration < 255) {
            return Math.round((49 / 100) * (concentration - 155) + 101);
        } else if (concentration >= 255 && concentration < 355) {
            return Math.round((49 / 100) * (concentration - 255) + 151);
        } else if (concentration >= 355 && concentration < 425) {
            return Math.round((99 / 70) * (concentration - 355) + 201);
        } else {
            return Math.round((99 / 75) * (concentration - 425) + 301);
        }
    }
    
    
    function calculateO3AQI(concentration_ugm3) {
    
        const concentration_ppm = concentration_ugm3 * 0.00051; 
        
        if (concentration_ppm < 0) return 0;
        if (concentration_ppm >= 0 && concentration_ppm < 0.055) {
            return Math.round((50 / 0.054) * concentration_ppm);
        } else if (concentration_ppm >= 0.055 && concentration_ppm < 0.071) {
            return Math.round((49 / 0.015) * (concentration_ppm - 0.055) + 51);
        } else if (concentration_ppm >= 0.071 && concentration_ppm < 0.086) {
            return Math.round((49 / 0.014) * (concentration_ppm - 0.071) + 101);
        } else if (concentration_ppm >= 0.086 && concentration_ppm < 0.106) {
            return Math.round((49 / 0.019) * (concentration_ppm - 0.086) + 151);
        } else {
            return Math.round((99 / 0.094) * (concentration_ppm - 0.106) + 201);
        }
    }
    
  
    function calculateNO2AQI(concentration_ugm3) {
        const concentration_ppb = concentration_ugm3 * 0.532; 
        if (concentration_ppb < 0) return 0;
        if (concentration_ppb >= 0 && concentration_ppb < 54) {
            return Math.round((50 / 53) * concentration_ppb);
        } else if (concentration_ppb >= 54 && concentration_ppb < 101) {
            return Math.round((49 / 46) * (concentration_ppb - 54) + 51);
        } else if (concentration_ppb >= 101 && concentration_ppb < 361) {
            return Math.round((49 / 259) * (concentration_ppb - 101) + 101);
        } else if (concentration_ppb >= 361 && concentration_ppb < 650) {
            return Math.round((49 / 289) * (concentration_ppb - 361) + 151);
        } else {
            return Math.round((99 / 1249) * (concentration_ppb - 650) + 201);
        }
    }
    
    
    function calculateCOAQI(concentration_ugm3) {
        const concentration_ppm = concentration_ugm3 / 1145;
        
        if (concentration_ppm < 0) return 0;
        if (concentration_ppm >= 0 && concentration_ppm < 4.5) {
            return Math.round((50 / 4.4) * concentration_ppm);
        } else if (concentration_ppm >= 4.5 && concentration_ppm < 9.5) {
            return Math.round((49 / 4.9) * (concentration_ppm - 4.5) + 51);
        } else if (concentration_ppm >= 9.5 && concentration_ppm < 12.5) {
            return Math.round((49 / 2.9) * (concentration_ppm - 9.5) + 101);
        } else if (concentration_ppm >= 12.5 && concentration_ppm < 15.5) {
            return Math.round((49 / 2.9) * (concentration_ppm - 12.5) + 151);
        } else {
            return Math.round((99 / 14.5) * (concentration_ppm - 15.5) + 201);
        }
    }
    
   
    function calculateSO2AQI(concentration_ugm3) {
        
        const concentration_ppb = concentration_ugm3 * 0.382; 
        if (concentration_ppb < 0) return 0;
        if (concentration_ppb >= 0 && concentration_ppb < 36) {
            return Math.round((50 / 35) * concentration_ppb);
        } else if (concentration_ppb >= 36 && concentration_ppb < 76) {
            return Math.round((49 / 39) * (concentration_ppb - 36) + 51);
        } else if (concentration_ppb >= 76 && concentration_ppb < 186) {
            return Math.round((49 / 109) * (concentration_ppb - 76) + 101);
        } else {
            return Math.round((99 / 114) * (concentration_ppb - 186) + 151);
        }
    }
    
    
    function calculateUSAQI(components) {
       
        const pm25AQI = calculatePM25AQI(components.pm2_5);
        const pm10AQI = calculatePM10AQI(components.pm10);
        const o3AQI = calculateO3AQI(components.o3);
        const no2AQI = calculateNO2AQI(components.no2);
        const coAQI = calculateCOAQI(components.co);
        const so2AQI = calculateSO2AQI(components.so2);
        
        const pollutantAQIs = [
            { name: "PM2.5", aqi: pm25AQI },
            { name: "PM10", aqi: pm10AQI },
            { name: "O3", aqi: o3AQI },
            { name: "NO2", aqi: no2AQI },
            { name: "CO", aqi: coAQI },
            { name: "SO2", aqi: so2AQI }
        ];
        
        const maxPollutant = pollutantAQIs.reduce((max, p) => p.aqi > max.aqi ? p : max);
        
        return {
            aqi: maxPollutant.aqi,
            dominantPollutant: maxPollutant.name
        };
    }

    function updateUI(aqiData, cityName) {
    
        const components = aqiData.list[0].components;
        const usAQIResult = calculateUSAQI(components);
        const usAQI = usAQIResult.aqi;
        const dominantPollutant = usAQIResult.dominantPollutant;
        
      
        const info = getAQIInfo(usAQI);

        document.getElementById("risk").textContent = info.risk;
        document.getElementById("mainAqi").textContent = usAQI;
        document.getElementById("aqistat").textContent = info.status;
        document.getElementById("mainAqi").style.color = info.color;
        document.getElementById("risk-desc").textContent = info.desc;
        document.getElementById("location").textContent = cityName;
        document.getElementById("pollutant").textContent = dominantPollutant;
        
    
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
            alert("Your API isn't working!!!");
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
    
    fetchAQI("New york, New York");
});