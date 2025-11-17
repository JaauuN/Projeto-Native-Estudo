import { useRef, useState } from "react";
import { KeyboardAvoidingView, Platform, ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, View } from "react-native";
const voltarPrincipal = [
  "Posso te ajudar com os seguintes temas:",
  "1. Dúvidas sobre saúde (Sintomas e Recomendações)",
  "2. Logística e Farmácia (Entrega e Informações de Remédios)",
  "3. Suporte Técnico (Problemas com o Aplicativo)",
  "4. Ofertas Especiais (Promoções e Descontos)",
  "Digite o número da opção desejada (1, 2, 3 ou 4) para começar 🙂"
];

const respostasDetalhes: Record<string, string[]> = {
  "padrão": voltarPrincipal,
  "1": [
    "Para te ajudar melhor, qual destes sintomas você está sentindo? Digite o número da opção:",
    "1) Dor de cabeça",
    "2) Febre alta",
    "3) Náuseas",
    "4) Sintomas respiratórios",
    "5) Caso nenhum se aplique, recomendo o Chat Pessoal."
  ],
  "2": [
    "Sobre remédios e entregas, o que você precisa? Digite o número da opção:",
    "1) Como comprar remédios",
    "2) Entrega de medicamentos (Status)",
    "3) Indicações sobre remédios comuns",
    "4) Caso nenhum se aplique, recomendo o Chat Pessoal."
  ],
  "3": [
    "Lamentamos o inconveniente. Qual é o tipo de problema? Digite o número da opção:",
    "1) Bug de tela",
    "2) Falha de login/senha",
    "3) App travando",
    "4) Outro problema, recomendo o Chat Pessoal."
  ],
  "4": [
    "As melhores promoções desta semana estão no ar! Confira:",
    "1. 30% OFF em toda a linha de vitaminas.",
    "2. Compre 2, Leve 3 em protetores solares.",
    "3. Frete Grátis para compras acima de R$100.",
    "Para saber mais, digite 'Voltar'."
  ],
  "1.1": [
    "Dor de cabeça: Recomendamos o uso de **Paracetamol (500mg)** ou **Ibuprofeno**. Mantenha-se hidratado e descanse em um local escuro.",
    "Para saber mais, digite 'Voltar'."
  ],
  "1.2": [
    "Febre alta: Use um antitérmico e compressas frias. Se a temperatura estiver acima de 39°C e não baixar, recomendamos que você procure um médico.",
    "Para saber mais, digite 'Voltar'."
  ],
  "1.3": [
    "Náuseas: Tente um chá de gengibre ou remédios como **Dramin**. Evite alimentos gordurosos e descanse por 30 minutos.",
    "Para saber mais, digite 'Voltar'."
  ],
  "1.4": [
    "Sintomas respiratórios: Indicamos descongestionantes e analgésicos leves. Se houver falta de ar ou dor no peito, recomendamos o Chat Pessoal com um atendente urgente.",
    "Para saber mais, digite 'Voltar'."
  ],
  "1.5": [
    "Entendido. **Recomendo ir para o Chat Pessoal.** Lá você pode conversar com um de nossos atendentes. Lembre-se de descrever seus sintomas detalhadamente.",
    "Para saber mais, digite 'Voltar'."
  ],
  "2.1": [
    "Como comprar remédios: Você pode usar nosso carrinho de compras na aba Início. Aceitamos cartão de crédito e débito. O processo leva menos de 5 minutos.",
    "Para saber mais, digite 'Voltar'."
  ],
  "2.2": [
    "Entrega: Para verificar sua entrega, digite o **Número do seu pedido** ou o **CPF** usado na compra. Nosso prazo padrão é de 2 dias úteis.",
    "Para saber mais, digite 'Voltar'."
  ],
  "2.3": [
    "Indicações: Estamos desenvolvendo uma base de dados completa. Por enquanto, se tiver dúvidas sobre a bula ou dosagem de um remédio específico, use o Chat Pessoal.",
    "Para saber mais, digite 'Voltar'."
  ],
    "2.4": [
    "**Recomendo ir para o Chat Pessoal.** Para dúvidas complexas sobre medicamentos, um atendente pode te ajudar melhor. Lembre-se de informar o nome completo do medicamento.",
    "Para saber mais, digite 'Voltar'."
  ],
  "3.1": [
    "Bug de tela: Pedimos que nos envie uma captura de tela para [email_suporte@cureplus.com.br]. Iremos analisar o problema com a tela do seu dispositivo.",
    "Para saber mais, digite 'Voltar'."
  ],
  "3.2": [
    "Falha de login: Tente usar a opção 'Esqueci minha senha' na tela de Login. Se não funcionar, o problema pode ser a conexão; tente novamente em 5 minutos.",
    "Para saber mais, digite 'Voltar'."
  ],
  "3.3": [
    "App travando: Recomendamos limpar o cache ou reinstalar o aplicativo. Se o problema continuar, pode ser um bug que precisa ser reportado no Chat Pessoal.",
    "Para saber mais, digite 'Voltar'."
  ],
  "3.4": [
    "**Recomendo ir para o Chat Pessoal.** Para problemas técnicos que não se encaixam nas opções, um técnico deve ser envolvido. Descreva o problema e o modelo do seu celular.",
    "Para saber mais, digite 'Voltar'."
  ],
};

function analisarMensagem(texto: string, contextoAtual: string): { resposta: string[], novoContexto: string } {
  const msg = texto.trim().toLowerCase();
  
  if (msg === "voltar" || msg === "voltar") {
    return { resposta: respostasDetalhes["padrão"], novoContexto: "voltar" };
  }

  if (contextoAtual === "voltar") {
    if (msg === "1" || msg.includes("saúde") || msg.includes("saude")) {
      return { resposta: respostasDetalhes["1"], novoContexto: "saude" };
    }
    if (msg === "2" || msg.includes("remedio") || msg.includes("remédios") || msg.includes("farmacia") || msg.includes("farmácia")) {
      return { resposta: respostasDetalhes["2"], novoContexto: "farmacia" };
    }
    if (msg === "3" || msg.includes("problema") || msg.includes("bug") || msg.includes("erro") || msg.includes("suporte")) {
      return { resposta: respostasDetalhes["3"], novoContexto: "suporte" };
    }
    if (msg === "4" || msg.includes("promo") || msg.includes("oferta") || msg.includes("desconto")) {
      return { resposta: respostasDetalhes["4"], novoContexto: "voltar" };
    }
  }

  if (contextoAtual === "saude") {
    if (msg === "1.1" || msg === "1") {
      return { resposta: respostasDetalhes["1.1"], novoContexto: "voltar" };
    }
    if (msg === "1.2" || msg === "2") {
      return { resposta: respostasDetalhes["1.2"], novoContexto: "voltar" };
    }
    if (msg === "1.3" || msg === "3") {
      return { resposta: respostasDetalhes["1.3"], novoContexto: "voltar" };
    }
    if (msg === "1.4" || msg === "4") {
      return { resposta: respostasDetalhes["1.4"], novoContexto: "voltar" };
    }
    if (msg === "1.5" || msg === "5") {
      return { resposta: respostasDetalhes["1.5"], novoContexto: "voltar" };
    }
  }

  if (contextoAtual === "farmacia") {
    if (msg === "2.1" || msg === "1") {
      return { resposta: respostasDetalhes["2.1"], novoContexto: "voltar" };
    }
    if (msg === "2.2" || msg === "2") {
      return { resposta: respostasDetalhes["2.2"], novoContexto: "voltar" };
    }
    if (msg === "2.3" || msg === "3") {
      return { resposta: respostasDetalhes["2.3"], novoContexto: "voltar" };
    }
    if (msg === "2.4" || msg === "4") {
      return { resposta: respostasDetalhes["2.4"], novoContexto: "voltar" };
    }
  }

  if (contextoAtual === "suporte") {
    if (msg === "3.1" || msg === "1") {
      return { resposta: respostasDetalhes["3.1"], novoContexto: "voltar" };
    }
    if (msg === "3.2" || msg === "2") {
      return { resposta: respostasDetalhes["3.2"], novoContexto: "voltar" };
    }
    if (msg === "3.3" || msg === "3") {
      return { resposta: respostasDetalhes["3.3"], novoContexto: "voltar" };
    }
    if (msg === "3.4" || msg === "4") {
      return { resposta: respostasDetalhes["3.4"], novoContexto: "voltar" };
    }
  }

  return { resposta: ["Desculpe, não entendi. Digite 'Voltar' para ver as opções."], novoContexto: contextoAtual };
}
export default function Assistant({ userId }: { userId: string }) {
  const [history, setHistory] = useState([
    { id: "init", from: "bot", text: "Olá! Eu sou o Assistente Virtual Cure+. Como posso ajudar hoje?" },
    { id: "init2", from: "bot", text: "Posso te ajudar com os seguintes temas:"},
    { id: "init3", from: "bot", text: "1. Dúvidas sobre saúde (Sintomas e Recomendações)"},
    { id: "init4", from: "bot", text: "2. Logística e Farmácia (Entrega e Informações de Remédios)"},
    { id: "init5", from: "bot", text: "3. Suporte Técnico (Problemas com o Aplicativo)"},
    { id: "init6", from: "bot", text: "4. Ofertas Especiais (Promoções e Descontos)"},
    { id: "init7", from: "bot", text: "Digite o número da opção desejada\n(1, 2, 3 ou 4) para começar 🙂"}
  ]);

  const [input, setInput] = useState("");
  const [contexto, setContexto] = useState("voltar");
  const scrollRef = useRef<any>(null);

  const enviarMensagem = (textoUser: string) => {
    if (!textoUser.trim()) return;
    const clean = textoUser.trim();

    const resultado = analisarMensagem(clean, contexto);

    const botMessages = resultado.resposta.map((r: string) => ({ 
      id: String(Date.now() + Math.random()), 
        from: "bot", 
        text: r 
    }));

    setHistory(prev => [
      ...prev,
      { id: Date.now() + "u", from: "user", text: clean },
      ...botMessages
    ]);

    setContexto(resultado.novoContexto);
    setInput("");

    setTimeout(() => scrollRef.current?.scrollToEnd({ animated: true }), 100);
  };

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === "ios" ? "padding" : "height"}
    >
      <ScrollView ref={scrollRef} contentContainerStyle={styles.historyContainer}>
        {history.map(m => (
          <View key={m.id} style={[styles.bubble, m.from === "bot" ? styles.bot : styles.user]}>
            <Text style={styles.text}>{m.text}</Text>
          </View>
        ))}
      </ScrollView>

      <View style={styles.inputArea}>
        <TextInput
          placeholder="Escreva sua mensagem..."
          placeholderTextColor="#9fa0a0ff"
          value={input}
          onChangeText={setInput}
          style={styles.input}
          returnKeyType="send"
          onSubmitEditing={() => enviarMensagem(input)}
        />
        <TouchableOpacity style={styles.sendBtn} onPress={() => enviarMensagem(input)}>
          <Text style={styles.sendText}>Enviar</Text>
        </TouchableOpacity>
      </View>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 },

  historyContainer: { padding: 16, paddingBottom: 20 },

  bubble: { padding: 12, borderRadius: 14, marginBottom: 10, maxWidth: "80%" },
  bot: { backgroundColor: "#19535F", alignSelf: "flex-start" }, 
  user: { backgroundColor: "#0D7C66", alignSelf: "flex-end" }, 
  text: { color: "#F0F3F5" },

  inputArea: {
    width: '100%',
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
  },
  sendText: { color: "#F0F3F5", fontWeight: "bold" }
});