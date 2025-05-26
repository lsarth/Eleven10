import { useRouter } from "expo-router";
import { Text, View, StyleSheet, TouchableOpacity, Image, ActivityIndicator, FlatList } from "react-native";
import Header from "@/components/Header";
import PostItem from "@/components/Posts";
import { usePost, PostProvider } from "@/PostContext";

export default function TelaHypados() {

    const router = useRouter();
    const { posts } = usePost();

    const postsInverse = posts.reverse()
    return (
        <PostProvider>

            <View style={styles.container}>
                <Header />
                <FlatList
                    data={postsInverse}
                    keyExtractor={(item) => item.id}
                    renderItem={({ item }) => <PostItem item={item} />}
                    contentContainerStyle={{ paddingTop: 80, paddingBottom: 100, alignItems: 'center' }}
                    ListEmptyComponent={
                        <View style={styles.emptyListContainer}>
                            <Text style={styles.emptyText}>Nenhum post encontrado.</Text>
                        </View>
                    }
                />

            </View>
        </PostProvider>
    )
}
const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        paddingTop: 10,
    },
    emptyListContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    emptyText: {
        fontSize: 16,
        color: 'gray',
    }
});