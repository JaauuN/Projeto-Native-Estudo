import React, { useState } from 'react';

import { ThemedText } from '@/components/themed-text';
import { ThemedTextInput } from '@/components/themed-textinput';
import { ThemedView } from '@/components/themed-view';

import { router } from 'expo-router';
import { FlatList, ScrollView, StyleSheet, TouchableOpacity } from 'react-native';
import { Button, Searchbar, Text } from 'react-native-paper';

export default function Home() {
  const [item, setItem] = useState('');
  const [lista, setLista] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');

  // Função para adicionar item
  const adicionarItem = () => {
    if (item.trim() === '') return;
    setLista([...lista, { id: Date.now().toString(), nome: item }]);
    setItem('');
  };

  // Função para remover item
  const removerItem = (id) => {
    setLista(lista.filter((el) => el.id !== id));
  };

  const telaPesquisa = () => {
    router.push('/home/pesquisa');
  };
  
  return (
    <ThemedView style={styles.container}>
      <ThemedView style={styles.containerNav}>
        <Searchbar 
            style={[styles.nav, {backgroundColor:'#fff'}]}
            placeholder="Busca"
            onChangeText={setSearchQuery}
            value={searchQuery}
            inputStyle={{ 
              color: '#000000ff', 
              paddingVertical: 0, 
              minHeight: 0, 
              fontSize:14 }} 
            iconColor='#000000ff'
             theme={
              { colors: {
                primary: '#3F72AF',
                onSurface: '#9BA1A6',
              } }

            } 
          />
      </ThemedView>
        
      <ScrollView style={styles.containerContent}>
         <ThemedView> 
            <ThemedText style={styles.titulo}>🛒 Lista de Compras</ThemedText>
            <ThemedTextInput
              placeholder="Digite um item..."
              value={item}
              onChangeText={setItem}>
            </ThemedTextInput>
              
          <Button mode="contained" onPress={adicionarItem} buttonColor='#3F72AF' textColor='#fff'>
            Adicionar
          </Button>

          <FlatList
            style={styles.lista}
            data={lista}
            keyExtractor={(el) => el.id}
            renderItem={({ item }) => (
              <TouchableOpacity onPress={() => removerItem(item.id)} style={styles.item} activeOpacity={0.5}>
                <Text style={{ color: '#000000ff' }}>{item.nome}</Text>
              </TouchableOpacity>
            )}
          />
        </ThemedView>
      </ScrollView>
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: 'center',alignItems: 'center'},
  containerContent: { width: '100%',},
  titulo: { marginTop: 20,fontSize: 24, fontWeight: 'bold', marginBottom: 30, textAlign: 'center'},
  input: { borderWidth: 1, padding: 8 ,marginBottom: 10, borderRadius: 10},
  lista: { marginTop: 20},
  item: {padding: 130,fontSize: 18,borderColor:'#3F72AF',borderWidth: 2 ,backgroundColor:'#fff',borderRadius:150,margin:3,},
  nav: {height: 40 ,width:'80%', borderRadius:25, justifyContent: 'center', top:20},
  containerNav:{height:'12%', width:'100%',backgroundColor:'#112D4E', justifyContent: 'center',alignItems: 'center'}
});