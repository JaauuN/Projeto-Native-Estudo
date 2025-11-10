import React, { useState, useEffect } from 'react';
import { ThemedText } from '@/components/themed-text';
import { ThemedView } from '@/components/themed-view';
import { StyleSheet, TouchableOpacity, FlatList, View, Image, Text } from 'react-native';
import { Searchbar } from 'react-native-paper';
import { router } from 'expo-router';
import { produtos, Produto } from '@/app/(tabs)/home/categorias-remedios/produtos';


export default function Pesquisa() {
  const [searchQuery, setSearchQuery] = useState('');
  const [filteredData, setFilteredData] = useState<Produto[]>([]);

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
      <ThemedView style={styles.containerNav}>
        <Searchbar
          style={[styles.nav, { backgroundColor: '#fff' }]}
          placeholder="O que você está sentindo?"
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
        <TouchableOpacity onPress={() => router.back()}>
          <ThemedText style={styles.botaovolta}>Cancelar</ThemedText>
        </TouchableOpacity>
      </ThemedView>
      <FlatList
        data={filteredData}
        numColumns={2}
        contentContainerStyle={{ padding: 15, gap: 5 }}
        columnWrapperStyle={{ gap: 5 }}
        keyExtractor={item => item.id}
        renderItem={
          ({ item }: { item: Produto }) => (
            <ThemedView style={styles.pesquisaContainer}>
              <Image source={item.image} style={styles.pesquisaImage} />
              <ThemedText style={styles.pesquisaTitle}>{item.title}</ThemedText>
              <TouchableOpacity style={styles.detalhesContainer} onPress={() => router.push({pathname: "/home/categorias-remedios/detalhes-produtos/[detalhesProdutos]" , params: {detalhesProdutos : item.id}})}>
                  <Text style={styles.detalhesProduto}>Ver Detalhes</Text>
              </TouchableOpacity>
            </ThemedView>
          )
        }
        ListEmptyComponent={() => (
           <View style={styles.containerVazio}>
                {searchQuery.trim() !== '' && (<ThemedText style={styles.textoVazio}>Nenhum resultado encontrado para "{searchQuery}"</ThemedText>)}
          </View>
        )}
      />
    </ThemedView>
  );
  
}

const styles = StyleSheet.create({
container: { 
    flex: 1, 
  },
containerNav:{
    backgroundColor: '#19535F',
    justifyContent: 'center',
    alignItems: 'center',
    paddingTop: 40,
    paddingBottom: 20,
    flexDirection: 'row',
  },
nav:{
  height: 40,
  width: '80%',
  borderRadius: 25,
  backgroundColor: '#000000ff',
  right: 5,
},
botaovolta:{
  color: '#F0F3F5',
},

pesquisaContainer:{
  width: '50%',
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
pesquisaImage:{
  width: '90%',
  height: '50%',
  borderRadius: 10,
  marginTop: 10,
},
pesquisaTitle:{},
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
containerVazio:{},
textoVazio:{},
});