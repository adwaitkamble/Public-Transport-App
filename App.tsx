const Stack = createNativeStackNavigator();
import * as React from "react";
import { NavigationContainer } from "@react-navigation/native";

import { SafeAreaProvider } from "react-native-safe-area-context";
import Route from "./screens/Route";
import Home from "./screens/Home";
import Map1 from "./screens/Map1";
import SearchResults from "./screens/SearchResults";
import FavoritePage from "./screens/FavoritePage";
import BusDetails from "./screens/BusDetails";
import SplashScreen from "./screens/SplashScreen";

import { createNativeStackNavigator } from "@react-navigation/native-stack";

const App = () => {
  return (
    <>
      <SafeAreaProvider>
        <NavigationContainer>
          <Stack.Navigator
            initialRouteName="SplashScreen"
            screenOptions={{ headerShown: false }}
          >
            <Stack.Screen
              name="SplashScreen"
              component={SplashScreen}
              options={{ headerShown: false }}
            />
            <Stack.Screen
              name="Home"
              component={Home}
              options={{ headerShown: false }}
            />
            <Stack.Screen
              name="Map"
              component={Map1}
              options={{ headerShown: false }}
            />
            <Stack.Screen
              name="Route"
              component={Route}
              options={{ headerShown: false }}
            />
            <Stack.Screen
              name="SearchResults"
              component={SearchResults}
              options={{ headerShown: false }}
            />
            <Stack.Screen
              name="Favorites"
              component={FavoritePage}
              options={{ headerShown: false }}
            />
            <Stack.Screen
              name="BusDetails"
              component={BusDetails}
              options={{ headerShown: false }}
            />
          </Stack.Navigator>
        </NavigationContainer>
      </SafeAreaProvider>
    </>
  );
};
export default App;
