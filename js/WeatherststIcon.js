function getWetherstate(weatherstate) {
  if (weatherstate == null) return "./assets/sun.json";
  switch (weatherstate.toLowerCase()) {
    case "clouds":
    case "mist":
    case "smoke":
    case "haze":
    case "dust":
    case "fog":
      return "./assets/cluod.json"; 
    case "rain":
    case "drizzle":
    case "shower rain":
    case "thunderstorm":
      return "./assets/rain.json"; 

    case "clear": 
      switch (hoursNew() == "LIGHT MODE") {
        case true:
          return "./assets/sun.json";
        case false:
          return "./assets/ngit.json";
      }

    case "clear": 
      switch (hoursNew() == "NIGHT MODE") {
        case true:
          return "./assets/ngit.json";
        case false:
          return "./assets/sun.json";
      }

    default:
      return "";
  }
}


