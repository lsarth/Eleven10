import { View, Text, Image, TouchableOpacity, StyleSheet, TouchableHighlight } from "react-native";
import { useState } from "react";
import { Video } from "expo-av";
import { Post } from "@/PostContext";

type PostItemProps = {
  item: Post;
};

function PostItem({ item } : PostItemProps){
  const [liked, setLiked] = useState(false);
  const [likesCount, setLikesCount] = useState(0);

  function toggleLike() {
    if (liked) {
      setLikesCount(likesCount - 1);
    } else {
      setLikesCount(likesCount + 1);
    }
    setLiked(!liked);
  }

  return(
    <View style={styles.post}>
      {/* Perfil */}
      <View style={styles.profileContainer}>
        <Image
          source={{ uri: item.userProfilePicture  }}
          style={styles.profileImage}
        />
        <Text style={styles.profileName}>{item.userName || "Usuário"}</Text>
      </View>

      {/* Mídia */}
      {item.type === "image" ? (
        <Image source={{ uri: item.uri }} style={styles.media} />
      ) : (
        <Video
          source={{ uri: item.uri }}
          style={styles.media}
          useNativeControls
        />
      )}

      {/* Legenda */}
      <Text style={styles.caption}>{item.legenda}</Text>

      <View style={styles.likecoment}>
      {/* Botão Like */}
      <TouchableOpacity onPress={toggleLike} style={styles.likeButton}>
        <Image source={liked ? 
        require('../assets/images/likeimg_ativado.png') 
        : require('../assets/images/likeimg.png') }
        style={styles.likeimg}
        />
        <Text style={{color: liked ? "#3db342" : "gray", fontSize: 12}}>{item.likes}</Text>
      </TouchableOpacity>
      <View style={styles.linha}></View>
      {/*Botão Comentário*/}
      <TouchableOpacity style={styles.likeButton}>
        <Image
          source={require('../assets/images/comentimg.png')}
          style={styles.likeimg}
        />
      </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  post: {
    marginBottom: 20,
    backgroundColor: "#fff",
    padding: 10,
    height: 320,
    width: 320,
  },
  profileContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 8,
  },
  profileImage: {
    width: 40,
    height: 40,
    borderRadius: 20,
    marginRight: 8,
  },
  profileName: {
    fontWeight: "bold",
    fontSize: 16,
  },
  media: {
    width: "100%",
    resizeMode: "cover",
    height: 200,
    marginBottom: 8,
    borderRadius: 10,
  },
  caption: {
    marginBottom: 8,
    alignSelf: "center"
  },
  likeButton: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
    alignSelf: "center"
  },
  likeimg: {
    width: 20,
    height: 20,
  },
  likecoment:{
    flexDirection: "row",
    alignItems: "center",
    alignSelf:"center",
    gap: 50
  },
  linha:{
    height: "100%",
    width: 1,
    backgroundColor: "#a9a9a9"
  }
});

export default PostItem;
