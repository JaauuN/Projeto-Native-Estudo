import React, { useState } from 'react';
import { ThemedText } from '@/components/themed-text';
import { ThemedView } from '@/components/themed-view';
import { StyleSheet, TouchableOpacity, FlatList } from 'react-native';
import { Searchbar } from 'react-native-paper';
import { router } from 'expo-router';


export default function Pesquisa() {
  const [searchQuery, setSearchQuery] = useState('');
  return (
    <ThemedView style={styles.container}>
      <ThemedView style={styles.containerNav}>
        <Searchbar
          style={[styles.nav, { backgroundColor: '#fff' }]}
          placeholder="Busca"
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
      <ThemedText type="title">Detalhes</ThemedText>
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
    paddingTop: 50,
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
});