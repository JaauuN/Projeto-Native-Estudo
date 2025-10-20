import React, { useState } from 'react';
import { useColorScheme } from '@/hooks/use-color-scheme';
import { Colors } from '@/constants/theme';

import { ThemedText } from '@/components/themed-text';
import { ThemedView } from '@/components/themed-view';

import { router } from 'expo-router';

import { Dimensions, FlatList, Image, ScrollView, StyleSheet, TouchableOpacity, View } from 'react-native';
import { Searchbar } from 'react-native-paper';

import { useSharedValue } from "react-native-reanimated";
import Carousel, { ICarouselInstance, Pagination, } from "react-native-reanimated-carousel";


const width = Dimensions.get('window').width;
const anuncios = [
  { id: '1', image: require('@/assets/images/react-logo.png') },
  { id: '2', image: require('@/assets/images/react-logo.png') },
  { id: '3', image: require('@/assets/images/react-logo.png') },
  { id: '4', image: require('@/assets/images/react-logo.png') }
];

const lojas = [
  { id: '1', title: 'Pague Menos',image: require('@/assets/farmacias/pague-menos.png') },
  { id: '2', title: 'Drogasil',image: require('@/assets/farmacias/drogasil.png') },
  { id: '3', title: 'Extrafarma',image: require('@/assets/farmacias/extrafarma.png') },
  { id: '4', title: 'Farmácia Popular',image: require('@/assets/farmacias/popular.png') },
  { id: '5', title: 'Economia Farma',image: require('@/assets/farmacias/economia.png') },
  { id: '6', title: 'Farmacenter',image: require('@/assets/farmacias/farmacenter.png') },
];

const categorias = [
  { id: '1', categorias: 'Tudo', title: 'Tudo', image: require('@/assets/images/Geral-Rem.png') },
  { id: '2', categorias: 'Analgésicos', title: 'Analgésicos', image: require('@/assets/images/Analge.png') },
  { id: '3', categorias: 'Anti-inflamatórios', title: 'Anti-inflamatórios', image: require('@/assets/images/Anti-Ale.png') },
  { id: '4', categorias: 'Anti-alérgicos', title: 'Anti-alérgicos', image: require('@/assets/images/Anti-Inf.png') },
];

const telaPesquisa = () => {
  router.push('/home/pesquisa');
};

export default function Home() {
  const [searchQuery, setSearchQuery] = useState('');
  const ref = React.useRef<ICarouselInstance>(null);
  const progress = useSharedValue<number>(0);
  const colorScheme = useColorScheme();

  const onPressPagination = (index: number) => {
    ref.current?.scrollTo({
      count: index - progress.value,
      animated: true,
    });

  };

  return (

    <ThemedView style={styles.container}>
        <ThemedView style={styles.containerNav}>
          <Image source={require('@/assets/images/Cure+.png')} style={styles.logo} />
          <TouchableOpacity onPress={telaPesquisa} activeOpacity={1} style={{ width: '90%' }}>
            <Searchbar style={[styles.nav, { backgroundColor: '#fff' }]}
            placeholder="Busca"
            onChangeText={setSearchQuery}
            value={searchQuery}
            onPress={telaPesquisa}
            editable={false}
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
          </TouchableOpacity>
        </ThemedView>
        <View style={styles.sombraBarrasuperior} pointerEvents="none" />

  <ScrollView directionalLockEnabled={true} style={{ zIndex: 1 }}>
        <View style={styles.carouselContainer}>
          {/*https://rn-carousel.dev/usage*/}
          <Carousel
            ref={ref}
            width={width}
            height={width / 2}
            data={anuncios}
            loop
            autoPlay
            autoPlayInterval={5000}
            mode="parallax"
            onProgressChange={progress}
            renderItem={({ item }) => (
              <View style={styles.anuncioContainer}>
                <Image source={item.image} style={styles.anuncioImage} resizeMode="contain" />
              </View>
            )}
          />
          <Pagination.Basic
            progress={progress}
            data={anuncios}
            dotStyle={{ backgroundColor: Colors[colorScheme ?? 'light'].dotBack, borderRadius: 50 }}
            activeDotStyle={{ backgroundColor: Colors[colorScheme ?? 'light'].dotActive, borderRadius: 50 }}
            containerStyle={{ gap: 6, marginBottom: 10 }}
            onPress={onPressPagination}
          />
        </View>
        
        <ThemedView style={[styles.containerContent, { backgroundColor: 'transparent' }]}>
          <ThemedText style={styles.titulo}>Lojas Parceiras</ThemedText>
          <FlatList
            data={lojas}
            keyExtractor={item => item.id}
            horizontal
            renderItem={({ item }) => (
                 <TouchableOpacity style={[styles.lojasContainer]}>
                    <View style={[styles.imageContainer, item.id === '6' && styles.lojaespecial]}>
                      <Image source={item.image} style={styles.lojasImage} resizeMode='contain'/>
                    </View>
                  <ThemedText style={styles.lojasTitle}>{item.title}</ThemedText>
                </TouchableOpacity>
            )}
            showsHorizontalScrollIndicator={false}
          />
        </ThemedView>

        <ThemedView style={[styles.containerContent, { backgroundColor: 'transparent' }]}>
          <ThemedText style={styles.titulo}>Categorias</ThemedText>
          <FlatList
            data={categorias}
            keyExtractor={item => item.id}
            horizontal
            scrollEnabled={false}
            renderItem={({ item }) => (
              <TouchableOpacity
                style={styles.containerCategoria}
                onPress={() => router.push(`/home/categorias-remedios/${item.categorias}`)}
              >
              <Image source={item.image} style={styles.imagemCategoria} />
              <ThemedText style={styles.tituloCategoria}>{item.title}</ThemedText>
            </TouchableOpacity>
              )}
            contentContainerStyle={{ alignItems: 'center', justifyContent: 'space-between', width: '100%',padding:5 }}
          />
        </ThemedView>

        <ThemedView style={[styles.containerContent, { backgroundColor: 'transparent' }]}>
          <View style={styles.sobrenosContainer}>
            <Image source={require('@/assets/images/Promo-G.png')} style={styles.sobrenosImage} resizeMode="cover"/>
          </View>
        </ThemedView>
      </ScrollView>

    </ThemedView>
  );

}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  containerContent: {
    width: '100%',
    marginBottom: 20,
  },
  containerNav: {
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#19535F',
    paddingTop: 60,
    paddingBottom: 20,
  },
  nav: {
    height: 40,
    width: '100%',
    borderRadius: 25,
    backgroundColor: '#000000ff',
  },
  logo: {
    position: 'absolute',
    top: 30,
    left: 0,
    width: 120,
    height: 25,
    marginBottom: 15,
  },
  

  carouselContainer: {
    alignItems: 'center',
  },
  anuncioContainer: {
    width: '100%',
    flex: 1,
    borderRadius: 25,
    backgroundColor: '#E6E6E6',
    alignSelf: 'center',
    // SOMBRAS
    shadowColor: '#000000ff',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.12,
    shadowRadius: 8,
    elevation: 6,
  },
  anuncioImage: {
    width: '100%',
    height: '100%',
  },

  lojasContainer: {
    width: 90, 
    alignItems: 'center',
    backgroundColor: '#E6E6E6',
    padding: 5,
    gap: 5,
    borderRadius: 12,
    marginRight: 10,
    marginBottom: 10,
    left: 5,
    // SOMBRAS
    shadowColor: '#000000ff',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.12,
    shadowRadius: 8,
    elevation: 6,
  },
  imageContainer: {
    position: 'relative',
    alignItems: 'center',
    justifyContent: 'center',
    height: 80,
    width: 80,
    borderColor: '#dadadaff',
    borderWidth: 2,
    borderRadius: 100,
    overflow: 'hidden',
    // SOMBRAS
    shadowColor: '#000000ff',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.12,
    shadowRadius: 8,
  },
  lojasImage: {
    position: 'absolute',
    height: 80,
    width: 80,
  },
  lojasTitle: {
    fontSize: 12,
    textAlign: 'center',
    fontWeight: 'bold',
    color: '#000000ff',
  },
  lojaespecial: {
    backgroundColor: '#044c9b',
  },

  containerCategoria: {
    width: 90,
    height: 80,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#E6E6E6',
    borderRadius: 12,
     marginBottom: 6,
    // SOMBRAS
    shadowColor: '#000000ff',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.12,
    shadowRadius: 8,
    elevation: 6,
  },
  imagemCategoria: {
    width: 50,
    height: 50,
    overflow: 'hidden',
  },
  tituloCategoria: {
    fontSize: 9,
    textAlign: 'center',
    fontWeight: 'bold',
    color: '#000000ff',
    
  },
  
  sobrenosContainer: {
    width: '100%',
    alignItems: 'center',
    alignSelf: 'center',
  },
  sobrenosImage: {
    width: '95%',
    height: 160,
    borderRadius: 12,
    alignSelf: 'center',
    // SOMBRAS
    shadowColor: '#000000ff',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.12,
    shadowRadius: 8,
    elevation: 6,
  },

  titulo: {
    fontSize: 21,
    fontWeight: 'bold',
    marginBottom: 15,
    left: 5,

  },
  sombraBarrasuperior: {
    position: 'absolute',
    top: 120,
    left: 0,
    right: 0,
    height: 3,
    backgroundColor: '#19535F',
    opacity: 0.8,
    zIndex: 0,
  },

}); 
