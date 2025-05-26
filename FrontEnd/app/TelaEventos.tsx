import React, { useState, useEffect } from 'react';
import {
  View, Text, TextInput, TouchableOpacity, FlatList, Image, StyleSheet, ScrollView,
} from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import AsyncStorage from '@react-native-async-storage/async-storage';

type Evento = {
  id: string;
  nomeTime: string;
  local: string;
  horario: string;
  categoria: string;
  posicoes: string;
  imagem: string | null;
};

export default function TelaEventos() {
  const [eventos, setEventos] = useState<Evento[]>([]);
  const [criando, setCriando] = useState(false);
  const [eventoEmEdicao, setEventoEmEdicao] = useState<string | null>(null);

  const [nomeTime, setNomeTime] = useState('');
  const [local, setLocal] = useState('');
  const [horario, setHorario] = useState('');
  const [categoria, setCategoria] = useState('');
  const [posicoes, setPosicoes] = useState('');
  const [imagem, setImagem] = useState<string | null>(null);

  // Carrega os eventos salvos no AsyncStorage ao iniciar
  useEffect(() => {
    const carregarEventos = async () => {
      try {
        const eventosSalvos = await AsyncStorage.getItem('eventos');
        if (eventosSalvos) {
          const eventosConvertidos: Evento[] = JSON.parse(eventosSalvos);
          setEventos(eventosConvertidos);
        }
      } catch (error) {
        console.error('Erro ao carregar eventos:', error);
      }
    };

    carregarEventos();
  }, []);

  const escolherImagem = async () => {
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      quality: 1,
    });

    if (!result.canceled) {
      setImagem(result.assets[0].uri);
    }
  };

  const limparFormulario = () => {
    setNomeTime('');
    setLocal('');
    setHorario('');
    setCategoria('');
    setPosicoes('');
    setImagem(null);
    setEventoEmEdicao(null);
  };

  const salvarEvento = async () => {
    try {
      let novaLista: Evento[];

      if (eventoEmEdicao) {
        novaLista = eventos.map((e) =>
          e.id === eventoEmEdicao
            ? { ...e, nomeTime, local, horario, categoria, posicoes, imagem }
            : e
        );
      } else {
        const novoEvento: Evento = {
          id: Date.now().toString(),
          nomeTime,
          local,
          horario,
          categoria,
          posicoes,
          imagem,
        };

        novaLista = [...eventos, novoEvento];
      }

      setEventos(novaLista);
      await AsyncStorage.setItem('eventos', JSON.stringify(novaLista));
      limparFormulario();
      setCriando(false);
    } catch (error) {
      console.error('Erro ao salvar evento:', error);
    }
  };

  const editarEvento = (evento: Evento) => {
    setNomeTime(evento.nomeTime);
    setLocal(evento.local);
    setHorario(evento.horario);
    setCategoria(evento.categoria);
    setPosicoes(evento.posicoes);
    setImagem(evento.imagem);
    setEventoEmEdicao(evento.id);
    setCriando(true);
  };

  const excluirEvento = async (id: string) => {
    try {
      const novaLista = eventos.filter((e) => e.id !== id);
      setEventos(novaLista);
      await AsyncStorage.setItem('eventos', JSON.stringify(novaLista));

      if (eventoEmEdicao === id) {
        limparFormulario();
        setCriando(false);
      }
    } catch (error) {
      console.error('Erro ao excluir evento:', error);
    }
  };

  const renderItem = ({ item }: { item: Evento }) => (
    <View style={styles.card}>
      {item.imagem && <Image source={{ uri: item.imagem }} style={styles.imagemEvento} />}
      <View style={styles.info}>
        <Text style={styles.infoTexto}>Time: {item.nomeTime}</Text>
        <Text style={styles.infoTexto}>Local: {item.local}</Text>
        <Text style={styles.infoTexto}>Horário: {item.horario}</Text>
        <Text style={styles.infoTexto}>Categoria: {item.categoria}</Text>
        <Text style={styles.infoTexto}>Posições: {item.posicoes}</Text>

        <View style={styles.botoesAcoes}>
          <TouchableOpacity onPress={() => editarEvento(item)} style={styles.botaoEditar}>
            <Text style={styles.textoBotaoPequeno}>Editar</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => excluirEvento(item.id)} style={styles.botaoExcluir}>
            <Text style={styles.textoBotaoPequeno}>Excluir</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );

  return (
    <View style={styles.root}>
      <ScrollView contentContainerStyle={styles.scrollContainer}>
        <Text style={styles.titulo}>PENEIRAS</Text>

        <View style={styles.boxTitulo}>
          <Text style={styles.destaques}>Destaques do momento</Text>
          <Text style={styles.subtitulo}>Encontre sua próxima oportunidade</Text>
        </View>

        <FlatList
          data={eventos}
          keyExtractor={(item) => item.id}
          renderItem={renderItem}
          contentContainerStyle={{ gap: 10 }}
          scrollEnabled={false}
        />

        <TouchableOpacity onPress={() => { setCriando(true); limparFormulario(); }} style={styles.botaoCriar}>
          <Text style={styles.textoBotaoCriar}>Criar Evento</Text>
        </TouchableOpacity>

        {criando && (
          <View style={styles.boxCriacao}>
            <TextInput placeholder="Nome do time" value={nomeTime} onChangeText={setNomeTime} style={styles.input} />
            <TextInput placeholder="Local" value={local} onChangeText={setLocal} style={styles.input} />
            <TextInput placeholder="Horário" value={horario} onChangeText={setHorario} style={styles.input} />
            <TextInput placeholder="Categoria" value={categoria} onChangeText={setCategoria} style={styles.input} />
            <TextInput placeholder="Posições" value={posicoes} onChangeText={setPosicoes} style={styles.input} />

            <TouchableOpacity onPress={escolherImagem} style={styles.botaoImagem}>
              <Text style={styles.textoBotaoImagem}>Selecionar imagem do CT</Text>
            </TouchableOpacity>

            <TouchableOpacity onPress={salvarEvento} style={styles.botaoSalvar}>
              <Text style={styles.textoSalvar}>
                {eventoEmEdicao ? 'Atualizar Evento' : 'Salvar Evento'}
              </Text>
            </TouchableOpacity>
          </View>
        )}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  root: { flex: 1, backgroundColor: '#fff' },
  scrollContainer: { padding: 16, paddingBottom: 80 },
  titulo: { fontSize: 28, fontWeight: 'bold', textAlign: 'center', marginBottom: 20 },
  boxTitulo: {
    borderWidth: 0.5,
    borderColor: '#000',
    padding: 16,
    marginBottom: 20,
    borderRadius: 10,
  },
  destaques: { fontWeight: 'bold', fontSize: 18, textAlign: 'center' },
  subtitulo: { color: 'green', fontSize: 14, textAlign: 'center' },
  card: {
    flexDirection: 'row',
    borderWidth: 1,
    borderColor: '#333',
    padding: 12,
    borderRadius: 8,
    alignItems: 'center',
  },
  imagemEvento: { width: 80, height: 80, borderRadius: 8, marginRight: 12, backgroundColor: '#ccc' },
  info: { flex: 1 },
  infoTexto: { fontSize: 14, marginBottom: 4 },
  botoesAcoes: {
    flexDirection: 'row',
    marginTop: 8,
    gap: 8,
  },
  botaoEditar: {
    backgroundColor: '#3DB342',
    padding: 6,
    borderRadius: 6,
  },
  botaoExcluir: {
    backgroundColor: '#F44336',
    padding: 6,
    borderRadius: 6,
  },
  textoBotaoPequeno: {
    color: '#fff',
    fontWeight: 'bold',
  },
  botaoCriar: {
    backgroundColor: '#4CAF50',
    padding: 12,
    borderRadius: 8,
    marginTop: 20,
    alignItems: 'center',
  },
  textoBotaoCriar: {
    color: '#FFF',
    fontWeight: 'bold',
  },
  boxCriacao: {
    borderWidth: 1,
    borderColor: '#999',
    borderRadius: 10,
    padding: 16,
    marginTop: 20,
  },
  input: {
    borderWidth: 1,
    borderColor: '#CCC',
    borderRadius: 8,
    padding: 10,
    marginBottom: 12,
  },
  botaoImagem: {
    backgroundColor: '#2196F3',
    padding: 12,
    borderRadius: 8,
    marginBottom: 12,
    alignItems: 'center',
  },
  textoBotaoImagem: {
    color: '#fff',
    fontWeight: 'bold',
  },
  botaoSalvar: {
    backgroundColor: '#000',
    padding: 12,
    borderRadius: 8,
    alignItems: 'center',
  },
  textoSalvar: {
    color: '#FFF',
    fontWeight: 'bold',
  },
});
