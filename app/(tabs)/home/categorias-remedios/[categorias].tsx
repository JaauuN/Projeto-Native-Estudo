import React from 'react';
import { FlatList, StyleSheet, TouchableOpacity, Image, View, Text } from 'react-native';
import { useLocalSearchParams, router } from 'expo-router';
import { AntDesign } from '@expo/vector-icons';
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
          <TouchableOpacity onPress={() => router.back()} style={styles.containerBotao}>
            <AntDesign name="left" size={30} style={styles.botaovolta}/>
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
          <ThemedView style={styles.produtoContainer}>
              <Image source={item.image} style={styles.produtoImage} />
              <ThemedText style={styles.produtoTitle}>{item.title}</ThemedText>
              <TouchableOpacity style={styles.detalhesContainer} onPress={() => router.push({pathname: "/home/categorias-remedios/detalhes-produtos/[detalhesProdutos]" , params: {detalhesProdutos : item.id}})}>
                <Text style={styles.detalhesProduto}>Ver Detalhes</Text>
              </TouchableOpacity>
          </ThemedView>
          
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
      color: '#F0F3F5',
    },
    containerBotao: {
      display: 'flex',
      width: 40,
      height: 40,
      alignItems: 'center',
      justifyContent: 'center',
    },
    tituloCategoria: {
      fontSize: 20,
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
      fontSize: 14,
      color: '#000000ff',
      marginLeft: 10,
      justifyContent: 'center',
    },
    detalhesContainer:{
      height:35,
      width:'90%',
      borderRadius: 20,
      textAlign: 'center',
      backgroundColor: '#19535F',
      justifyContent: 'center',
      alignItems: 'center',
      top: 55,
    },
     detalhesProduto: {
      fontSize: 16,
      color: '#F0F3F5',
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