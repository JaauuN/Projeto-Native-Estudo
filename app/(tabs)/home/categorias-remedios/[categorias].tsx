import React from 'react';
import { router } from 'expo-router';
import { FlatList, StyleSheet, TouchableOpacity, Image, View } from 'react-native';
import { useLocalSearchParams } from 'expo-router';
import { MaterialIcons } from '@expo/vector-icons';
import { produtos } from '@/app/(tabs)/home/categorias-remedios/produtos';
import { ThemedView } from '@/components/themed-view';
import { ThemedText } from '@/components/themed-text';


export default function Telascategorias() {
  const params = useLocalSearchParams();
  const categorias = params.categorias as string | undefined;
  const categoria = categorias ?? 'Tudo';

return (
    <ThemedView style={styles.container}>
      <View style={styles.sombraBarrasuperior} pointerEvents="none"/>
        <ThemedView style={styles.header}>
          <TouchableOpacity onPress={() => router.back()}>
            <MaterialIcons name="arrow-back" size={40} style={styles.botaovolta}/>
          </TouchableOpacity>
          <ThemedText style={styles.tituloCategoria}>{categoria}</ThemedText>
      </ThemedView>
      <FlatList
        data={produtos.filter(item => categoria === 'Tudo' || item.categoria === categoria)}
        keyExtractor={item => item.id}
        numColumns={2}
        contentContainerStyle={{ padding: 15, gap: 5 }}
        columnWrapperStyle={{ gap: 5 }}
        renderItem={({ item }) => (
          <TouchableOpacity style={styles.produtoContainer}>
               <Image source={item.image} style={styles.produtoImage} />
              <ThemedText style={styles.produtoTitle}>{item.title}</ThemedText>
          </TouchableOpacity>
          
        )}
      />
    </ThemedView>
  );

}
  
const styles = StyleSheet.create({
    container: { 
      flex: 1,
    },
    header: {
      width: '100%',
      flexDirection: 'row',
      paddingTop: 35,
      paddingBottom: 10,
      paddingLeft: 10,
      alignItems: 'center',
      backgroundColor: '#19535F',
      color: '#F0F3F5',
    },
    botaovolta: {
      width: 40,
      height: 40,
      color: '#F0F3F5',
    },
    tituloCategoria: {
      fontSize: 24,
      paddingLeft: 5,
      fontWeight: 'bold',
      color: '#F0F3F5',
    },

    produtoContainer: {
      flex: 1,
      width: '90%',
      height: 260,
      borderRadius: 10,
      alignItems: 'center',
      backgroundColor: '#E6E6E6',
      // SOMBRAS
      shadowColor: '#000000ff',
      shadowOffset: { width: 0, height: 4 },
      shadowOpacity: 0.12,
      shadowRadius: 8,
      elevation: 6,

    },
    produtoImage: {
      width: '90%',
      height: '50%',
      borderRadius: 10,
      marginTop: 10,
    },
    produtoTitle: {
      color: '#000000ff',
      marginLeft: 10,
      justifyContent: 'center',
    },

    sombraBarrasuperior: {
    position: 'absolute',
    top: 85,
    left: 0,
    right: 0,
    height: 3,
    backgroundColor: '#19535F',
    opacity: 0.8,
    zIndex: 0,
  },

  });