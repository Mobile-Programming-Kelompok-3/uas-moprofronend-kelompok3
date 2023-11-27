import { StyleSheet, Text, View } from "react-native";
import Homescreen from "./screens/Homescreen";
import ProfilScreen from "./screens/ProfilScreen";
import KeranjangScreen from "./screens/KeranjangScreen";
import RiwayatPesan from "./screens/RiwayatPesan";
import { NavigationContainer } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

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

function App() {
  return (
    <NavigationContainer>
      <Tab.Navigator screenOptions={{ headerShown: false }}>
        <Tab.Screen name="Keranjang" component={KeranjangScreen} />
        <Tab.Screen name="Home" component={Homescreen} />
        <Tab.Screen name="Profil" component={RiwayatStack} />
      </Tab.Navigator>
    </NavigationContainer>
  );
}

export default App;