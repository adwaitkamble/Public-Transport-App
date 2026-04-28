import AsyncStorage from "@react-native-async-storage/async-storage";
import Constants from "expo-constants";

const normalizeBaseUrl = (url: string) => {
  const trimmed = url.trim().replace(/\/+$/, "");
  return trimmed.endsWith("/api") ? trimmed : `${trimmed}/api`;
};

// In production builds, use EXPO_PUBLIC_API_URL.
// In development, auto-detect local machine host and fallback to Android emulator host.
const getBaseUrl = () => {
  const configured = process.env.EXPO_PUBLIC_API_URL;
  if (configured) {
    return normalizeBaseUrl(configured);
  }

  const debuggerHost = Constants.expoConfig?.hostUri || Constants.manifest?.debuggerHost;
  const host = debuggerHost?.split(":")[0]; // extract IP from "192.168.x.x:8081"
  if (__DEV__ && host) {
    return `http://${host}:5001/api`;
  }

  if (__DEV__) {
    // Android emulator loopback
    return "http://10.0.2.2:5001/api";
  }

  return "";
};

const BASE_URL = getBaseUrl();

const getApiBaseUrl = () => {
  if (!BASE_URL) {
    throw new Error(
      "API URL is not configured. Set EXPO_PUBLIC_API_URL to your deployed backend (example: https://your-backend.onrender.com/api)."
    );
  }
  return BASE_URL;
};

const safeFetch = async (url: string, options?: RequestInit) => {
  try {
    return await fetch(url, options);
  } catch {
    throw new Error(
      "Cannot reach server. Ensure backend is online and EXPO_PUBLIC_API_URL points to it."
    );
  }
};

const getToken = async () => {
  return await AsyncStorage.getItem("token");
};

// Safely set AsyncStorage items: skip if value is undefined and coerce to string
export const safeSetItem = async (key: string, value: any) => {
  if (typeof value === "undefined") return;
  let out = value;
  if (typeof value !== "string") {
    try {
      out = JSON.stringify(value);
    } catch (e) {
      out = String(value);
    }
  }
  await AsyncStorage.setItem(key, out);
};

const authHeaders = async () => {
  const token = await getToken();
  return {
    "Content-Type": "application/json",
    ...(token ? { Authorization: `Bearer ${token}` } : {}),
  };
};

const handleResponse = async (response: Response) => {
  const data = await response.json();
  if (!response.ok) {
    throw new Error(data.message || "Something went wrong");
  }
  return data;
};

// ─── Auth ──────────────────────────────────────────────

export const registerUser = async (
  fullName: string,
  email: string,
  phone: string,
  password: string
) => {
  const response = await safeFetch(`${getApiBaseUrl()}/auth/register`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ fullName, email, phone, password }),
  });
  const data = await handleResponse(response);
  await safeSetItem("token", data.token);
  await safeSetItem("user", data);
  return data;
};

export const loginUser = async (email: string, password: string) => {
  const response = await safeFetch(`${getApiBaseUrl()}/auth/login`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ email, password }),
  });
  const data = await handleResponse(response);
  if (!data?.token) {
    throw new Error("Login succeeded but the server did not return an auth token.");
  }
  await safeSetItem("token", data.token);
  await safeSetItem("user", data);
  return data;
};

export const loginWithGoogle = async (token: string, isAccessToken: boolean = false) => {
  const response = await fetch(`${BASE_URL}/auth/google`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(isAccessToken ? { accessToken: token } : { idToken: token }),
  });
  const data = await handleResponse(response);
  await safeSetItem("token", data.token);
  await safeSetItem("user", data);
  return data;
};

// ─── Phone OTP Auth ────────────────────────────────────

export const sendPhoneOtp = async (phone: string) => {
  const response = await fetch(`${getApiBaseUrl()}/auth/phone/send-otp`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ phone }),
  });
  return handleResponse(response);
};

export const verifyPhoneOtp = async (phone: string, otp: string) => {
  const response = await fetch(`${getApiBaseUrl()}/auth/phone/verify-otp`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ phone, otp }),
  });
  const data = await handleResponse(response);
  await safeSetItem("token", data.token);
  await safeSetItem("user", data);
  return data;
};

export const getProfile = async () => {
  const headers = await authHeaders();
  const response = await safeFetch(`${getApiBaseUrl()}/auth/profile`, { headers });
  return handleResponse(response);
};

export const updateProfile = async (updates: any) => {
  const headers = await authHeaders();
  const response = await safeFetch(`${getApiBaseUrl()}/auth/profile`, {
    method: "PUT",
    headers,
    body: JSON.stringify(updates),
  });
  return handleResponse(response);
};

export const logoutUser = async () => {
  await AsyncStorage.removeItem("token");
  await AsyncStorage.removeItem("user");
};

// ─── Buses ─────────────────────────────────────────────

export const getBuses = async () => {
  const headers = await authHeaders();
  const response = await safeFetch(`${getApiBaseUrl()}/buses`, { headers });
  return handleResponse(response);
};

export const getBusDetails = async (id: string) => {
  const headers = await authHeaders();
  const response = await safeFetch(`${getApiBaseUrl()}/buses/${id}`, { headers });
  return handleResponse(response);
};

export const searchBuses = async (query: string) => {
  const headers = await authHeaders();
  const response = await safeFetch(
    `${getApiBaseUrl()}/buses/search?q=${encodeURIComponent(query)}`,
    { headers }
  );
  return handleResponse(response);
};

// ─── Routes ────────────────────────────────────────────

export const searchRoutes = async (from: string, to: string) => {
  const headers = await authHeaders();
  const response = await safeFetch(
    `${getApiBaseUrl()}/routes/search?from=${encodeURIComponent(from)}&to=${encodeURIComponent(to)}`,
    { headers }
  );
  return handleResponse(response);
};

// ─── Tickets ───────────────────────────────────────────

export const bookTicket = async (
  ticketType: string,
  price: number,
  paymentMethod: string
) => {
  const headers = await authHeaders();
  const response = await safeFetch(`${getApiBaseUrl()}/tickets/book`, {
    method: "POST",
    headers,
    body: JSON.stringify({ ticketType, price, paymentMethod }),
  });
  return handleResponse(response);
};

export const getMyTickets = async () => {
  const headers = await authHeaders();
  const response = await safeFetch(`${getApiBaseUrl()}/tickets/my`, { headers });
  return handleResponse(response);
};

// ─── Favorites ─────────────────────────────────────────

export const getFavorites = async () => {
  const headers = await authHeaders();
  const response = await safeFetch(`${getApiBaseUrl()}/favorites`, { headers });
  return handleResponse(response);
};

export const addFavorite = async (favorite: {
  routeTitle: string;
  subtitle?: string;
  busNumber?: string;
  iconType?: string;
  eta?: string;
}) => {
  const headers = await authHeaders();
  const response = await safeFetch(`${getApiBaseUrl()}/favorites`, {
    method: "POST",
    headers,
    body: JSON.stringify(favorite),
  });
  return handleResponse(response);
};

export const removeFavorite = async (id: string) => {
  const headers = await authHeaders();
  const response = await safeFetch(`${getApiBaseUrl()}/favorites/${id}`, {
    method: "DELETE",
    headers,
  });
  return handleResponse(response);
};

// ─── Payment ───────────────────────────────────────────

export const createPaymentIntent = async (amount: number, ticketType: string) => {
  const headers = await authHeaders();
  const response = await safeFetch(`${getApiBaseUrl()}/payment/create-payment-intent`, {
    method: "POST",
    headers,
    body: JSON.stringify({ amount, ticketType }),
  });
  return handleResponse(response);
};
