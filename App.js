import { StyleSheet, Text, View } from "react-native";
import Homescreen from "./screens/Homescreen";
import ProfilScreen from "./screens/ProfilScreen";
import KeranjangScreen from "./screens/KeranjangScreen";
import RiwayatPesan from "./screens/RiwayatPesan";
import ProductDetail from "./components/ProductDetail";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import LoginPage from "./screens/Login";
import Login from "./screens/Login";

const Tab = createBottomTabNavigator();
const Stack = createNativeStackNavigator();

function RiwayatStack() {
  return (
    <Stack.Navigator >
      <Stack.Screen name="Profil" component={ProfilScreen} />
      <Stack.Screen name="Riwayat Transaksi" component={RiwayatPesan} />
    </Stack.Navigator>
  );
}

function MenuStack() {
  return (
    <Stack.Navigator >
      <Stack.Screen name="Menu" component={Homescreen} />
      <Stack.Screen name="Product Detail" component={ProductDetail} />
    </Stack.Navigator >
  );
}

function App() {
  return (
    <NavigationContainer>
      <Tab.Navigator screenOptions={{ headerShown: false }}>
        <Tab.Screen name="Login" component={Login} />
        <Tab.Screen name="Keranjang" component={KeranjangScreen} />
        <Tab.Screen name="Home" component={MenuStack} />
        <Tab.Screen name="Profil" component={RiwayatStack} />
      </Tab.Navigator>
    </NavigationContainer>
  );
}

export default App;