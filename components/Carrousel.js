import React from 'react';
import { View, Image, StyleSheet } from 'react-native';
import Swiper from 'react-native-swiper/src';

const Carousel = () => {
  const carouselItems = [
    { id: 0, image: require('../assets/bikaambon.jpg') },
    { id: 1, image: require('../assets/Chocopie.jpg') },
    { id: 2, image: require('../assets/Chitato.jpg') },
    { id: 3, image: require('../assets/C1.jpg') },
  ];

  return (
    <View style={styles.carouselContainer}>
      <Swiper
        style={styles.wrapper}
        showsButtons={false}
        dotStyle={styles.dotStyle}
        activeDotStyle={styles.activeDotStyle}
      >
        {carouselItems.map((item) => (
          <View key={item.id} style={styles.slide}>
            <Image source={item.image} style={styles.image} />
          </View>
        ))}
      </Swiper>
    </View>
  );
};

const styles = StyleSheet.create({
  carouselContainer: {
    height: 160,
    width: '85%',
    alignSelf: 'center',
    borderRadius: 20,
    overflow: 'hidden',
    marginTop: 20,
  },
  wrapper: {},
  slide: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  image: {
    width: '100%',
    height: '100%',
    resizeMode: 'cover',
    borderRadius: 16,
  },
  dotStyle: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: 'lightgray', // Warna dot yang tidak aktif
    marginHorizontal: 5,
  },
  activeDotStyle: {
    width: 12,
    height: 12,
    borderRadius: 6,
    backgroundColor: 'white', // Warna dot yang aktif
    marginHorizontal: 5,
  },
});

export default Carousel;
