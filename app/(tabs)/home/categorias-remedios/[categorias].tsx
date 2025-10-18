import React from 'react';
import { View, Text, FlatList, StyleSheet } from 'react-native';
import { useLocalSearchParams } from 'expo-router';
import { produtos } from '@/app/(tabs)/home/categorias-remedios/produtos';

export default function Telascategorias() {
  const params = useLocalSearchParams();
  const categorias = params.categorias as string | undefined;
  const categoria = categorias ?? 'tudo';

return (
    <View style={styles.container}>
      <Text style={{ fontWeight: 'bold', fontSize: 18, margin: 12 }}>{categoria.toUpperCase()}</Text>
      <FlatList
        data={produtos.filter(item => categoria === 'tudo' || item.categoria === categoria)}
        keyExtractor={item => item.id}
        renderItem={({ item }) => <Text style={{ padding: 12 }}>{item.title} — R$ {item.preço.toFixed(2)}</Text>}
      />
    </View>
  );

}

const styles = StyleSheet.create({
    container: { 
      flex: 1, 
      backgroundColor: '#ffffff'
    },

  });