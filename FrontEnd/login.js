const API_URL = "http://localhost:5678/api";

const form = document.querySelector("#login-form");
const errorMessage = document.querySelector("#error-message");

form.addEventListener("submit", async (event) => {
  event.preventDefault(); // stop the page from reloading
  errorMessage.textContent = "";

  const email = form.email.value.trim();
  const password = form.password.value;

  try {
    const response = await fetch(`${API_URL}/users/login`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, password }),
    });

    if (!response.ok) {
      errorMessage.textContent = "Incorrect e-mail or password.";
      return;
    }

    const data = await response.json(); // { userId, token }
    localStorage.setItem("token", data.token);
    window.location.href = "index.html";
  } catch (error) {
    errorMessage.textContent = "Server unreachable. Please try again later.";
    console.error(error);
  }
});