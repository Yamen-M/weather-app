export function showLoading() {
  const loader = document.getElementById("loading-indicator");
  loader.classList.add("active");
}

export function hideLoading() {
  const loader = document.getElementById("loading-indicator");
  loader.classList.remove("active");
}
