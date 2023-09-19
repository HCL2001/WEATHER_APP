const apiKey = "956db33f8bef55679819a17ba7458352";
const apiUrl = `https://api.openweathermap.org/data/2.5/weather?appid=${apiKey}&units=metric&q=`;

const searchBox = document.querySelector(".search input");
const searchBtn = document.querySelector(".search button");

const weatherIcon = document.querySelector(".weather-icon");

const specialCharsRegex = /[!@#$%^&*()_+{}\[\]:;<>,.?~\\]/;

//
//  *params: name of city
//  *return: will display layout of infomation weather detail
//
async function checkWeather(city) {
  const resp = await fetch(apiUrl + city);
  var data = await resp.json();

  if (resp.status === 404) {
    document.querySelector(".error").style.display = "block";
    document.querySelector(".weather").style.display = "none";
    document.querySelector(".search input").value = "";
    return;
  }

  document.querySelector(".error").style.display = "none";

  document.querySelector(".city").innerHTML = data.name;
  document.querySelector(".temp").innerHTML = Math.round(data.main.temp) + "°c";
  document.querySelector(".humidity").innerHTML = data.main.humidity + "%";
  document.querySelector(".wind").innerHTML = data.wind.speed + " km/h";

  switch (data.weather[0].main) {
    default:
      alert("Default case");
      break;
    case "Clouds":
      weatherIcon.src = "assets/clouds.png";
      break;
    case "Clear":
      weatherIcon.src = "assets/clear.png";
      break;
    case "Rain":
      weatherIcon.src = "assets/rain.png";
      break;
    case "Drizzle":
      weatherIcon.src = "assets/drizzle.png";
      break;
    case "Mist":
      weatherIcon.src = "assets/mist.png";
      break;
  }

  document.querySelector(".weather").style.display = "block";
  document.querySelector(".search input").value = "";
  return;
}

searchBtn.addEventListener("click", () => {
  let cityName = searchBox.value;
  if (cityName === "") {
    alert("City name is must not null");
    return;
  } // Check if the input contains special characters
  if (specialCharsRegex.test(searchBox.value)) {
    alert("The value must not contain special characters");
    return;
  }
  checkWeather(searchBox.value);
});

searchBox.addEventListener("keypress", (event) => {
  if (event.key === "Enter") {
    event.preventDefault();
    let cityName = searchBox.value;
    if (cityName === "") {
      alert("City name is must not null");
      return;
    } // Check if the input contains special characters
    if (specialCharsRegex.test(searchBox.value)) {
      alert("The value must not contain special characters");
      return;
    }
    checkWeather(searchBox.value);
    return;
  }
});
