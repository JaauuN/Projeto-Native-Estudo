import { ThemedView } from "@/components/themed-view";
import { collection, db, doc, getDoc, onSnapshot, query, setDoc, where } from "@/services/firebase";
import { AntDesign } from '@expo/vector-icons';
import { useEffect, useState } from "react";
import { FlatList, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import ChatRoom from "./chatroom";

const LOJAS = [
  { value: '1', label: 'Pague Menos'},
  { value: '2', label: 'Drogasil'},
  { value: '3', label: 'Extrafarma'},
  { value: '4', label: 'Economia Farma'},
  { value: '5', label: 'Farmácia Popular'},
  { value: '6', label: 'Farmacenter'},
];

export default function ChatList({ userId }: { userId: string }) {
  const [chats, setChats] = useState<any[]>([]);
  const [openChatId, setOpenChatId] = useState<string | null>(null);
  const [userType, setUserType] = useState<'cliente' | 'empresa' | null>(null);
  const [empresasDisponiveis, setEmpresasDisponiveis] = useState<any[]>([]);

  useEffect(() => {
    if (!userId || userId === "anonymous") return;
    
    // Verificar tipo de usuário
    const verificarTipo = async () => {
      const clienteDoc = await getDoc(doc(db, 'usuarios', userId));
      if (clienteDoc.exists()) {
        setUserType('cliente');
      } else {
        const empresaDoc = await getDoc(doc(db, 'empresas', userId));
        if (empresaDoc.exists()) {
          setUserType('empresa');
        }
      }
    };
    verificarTipo();

    // Buscar chats do usuário
    const q = query(collection(db, "chats"), where("participants", "array-contains", userId));
    const unsub = onSnapshot(q, (snap: any) => {
      const arr = snap.docs.map((d: any) => ({ id: d.id, ...d.data() }));
      setChats(arr);
    }, (err: any) => {
      console.warn("Erro ao escutar chats:", err);
    });
    return () => unsub();
  }, [userId]);

  useEffect(() => {
    // Buscar todas as empresas cadastradas se for cliente
    if (userType === 'cliente') {
      const q = query(collection(db, "empresas"));
      const unsub = onSnapshot(q, (snap: any) => {
        const empresas = snap.docs.map((d: any) => ({ 
          id: d.id, 
          ...d.data(),
          nomeExibicao: LOJAS.find(l => l.value === d.data().empresa)?.label || 'Empresa'
        }));
        setEmpresasDisponiveis(empresas);
      });
      return () => unsub();
    }
  }, [userType]);

  const iniciarChatComEmpresa = async (empresaId: string, empresaNome: string) => {
    const ids = [userId, empresaId].sort();
    const chatId = ids.join("_");
    const chatRef = doc(db, "chats", chatId);
    try {
      await setDoc(chatRef, { 
        participants: ids, 
        empresaNome,
        createdAt: new Date() 
      }, { merge: true });
      setOpenChatId(chatId);
    } catch (err: any) {
      console.warn("Erro ao criar chat:", err);
    }
  };

  if (openChatId) {
    return <ChatRoom chatId={openChatId} userId={userId} onClose={() => setOpenChatId(null)} />;
  }

  if (userId === "anonymous") {
    return (
      <ThemedView style={styles.container}>
        <View style={styles.anonContainer}>
          <AntDesign name="warning" size={48} color="#19535F" />
          <Text style={styles.anonTitle}>Acesso Restrito</Text>
          <Text style={styles.anonText}>Faça login na aba Perfil para conversar com as farmácias.</Text>
        </View>
      </ThemedView>
    );
  }

  return (
    <ThemedView style={styles.container}>
      {userType === 'cliente' && (
        <>
          <Text style={styles.sectionTitle}>💬 Conversar com Farmácias</Text>
          <FlatList
            data={empresasDisponiveis}
            keyExtractor={(i: any) => i.id}
            renderItem={({ item }: any) => (
              <TouchableOpacity 
                onPress={() => iniciarChatComEmpresa(item.id, item.nomeExibicao)} 
                style={styles.empresaItem}
              >
                <View style={styles.empresaIcon}>
                  <AntDesign name="medicine-box" size={24} color="#19535F" />
                </View>
                <Text style={styles.empresaNome}>{item.nomeExibicao}</Text>
                <AntDesign name="right" size={16} color="#666" />
              </TouchableOpacity>
            )}
            ListEmptyComponent={<Text style={styles.empty}>Nenhuma farmácia disponível no momento.</Text>}
          />

          {chats.length > 0 && (
            <>
              <Text style={[styles.sectionTitle, {marginTop: 20}]}>💬 Minhas Conversas</Text>
              <FlatList
                data={chats}
                keyExtractor={(i: any) => i.id}
                renderItem={({ item }: any) => (
                  <TouchableOpacity onPress={() => setOpenChatId(item.id)} style={styles.chatItem}>
                    <AntDesign name="message" size={20} color="#19535F" style={{marginRight: 8}} />
                    <View style={{flex: 1}}>
                      <Text style={styles.chatTitle}>{item.empresaNome || 'Chat'}</Text>
                    </View>
                    <AntDesign name="right" size={16} color="#666" />
                  </TouchableOpacity>
                )}
              />
            </>
          )}
        </>
      )}

      {userType === 'empresa' && (
        <>
          <Text style={styles.sectionTitle}>📨 Atendimentos</Text>
          <FlatList
            data={chats}
            keyExtractor={(i: any) => i.id}
            renderItem={({ item }: any) => (
              <TouchableOpacity onPress={() => setOpenChatId(item.id)} style={styles.chatItem}>
                <AntDesign name="user" size={20} color="#19535F" style={{marginRight: 8}} />
                <View style={{flex: 1}}>
                  <Text style={styles.chatTitle}>Cliente</Text>
                  <Text style={styles.chatSubtitle}>Atendimento em andamento</Text>
                </View>
                <AntDesign name="right" size={16} color="#666" />
              </TouchableOpacity>
            )}
            ListEmptyComponent={<Text style={styles.empty}>Nenhum atendimento no momento.</Text>}
          />
        </>
      )}
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  container: { flex:1, padding:10 },
  
  anonContainer: { flex: 1, justifyContent: 'center', alignItems: 'center', padding: 20 },
  anonTitle: { fontSize: 20, fontWeight: '700', color: '#19535F', marginTop: 16 },
  anonText: { fontSize: 14, color: '#666', textAlign: 'center', marginTop: 8 },

  sectionTitle: { fontSize: 16, fontWeight: '700', color: '#19535F', marginBottom: 12 },

  empresaItem: { 
    flexDirection: 'row', 
    alignItems: 'center', 
    padding: 14, 
    backgroundColor: '#E6E6E6', 
    marginBottom: 8, 
    borderRadius: 12 
  },
  empresaIcon: { 
    width: 44, 
    height: 44, 
    borderRadius: 22, 
    backgroundColor: '#AEE1CD', 
    alignItems: 'center', 
    justifyContent: 'center', 
    marginRight: 12 
  },
  empresaNome: { flex: 1, fontSize: 16, fontWeight: '600', color: '#000' },

  chatItem: { 
    flexDirection: 'row', 
    alignItems: 'center', 
    padding: 12, 
    backgroundColor: '#E6E6E6', 
    marginBottom: 8, 
    borderRadius: 12 
  },
  chatTitle: { fontSize: 16, fontWeight: '600', color: '#000' },
  chatSubtitle: { fontSize: 12, color: '#666', marginTop: 2 },
  
  empty: { color:'#666', marginTop:16, textAlign:'center' }
});