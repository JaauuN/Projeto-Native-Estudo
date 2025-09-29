import { ThemedText } from '@/components/themed-text';
import { ThemedView } from '@/components/themed-view';
import { StyleSheet } from 'react-native';
export default function Profile() {
return (

    <ThemedView style={styles.container} >
        <ThemedText>Mundo</ThemedText>
    </ThemedView>
);

 
};

const styles = StyleSheet.create({
    container: { flex: 1, justifyContent: 'center',alignItems: 'center', height: '100%', },

});