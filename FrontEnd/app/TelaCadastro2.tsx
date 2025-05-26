import { View, Text, StyleSheet, TextInput, Image, ImageBackground, TouchableOpacity } from 'react-native'
import { InputSenha, InputUsername } from '../components/InputsCadastro'
import { GlobalStyles } from '../styles/GlobalStyles'
import { useLocalSearchParams, useRouter } from 'expo-router'
import { useState } from 'react'
import { API_url } from '@/APP_CONFIG'


class user {

    public id!: string;
    public username!: string;
    public senha!: string;
    public email!: string;
    public telefone!: string;
    public nomeCompleto!: string;
    public dataDeAniversario!: string;
    public logradouro!: string;
    public profilePicture!: string;

    constructor(props: Omit<user, "id">, id?: string) {
        Object.assign(this, props);
    }

}


export default function TelaCadastro2() {

    const router = useRouter()
    const { name, email, phone, data } = useLocalSearchParams();
    const [username, setUsername] = useState('')
    const [senha, setSenha] = useState('')

    const urlAPI = `${API_url}/usuario`;

    const postData = async () => {
        const usuarios = new user({
            username: username,
            senha: senha,
            email: email as string,
            telefone: phone as string,
            nomeCompleto: name as string,
            dataDeAniversario: "2008-07-25 00:00:00",
            logradouro: "loga",
            profilePicture: "loga"
        })
        const response = await fetch(urlAPI,
            {
                method: "POST",
                headers: {
                    "ngrok-skip-browser-warning": "true",
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(usuarios)
            })

        if (!response.ok) {
            const errorText = await response.text();
            console.error("Erro:", response.status, errorText);
        }
    }

    const registerUser = async () => {
        try {
            const response = await postData();
        } catch (error) {
            console.log(error)
        }
    }

    return (
        <View style={styles.container}>

            <View style={styles.header}>
                <Text style={styles.textlogin}>Cadastre-se</Text>
                <View style={styles.dadpdadl}>
                    <Text style={{ color: "#3db342", fontWeight: 700, marginRight: "10%" }}>1.Dados Pessoais</Text>
                    <Text style={{ borderBottomWidth: 1.5, marginBottom: -0.8, borderColor: "black", color: "black", fontWeight: 700 }}>2. Dados de Login</Text>
                </View>
            </View>
            <View style={styles.boxcad}>
                <Text style={styles.textaviso}>Apenas maiores de 14 anos poderão se cadastrar no ELEVEN 10. Nós não exibiremos seu Nome Completo ou Telefone no seu Perfil Atleta.</Text>
                <TextInput
                    style={styles.input}
                    placeholder='Escolha seu Nome de Usuário:'
                    placeholderTextColor='#666'
                    value={username}
                    onChangeText={setUsername}
                />

                <TextInput
                    style={styles.input}
                    placeholder='Escolha sua senha:'
                    placeholderTextColor="#666"
                    secureTextEntry={true}
                    value={senha}
                    onChangeText={setSenha}
                />

                <View style={styles.divbotoes}>
                    <TouchableOpacity style={GlobalStyles.botaologin} onPress={() => router.push('/TelaCadastro')}><Text style={GlobalStyles.txtbut}>Voltar</Text></TouchableOpacity>
                    <TouchableOpacity onPress={() => registerUser()} style={GlobalStyles.botaologin}><Text style={GlobalStyles.txtbut}>Continuar</Text></TouchableOpacity>
                </View>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    root: {
        flex: 1,
    },
    container: {
        flex: 1,
        backgroundColor: "#3db342",
        alignItems: 'center',
        justifyContent: 'center',
    },
    textlogin: {
        marginTop: 20,
        fontSize: 30,
        fontWeight: 900,
        marginLeft: 20
    },
    boxcad: {
        backgroundColor: "white",
        width: '76%',
        height: 330,
        borderColor: 'gray',
        borderWidth: 0.6,
        borderRadius: 10,
        padding: 15,
    },
    header: {
        backgroundColor: "white",
        width: "100%",
        position: "absolute",
        top: 0,
    },
    dadpdadl: {
        flexDirection: "row",
        alignSelf: "center",
        marginTop: 15,
        justifyContent: "center",
    },
    textaviso: {
        alignSelf: "center",
        color: "gray",
        fontSize: 11,
    },
    divbotoes: {
        width: "100%",
        height: "100%",
        flexDirection: "row",
        gap: 30,
        justifyContent: 'center',
    },
    input: {
        borderWidth: 2,
        borderColor: "lightgray",
        width: "100%",
        borderRadius: 3,
        backgroundColor: "white",
        marginTop: 35,
    },

});