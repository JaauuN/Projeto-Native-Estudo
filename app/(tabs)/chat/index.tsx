import { Platform, StyleSheet } from 'react-native';

import { ThemedText } from '@/components/themed-text';
import { ThemedView } from '@/components/themed-view';


export default function Busca() {
  return (
    <ThemedView style={styles.container}>
      <ThemedText>Coming Soon...</ThemedText>
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  container: {
    height:'100%',
    justifyContent:'center',
    alignItems:'center'
  },
});
