import { ThemedText } from '@/components/themed-text';
import { ThemedView } from '@/components/themed-view';
import { Colors } from '@/constants/theme';
import { useColorScheme } from '@/hooks/use-color-scheme';
import { auth, db } from '@/services/firebase';
import { AntDesign } from '@expo/vector-icons';
import { router } from 'expo-router';
import { onAuthStateChanged } from 'firebase/auth';
import { doc, getDoc } from 'firebase/firestore';
import React, { useEffect, useState } from 'react';
import { Dimensions, FlatList, Image, Linking, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { Modal, Portal, Searchbar, TextInput } from 'react-native-paper';
import { useSharedValue } from "react-native-reanimated";
import Carousel, { ICarouselInstance, Pagination, } from "react-native-reanimated-carousel";
import { useSafeAreaInsets } from 'react-native-safe-area-context';

const width = Dimensions.get('window').width;
const anuncios = [
  { id: '1', image: require('@/assets/images/Cure+.png') },
  { id: '2', image: require('@/assets/images/Cure+.png') },
  { id: '3', image: require('@/assets/images/Cure+.png') },
  { id: '4', image: require('@/assets/images/Cure+.png') }
];

const lojas = [
  { id: '1', title: 'Pague Menos', image: require('@/assets/farmacias/pague-menos.png'), site: 'https://www.paguemenos.com.br/', cep: '60000-000' },
  { id: '2', title: 'Drogasil', image: require('@/assets/farmacias/drogasil.png'), site: 'https://www.drogasil.com.br/', cep: '60010-000' },
  { id: '3', title: 'Extrafarma', image: require('@/assets/farmacias/extrafarma.png'), site: 'https://www.extrafarma.com.br/?srsltid=AfmBOopto7RP-HOB23SywEKpZY9ZMUT9ScvPzjaf1kA3T4SfcaYCS72x', cep: '60020-000' },
  { id: '4', title: 'Economia Farma', image: require('@/assets/farmacias/economia.png'), site: 'https://www.economiafarma.com.br/', cep: '60030-000' },
  { id: '5', title: 'Farmácia Popular', image: require('@/assets/farmacias/popular.png'), site: 'https://www.gov.br/saude/pt-br/composicao/sectics/farmacia-popular', cep: '60040-000' },
  { id: '6', title: 'Farmacenter', image: require('@/assets/farmacias/farmacenter.png'), site: 'https://www.instagram.com/farmacenterbaturite_/', cep: '62760-000' },
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
  // Parte que é usada para o CEP
  const [cep, setCep] = useState('');
  const [tempCep, setTempCep] = useState('');
  const [endereco, setEndereco] = useState('');
  const [cidade, setCidade] = useState('');
  const [estado, setEstado] = useState('');
  const [cepModalVisible, setModalVisible] = useState(false);
  const showModal = () => setModalVisible(true);
  const hideModal = () => setModalVisible(false);

  const [lojasProximas, setLojasProximas] = useState(lojas);
  const ref = React.useRef<ICarouselInstance>(null);
  const progress = useSharedValue<number>(0);
  const colorScheme = useColorScheme();
  const areaSafe = useSafeAreaInsets();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      if (user) {
        try {
          const docRef = doc(db, 'usuarios', user.uid);
          const docSnap = await getDoc(docRef);
          
          if (docSnap.exists()) {
            const dados = docSnap.data();
            const cepUsuario = dados.endereco || '';
            if (cepUsuario && cepUsuario.length === 8) {
              setTempCep(cepUsuario);
              setCep(cepUsuario);
              await buscarEndereco(cepUsuario);
            }
          } else {
            const empresaRef = doc(db, 'empresas', user.uid);
            const empresaSnap = await getDoc(empresaRef);
            
            if (empresaSnap.exists()) {
              const dados = empresaSnap.data();
              const cepEmpresa = dados.endereco || '';
              if (cepEmpresa && cepEmpresa.length === 8) {
                setTempCep(cepEmpresa);
                setCep(cepEmpresa);
                await buscarEndereco(cepEmpresa);
              }
            }
          }
        } catch (error) {
          console.error('Erro ao buscar CEP do usuário:', error);
        }
      } else {
         // se o usuario deslogar o cep dele é limpo
        setCep('');
        setTempCep('');
        setEndereco('');
        setCidade('');
        setEstado('');
      }
    });
    
    return unsubscribe;
  }, []);

  const onPressPagination = (index: number) => {
    ref.current?.scrollTo({
      count: index - progress.value,
      animated: true,
    });
  };

  const buscarEndereco = async (tempCep : string) => {  
    if (tempCep.length !== 8) {
      alert('CEP inválido');
      return;
    }
    const resposta = await fetch(`https://viacep.com.br/ws/${tempCep}/json/`);
    const dados = await resposta.json();

    console.log(dados.logradouro);
    console.log(dados.localidade);  
    console.log(dados.uf);

    setEndereco(dados.logradouro);
    setCidade(dados.localidade);
    setEstado(dados.uf);
    
  };
  const confirmarCep = async () => {
    if (!tempCep.trim()) {
      // Se digitar nada volta ao texto padrão
      setCep('');
      setEndereco('');
      setCidade('');
      setEstado('');
      hideModal();
      return;
    }

    setCep(tempCep);
    await buscarEndereco(tempCep);
    hideModal(); 
  };

  return (

  <ThemedView style={styles.container}>
      <ThemedView style={[styles.containerNav,{paddingTop: areaSafe.top + 45}]}>
          <Image source={require('@/assets/images/Cure+.png')} style={[styles.logo, {top: areaSafe.top + 5}]} />
          <TouchableOpacity onPress={telaPesquisa} activeOpacity={1} style={{ width: '90%' }}>
            <Searchbar style={[styles.nav, { backgroundColor: '#fff' }]}
            placeholder="O que você está sentindo?"
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
      <View style={[styles.containerCep,{top: areaSafe.top + 90}]}>
        <TouchableOpacity style={styles.wrapperCep} onPress={showModal}>
            <AntDesign name="environment" size={18} color="#F0F3F5" style={{ marginRight: 5 }} />
            <Text style={styles.textoCep}>{cidade ? `${endereco}, ${cidade}-${estado}` : 'Insira seu CEP aqui'}</Text>
            <AntDesign name="right" size={12} color="#F0F3F5" style={{ marginLeft: 5 }} />
        </TouchableOpacity>
      </View>

      <Portal>
        <Modal visible={cepModalVisible} onDismiss={hideModal} >
          <View style={styles.containerModal}>
            <Text style={styles.textoModal} >Insira seu CEP</Text>
            <TextInput 
                value={tempCep} 
                mode='outlined'
                activeOutlineColor='transparent'
                onChangeText={text => setTempCep(text)}
                autoFocus={true}
                textColor='#000000ff'
                selectionColor='#000000ff'
                style={styles.inputCep}
              />
              <TouchableOpacity onPress={confirmarCep} style={styles.containerBotaoConfirmar}>
                <Text style={styles.textoConfirmar}>Confirmar</Text>
              </TouchableOpacity>
          </View>
        </Modal>
      </Portal>
      
          
      <ScrollView directionalLockEnabled={true} style={{ zIndex: 1 }} contentContainerStyle={{ paddingTop: 20 } } showsVerticalScrollIndicator={false}>
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
            renderItem={() => (
              <View style={styles.anuncioContainer}>
                <Image source={require('@/assets/images/vacina.png')} style={styles.anuncioImage} resizeMode="contain" />
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
            data={lojasProximas}
            keyExtractor={item => item.id}
            horizontal
            renderItem={({ item }) => (
                 <TouchableOpacity style={[styles.lojasContainer]} onPress={() => Linking.openURL(item.site)}>
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
                onPress={() => router.push({pathname: "/home/categorias-remedios/[categorias]", params: {categorias : item.categorias}})}
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
logo: {
  position: 'absolute',
  left: 0,
  width: 120,
  height: 25,
  },
containerNav: {
  justifyContent: 'center',
  alignItems: 'center',
  backgroundColor: '#19535F',
  paddingBottom: 10,
  },
nav: {
  height: 40,
  width: '100%',
  borderRadius: 25,
  backgroundColor: '#000000ff',
  },
containerCep: {
  position: 'absolute',
  height: 30,
  width: '100%',
  paddingLeft: 15,
  padding: 5,
  backgroundColor: '#19535F',
  borderBottomRightRadius: 20,
  borderBottomLeftRadius: 20,
  zIndex: 2,
},
wrapperCep: {
  flexDirection: 'row',
  alignItems: 'center',
},
textoCep: {
  color: '#F0F3F5',
  fontWeight: 'bold',
  alignSelf: 'center'
},
containerModal:{
  position: 'absolute',
  width: '80%',
  borderRadius: 20,
  padding: 15,
  
  alignSelf: 'center',
  backgroundColor: '#19535F',
  // SOMBRAS
    shadowColor: '#E6E6E6',
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 6,
},
textoModal: {
  color: '#F0F3F5',
  fontSize: 24,
  fontWeight: 'bold',
  borderBottomColor: '#F0F3F5',
  borderBottomWidth: 2,
},
inputCep: {
  backgroundColor: '#E6E6E6',
  marginTop: 10,
},
containerBotaoConfirmar:{
  height: 40,
  width: '100%',
  borderRadius: 20,
  backgroundColor: '#E6E6E6',
  marginTop: 10,
  justifyContent: 'center',
  
},
textoConfirmar: {
  color: '#19535F',
  fontWeight: 'bold',
  alignSelf: 'center',
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
  elevation: 5,
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
  left: 0,
  right: 0,
  height: 3,
  backgroundColor: '#19535F',
  opacity: 0.7,
  zIndex: 1,
},


}); 