import { ScrollView, StyleSheet, Text, View } from 'react-native'
import React from 'react'
import Header from '../components/Header'
import SearchBar from '../components/SearchBar'
import MenuCard from '../components/MenuCard'

const Homescreen = () => {
  return (
    <ScrollView>
      <Header/>
      <SearchBar/>
      <MenuCard/>
    </ScrollView>
  )
}

export default Homescreen

const styles = StyleSheet.create({})