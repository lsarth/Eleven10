import { useRouter } from "expo-router";
import { Text, View, StyleSheet, TouchableOpacity, Image, ActivityIndicator } from "react-native";
import Header from "@/components/Header";
import { usePost } from "@/PostContext";

export default function TelaInicial() {
    const router = useRouter();
 

    return (
        <View style={styles.root}>
            <Header />
            <View style={styles.centerContent}>
                <Text style={styles.text}>Não Existe item nos Favoritos ainda</Text>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    root: {
        flex: 1,
        backgroundColor: "#fff",
    },
    centerContent: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
    },
    text: {
        fontSize: 24,
        fontWeight: "900",
        marginBottom: 20, // Espaço entre o texto e o ActivityIndicator
    }
});
