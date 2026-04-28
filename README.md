# Smart Bus - Tech Stack & Dependencies

This README documents the various libraries, packages, and frameworks utilized to build the Smart Bus application. The project is divided into a mobile frontend (built with React Native and Expo) and a backend API (built with Node.js and Express).

---

## 📱 Frontend (Mobile App)

The frontend is built on **Expo SDK 54** and **React Native**, ensuring a seamless cross-platform experience for both Android and iOS.

### Core Frameworks
- `react` & `react-native`: The foundational libraries for building the native user interfaces.
- `expo`: The framework providing access to native device capabilities without managing complex native code.

### Navigation
The app uses React Navigation for handling routing between screens:
- `@react-navigation/native`: The core routing library.
- `@react-navigation/native-stack`: For stack-based navigation (e.g., pushing new screens on top of others).
- `@react-navigation/bottom-tabs` & `@react-navigation/drawer`: Used for main app navigation paradigms.
- `react-native-gesture-handler`, `react-native-safe-area-context`, `react-native-screens`: Essential peer dependencies that optimize navigation animations and device safe-areas.

### UI & UX Components
- `@expo/vector-icons`: Provides access to popular icon sets (Feather, MaterialIcons, FontAwesome5).
- `expo-image`: A high-performance image component to handle caching and fast rendering.
- `@react-native-community/datetimepicker`: Native date and time picker components.
- `@react-native-picker/picker`: Native dropdown selection menus.
- `react-native-keyboard-aware-scroll-view`: Automatically moves UI components out of the way when the virtual keyboard appears.
- `react-native-svg`: Renders scalable vector graphics directly in the app.

### Authentication
- `expo-auth-session` & `expo-web-browser`: Powers the Google Sign-In flow by opening secure, in-app browser sessions for OAuth authentication.

### Payments
- `@stripe/stripe-react-native`: Integrates Stripe’s native Payment Sheet, providing a secure checkout experience that collects credit card information without exposing it directly to our servers.

### Networking & Storage
- `axios`: A robust HTTP client used to communicate with our backend APIs.
- `@react-native-async-storage/async-storage`: Persistent, unencrypted key-value storage system for saving user tokens and preferences locally on the device.

---

## ⚙️ Backend (API & Database)

The backend is a robust REST API serving the mobile application, built using **Node.js** and **Express**.

### Core Server & Database
- `express`: Fast, unopinionated, minimalist web framework for Node.js used to handle all API routing.
- `mongoose`: Elegant MongoDB object modeling for Node.js, used to define schemas and interact with the database (e.g., Users, Tickets, Buses).

### Authentication & Security
- `bcryptjs`: Used to securely hash and salt user passwords before storing them in the database.
- `jsonwebtoken` (JWT): Used to generate and verify secure authentication tokens to keep users logged in.
- `google-auth-library`: Official library used to verify OAuth tokens sent from the frontend Google Sign-In flow securely on the server side.
- `cors`: Middleware that allows the frontend application to securely request data from the backend domain.

### Services & Integrations
- `stripe`: The official Stripe Node.js library. Used to generate secure `PaymentIntents` and verify transactions.
- `twilio`: Used for sending automated SMS messages (e.g., OTP verification or booking confirmations).

### Utilities
- `dotenv`: Loads environment variables (like API keys and database URLs) from a `.env` file into `process.env`.
- `nodemon` (Dev Dependency): Automatically restarts the Node application when file changes are detected during development.
