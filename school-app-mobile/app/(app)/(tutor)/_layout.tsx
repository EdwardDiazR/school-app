import { View, Text } from 'react-native'
import React from 'react'
import { Stack } from 'expo-router'

export default function _layout() {
  console.log("entering tutor");
  
  return (
    <Stack>
        <Stack.Screen name='(tabs)' options={{headerShown:false}}/>
    </Stack>
  )
}