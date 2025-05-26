import { View, TouchableOpacity, Image, StyleSheet, Text } from "react-native"
import { useRouter, usePathname } from "expo-router"
import { useState } from "react"
import * as ImagePicker from 'expo-image-picker'

export default function Footer() {

    const router = useRouter()
    const pathname = usePathname()
    const [visivel, setVisivel] = useState(false)

    function toogleMenu() {
        setVisivel(!visivel)
    }

    async function pickMedia() {
        const result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.All,
            quality: 1,
        });

        if (!result.canceled) {
            const asset = result.assets[0];
            const uri = asset.uri;

            let type = 'image';
            if (asset.type && asset.type.includes('video')) {
                type = 'video';
            }

            router.push({
                pathname: '/CriarPosts',
                params: {
                    uri,
                    type,
                },
            });
        }
    }


    return (
        <View style={styles.footer}>
            <View style={styles.botoesfooter}>
                <TouchableOpacity style={styles.otherbotao}
                    onPress={() => router.push('/TelaInicial')}>
                    <Image
                        source={
                            pathname === "/TelaInicial" ||
                                pathname === "/TelaHypados" ||
                                pathname === "/TelaFavoritos" ? require('../assets/images/homeicon_ativado.png')
                                : require('../assets/images/homeicon.png')
                        }
                        style={styles.otherimg}
                    />
                </TouchableOpacity>
                <TouchableOpacity style={styles.otherbotao}
                    onPress={() => router.push('/TelaPesquisa')}>
                    <Image
                        source={
                            pathname === "/TelaPesquisa" ? require('../assets/images/searchicon_ativado.png')
                                : require('../assets/images/searchicon.png')
                        }
                        style={styles.otherimg}
                    />
                </TouchableOpacity>
                <TouchableOpacity style={styles.maisbotao}
                    onPress={toogleMenu}>
                    <Image
                        source={require('../assets/images/maisimg.png')}
                        style={styles.maisimg}
                    />
                </TouchableOpacity>
                <TouchableOpacity style={styles.otherbotao}
                    onPress={() => router.push('/TelaEventos')}>
                    <Image
                        source={
                            pathname === "/TelaEventos" ? require('../assets/images/eventosicon_ativado.png')
                                : require('../assets/images/eventosicon.png')
                        }
                        style={styles.otherimg}
                    />
                </TouchableOpacity>

                <TouchableOpacity style={styles.otherbotao}
                    onPress={() => router.push('/TelaPerfil')}
                >
                    <Image
                        source={
                            pathname === "/TelaPerfil" ? require('../assets/images/usericon_ativado.png')
                                : require('../assets/images/usericon.png')
                        }
                        style={styles.otherimg}
                    />
                </TouchableOpacity>

                {visivel && (
                    <View style={styles.menufl}>
                        <TouchableOpacity style={styles.botmenufl}>
                            <Text style={styles.textmenfl}>Novo Evento</Text>
                        </TouchableOpacity>
                        <View style={styles.linha}></View>
                        <TouchableOpacity style={styles.botmenufl} onPress={() => { pickMedia(); toogleMenu() }
                        }>
                            <Text style={styles.textmenfl}>Nova Mídia</Text>
                        </TouchableOpacity>
                    </View>
                )}
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    footer: {
        backgroundColor: "white",
        width: "100%",
        height: "7%",
        position: "absolute",
        bottom: 0,
        borderTopColor: "lightgray",
        borderTopWidth: 2,
        alignItems: "center",
        justifyContent: "center"
    },
    botoesfooter: {
        width: "92%",
        flexDirection: "row",
        alignItems: "center",
        height: "100%",
        justifyContent: "space-between"
    },
    botaomais: {
        width: 50,
        height: 50,
        backgroundColor: "#3db342",
        justifyContent: "center",
        alignItems: "center",
        borderRadius: 100
    },
    maisimg: {
        width: "100%",
        height: "100%",
    },
    maisbotao: {
        height: "90%",
        width: "15%"
    },
    otherbotao: {
        height: "52%",
        width: "8%"
    },
    otherimg: {
        width: "100%",
        height: "100%",
    },
    menufl: {
        width: "30%",
        height: "150%",
        position: "absolute",
        left: "35%",
        bottom: "110%",
        borderColor: "#a9a9a9",
        borderWidth: 1,
        borderRadius: 15,
        backgroundColor: "#3db342"
    },
    botmenufl: {
        height: "50%",
        width: "100%",
        justifyContent: "center",
        alignItems: "center",
    },
    linha: {
        width: "100%",
        height: 0.7,
        backgroundColor: "black"
    },
    textmenfl: {
        fontSize: 15,
        fontWeight: 700,
        color: "white"
    }

})

