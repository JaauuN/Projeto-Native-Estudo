import { Stack } from 'expo-router'
import React from 'react';

export default function StackHome (){
 return (
    <Stack screenOptions={{
        headerShown: false,
        animation: 'fade', 
    }}    
    >
    </Stack>
 )
}