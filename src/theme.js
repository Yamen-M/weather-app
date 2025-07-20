export default function applyWeatherTheme(conditions) {
  const body = document.body;
  body.classList.remove("night-mode");

  body.className = "";

  if (conditions.toLowerCase().includes("rain")) {
    body.style.setProperty("--primary-bg", "var(--rainy-gradient)");
  } else if (conditions.toLowerCase().includes("cloud")) {
    body.style.setProperty("--primary-bg", "var(--cloudy-gradient)");
  } else if (conditions.toLowerCase().includes("clear") && isDaytime()) {
    body.style.setProperty("--primary-bg", "var(--sunny-gradient)");
  } else if (conditions.toLowerCase().includes("clear") && !isDaytime()) {
    body.classList.add("night-mode");
  } else if (conditions.toLowerCase().includes("snow")) {
    body.style.setProperty("--primary-bg", "var(--snow-gradient)");
  } else if (conditions.toLowerCase().includes("thunder")) {
    body.style.setProperty("--primary-bg", "var(--thunder-gradient)");
  }
}

function isDaytime() {
  const hours = new Date().getHours();
  return hours > 6 && hours < 20;
}
