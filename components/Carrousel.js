import React, { useRef, useEffect, useState } from "react";
import { View, Image, Text, ScrollView, Dimensions, StyleSheet } from "react-native";

const { width } = Dimensions.get("window");
const height = width * 0.6; // 60%

const Carousel = () => {
  const [active, setActive] = useState(0);

  const images = [
    { id: 0, image: require("../assets/Carousel1.png") },
    { id: 1, image: require("../assets/Carousel2.png") },
    { id: 3, image: require("../assets/SakuraBlack.jpg") },
  ];

  const scrollViewRef = useRef(null);

  useEffect(() => {
    const scrollInterval = setInterval(() => {
      if (scrollViewRef.current) {
        const newOffset = scrollViewRef.current.contentOffset.x + width;
        scrollViewRef.current.scrollTo({ x: newOffset, animated: true });
        setActive((prev) => (prev + 1) % images.length);
      }
    }, 3000); // Ubah interval sesuai kebutuhan

    return () => clearInterval(scrollInterval);
  }, []);

  return (
    <View style={styles.carouselContainer}>
      <ScrollView
        ref={scrollViewRef}
        pagingEnabled
        horizontal
        style={styles.scrollView}
        showsHorizontalScrollIndicator={false}
        onMomentumScrollEnd={(event) => {
          // Handle scroll end if needed
          const currentIndex = Math.round(
            event.nativeEvent.contentOffset.x / event.nativeEvent.layoutMeasurement.width
          );
          setActive(currentIndex);
        }}
      >
        {images.map((image, index) => (
          <View key={index} style={styles.imageContainer}>
            <Image source={image.image} style={styles.image} />
          </View>
        ))}
      </ScrollView>
      <View style={{ flexDirection: 'row', position: 'absolute', bottom: 0, alignSelf: 'center' }}>
        {images.map((_, k) => (
          <Text key={k} style={k === active ? { color: '#43398F' } : { color: '#6C5FA2' }}> ⬤ </Text>
        ))}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  carouselContainer: {
    backgroundColor: "#F3DDE0",
    width,
    height,
    alignItems: "center",
    justifyContent: "center",
  },
  scrollView: {
    width,
    height,
  },
  imageContainer: {
    width,
    height,
    paddingHorizontal: 25,
    paddingVertical: 25,
    // borderRadius: 50,
    overflow: "hidden",
  },
  image: {
    flex: 1,
    width: 320,
    height: 60,
    resizeMode: "cover",
    // borderRadius: 10,
  },
});

export default Carousel;
