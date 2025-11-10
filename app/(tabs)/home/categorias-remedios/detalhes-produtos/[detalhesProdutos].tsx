import { StyleSheet, TouchableOpacity, Image, View, Text, ScrollView } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { AntDesign } from '@expo/vector-icons';
import { ThemedView } from '@/components/themed-view';
import { ThemedText } from '@/components/themed-text';
import { produtos } from '@/app/(tabs)/home/categorias-remedios/produtos';
import { useLocalSearchParams, router } from 'expo-router';


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
            <AntDesign name="left" size={30} style={styles.botaovolta}/>
          </TouchableOpacity>
          <ThemedText style={styles.tituloDetalhe}>Detalhes</ThemedText>
      </ThemedView>
      <View style={[styles.sombraBarrasuperior, {top: areaSafe.top + 60}]} pointerEvents="none"/>

        <ScrollView>
          <ThemedView style={styles.containerDetalhe}>
            <ThemedView style={styles.containerProdutoTitulo}>
              <ThemedText style={styles.tituloproduto}>{produto.title}</ThemedText>
            </ThemedView>
            <Image source={produto.image} style={styles.produtoimage} />
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
            </ThemedView>
          </ThemedView>
        </ScrollView>
        

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
tituloDetalhe:{
  fontSize: 20,
  paddingLeft: 5,
  fontWeight: 'bold',
  color: '#F0F3F5',
},
containerBotao:{
  display: 'flex',
  width: 40,
  height: 40,
  alignItems: 'center',
  justifyContent: 'center',
},
botaovolta:{
color: '#F0F3F5',
},

containerDetalhe:{
  top: 10,
  borderRadius: 20,
},
containerProdutoTitulo:{
  left: 10,
  width: '50%',
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
tituloproduto: {
  color: '#000000ff',
  fontWeight: 'bold',
},
produtoimage:{
  width: '90%',
  height: '35%',
  borderRadius: 10,
  marginTop: 10,
  marginBottom: 10,
  alignSelf: 'center',
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
  height: 200,
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


sombraBarrasuperior:{
  position: 'absolute',
  left: 0,
  right: 0,
  height: 3,
  backgroundColor: '#19535F',
  opacity: 0.8,
  zIndex: 1,
},

})