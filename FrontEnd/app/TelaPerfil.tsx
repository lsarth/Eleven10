import React, { useState, useEffect } from 'react';
import {
  View, Text, StyleSheet, TextInput, ScrollView, Image, TouchableOpacity, Alert,
} from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import { Ionicons } from '@expo/vector-icons';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function TelaPerfil() {
  const [curriculo, setCurriculo] = useState('');
  const [bioSalva, setCurriculoSalvo] = useState(false);
  const [editandoBio, setEditandoCurriculo] = useState(true);
  const [perfilUri, setPerfilUri] = useState<string | null>(null);
  const [favoritos, setFavoritos] = useState<number>(0);
  const [favoritado, setFavoritado] = useState<number>(0);
  const [posts, setPosts] = useState<number>(0);
  const [favoritadoPorMim, setFavoritadoPorMim] = useState<boolean>(false);
  const [username, setUsername] = useState<string | null>(null);

  const [mostraSelecao, setMostraSelecao] = useState(false);
  const [posicaoSelecionada, setPosicaoSelecionada] = useState<string | null>(null);
  const [posicaoTemp, setPosicaoTemp] = useState<string | null>(null);

  const posicoes = [
    'Goleiro', 'Lateral Direito', 'Lateral Esquerdo', 'Zagueiro',
    'Volante', 'Meio Campo', 'Ponta Esquerda', 'Ponta Direita', 'Centro Avante'
  ];


  const fetchUsername = async () => {
    const usernameByCache = await AsyncStorage.getItem('username');

    setUsername(usernameByCache)
  }

  useEffect(() => {
    (async () => {
      const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
      if (status !== 'granted') {
        Alert.alert('Permissão necessária', 'Permita acesso à galeria para continuar.');
      }


    })();
    fetchUsername()

  }, []);

  const escolherFotoPerfil = async () => {
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      quality: 1,
    });

    if (!result.canceled && result.assets[0]) {
      setPerfilUri(result.assets[0].uri);
    }
  };

  const alternarFavorito = () => {
    if (favoritadoPorMim) {
      setFavoritado((prev) => prev - 1);
    } else {
      setFavoritado((prev) => prev + 1);
    }
    setFavoritadoPorMim(!favoritadoPorMim);
  };

  const salvarCurriculo = () => {
    setCurriculoSalvo(true);
    setEditandoCurriculo(false);
  };

  const confirmarPosicao = () => {
    setPosicaoSelecionada(posicaoTemp);
    setMostraSelecao(false);
  };

  const cancelarSelecao = () => {
    setPosicaoTemp(posicaoSelecionada);
    setMostraSelecao(false);
  };

  return (
    <View style={styles.container}>
      <ScrollView>
        <View style={styles.header}>
          <Text style={styles.usernameHeader}>
            {username || 'Usuário sem username'}
          </Text>
        </View>

        <View style={styles.avatarSection}>
          <TouchableOpacity onPress={escolherFotoPerfil}>
            {perfilUri ? (
              <Image source={{ uri: perfilUri }} style={styles.avatar} />
            ) : (
              <View style={styles.avatarPlaceholder}>
                <Ionicons name="add" size={36} color="#aaa" />
              </View>
            )}
          </TouchableOpacity>

          <View style={styles.detailsContainer}>
            <Text style={styles.countText}><Text style={{ fontWeight: 'bold' }}>Favoritos: </Text>{favoritos}</Text>
            <Text style={styles.countText}><Text style={{ fontWeight: 'bold' }}>Favoritado: </Text>{favoritado}</Text>
            <Text style={styles.countText}><Text style={{ fontWeight: 'bold' }}>Posts: </Text>{posts}</Text>
            <Text style={styles.countText}>
              <Text style={{ fontWeight: 'bold' }}>Posição: </Text>{posicaoSelecionada || 'Nenhuma'}
            </Text>
            <TouchableOpacity style={styles.posicaoButton} onPress={() => setMostraSelecao(true)}>
              <Text style={styles.posicaoButtonText}>Selecionar posição</Text>
            </TouchableOpacity>
          </View>
        </View>

        {mostraSelecao && (
          <View style={styles.selecaoContainer}>
            {posicoes.map((posicao, index) => (
              <TouchableOpacity
                key={index}
                style={styles.radioItem}
                onPress={() => setPosicaoTemp(posicao)}
              >
                <View style={styles.radioCircle}>
                  {posicaoTemp === posicao && <View style={styles.radioInner} />}
                </View>
                <Text style={styles.radioLabel}>{posicao}</Text>
              </TouchableOpacity>
            ))}

            <View style={styles.selecaoButtons}>
              <TouchableOpacity style={styles.confirmar} onPress={confirmarPosicao}>
                <Text style={styles.buttonText}>Confirmar</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.cancelar} onPress={cancelarSelecao}>
                <Text style={styles.buttonText}>Cancelar</Text>
              </TouchableOpacity>
            </View>
          </View>
        )}

        <TouchableOpacity style={styles.favoriteButton} onPress={alternarFavorito}>
          <Text style={styles.favoriteText}>
            {favoritadoPorMim ? 'Desfavoritar' : 'Favoritar'}
          </Text>
        </TouchableOpacity>

        <View style={styles.bioContainer}>
          <Text style={styles.sectionTitle}>Currículo Esportivo</Text>
          {editandoBio ? (
            <>
              <TextInput
                style={styles.bioInput}
                multiline
                placeholder="Fale sobre sua trajetória..."
                value={curriculo}
                onChangeText={setCurriculo}
              />
              <TouchableOpacity style={styles.saveButton} onPress={salvarCurriculo}>
                <Text style={styles.saveText}>Salvar Currículo</Text>
              </TouchableOpacity>
            </>
          ) : (
            <>
              <Text style={styles.bioSavedText}>{curriculo}</Text>
              <TouchableOpacity onPress={() => setEditandoCurriculo(true)}>
                <Text style={styles.editLink}>Editar Currículo</Text>
              </TouchableOpacity>
            </>
          )}
        </View>

        <View style={styles.separator} />
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#fff' },
  header: {
    padding: 16,
    alignItems: 'center',
    borderBottomWidth: 0.5,
    borderColor: '#ccc',
  },
  usernameHeader: {
    fontSize: 24,
    fontWeight: 'bold',
  },
  avatarSection: {
    flexDirection: 'row',
    alignItems: 'center',
    margin: 16,
  },
  avatar: {
    width: 90,
    height: 90,
    borderRadius: 45,
  },
  avatarPlaceholder: {
    width: 90,
    height: 90,
    borderRadius: 45,
    backgroundColor: '#f2f2f2',
    justifyContent: 'center',
    alignItems: 'center',
  },
  detailsContainer: {
    marginLeft: 20,
    justifyContent: 'space-between',
    height: 100,
  },
  countText: {
    fontSize: 14,
  },
  posicaoButton: {
    backgroundColor: '#007bff',
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 6,
    alignSelf: 'flex-start',
    marginTop: 4,
  },
  posicaoButtonText: {
    color: '#fff',
    fontWeight: 'bold',
  },
  selecaoContainer: {
    marginHorizontal: 16,
    marginVertical: 12,
    backgroundColor: '#f9f9f9',
    padding: 12,
    borderRadius: 8,
  },
  radioItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  radioCircle: {
    height: 20,
    width: 20,
    borderRadius: 10,
    borderWidth: 2,
    borderColor: '#007bff',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 8,
  },
  radioInner: {
    height: 10,
    width: 10,
    borderRadius: 5,
    backgroundColor: '#007bff',
  },
  radioLabel: {
    fontSize: 14,
  },
  selecaoButtons: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginTop: 12,
  },
  confirmar: {
    backgroundColor: '#0a7d26',
    padding: 8,
    borderRadius: 6,
  },
  cancelar: {
    backgroundColor: '#cc0000',
    padding: 8,
    borderRadius: 6,
  },
  buttonText: {
    color: '#fff',
    fontWeight: 'bold',
  },
  favoriteButton: {
    alignSelf: 'center',
    backgroundColor: '#007bff',
    paddingVertical: 6,
    paddingHorizontal: 20,
    borderRadius: 8,
    marginBottom: 20,
  },
  favoriteText: {
    color: 'white',
    fontWeight: 'bold',
  },
  bioContainer: {
    paddingHorizontal: 16,
    marginBottom: 20,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  bioInput: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 8,
    padding: 10,
    minHeight: 100,
    textAlignVertical: 'top',
  },
  saveButton: {
    backgroundColor: '#0a7d26',
    padding: 10,
    borderRadius: 8,
    alignItems: 'center',
    marginTop: 10,
  },
  saveText: { color: 'white', fontWeight: 'bold' },
  bioSavedText: {
    fontSize: 14,
    lineHeight: 20,
    backgroundColor: '#f0f0f0',
    padding: 10,
    borderRadius: 8,
  },
  editLink: {
    color: '#0a7d26',
    fontWeight: 'bold',
    marginTop: 6,
  },
  separator: {
    height: 3,
    backgroundColor: '#ccc',
    marginVertical: 20,
    marginHorizontal: 16,
  },
});
