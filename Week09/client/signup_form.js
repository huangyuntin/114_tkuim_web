const API_BASE = "http://localhost:3001/api/signup";

const form = document.getElementById("signupForm");
const msg = document.getElementById("msg");
const submitBtn = document.getElementById("submitBtn");
const list = document.getElementById("list");
const checkListBtn = document.getElementById("checkListBtn");

form.addEventListener("submit", async (e) => {
  e.preventDefault();

  submitBtn.disabled = true;
  msg.textContent = "Loading...";

  const body = {
    name: name.value,
    email: email.value,
    phone: phone.value,
    password: password.value,
    confirmPassword: confirmPassword.value
  };

  try {
    const res = await fetch(API_BASE, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(body)
    });

    const data = await res.json();

    if (!res.ok) {
      msg.textContent = `❌ ${data.error}`;
    } else {
      msg.textContent = `✅ ${data.message}`;
    }
  } catch (err) {
    msg.textContent = "伺服器錯誤！";
  }

  submitBtn.disabled = false;
});

checkListBtn.addEventListener("click", async () => {
  const res = await fetch(API_BASE);
  const data = await res.json();
  list.textContent = JSON.stringify(data, null, 2);
});
