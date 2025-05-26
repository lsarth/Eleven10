import { View, Text, StyleSheet, TextInput, TouchableOpacity, Alert } from 'react-native'
import { GlobalStyles } from '../styles/GlobalStyles'
import { useRouter, router } from 'expo-router'
import { useState } from 'react'
import { API_url } from '@/APP_CONFIG';


export default function TelaCadastros() {
    const router = useRouter();
    const [nome, setNome] = useState('')
    const [email, setEmail] = useState('')
    const [telefone, setTelefone] = useState('')
    const [dataNascimento, setDataNascimento] = useState('')


    const isOver14 = (dateStr: string) => {
        const [day, month, year] = dateStr.split('/').map(Number);
        const birthDate = new Date(year, month - 1, day);
        const today = new Date();
        const age = today.getFullYear() - birthDate.getFullYear();
        const m = today.getMonth() - birthDate.getMonth();
        return age > 14 || (age === 14 && m >= 0);
    };

    const validarCampos = () => {
        if (!nome || !email || !telefone || !dataNascimento) {
            Alert.alert("Preencha todos os dados para continuar!")
            router.push('/TelaCadastro')
        }

        else if (!isOver14) {
            Alert.alert("Você deve ser maior que 14 anos para continuar!")
            router.push('/TelaCadastro')
        }
        else {
            registerUser()
            // router.push('/TelaCadastro2')j
        }
    }


    const registerUser = async () => {

        // const response = await fetch(API_url,
        //     {
        //         method: "POST",
        //         body: JSON.stringify({
        //             username: "",
        //             senha: "",
        //             email: email,
        //             telefone: telefone,
        //             nomeCompleto: nome,
        //             dataDeAniversario: dataNascimento,
        //             logradouro: "",
        //             profilePicture: ""
        //         })
        //     }
        // )


        router.push({
            pathname: '/TelaCadastro2',
            params: {
                name: nome,
                email: email,
                phone: telefone,
                data: dataNascimento
            }
        })

    }
        return (
            <View style={styles.container}>

                <View style={styles.header}>
                    <Text style={styles.textlogin}>Cadastre-se</Text>
                    <View style={styles.dadpdadl}>
                        <Text style={{ marginRight: "10%", borderBottomWidth: 1.5, marginBottom: -0.8, borderColor: "black", color: "black", fontWeight: 700 }}>1.Dados Pessoais</Text>
                        <Text>2. Dados de Login</Text>
                    </View>
                </View>
                <View style={styles.boxcad}>
                    <Text style={styles.textaviso}>Apenas maiores de 14 anos poderão se cadastrar no ELEVEN 10. Nós não exibiremos seu Nome Completo ou Telefone no seu Perfil Atleta.</Text>

                    <TextInput
                        style={styles.input}
                        placeholder="Digite seu Nome Completo:"
                        placeholderTextColor='#666'
                        value={nome}
                        onChangeText={setNome} />

                    <TextInput
                        style={styles.input}
                        placeholder="Digite seu E-mail:"
                        placeholderTextColor='#666'
                        value={email}
                        onChangeText={setEmail}
                    />

                    <TextInput
                        style={styles.input}
                        placeholder="Digite seu telefone:"
                        placeholderTextColor="#666"
                        value={telefone}
                        onChangeText={setTelefone}
                        keyboardType="phone-pad"
                    />

                    <TextInput
                        style={styles.input}
                        placeholder="Digite sua data de Nascimento:"
                        placeholderTextColor="#666"
                        value={dataNascimento}
                        onChangeText={setDataNascimento}
                        keyboardType="number-pad"
                    />

                    <View style={styles.divbotoes}>
                        <TouchableOpacity style={GlobalStyles.botaologin} onPress={registerUser}>
                            <Text style={GlobalStyles.txtbut}>Voltar</Text>
                        </TouchableOpacity>
                        <TouchableOpacity style={GlobalStyles.botaologin} onPress={validarCampos}>
                            <Text style={GlobalStyles.txtbut}>Continuar</Text>
                        </TouchableOpacity>
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
        height: 480,
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