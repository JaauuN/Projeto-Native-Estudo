import { auth } from "@/services/firebase";
import { onAuthStateChanged } from "firebase/auth";
import { useEffect, useState } from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import Assistant from "./assistant";
import ChatList from "./chatlist";
import { ThemedView } from "@/components/themed-view";
import { useSafeAreaInsets } from "react-native-safe-area-context";


export default function ChatIndex() {
  const [mode, setMode] = useState("assistant");
  const [userId, setUserId] = useState<string | null>(null);
  const areaSafe = useSafeAreaInsets();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        setUserId(user.uid);
      } else {
        setUserId("anonymous");
      }
    });
    
    return unsubscribe;
  }, []);

  if (!userId) return null;

  return (
    <ThemedView style={styles.container}>
      <ThemedView style={[styles.selectorContainer,{paddingTop: areaSafe.top + 15}]}>
        <TouchableOpacity
          style={[styles.selectorButton, mode === "assistant" && styles.selectorActive]}
          onPress={() => setMode("assistant")}
        >
          <Text style={[styles.selectorText, mode === "assistant" && styles.selectorActiveText]}>Assistente Virtual</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.selectorButton, mode === "chats" && styles.selectorActive]}
          onPress={() => setMode("chats")}
        >
          <Text style={[styles.selectorText, mode === "chats" && styles.selectorActiveText]}>Conversas</Text>
        </TouchableOpacity>
      </ThemedView>

      {mode === "assistant" ? (
        <Assistant userId={userId} />
      ) : (
        <ChatList userId={userId} />
      )}
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  container: { 
    flex: 1, 
  },
  selectorContainer: { 
    flexDirection: "row", 
    backgroundColor: "#19535F",
    justifyContent: 'center',
    alignItems: 'center',
    borderBottomWidth: 1,
    borderBottomColor: "#E6E6E6",
  },
  selectorButton: { flex: 1, paddingVertical: 12, alignItems: "center", backgroundColor: "#19535F" },
  selectorText: { color: "#F0F3F5", fontWeight: "600" },
  selectorActive: { backgroundColor: "#E6E6E6" },
  selectorActiveText: { color: "#19535F", fontWeight: "600" }
});