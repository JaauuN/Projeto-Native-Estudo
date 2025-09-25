import { ThemedText } from '@/components/themed-text';
import { ThemedTextInput } from '@/components/themed-textinput';
import { ThemedView } from '@/components/themed-view';
import React, { useState } from 'react';
import { Button, Text, Searchbar } from 'react-native-paper';
import { FlatList, StyleSheet, TouchableOpacity } from 'react-native';
import { Colors } from '@/constants/theme';

export default function App() {
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

  return (
    <ThemedView style={styles.container}>
      <Searchbar 
            style={[styles.nav, {backgroundColor:'#fff'}]}
            placeholder="Busca"
            onChangeText={setSearchQuery}
            value={searchQuery}
            inputStyle={{ color: '#000000ff' }} 
            iconColor='#000000ff'
             theme={
              { colors: {
                primary: '#3F72AF',
                onSurface: '#9BA1A6',
              } }

            } 
          />
      <ThemedView style={styles.containerContent}> 
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
      
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: 'center',alignItems: 'center', paddingTop:100},
  containerContent: { height: '100%',},
  titulo: { fontSize: 24, fontWeight: 'bold', marginBottom: 30, textAlign: 'center'},
  input: { borderWidth: 1, padding: 8 ,marginBottom: 10, borderRadius: 10},
  lista: { marginTop: 20},
  item: {padding: 12,fontSize: 18,borderColor:'#3F72AF',borderWidth: 2 ,backgroundColor:'#fff',borderRadius:150,margin:3,},
  nav: {width:'75%',marginBottom:20,borderWidth: 1, borderRadius:10, borderColor:'#000000ff'},
});