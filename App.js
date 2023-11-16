import { StyleSheet, Text, View } from "react-native";
import Homescreen from "./screens/Homescreen";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import ProfilScreen from "./screens/ProfilScreen";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import KeranjangScreen from "./screens/KeranjangScreen";
import RiwayatPesan from "./screens/RiwayatPesan";

const Tab = createBottomTabNavigator();

function App() {
  return (
    <NavigationContainer>
      <Tab.Navigator screenOptions={{ headerShown: false }}>
        <Tab.Screen name="Keranjang" component={KeranjangScreen} />
        <Tab.Screen name="Home" component={Homescreen} />
        <Tab.Screen name="Profil" component={ProfilScreen} />
        <Tab.Screen name="Riwayat Pesanan" component={RiwayatPesan} />
      </Tab.Navigator>
    </NavigationContainer>
  );
}

export default App;
