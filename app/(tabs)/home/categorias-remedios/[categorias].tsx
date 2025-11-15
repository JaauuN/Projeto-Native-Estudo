import React from 'react';
import { Dimensions ,FlatList, StyleSheet, TouchableOpacity, Image, View, Text } from 'react-native';
import { useLocalSearchParams, router } from 'expo-router';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { AntDesign } from '@expo/vector-icons';
import { produtos } from '@/app/(tabs)/home/categorias-remedios/produtos';
import { ThemedView } from '@/components/themed-view';
import { ThemedText } from '@/components/themed-text';


export default function Telascategorias() {
  const params = useLocalSearchParams();
  const categorias = params.categorias as string | undefined;
  const categoria = categorias ?? 'Tudo';
  const areaSafe = useSafeAreaInsets();

return (
    <ThemedView style={styles.container}>
        <ThemedView style={[styles.header,{paddingTop: areaSafe.top + 10}]}>
          <TouchableOpacity onPress={() => router.back()} style={styles.containerBotao}>
            <AntDesign name="left" size={20} style={styles.botaovolta}/>
          </TouchableOpacity>
          <ThemedText style={styles.tituloCategoria}>{categoria}</ThemedText>
      </ThemedView>
      <View style={styles.sombraBarrasuperior} pointerEvents="none"/>

      <FlatList
        data={produtos.filter(item => categoria === 'Tudo' || item.categoria === categoria)}
        keyExtractor={item => item.id}
        numColumns={2}
        contentContainerStyle={{ padding: 15, gap: 5 }}
        columnWrapperStyle={{ gap: 5 }}
        renderItem={({ item }) => (
          <ThemedView style={styles.produtoContainer}>
            <ThemedView style={styles.containerImage}>
              <Image source={item.image} style={styles.produtoImage} resizeMode='contain' />
            </ThemedView>
              <ThemedText style={styles.produtoTitle}>{item.title}</ThemedText>
              <TouchableOpacity style={styles.botaodetalhes} onPress={() => router.push({pathname: "/home/categorias-remedios/detalhes-produtos/[detalhesProdutos]" , params: {detalhesProdutos : item.id}})}>
                <Text style={styles.detalhesProduto}>Ver Detalhes</Text>
              </TouchableOpacity>
          </ThemedView>
          
        )}
      />
    </ThemedView>
  );

}
// Calculo para os itens serem rendizados em colunas de maneira correta
// baseado na tela do aparelho que esta sendo utilizado durante o uso do app.
const { width } = Dimensions.get('window');
const numColunas = 2;
const padding = 15;
const gapColunas = 5; 
const paddingEsquerdoDireito = padding * 2;
const itemWidth = (width - paddingEsquerdoDireito - gapColunas) / numColunas;
  
const styles = StyleSheet.create({
container: { 
  flex: 1,
},
header: {
  width: '100%',
  flexDirection: 'row',
  paddingBottom: 10,
  paddingLeft: 10,
  alignItems: 'center',
  backgroundColor: '#19535F',
  color: '#F0F3F5',
},
botaovolta: {
  color: '#000000ff',
},
containerBotao: {
  display: 'flex',
  width: 40,
  height: 40,
  alignItems: 'center',
  justifyContent: 'center',
  backgroundColor: '#E6E6E6',
  borderRadius: 50,
},
tituloCategoria: {
  fontSize: 20,
  paddingLeft: 10,
  fontWeight: 'bold',
  color: '#F0F3F5',
},

produtoContainer: {
  width: itemWidth,
  height: 240,
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
containerImage: {
  width: '90%',
  borderRadius: 10,
  marginTop: 10,
  padding: 10,
  alignItems: 'center',
  justifyContent: 'center',
  backgroundColor: 'transparent', 
},
produtoImage: {
  width: 120,
  height: 120,
},
produtoTitle: {
  fontSize: 14,
  alignSelf: 'center',
  color: '#000000ff',
  marginLeft: 10,
  fontWeight: 'bold',
},
botaodetalhes:{
  height:35,
  width:'90%',
  borderRadius: 20,
  textAlign: 'center',
  backgroundColor: '#19535F',
  justifyContent: 'center',
  alignItems: 'center',
  marginTop: 'auto',
  marginBottom: 5,
},
detalhesProduto: {
  fontSize: 16,
  color: '#F0F3F5',
},

sombraBarrasuperior: {
  left: 0,
  right: 0,
  height: 3,
  backgroundColor: '#19535F',
  opacity: 0.7,
},

});