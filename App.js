import React, { useState } from "react";
import { StyleSheet, Text, View } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import Homescreen from "./screens/Homescreen";
import ProfilScreen from "./screens/ProfilScreen";
import KeranjangScreen from "./screens/KeranjangScreen";
import RiwayatPesan from "./screens/RiwayatPesan";
import RiwayatPesanSudahBayar from "./screens/RiwayatPesanSudahBayar";
import ProductDetail from "./components/ProductDetail";
import PilihPembayaran from "./components/PilihPembayaran";
import Navigation from "./components/Navigation";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import StatusPembayaran from "./screens/StatusPembayaran";
import AboutStoreScreen from "./screens/AboutStoreScreen";
import EditProfileScreen from "./screens/EditProfileScreen";
import HasilTransaksi from "./screens/HasilTransaksi";
import PesanSekarang from "./components/PesanSekarang";
import StatusPembayaranSelesai from "./screens/StatusPembayaranSelesai";
import Login from "./screens/Login";
import FAQList from "./components/FAQList";
import Register from "./screens/Register";

const Tab = createBottomTabNavigator();
const Stack = createNativeStackNavigator();

function RiwayatTransaksiStack() {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="Riwayat Pesan"
        component={RiwayatPesan}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="Riwayat Pesan Sudah Bayar"
        component={RiwayatPesanSudahBayar}
        options={{ headerShown: false }}
      />
    </Stack.Navigator>
  );
}

function StatusPembayaranStack({ userId }) {
  return (
    <Stack.Navigator>
      <Stack.Screen name="Status Pembayaran" options={{ headerShown: false }}>
        {(props) => <StatusPembayaran {...props} userId={userId} />}
      </Stack.Screen>
      <Stack.Screen
        name="Status Pembayaran Selesai"
        component={StatusPembayaranSelesai}
        options={{ headerShown: false }}
      />
    </Stack.Navigator>
  );
}

function RiwayatStack({ userId }) {
  return (
    <Stack.Navigator>
      <Stack.Screen name="Profil">
        {(props) => <ProfilScreen {...props} userId={userId} />}
      </Stack.Screen>
      <Stack.Screen
        name="Riwayat Transaksi"
        component={RiwayatTransaksiStack}
      />
      <Stack.Screen name="Status Pembayaran">
        {(props) => <StatusPembayaranStack {...props} userId={userId} />}
      </Stack.Screen>
      <Stack.Screen name="Tentang Toko" component={AboutStoreScreen} />
      <Stack.Screen name="Edit Profile" component={EditProfileScreen} />
      <Stack.Screen name="Edit Profil" component={EditProfileScreen} />
    </Stack.Navigator>
  );
}

function MenuStack({ userId }) {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="Menu"
        component={Homescreen}
        options={{ headerShown: false }}
      />
      <Stack.Screen name="Product Detail" component={ProductDetail} />
      <Stack.Screen name="Pesan Sekarang">
        {(props) => <PesanSekarang {...props} userId={userId} />}
      </Stack.Screen>
      <Stack.Screen name="Pilih Pembayaran">
        {(props) => <PilihPembayaran {...props} userId={userId} />}
      </Stack.Screen>
      <Stack.Screen name="FAQ" component={FAQList} />
      <Stack.Screen name="Hasil Transaksi">
        {(props) => <HasilTransaksi {...props} userId={userId} />}
      </Stack.Screen>
    </Stack.Navigator>
    
  );
}

function KeranjangStack() {
  return (
    <Stack.Navigator>
      <Stack.Screen name="Keranjang" component={KeranjangScreen} />
    </Stack.Navigator>
  );
}

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false); // Status login sederhana
  const [userId, setUserId] = useState(null);
  const renderTabs = () => {
    if (isLoggedIn) {
      return (
        <Tab.Navigator
          screenOptions={({ route }) => ({
            headerShown: false,
            tabBarIcon: ({ focused, color, size }) => {
              let iconName;

              if (route.name === "Home") {
                iconName = focused ? "home" : "home-outline";
              } else if (route.name === "Keranjang") {
                iconName = focused ? "cart" : "cart-outline";
              } else if (route.name === "Profil") {
                iconName = focused ? "person" : "person-outline";
              }

              // You can return any component here as the tab icon
              return <Ionicons name={iconName} size={size} color="purple" />;
            },
            tabBarLabel: () => null, // Hide the label
          })}
          initialRouteName="Home"
        >
          <Tab.Screen name="Keranjang" component={KeranjangStack} />
          <Tab.Screen
            name="Home"
            component={() => <MenuStack userId={userId} />}
          />

          <Tab.Screen
            name="Profil"
            component={() => <RiwayatStack userId={userId} />}
          />
        </Tab.Navigator>
      );
    } else {
      return (
        <Tab.Navigator
          screenOptions={{
            tabBarButton: () => null,
          }}
          initialRouteName="Login"
        >
          <Tab.Screen name="Login">
            {(props) => (
              <Login
                {...props}
                setIsLoggedIn={setIsLoggedIn}
                setUserId={setUserId}
              />
            )}
          </Tab.Screen>
          <Tab.Screen name="Register" component={Register} />
        </Tab.Navigator>
      );
    }
  };

  return <NavigationContainer>{renderTabs()}</NavigationContainer>;
}

export default App;
