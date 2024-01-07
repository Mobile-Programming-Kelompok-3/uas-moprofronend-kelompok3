import { ScrollView, StyleSheet, Text, View } from 'react-native'
import React from 'react'
import Header from '../components/Header'
import SearchBar from '../components/SearchBar'
import MenuCard from '../components/MenuCard'
import Carousel from '../components/Carrousel'


const Homescreen = () => {

  return (
    <ScrollView showsVerticalScrollIndicator={false}>
      <Header />
      <Carousel />
      <MenuCard />
    </ScrollView>
  )
}

export default Homescreen

const styles = StyleSheet.create({})