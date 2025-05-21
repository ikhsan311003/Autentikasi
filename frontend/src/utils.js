export const BASE_URL = "https://backend-service-122089089856.us-central1.run.app";

// ====== FUNGSI AUTENTIKASI JWT ======

export const register = async (username, password) => {
  const res = await fetch(`${BASE_URL}/api/auth/register`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ username, password }),
  });
  return await res.json();
};

export const login = async (username, password) => {
  const res = await fetch(`${BASE_URL}/api/auth/login`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ username, password }),
  });

  const data = await res.json();

  if (res.ok && data.token) {
    localStorage.setItem("token", data.token);
  }

  return data;
};

export const logout = () => {
  localStorage.removeItem("token");
};

export const isLoggedIn = () => {
  return !!localStorage.getItem("token");
};

export const getToken = () => {
  return localStorage.getItem("token");
};
