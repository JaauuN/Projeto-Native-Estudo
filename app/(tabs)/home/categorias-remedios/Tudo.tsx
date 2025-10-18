import React from 'react';
import { View, Text, FlatList } from 'react-native';
import { produtos } from '@/app/(tabs)/home/categorias-remedios/produtos';

export default function Tudo() {
  return (
    <View style={{ flex: 1 }}>
      <Text>Tudo</Text>
      <FlatList 
      data={produtos} 
      keyExtractor={item => item.id} 
      renderItem={({ item }) => <Text>{item.title}</Text>} />
    </View>
  );
}