import * as React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { AuthProvider } from "./context/AuthContext";
import { ThemeProvider } from "./context/ThemeContext";

import Route from "./screens/Route";
import Home from "./screens/Home";
import Map1 from "./screens/Map1";
import SearchResults from "./screens/SearchResults";
import FavoritePage from "./screens/FavoritePage";
import BusDetails from "./screens/BusDetails";
import SplashScreen from "./screens/SplashScreen";
import TicketBooking from "./screens/TicketBooking";
import Login from "./screens/Login";
import Profile from "./screens/Profile";
import MenuScreen from "./screens/MenuScreen";
import PersonalInfoScreen from "./screens/PersonalInfoScreen";
import TravelHistoryScreen from "./screens/TravelHistoryScreen";
import NotificationsScreen from "./screens/NotificationsScreen";
import SettingsScreen from "./screens/SettingsScreen";
import HelpSupportScreen from "./screens/HelpSupportScreen";

const Stack = createNativeStackNavigator();

const App = () => {
  return (
    <ThemeProvider>
      <AuthProvider>
        <SafeAreaProvider>
          <NavigationContainer>
            <Stack.Navigator
              initialRouteName="SplashScreen"
              screenOptions={{ headerShown: false }}
            >
              <Stack.Screen name="SplashScreen" component={SplashScreen} />
              <Stack.Screen name="Login" component={Login} />
              <Stack.Screen name="Home" component={Home} />
              <Stack.Screen name="Map" component={Map1} />
              <Stack.Screen name="Route" component={Route} />
              <Stack.Screen name="SearchResults" component={SearchResults} />
              <Stack.Screen name="Favorites" component={FavoritePage} />
              <Stack.Screen name="BusDetails" component={BusDetails} />
              <Stack.Screen name="TicketBooking" component={TicketBooking} />
              <Stack.Screen name="Profile" component={Profile} />
              <Stack.Screen name="Menu" component={MenuScreen} options={{ presentation: 'modal', animation: 'slide_from_left' }} />
              <Stack.Screen name="PersonalInfo" component={PersonalInfoScreen} />
              <Stack.Screen name="TravelHistory" component={TravelHistoryScreen} />
              <Stack.Screen name="Notifications" component={NotificationsScreen} />
              <Stack.Screen name="Settings" component={SettingsScreen} />
              <Stack.Screen name="HelpSupport" component={HelpSupportScreen} />
            </Stack.Navigator>
          </NavigationContainer>
        </SafeAreaProvider>
      </AuthProvider>
    </ThemeProvider>
  );
};

export default App;
