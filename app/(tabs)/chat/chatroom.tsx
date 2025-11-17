import { addDoc, collection, db, onSnapshot, orderBy, query } from "@/services/firebase";
import { useEffect, useState } from "react";
import { KeyboardAvoidingView,Platform,FlatList, StyleSheet, Text, TextInput, TouchableOpacity, View } from "react-native";
import { ThemedView } from "@/components/themed-view";

export default function ChatRoom({ chatId, userId, onClose }: { chatId: string; userId: string; onClose: () => void }) {
  const [messages, setMessages] = useState<any[]>([]);
  const [text, setText] = useState("");

  useEffect(() => {
    const msgRef = collection(db, "chats", chatId, "messages");
    const q = query(msgRef, orderBy("createdAt", "asc"));

    const unsub = onSnapshot(q, (snap: any) => {
      setMessages(snap.docs.map((d: any) => ({ id: d.id, ...d.data() })));
    });

    return () => unsub();
  }, [chatId]);

  const send = async () => {
    if (!text.trim()) return;

    await addDoc(collection(db, "chats", chatId, "messages"), {
      text,
      userId,
      createdAt: new Date()
    });

    setText("");
  };

  return (
    <KeyboardAvoidingView style={styles.container} behavior={Platform.OS === "ios" ? "padding" : "height"}>
      <TouchableOpacity onPress={onClose} style={styles.backBtn}>
        <Text style={styles.backText}>← Voltar</Text>
      </TouchableOpacity>

    <View style={{ flex: 1, padding: 10 }}>
      <FlatList
        data={messages}
        keyExtractor={(i: any) => i.id}
        renderItem={({ item }: any) => (
          <View
            style={[
              styles.msg,
              item.userId === userId ? styles.me : styles.other
            ]}
          >
            <Text style={{ color: "#F0F3F5" }}>{item.text}</Text>
          </View>
        )}
      />
    </View>
      

      <View style={styles.inputRow}>
        <TextInput
          style={styles.input}
          placeholder="Enviar Mensagem..."
          placeholderTextColor="#9fa0a0ff"
          value={text}
          onChangeText={setText}
        />
        <TouchableOpacity onPress={send} style={styles.sendBtn}>
          <Text style={{ color: "#F0F3F5" }}>Enviar</Text>
        </TouchableOpacity>
      </View>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 },
  backBtn: { marginBottom: 10 },
  backText: { color: "#19535F", fontSize: 16, fontWeight: "600" },
  msg: {
    padding: 10,
    borderRadius: 10,
    marginVertical: 4,
    maxWidth: "70%"
  },
  me: { backgroundColor: "#0D7C66", alignSelf: "flex-end" },
  other: { backgroundColor: "#19535F", alignSelf: "flex-start" },
  inputRow: {
  
    flexDirection: "row",
    paddingHorizontal: 12,
    paddingVertical: 10,
    borderTopWidth: 1,
    borderTopColor: "#E6E6E6",
    backgroundColor: "#19535F"
  },
  input: {
    flex: 1,
    backgroundColor: "#E6E6E6",
    color: "#000000",
    paddingHorizontal: 12,
    paddingVertical: 10,
    borderRadius: 10
  },
  sendBtn: {
    marginLeft: 8,
    backgroundColor: "#19535F",
    paddingHorizontal: 14,
    justifyContent: "center",
    borderRadius: 10
  }
});