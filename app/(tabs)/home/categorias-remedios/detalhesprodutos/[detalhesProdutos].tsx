import { StyleSheet, TouchableOpacity, Image, View, Text } from 'react-native';
import { ThemedView } from '@/components/themed-view';
import { ThemedText } from '@/components/themed-text';
import { Produto } from '@/app/(tabs)/home/categorias-remedios/produtos';
import { useLocalSearchParams, router } from 'expo-router';

export default function detalhesProdutos(){
  const params = useLocalSearchParams();
  const produto = params as unknown as Produto;

return(
    <ThemedView>
      <ThemedText style={styles.tituloproduto}>{produto.title}</ThemedText>
      <Image source={produto.image} style={styles.produtoimage} />
      <Text style={styles.textoproduto}>{produto.categoria}</Text>
      <Text style={styles.textoproduto}>{produto.chave.join(', ')}</Text>
    </ThemedView>
);

}

const styles = StyleSheet.create ({
tituloproduto: {
    
},
produtoimage:{

},
textoproduto:{

},

})