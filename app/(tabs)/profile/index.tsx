import { ThemedView } from '@/components/themed-view';
import { auth, db } from '@/services/firebase';
import { AntDesign } from '@expo/vector-icons';
import { router } from 'expo-router';
import { createUserWithEmailAndPassword, onAuthStateChanged, signInWithEmailAndPassword, signOut } from "firebase/auth";
import { doc, getDoc, setDoc } from 'firebase/firestore';
import { useEffect, useState } from 'react';
import { Alert, Keyboard, StyleSheet, Text, TouchableOpacity, TouchableWithoutFeedback, View } from 'react-native';
import { Modal, Portal, TextInput } from 'react-native-paper';
import { Dropdown } from 'react-native-paper-dropdown';

const LOJAS = [
  { value: '1', label: 'Pague Menos'},
  { value: '2', label: 'Drogasil'},
  { value: '3', label: 'Extrafarma'},
  { value: '4', label: 'Economia Farma'},
  { value: '5', label: 'Farmácia Popular'},
  { value: '6', label: 'Farmacenter'},
];

export default function Profile() {
    const [nome, setNome] = useState('');
    const [email, setEmail] = useState('');
    const [senha, setSenha] = useState('');
    const [endereco, setEndereco] = useState('');
    const [tipo, setTipo] = useState<'cliente' | 'empresa' | null>(null);
    const [empresa, setEmpresa] = useState<string>();
    const [containerAtivar, setcontainerAtivar] = useState(false);
    const [ModalVisible, setModalVisible] = useState(false);
    const [usuarioLogado, setusuarioLogado] = useState<boolean>(false);
    const [nomeusuarioatual, setNomeusuarioatual] = useState('');
    const showModal = () => {
        setTipo('cliente');
        setModalVisible(true);
    };
    const hideModal = () => setModalVisible(false);
    
    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, async (usuarios) => {
            if (usuarios) {
                setusuarioLogado(true);
                const docRef = doc(db, 'usuarios', usuarios.uid);
                const docSnap = await getDoc(docRef);
                if (docSnap.exists()) {
                    const dados = docSnap.data();
                    setNomeusuarioatual(dados.nome);
                } else {
                    const empresaRef = doc(db, 'empresas', usuarios.uid);
                    const empresaSnap = await getDoc(empresaRef);
                    if (empresaSnap.exists()) {
                        const dados = empresaSnap.data();
                        setNomeusuarioatual(LOJAS.find(l => l.value === dados.empresa)?.label || usuarios.email || '');
                    } else {
                        setNomeusuarioatual(usuarios.email || '');
                    }
                }
            } else {
                setusuarioLogado(false);
                setNomeusuarioatual('');
            }
        });
        
        return unsubscribe;
    }, []);
    
    const Login = async () => {
        await signInWithEmailAndPassword(auth, email, senha)
            .then(() => {
                Alert.alert('Login feito!');
                }
            )
            .catch(() => {
                Alert.alert('Email ou senha incorretos!');
            });
    };
    const deslogar = () => {
        signOut(auth)
        .then(() => {
            // Sign-out successful.
        }).catch((error) => {
            // An error happened.
        });
    }
    const CadastroCliente = async () => {
        if (tipo === 'cliente') {
            if (!nome || !email || !senha || !endereco) {
                Alert.alert('Erro', 'Preencha nome, email, senha e endereço.');
                return;
            }
            const userCredential = await createUserWithEmailAndPassword(auth, email, senha);
            const user = userCredential.user;
            await setDoc(doc(db, 'usuarios', user.uid), {
                nome,
                email,
                endereco,
                tipo: 'cliente',
            });
        } else {
            if (!empresa || !email || !senha || !endereco) {
                Alert.alert('Erro', 'Preencha razão social, CNPJ, email, senha e endereço.');
                return;
            }
            const userCredential = await createUserWithEmailAndPassword(auth, email, senha);
            const user = userCredential.user;
            await setDoc(doc(db, 'empresas', user.uid), {
                empresa,
                email,
                endereco,
                tipo: 'empresa',
            });
        }
        hideModal();
        Alert.alert('Cadastrado com sucesso!');
    };

    
return (
    <>
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <ThemedView style={styles.container} >
            {usuarioLogado ? (
                <ThemedView style={styles.containerPerfil}>
                    <ThemedView style={styles.headerPerfil}>
                        <TouchableOpacity onPress={() => router.back()} style={styles.containerBotaovolta}>
                            <AntDesign name="left" size={20} style={styles.botaovolta}/>
                        </TouchableOpacity>
                        <Text style={styles.textoHeader}>Perfil</Text>
                        <View style={{height: 40, width: 40}}/>
                    </ThemedView>

                    <View style={styles.infoContainer}>
                        <View style={styles.avatarContainer}>
                            <AntDesign name="user" size={60} color="#F0F3F5" />
                        </View>
                        <Text style={styles.emailText}>{nomeusuarioatual}</Text>
                    </View>

                    <TouchableOpacity style={styles.containerBotaoSair} onPress={deslogar}>
                        <AntDesign name="logout" size={20} color="#19535F" style={{marginRight: 8}}/>
                        <Text style={styles.textoSair}>Sair da Conta</Text>
                    </TouchableOpacity>
                </ThemedView>
            ) : (
            <ThemedView style={styles.containerLogin}>
            <ThemedView style={styles.headerLogin}>
                <TouchableOpacity onPress={() => router.back()} style={styles.containerBotaovolta}>
                    <AntDesign name="left" size={20} style={styles.botaovolta}/>
                </TouchableOpacity>
                <Text style={styles.textoHeader}>Login</Text>
                <View style={{height: 40, width: 40}}/>
            </ThemedView>
            <TextInput
                label="Email"
                mode="outlined"
                keyboardType="email-address"
                activeOutlineColor='#9fa0a0ff'
                outlineColor='transparent'
                textColor='#000000ff'
                value={email}
                onChangeText={setEmail}
                style={styles.containerInput}
            />
            <TextInput
                label="Senha"
                mode="outlined"
                secureTextEntry={true}
                autoFocus={false}
                activeOutlineColor='#9fa0a0ff'
                outlineColor='transparent'
                textColor='#000000ff'
                value={senha}
                onChangeText={setSenha}
                style={styles.containerInput}
            />
            <TouchableOpacity style={styles.containerBotaoentrar} onPress={Login}>
                <Text style={styles.textoEntrar}>Fazer Login</Text>
            </TouchableOpacity>
            <TouchableOpacity style={[styles.containerBotaoentrar, {marginTop: 10,}]} onPress={showModal}>
                <Text style={styles.textoEntrar}>Criar Conta</Text>
            </TouchableOpacity>
        </ThemedView>
            )}
    </ThemedView>
    </TouchableWithoutFeedback>

    <Portal>
        <Modal visible={ModalVisible} >
            <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
            <ThemedView style={[styles.containerCadastro, containerAtivar && {bottom: 110}]}>
                <ThemedView style={styles.headerCadastro}>
                    <TouchableOpacity onPress={hideModal} style={styles.containerBotaovolta}>
                        <AntDesign name="left" size={20} style={styles.botaovolta} />
                    </TouchableOpacity>
                    <Text style={styles.textoHeader}>Crie sua Conta</Text>
                    <View style={{ height: 40, width: 40 }} />
                </ThemedView>

                <View style={styles.containerTipo}>
                    <TouchableOpacity style={[styles.containerTipoBotao, tipo === 'cliente' && styles.containerTipoBotaoAtivo]} onPress={() => setTipo('cliente')}>
                        <Text style={[styles.textoTipo, tipo === 'cliente' && styles.textoTipoAtivo]}>Cliente</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={[styles.containerTipoBotao, tipo === 'empresa' && styles.containerTipoBotaoAtivo]} onPress={() => setTipo('empresa')}>
                        <Text style={[styles.textoTipo, tipo === 'empresa' && styles.textoTipoAtivo]}>Empresa</Text>
                    </TouchableOpacity>
                </View>

                {tipo === 'cliente' && (
                    <View style={{ gap: 10, marginTop: 10 }}>
                        <TextInput 
                            label="Nome" 
                            mode="outlined" value={nome} 
                            onChangeText={setNome}
                            onFocus={() => setcontainerAtivar(true)}
                            onBlur={() => setcontainerAtivar(false)}
                            activeOutlineColor='#9fa0a0ff'
                            outlineColor='transparent'
                            textColor='#000000ff'
                            style={[styles.containerInput, {marginTop: 0}]}/>
                        <TextInput 
                            label="Email" 
                            mode="outlined" 
                            value={email} 
                            onChangeText={setEmail}
                            onFocus={() => setcontainerAtivar(true)}
                            onBlur={() => setcontainerAtivar(false)}
                            activeOutlineColor='#9fa0a0ff'
                            outlineColor='transparent'
                            textColor='#000000ff' 
                            keyboardType="email-address" 
                            style={[styles.containerInput, {marginTop: 0}]}/>
                        <TextInput 
                            label="Senha" 
                            mode="outlined" 
                            value={senha} 
                            onChangeText={setSenha}
                            onFocus={() => setcontainerAtivar(true)}
                            onBlur={() => setcontainerAtivar(false)}
                            activeOutlineColor='#9fa0a0ff'
                            outlineColor='transparent'
                            textColor='#000000ff'
                            secureTextEntry 
                            style={[styles.containerInput, {marginTop: 0}]}/>
                        <TextInput 
                            label="CEP" 
                            mode="outlined" 
                            value={endereco} 
                            onChangeText={setEndereco}
                            onFocus={() => setcontainerAtivar(true)}
                            onBlur={() => setcontainerAtivar(false)}
                            keyboardType='number-pad'
                            activeOutlineColor='#9fa0a0ff'
                            outlineColor='transparent'
                            textColor='#000000ff'
                            style={[styles.containerInput,{marginTop: 0}]} />
                    </View>
                )}

                {tipo === 'empresa' && (
                    <View style={{ gap: 10, marginTop: 10 }}>
                        <Dropdown
                            label="Empresa"
                            options={LOJAS}
                            value={empresa}
                            onSelect={setEmpresa}
                                
                            menuContentStyle={{
                                backgroundColor: '#19535F',
                                borderRadius: 20,
                                paddingVertical: 4
                                
                            }}
                            menuDownIcon={<AntDesign name="down" size={18} color="#19535F" />}
                            menuUpIcon={<AntDesign name="up" size={18} color="#19535F" />}
                            // https://www.npmjs.com/package/react-native-paper-dropdown
                            CustomDropdownInput={(props) => {
                                return (
                                <TextInput
                                    label={props.label as any}
                                    mode={props.mode ?? 'outlined'}
                                    value={props.selectedLabel ?? ''}
                                    editable={false}
                                    textColor={props.selectedLabel ? '#000000ff' : '#000000ff'}
                                    style={{ backgroundColor: '#E6E6E6', height: 50 }}
                                    activeOutlineColor="#9fa0a0ff"
                                    outlineColor="transparent"
                                    right={<TextInput.Icon icon={() => props.rightIcon} />}
                                />
                                );
                            }}
                            />
                        <TextInput 
                            label="Email" 
                            mode="outlined" 
                            value={email} 
                            onChangeText={setEmail} 
                            keyboardType="email-address" 
                            activeOutlineColor='#9fa0a0ff'
                            outlineColor='transparent'
                            textColor='#000000ff'
                            style={[styles.containerInput, {marginTop: 0}]}
                        />
                        <TextInput 
                            label="Senha" 
                            mode="outlined" 
                            value={senha} 
                            onChangeText={setSenha}
                            onFocus={() => setcontainerAtivar(true)}
                            onBlur={() => setcontainerAtivar(false)}
                            secureTextEntry 
                            activeOutlineColor='#9fa0a0ff'
                            outlineColor='transparent'
                            textColor='#000000ff'
                            style={[styles.containerInput, {marginTop: 0}]}
                        />
                        <TextInput 
                            label="CEP" 
                            mode="outlined" 
                            value={endereco} 
                            onChangeText={setEndereco}
                            onFocus={() => setcontainerAtivar(true)}
                            onBlur={() => setcontainerAtivar(false)}
                            keyboardType='number-pad'
                            activeOutlineColor='#9fa0a0ff'
                            outlineColor='transparent'
                            textColor='#000000ff'
                            style={[styles.containerInput,{marginTop: 0}]} />
                    </View>
                )}

                <TouchableOpacity style={[styles.containerBotaoentrar, { marginTop: 20 }]} onPress={CadastroCliente}>
                    <Text style={styles.textoEntrar}>Continuar</Text>
                </TouchableOpacity>
            </ThemedView>
            </TouchableWithoutFeedback>
        </Modal>
    </Portal>
</>
)
}

const styles = StyleSheet.create({
container: { 
    flex: 1,
},
containerLogin:{
    width: '80%',
    justifyContent: 'center',
    alignSelf: 'center',
    padding: 20,
    margin: 'auto',
    borderRadius: 20,
    backgroundColor: '#19535F',
    // SOMBRAS
    shadowColor: '#000000ff',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.12,
    shadowRadius: 8,
},
headerLogin: {
    width: '100%',
    flexDirection: 'row',
    alignItems: 'center',
    padding: 5,
    justifyContent: 'space-between',
    backgroundColor: 'transparent',
    borderBottomColor: '#F0F3F5',
    borderBottomWidth: 2,
},
textoHeader: {
    fontSize: 30,
    fontWeight: 'bold',
    color: '#F0F3F5',
},
containerBotaovolta: {
  width: 40,
  height: 40,
  alignItems: 'center',
  justifyContent: 'center',
  backgroundColor: '#E6E6E6',
  borderRadius: 50,
},
botaovolta: {
  color: '#000000ff',
},
containerInput: {
    width: '100%',
    height: 50,
    marginTop: 10,
    backgroundColor: '#E6E6E6',
},
containerBotaoentrar: {
    height: 50,
    borderRadius: 20,
    marginTop: 20,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#E6E6E6',
    // SOMBRAS
 shadowColor: '#000000ff',
  shadowOffset: { width: 0, height: 4 },
  shadowOpacity: 0.12,
  shadowRadius: 8,
    
},
textoEntrar: {
    color:'#19535F',
    fontWeight: 'bold',
},
containerCadastro: {
    width: '80%',
    alignSelf: 'center',
    padding: 20,
    borderRadius: 20,
    backgroundColor: '#19535F',
},
headerCadastro: {
    width: '100%',
    flexDirection: 'row',
    gap: 10,
    padding: 5,
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: 'transparent',
    borderBottomColor: '#F0F3F5',
    borderBottomWidth: 2,
},
containerTipo: {
    flexDirection: 'row',
    gap: 10,
    marginTop: 10,
},
containerTipoBotao: {
    flex: 1,
    height: 44,
    borderRadius: 20,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#E6E6E6',
},
containerTipoBotaoAtivo: {
    backgroundColor: '#19535F',
    borderWidth: 3,
    borderColor: '#F0F3F5',
},
textoTipo: {
    color: '#19535F',
    fontWeight: 'bold',
},
textoTipoAtivo: {
    color: '#F0F3F5',
    fontWeight: 'bold',
},

// Container de perfil quando logado
containerPerfil: {
    width: '80%',
    justifyContent: 'center',
    alignSelf: 'center',
    padding: 20,
    margin: 'auto',
    borderRadius: 20,
    backgroundColor: '#19535F',
    shadowColor: '#000000ff',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.12,
    shadowRadius: 8,
},
headerPerfil: {
    width: '100%',
    flexDirection: 'row',
    alignItems: 'center',
    padding: 5,
    justifyContent: 'space-between',
    backgroundColor: 'transparent',
    borderBottomColor: '#F0F3F5',
    borderBottomWidth: 2,
    marginBottom: 20,
},
infoContainer: {
    alignItems: 'center',
    paddingVertical: 30,
    gap: 15,
},
avatarContainer: {
    width: 120,
    height: 120,
    borderRadius: 60,
    backgroundColor: '#0D7C66',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 10,
},
emailText: {
    fontSize: 18,
    color: '#F0F3F5',
    fontWeight: '600',
},
containerBotaoSair: {
    height: 50,
    borderRadius: 20,
    marginTop: 20,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#E6E6E6',
    shadowColor: '#000000ff',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.12,
    shadowRadius: 8,
},
textoSair: {
    color:'#19535F',
    fontWeight: 'bold',
    fontSize: 16,
},

});