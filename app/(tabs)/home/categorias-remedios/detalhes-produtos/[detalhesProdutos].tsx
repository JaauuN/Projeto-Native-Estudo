import { StyleSheet, TouchableOpacity, Image, View, Text } from 'react-native';
import { AntDesign } from '@expo/vector-icons';
import { ThemedView } from '@/components/themed-view';
import { ThemedText } from '@/components/themed-text';
import { produtos } from '@/app/(tabs)/home/categorias-remedios/produtos';
import { useLocalSearchParams, router } from 'expo-router';

export default function DetalhesProdutos(){
  const params = useLocalSearchParams();
  const { detalhesProdutos: produtoId } = params;
  const produto = produtos.find(produto => produto.id === produtoId);

  if (!produto) {
    return (
        <ThemedText>Isto aqui serve apenas para impedir que fique com erro de item não identificado no código</ThemedText>
    );
  }

return(
    <ThemedView style={styles.container}>
      <ThemedView style={styles.header}>
          <TouchableOpacity onPress={() => router.back()} style={styles.containerBotao}>
            <AntDesign name="left" size={30} style={styles.botaovolta}/>
          </TouchableOpacity>
          <ThemedText style={styles.tituloDetalhe}>Detalhes</ThemedText>
      </ThemedView>
      <View style={styles.sombraBarrasuperior} pointerEvents="none"/>

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
            <ThemedView style={styles.tagswrapper}>
              {produto.chave.map((item, index) => (
                <ThemedView key={index} style={styles.containerTags}>
                  <Text style={styles.Tags}>{item}</Text>
                </ThemedView>
              ))}
            </ThemedView>    
          </ThemedView>
          
      </ThemedView>

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
  paddingTop: 35,
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
  width: '90%',
  height: 200,
  marginTop: 10,
  borderRadius: 10,
  padding: 10,
  alignSelf:'center',
  backgroundColor: '#E6E6E6',
  // SOMBRAS
  shadowColor: '#000000ff',
  shadowOffset: { width: 0, height: 4 },
  shadowOpacity: 0.12,
  shadowRadius: 8,
  elevation: 6,
},
tagswrapper:{
flexDirection: 'row',
flexWrap: 'wrap',
gap: 5,
justifyContent: 'center',
alignItems: 'center',
backgroundColor: '#E6E6E6',
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

},


sombraBarrasuperior:{
  position: 'absolute',
  top: 85,
  left: 0,
  right: 0,
  height: 3,
  backgroundColor: '#19535F',
  opacity: 0.8,
  zIndex: 1,
},

})