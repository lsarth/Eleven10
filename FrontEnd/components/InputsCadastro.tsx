import React, { useState } from "react";
import { Text, TextInput, StyleSheet, View } from "react-native";

export function InputNome(){
    const [nome, setNome] = useState('')
    
    return(
        <View>
            <Text style={styles.texcad}>Nome Completo:</Text>
            <TextInput
            style={styles.input}
            placeholder="Digite seu Nome:"
            placeholderTextColor='#666'
            value={nome}
            onChangeText={setNome}  
            />
        </View>
    );
};

export function InputEmail(){
    const [email, setEmail] = useState('')
    
    return(
        <View>
            <Text style={styles.texcad}>E-mail:</Text>
            <TextInput
            style={styles.input}
            placeholder="Digite seu E-mail:"
            placeholderTextColor='#666'
            value={email}
            onChangeText={setEmail}  
            />
        </View>
    )
}

export function InputTelefone(){
    const [telefone, setTelefone] = useState('')

    return(
        <View>
            <Text style={styles.texcad}>Telefone:</Text>
            <TextInput
            style={styles.input}
            placeholder="Digite seu Telefone:"
            placeholderTextColor='#666'
            keyboardType="phone-pad"
            value={telefone}
            onChangeText={setTelefone}  
            />
        </View>
    )
}

export function InputCPF(){
    const [cpf, setCPF] = useState('')

    return(
        <View>
            <Text style={styles.texcad}>CPF:</Text>
            <TextInput
            style={styles.input}
            placeholder="Digite seu CPF:"
            placeholderTextColor='#666'
            keyboardType="number-pad"
            value={cpf}
            onChangeText={setCPF}  
            />
        </View>
    )
}

export function InputDataNascimento(){
    const [dataNascimento, setDataNascimento] = useState('')
    const [dataNascNumeros, setDataNascNumeros] = useState('')
    const [mensagemVerificacao, setMensagemVerificacao] = useState('')
    const [dataValida, setDataValida] = useState(null)

    const validarIdade = () => {
        if(dataNascNumeros.length != 8){
            setDataValida(null)
            setMensagemVerificacao("O formato deve ser: DD/MM/AAAA!")
            return
        }
    }

    return(
        <View>
            <Text style={styles.texcad}>Data de Nascimento:</Text>
            <TextInput
            style={styles.input}
            placeholder="DD/MM/AAAA (Apenas números)"
            placeholderTextColor='#666'
            keyboardType="number-pad"
            value={dataNascimento}
            onChangeText={setDataNascimento}  
            />
        </View>
    )
}

export function InputSenha(){
    const [senha, setSenha] = useState('')

    return(
        <View>
            <Text style={styles.texcad}>Senha:</Text>
            <TextInput
            style={styles.input}
            placeholder="Digite sua Senha:"
            placeholderTextColor='#666'
            secureTextEntry={true}
            value={senha}
            onChangeText={setSenha}  
            />
        </View>
    )
}   

export function InputUsername(){
    const [username, setUsername] = useState('')

    return(
        <View>
            <Text style={styles.texcad}>Nome de Usuário:</Text>
            <TextInput
            style={styles.input}
            placeholder="Digite seu Nome de Usuário:"
            placeholderTextColor='#666'
            value={username}
            onChangeText={setUsername}  
            />
        </View>
    )
}



const styles = StyleSheet.create({
    input:{
        borderWidth: 2,
        borderColor: "lightgray",
        width: "100%",
        borderRadius: 3,
        backgroundColor: "white",
    },  
    texcad:{
        marginTop: 20,
        fontWeight: 700,
        marginBottom: 2,
    },
}
)