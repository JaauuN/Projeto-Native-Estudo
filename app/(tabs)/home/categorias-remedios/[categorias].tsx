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
            <AntDesign name="left" size={30} style={styles.botaovolta}/>
          </TouchableOpacity>
          <ThemedText style={styles.tituloCategoria}>{categoria}</ThemedText>
      </ThemedView>
      <View style={[styles.sombraBarrasuperior, {top: areaSafe.top + 60}]} pointerEvents="none"/>
      <FlatList
        data={produtos.filter(item => categoria === 'Tudo' || item.categoria === categoria)}
        keyExtractor={item => item.id}
        numColumns={2}
        contentContainerStyle={{ padding: 15, gap: 5 }}
        columnWrapperStyle={{ gap: 5 }}
        style={[{zIndex: 1}]}
        renderItem={({ item }) => (
          <ThemedView style={styles.produtoContainer}>
              <Image source={item.image} style={styles.produtoImage} />
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
  width: itemWidth,
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