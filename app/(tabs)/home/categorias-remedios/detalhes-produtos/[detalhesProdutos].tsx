import { produtos } from '@/app/(tabs)/home/categorias-remedios/produtos';
import { ThemedText } from '@/components/themed-text';
import { ThemedView } from '@/components/themed-view';
import { AntDesign } from '@expo/vector-icons';
import { router, useLocalSearchParams } from 'expo-router';
import { Image, Linking, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

export default function DetalhesProdutos(){
  const params = useLocalSearchParams();
  const { detalhesProdutos: produtoId } = params;
  const produto = produtos.find(produto => produto.id === produtoId);
  const areaSafe = useSafeAreaInsets();

  if (!produto) {
    return (
        <ThemedText>Isto aqui serve apenas para impedir que fique com erro de item não identificado no código</ThemedText>
    );
  }

return(
    <ThemedView style={styles.container}>

      <ThemedView style={[styles.header, {paddingTop: areaSafe.top + 10}]}>
          <TouchableOpacity onPress={() => router.back()} style={styles.containerBotao}>
            <AntDesign name="left" size={20} style={styles.botaovolta}/>
          </TouchableOpacity>
          <ThemedView style={styles.containerProdutoTitulo}>
              <ThemedText style={styles.tituloproduto}>{produto.title}</ThemedText>
          </ThemedView>
      </ThemedView>

        <View style={{flex: 1, backgroundColor: '#19535F'}}>
          <ScrollView overScrollMode="never" contentContainerStyle={{ flexGrow: 1 }}>
            <ThemedView style={{ flex: 1 }}>
              <View style={[styles.sombraBarrasuperior, {marginBottom: 0, backgroundColor: '#19535F'}]} pointerEvents="none"/>
              <ThemedView style={styles.containerImage}> 
                <ThemedView style={styles.wrapperImage}>
                  <Image source={produto.image} style={styles.produtoimage} resizeMode='cover'/>
                </ThemedView>
              </ThemedView>
            

            <ThemedView style={styles.containerCategoria}>
              <ThemedView style={styles.containerTexto}>
                <ThemedText style={styles.textoCategoria}>Categoria:</ThemedText>
              </ThemedView>
              <ThemedView style={styles.containerTipo}>
                <ThemedText style={styles.tipoCategoria}>{produto.categoria}</ThemedText>
              </ThemedView>
            </ThemedView>

            <ThemedView style={styles.containerDescricao}>
              <ThemedView style={styles.containertextoInicial}>
                <Text style={styles.textoInicial}>Pode Tratar:</Text>
              </ThemedView>
              <ThemedView style={styles.tagswrapper}>
                {produto.chave.map((item, index) => (
                  <ThemedView key={index} style={styles.containerTags}>
                    {/* Isto aqui pega as tags do produto escolhido e coloca a primeira letra maiuscula*/}
                      <Text style={styles.Tags}>{item.charAt(0).toUpperCase()+item.slice(1)}</Text>
                  </ThemedView>
                ))}
              </ThemedView>

              <ThemedView style={styles.containertextoInicial}>
                <Text style={styles.textoInicial}>Descrição:</Text> 
              </ThemedView>   
              <ThemedView style={styles.descricaoProduto}>
                <Text style={styles.descricaotexto}>{produto.descricao}</Text>
              </ThemedView>

              <TouchableOpacity style={styles.containerbula} onPress={() => Linking.openURL(produto.bula)}>
                <Text style={styles.textoInicial}>Ver Bula</Text>
              </TouchableOpacity>
            </ThemedView>
            </ThemedView>
          </ScrollView>
        </View>
        

    </ThemedView>
);

}

const styles = StyleSheet.create ({
container: {
flex: 1,
},
header:{
  width: '100%',
  flexDirection: 'row',
  paddingBottom: 10,
  paddingLeft: 10,
  alignItems: 'center',
  backgroundColor: '#19535F',
  color: '#F0F3F5',
},
containerBotao:{
  display: 'flex',
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

containerProdutoTitulo:{
  left: 10,
  height: 40,
  paddingRight: 10,
  paddingLeft: 10,
  backgroundColor: '#E6E6E6',
  borderRadius: 10,
  justifyContent: 'center',
  alignItems: 'center',
  // SOMBRAS
  shadowColor: '#000000ff',
  shadowOffset: { width: 0, height: 4 },
  shadowOpacity: 0.12,
  shadowRadius: 8,
  elevation: 6,
},
tituloproduto: {
  color: '#000000ff',
  fontWeight: 'bold',
  alignSelf: 'center',
},
containerImage:{
  width: '100%',
  marginBottom: 10,
  borderBottomRightRadius: 20,
  borderBottomLeftRadius: 20,
  alignItems: 'center',
  backgroundColor: '#E6E6E6',
  // SOMBRAS
  shadowColor: '#000000ff',
  shadowOffset: { width: 0, height: 4 },
  shadowOpacity: 0.12,
  shadowRadius: 8,
  elevation: 6,
},
wrapperImage:{
  width: '60%',
  alignItems: 'center',
  marginTop: 10,
  marginBottom: 10,
  backgroundColor: '#E6E6E6',
},
produtoimage:{
  width: 120,
  height: 180,
},
containerCategoria:{
  left: 10,
  flexDirection: 'row',
  gap:5,
},
containerTexto:{
  width: 90,
  height: 40,
  backgroundColor: '#E6E6E6',
  borderRadius: 10,
  justifyContent: 'center',
  alignItems: 'center',
  // SOMBRAS
  shadowColor: '#000000ff',
  shadowOffset: { width: 0, height: 4 },
  shadowOpacity: 0.12,
  shadowRadius: 8,
  elevation: 6,
},
containerTipo:{
  width: 150,
  height: 40,
  backgroundColor: '#19535F',
  borderRadius: 10,
  justifyContent: 'center',
  alignItems: 'center',
  // SOMBRAS
  shadowColor: '#000000ff',
  shadowOffset: { width: 0, height: 4 },
  shadowOpacity: 0.12,
  shadowRadius: 8,
  elevation: 6,
},
textoCategoria:{
  color: '#000000ff',
  fontWeight: 'bold',
},
tipoCategoria:{
  color: '#F0F3F5',
  fontWeight: 'bold',
},

containerDescricao:{
  display: 'flex',
  width: '90%',
  marginTop: 10,
  borderRadius: 10,
  padding: 10,
  gap: 5,
  alignSelf:'center',
  backgroundColor: '#E6E6E6',
  // SOMBRAS
  shadowColor: '#000000ff',
  shadowOffset: { width: 0, height: 4 },
  shadowOpacity: 0.12,
  shadowRadius: 8,
  elevation: 6,
  zIndex: 1,
},
containertextoInicial:{
  width: 100,
  height: 25,
  backgroundColor: '#19535F',
  borderRadius: 10,
  justifyContent: 'center',
  alignItems: 'center',
  // SOMBRAS
  shadowColor: '#000000ff',
  shadowOffset: { width: 0, height: 4 },
  shadowOpacity: 0.12,
  shadowRadius: 8,
  elevation: 6,
  zIndex: 2
},
textoInicial: {
  color: '#F0F3F5',
  fontWeight: 'bold',
},
tagswrapper:{
  flexDirection: 'row',
  flexWrap: 'wrap',
  gap: 5,
  justifyContent: 'center',
  alignItems: 'center',
  backgroundColor: '#E6E6E6',
  paddingBottom: 5,
  paddingTop: 5,
  },
containerTags:{
  backgroundColor: '#E6E6E6',
  padding: 3,
  borderRadius: 10,
// SOMBRAS
  shadowColor: '#000000ff',
  shadowOffset: { width: 0, height: 4 },
  shadowOpacity: 0.12,
  shadowRadius: 8,
  elevation: 6,
},
Tags:{
  fontWeight: 'bold',
},
descricaoProduto:{
  backgroundColor: '#E6E6E6',
  padding: 10,
  borderRadius: 10,
},
descricaotexto:{
  color: '#000000ff',
  fontWeight: 'bold',
},
containerbula:{
  alignSelf: 'center',
  width: 100,
  height: 40,
  backgroundColor: '#19535F',
  borderRadius: 10,
  justifyContent: 'center',
  alignItems: 'center',
  // SOMBRAS
  shadowColor: '#000000ff',
  shadowOffset: { width: 0, height: 4 },
  shadowOpacity: 0.12,
  shadowRadius: 8,
  elevation: 6,
  zIndex: 2
},
sombraBarrasuperior: {
    position: 'absolute',
    left: 0,
    right: 0,
    height: 3,
    backgroundColor: '#19535F',
    opacity: 0.7,
    zIndex: 1,
  },

})