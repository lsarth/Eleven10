import { View, Text, StyleSheet, TextInput, Image, ImageBackground, TouchableOpacity, Alert } from 'react-native';
import { GlobalStyles } from '../styles/GlobalStyles';
import { useRouter } from 'expo-router';
import { useState } from 'react';
import { API_url } from '@/APP_CONFIG';
import AsyncStorage from '@react-native-async-storage/async-storage'

export default function TelaLogin() {

  const router = useRouter();

  const [email, setEmail] = useState('')
  const [senha, setSenha] = useState('')
  const urlAPI = `${API_url}/login`;

  const validarCampos = () => {
    if (!email || !senha) {
      Alert.alert('Preencha os campos com seu E-mail e sua Senha ELEVEN10')
      return;
    }
  }


  const loginFunction = async () => {

    validarCampos()

    const response = await fetch(urlAPI, {
      method: "POST",
      headers: {
        "ngrok-skip-browser-warning": "true",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email: email,
        senha: senha
      })
    })


    if (!response.ok) {
      console.log(response.text())
    }

    const data = await response.json()
    console.log(data)

    if (data.status == "Logado") {
      await AsyncStorage.setItem('username', data.message)
      router.push('/TelaInicial')
    } else {
      Alert.alert("Atenção", "Email e Senha Invalidos")
    }

  }
  return (

    <View style={styles.root}>
      <ImageBackground
        style={styles.container}
        source={require('../assets/images/backgroundlogin.png')}
      >
        <View style={styles.boxlogin}>
          <Text style={styles.textlogin}>Login</Text>

          <View style={styles.divinputs}>
            <TextInput
              style={styles.input}
              placeholder='Digite seu E-mail:'
              placeholderTextColor="#666"
              value={email}
              onChangeText={setEmail}
            />

            <TextInput
              style={styles.input}
              placeholder="Digite sua Senha:"
              placeholderTextColor="#666"
              secureTextEntry={true}
              value={senha}
              onChangeText={setSenha}
            />
          </View>

          <TouchableOpacity
            style={GlobalStyles.botaologin}>
            <Text style={GlobalStyles.txtbut} onPress={loginFunction}>Entrar</Text>
          </TouchableOpacity>

          <Text style={styles.txtcad}>Não tem uma conta?</Text>
          <TouchableOpacity style={styles.botcads}
            onPress={() => router.push('/TelaCadastro')}
          ><Text style={styles.txtbotcads}>Cadastre-se!</Text></TouchableOpacity>


        </View>
      </ImageBackground>
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
  },
  boxlogin: {
    backgroundColor: "white",
    width: '76%',
    height: 400,
    alignItems: 'center',
    borderColor: 'gray',
    borderWidth: 0.6,
    borderRadius: 10,
  },
  txtcad: {
    fontSize: 15,
    marginTop: 15
  },
  botcads: {
    width: "100%",
    height: 18,
    alignItems: "center",
    justifyContent: "center",
  },
  txtbotcads: {
    color: "green",
    fontSize: 15,
    fontWeight: 800,
  },
  input: {
    borderWidth: 2,
    borderColor: "lightgray",
    width: "100%",
    borderRadius: 3,
    backgroundColor: "white",
    marginTop: 35,
  },
  divinputs: {
    width: '90%',
  }

})