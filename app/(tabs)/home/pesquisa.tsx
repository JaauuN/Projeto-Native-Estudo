import React, { useState, useEffect } from 'react';
import { Dimensions, StyleSheet, TouchableOpacity, FlatList, View, Image, Text } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { ThemedText } from '@/components/themed-text';
import { ThemedView } from '@/components/themed-view';
import { Searchbar } from 'react-native-paper';
import { AntDesign } from '@expo/vector-icons';
import { router } from 'expo-router';
import { produtos, Produto } from '@/app/(tabs)/home/categorias-remedios/produtos';


export default function Pesquisa() {
  const [searchQuery, setSearchQuery] = useState('');
  const [filteredData, setFilteredData] = useState<Produto[]>([]);
  const areaSafe = useSafeAreaInsets();
  

  useEffect(() => {
    if (searchQuery.trim() === '') {
      setFilteredData([]);
    } else {
      const palavraChave = searchQuery.normalize("NFD").replace(/[\u0300-\u036f]/g, "").toLowerCase().split(' ').filter(pesquisa => pesquisa !== '');
      
      const filtro = produtos.filter(item => {
        const textoChave = [item.title].concat(item.chave || []).join(' ');
        return palavraChave.every( pesquisa => textoChave.normalize("NFD").replace(/[\u0300-\u036f]/g, "").toLowerCase().split(' ').some(palavra => palavra.startsWith(pesquisa) ));
    });
      setFilteredData(filtro);
    }
  }, [searchQuery]);

  return (
    <ThemedView style={styles.container}>
      <ThemedView style={[styles.containerNav ,{paddingTop: areaSafe.top + 10}]}>
        <TouchableOpacity onPress={() => router.back() } style={styles.containerBotao}>
          <AntDesign name="left" size={20} style={styles.botaovolta} />
        </TouchableOpacity>
        <Searchbar
          style={[styles.nav, { backgroundColor: '#E6E6E6' }]}
          placeholder="Digite seu sintoma ou remédio."
          onChangeText={setSearchQuery}
          value={searchQuery}
          autoFocus={true}
          inputStyle={{
            color: '#000000ff',
            paddingVertical: 0,
            minHeight: 0,
            fontSize: 14
          }}
          iconColor='#000000ff'
          theme={
            {
              colors: {
                primary: '#3F72AF',
                onSurface: '#9BA1A6',
              }
            }
          }
        />
      </ThemedView>
      <View style={styles.sombraBarrasuperior} pointerEvents="none" />
      <FlatList
        data={filteredData}
        style={[{zIndex: 1}]}
        numColumns={2}
        contentContainerStyle={{ padding: 15, gap: 5 }}
        columnWrapperStyle={{ gap: 5 }}
        keyExtractor={item => item.id}
        renderItem={
          ({ item }: { item: Produto }) => (
            <ThemedView style={styles.pesquisaContainer}>
              <ThemedView style={styles.containerImage}>
                <Image source={item.image} style={styles.pesquisaImage} resizeMode='contain' />
              </ThemedView>
              <ThemedText style={styles.pesquisaTitle}>{item.title}</ThemedText>
              <TouchableOpacity style={styles.detalhesContainer} onPress={() => router.push({pathname: "/home/categorias-remedios/detalhes-produtos/[detalhesProdutos]" , params: {detalhesProdutos : item.id}})}>
                  <Text style={styles.detalhesProduto}>Ver Detalhes</Text>
              </TouchableOpacity>
            </ThemedView>
          )
        }
        ListEmptyComponent={() => (
           <View style={styles.containerVazio}>
                <Text style={styles.textoVazio}>Nenhum resultado encontrado</Text>
          </View>
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
containerNav:{
    backgroundColor: '#19535F',
    justifyContent: 'center',
    alignItems: 'center',
    paddingBottom: 10,
    flexDirection: 'row',
    gap: 10,
  },
nav:{
  height: 40,
  width: '80%',
  borderRadius: 25,
  backgroundColor: '#000000ff',
  right: 5,
},
containerBotao:{
  width: 40,
  height: 40,
  alignItems: 'center',
  justifyContent: 'center',
  backgroundColor: '#E6E6E6',
  borderRadius: 50,
},
botaovolta:{
  color: '#000000ff',
},

pesquisaContainer:{
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
  zIndex: 1,
},
containerImage:{
  width: '90%',
  borderRadius: 10,
  marginTop: 10,
  padding: 10,
  alignItems: 'center',
  justifyContent: 'center',
  backgroundColor: 'transparent',
},
pesquisaImage:{
  width: 120,
  height: 120,
},
pesquisaTitle:{
  fontSize: 14,
  alignSelf: 'center',
  color: '#000000ff',
  marginLeft: 10,
  fontWeight: 'bold',
},
detalhesContainer:{
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
containerVazio:{
  height: 40,
  width:'70%',
  borderRadius: 20,
  marginTop: 10,
  alignSelf: 'center',
  justifyContent: 'center',
  alignItems: 'center',
  backgroundColor: '#19535F',
},
textoVazio:{
  color: '#F0F3F5',
  fontWeight: 'bold',
},

sombraBarrasuperior: {
  left: 0,
  right: 0,
  height: 3,
  backgroundColor: '#19535F',
  opacity: 0.7,
},
});