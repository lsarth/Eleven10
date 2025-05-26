import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
    root:{
        flex:1,
    },
    container:{
        flex: 1,
        backgroundColor: "#3db342",
        alignItems: 'center',
        justifyContent: 'center',
    },  
    textlogin:{
        marginTop: 20,
        fontSize: 30,
        fontWeight: 900,
        marginLeft: 20
    },
    boxcad:{
        backgroundColor: "white",
        width: '76%',
        height: '70%',
        borderColor: 'gray',
        borderWidth: 0.6, 
        borderRadius: 10,
        padding:15,
    },
    header:{
        backgroundColor: "white",
        width: "100%",
        position:"absolute",
        top: 0,
    },
    dadpdadl:{
        flexDirection: "row",
        alignSelf: "center",
        marginTop: 15,
        justifyContent: "center",
    },
    textaviso:{
        alignSelf:"center",
        color: "gray",
        fontSize: 11,
    },
    botaologin:{
        backgroundColor: "#3db342",
        width: "45%",
        height: "10%",
        marginTop: 30,
        marginBottom: 20,
        borderColor: "#3db342",
        borderWidth: 2,
        borderRadius: 5,
        justifyContent: 'center',
        alignItems: 'center',
    },
    divbotoes:{
        width: "100%",
        height: "100%",
        flexDirection: "row",
        justifyContent: "space-between",
    },

});