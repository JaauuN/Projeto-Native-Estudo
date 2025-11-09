import { Stack } from 'expo-router'
import React from 'react';

export default function StackHome (){
  return (
    <Stack>
      <Stack.Screen 
        name="index"
        options={{
          animation: 'fade',
          animationTypeForReplace: 'push',
          headerShown: false,
        }}
      />
      <Stack.Screen 
        name="pesquisa" 
        options={{
          animation: 'fade',
          animationTypeForReplace: 'push',
          headerShown: false,
        }}
      />
      <Stack.Screen 
        name="categorias-remedios/[categorias]" 
        options={{
          animation: 'fade',
          animationTypeForReplace: 'push',
          headerShown: false,
        }}
      />
      <Stack.Screen 
        name="categorias-remedios/detalhes-produtos/[detalhesProdutos]" 
        options={{
          animation: 'fade',
          animationTypeForReplace: 'push',
          headerShown: false,
        }}
      />
    </Stack>
  )
}