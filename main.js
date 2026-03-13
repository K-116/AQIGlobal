const API_KEY = "f5c31ffe4d78893867e0aaea77749af1"

function updateDateTime(){
    const now = new Date()
    document.getElementById("datetime").textContent = now.toLocaleDateString()
}

updateDateTime()
