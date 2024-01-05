import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  Image,
  TextInput,
  TouchableOpacity,
  StyleSheet,
} from "react-native";
import HeaderPage from "../components/HeaderPage";
import Icon from "react-native-vector-icons/FontAwesome";
import axios from "axios";
import * as ImagePicker from "expo-image-picker";

function EditProfileScreen({ navigation, route }) {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phoneNumber, setPhoneNumber] = useState(""); // State untuk nomor telepon
  const [address, setAddress] = useState(""); // State untuk alamat
  const [profileImage, setProfileImage] = useState(null);
  const [uploadedImageUrl, setUploadedImageUrl] = useState(null);

  const { userId } = route.params;
  console.log(userId);
  useEffect(() => {
    // Fetch user profile data from the backend
    const fetchUserProfile = async () => {
      try {
        const response = await axios.get(
          `http://127.0.0.1:8000/profils/${userId}`
        );
        const userData = response.data.user; // Assuming the response data structure matches the expected user profile format
        setName(userData.name);
        setEmail(userData.email);
        setPhoneNumber(userData.nomor);
        setAddress(userData.alamat);
        console.log(response.data);
      } catch (error) {
        console.error("Error fetching user profile:", error);
      }
    };

    fetchUserProfile();
  }, [userId]);

  const handleSaveChanges = async () => {
    try {
      const response = await axios.put(
        `http://127.0.0.1:8000/profils/${userId}`,
        {
          name,
          email,
          nomor: phoneNumber,
          alamat: address,
          gambar: uploadedImageUrl, // Tambahkan URL gambar ke data pengguna
        }
      );

      if (response.status === 200) {
        console.log("Profile updated successfully");
      } else {
        console.error("Profile update failed");
      }
    } catch (error) {
      console.error("Error updating profile:", error);
    }
  };

  const selectImage = async () => {
    try {
      let result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        allowsEditing: true,
        aspect: [4, 3],
        quality: 1,
      });
      if (!result.cancelled) {
        setProfileImage(result.uri);
        const formData = new FormData();
        formData.append("image", {
          uri: result.uri,
          name: `photo_${Date.now()}`,
          type: "image/jpeg", // Ubah tipe gambar sesuai kebutuhan
        });

        try {
          const response = await axios.post(
            "https://api.imgbb.com/1/upload?key=8e6f029993635453c67071f5f258cd87",
            formData,
            {
              headers: {
                "Content-Type": "multipart/form-data",
              },
            }
          );

          if (response.status === 200) {
            const imageUrl = response.data.data.url;
            setUploadedImageUrl(imageUrl);
            console.log("Image uploaded successfully:", imageUrl);
          } else {
            console.error("Failed to upload image");
          }
        } catch (error) {
          console.error("Error uploading image:", error);
        }
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.editProfileContainer}>
        <View style={styles.editProfileField}>
          <Text style={styles.editProfileLabel}>Foto Profil</Text>
          <TouchableOpacity onPress={selectImage}>
            {profileImage ? (
              <Image
                source={{ uri: profileImage }}
                style={styles.profileImage}
              />
            ) : (
              <View style={styles.profileImagePlaceholder}>
                <Icon name="camera" size={30} color="#000" />
              </View>
            )}
          </TouchableOpacity>
        </View>

        <View style={styles.editProfileField}>
          <Text style={styles.editProfileLabel}>Nama</Text>
          <TextInput
            style={styles.editProfileInput}
            value={name}
            placeholder="nama"
            placeholderTextColor="gray"
            onChangeText={(text) => setName(text)}
          />
        </View>
        <View style={styles.editProfileField}>
          <Text style={styles.editProfileLabel}>Email</Text>
          <TextInput
            style={styles.editProfileInput}
            value={email}
            placeholder="email"
            placeholderTextColor="gray"
            onChangeText={(text) => setEmail(text)}
          />
        </View>
        <View style={styles.editProfileField}>
          <Text style={styles.editProfileLabel}>Nomor Telepon</Text>
          <TextInput
            style={styles.editProfileInput}
            value={phoneNumber}
            placeholder="nomor"
            placeholderTextColor="gray"
            onChangeText={(text) => setPhoneNumber(text)}
          />
        </View>
        <View style={styles.editProfileField}>
          <Text style={styles.editProfileLabel}>Alamat</Text>
          <TextInput
            style={styles.editProfileInput}
            value={address}
            placeholder="alamat"
            placeholderTextColor="gray"
            onChangeText={(text) => setAddress(text)}
          />
        </View>
      </View>

      {/* Save Button */}
      <TouchableOpacity style={styles.saveButton} onPress={handleSaveChanges}>
        <Text style={styles.saveButtonText}>Simpan</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "start",
    paddingHorizontal: 20,
    backgroundColor: "#FFFFFF",
  },
  backButton: {
    paddingHorizontal: 10,
  },
  homeButton: {
    paddingHorizontal: 10,
  },
  homeButtonText: {
    fontFamily: "Poppins",
    color: "black",
    fontSize: 16,
  },
  editProfileContainer: {
    width: "100%",
    marginBottom: 20,
  },
  editProfileField: {
    marginBottom: 15,
  },
  editProfileLabel: {
    fontFamily: "Poppins",
    fontSize: 18,
    marginBottom: 5,
  },
  editProfileInput: {
    borderBottomWidth: 1,
    borderColor: "#CCCCCC",
    paddingVertical: 10,
    fontSize: 18,
  },
  saveButton: {
    backgroundColor: "purple",
    paddingVertical: 15,
    paddingHorizontal: 20,
    borderRadius: 10,
    alignItems: "center",
    width: "100%",
    marginBottom: 20,
  },
  saveButtonText: {
    fontFamily: "Poppins",
    color: "white",
    fontSize: 18,
    fontWeight: "500",
  },
});

export default EditProfileScreen;
