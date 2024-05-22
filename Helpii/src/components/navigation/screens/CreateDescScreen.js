import React, { useState, useEffect } from "react";
import { View, StyleSheet, Text, SafeAreaView, TextInput, TouchableOpacity, FlatList,  ScrollView, } from "react-native";
import { textStyles } from "../../Fonts.js";
import { obterUrlBase } from "../../autenticacao/AuthContext";
import AsyncStorage from "@react-native-async-storage/async-storage";

export default function DescScreen({ navigation }) {
    const [nome, setNome] = useState("");
    const [descricao, setDescricao] = useState("");
    const [quantidade, setQuantidade] = useState(0);
    const [categoria, setCategoria] = useState("");
    const [categoriaId, setCategoriaId] = useState("");
    const [isModalVisible, setIsModalVisible] = useState(false);
    const [categorias, setCategorias] = useState([]);
    const [endereco, setEndereco] = useState("");
    const [enderecoId, setEnderecoId] = useState("");
    const [enderecos, setEnderecos] = useState([]);
    const [file, setFile] = useState("");
    const [hasAddress, setHasAddress] = useState(false);

    const cadastrarDoacao = async () => {
        try {
            const token = await AsyncStorage.getItem("userToken");
            const userData = {
                nome,
                descricao,
                quantidade: Number(quantidade),
                categoriaId,
                enderecoId,
                file,
            };

            const url = `${obterUrlBase()}/api/doacao`;
            const response = await fetch(url, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${token}`,
                },
                body: JSON.stringify(userData),
            });

            if (response.ok) {
                console.log("Doacao cadastrada com sucesso!");
                navigation.navigate("Home");
            } else {
                console.error("Falha ao cadastrar usuário. Status:", response.status);
            }
        } catch (error) {
            console.error("Erro ao cadastrar usuário:", error.message);
        }
    };

    useEffect(() => {
        const fetchCategorias = async () => {
            try {
                const url = `${obterUrlBase()}/api/categoria`;
                const response = await fetch(url);
                const data = await response.json();

                setCategorias(data);
            } catch (error) {
                console.error('Erro ao buscar categorias:', error);
            }
        };

        fetchCategorias();
    }, []);

    useEffect(() => {
        const fetchEnderecos = async () => {
            try {
                const userId = await AsyncStorage.getItem("userId");
                const token = await AsyncStorage.getItem('userToken');
                const url = `${obterUrlBase()}/api/endereco/user/${userId}`;
                const response = await fetch(url, {
                    method: "GET",
                    headers: {
                        Accept: "application/json",
                        "Content-Type": "application/json;charset=UTF-8",
                        "Authorization": `Bearer ${token}`,
                    },
                });
                const data = await response.json();

                setEnderecos(data);
                setHasAddress(data.length > 0);
            } catch (error) {
                console.error('Erro ao buscar endereços:', error);
            }
        };

        fetchEnderecos();
    }, []);

    const redirectToLocationScreen = () => {
        navigation.navigate("Location");
    };

    const renderCategoriaItem = ({ item }) => (
        <TouchableOpacity
            style={styles.categoriaItem}
            onPress={() => {
                setCategoria(item.nomeCategoria);
                setCategoriaId(item.id);
                setIsModalVisible(true);
            }}
        >
            <Text>{item.label}</Text>
        </TouchableOpacity>
    );

    const renderEnderecoItem = ({ item }) => (
        <TouchableOpacity
            style={styles.categoriaItem}
            onPress={() => {
                setEndereco(item.rua);
                setEnderecoId(item.id);
                setIsModalVisible(true);
            }}
        >
            <Text>{item.rua}</Text>
        </TouchableOpacity>
    );

    const renderCategoriaList = () => (
        <FlatList
            data={categorias}
            renderItem={renderCategoriaItem}
            keyExtractor={(item) => item.id}
        />
    );

    const renderEnderecoList = () => (
        <FlatList
            data={enderecos}
            renderItem={renderEnderecoItem}
            keyExtractor={(item) => item.id}
        />
    );

    const VoltaImage = () => {
        navigation.navigate("Image");
    };

    return (
        <SafeAreaView style={styles.container}>
            <ScrollView contentContainerStyle={{ flexGrow: 1, paddingBottom: 50 }}>
            <Text>{'\n'} {'\n'} {'\n'}</Text>
            <TouchableOpacity onPress={VoltaImage}>
                <Text style={styles.BotaoVoltar}>{`ᐊ`}</Text>
            </TouchableOpacity>

            {hasAddress ? (
                <View style={styles.containerText}>
                    <Text style={textStyles.paragrafoNeg}>Nome do produto</Text>
                    <TextInput
                        style={styles.textInput}
                        editable
                        numberOfLines={1}
                        maxLength={40}
                        onChangeText={(nome) => setNome(nome)}
                        placeholder="Nome"
                        value={nome}
                    />
                    <Text></Text>
                    <Text style={textStyles.paragrafoNeg}>Quantidade</Text>
                    <TextInput
                        style={styles.quant}
                        keyboardType="numeric"
                        placeholder="Quantidade"
                        value={quantidade}
                        onChangeText={(quantidade) => setQuantidade(quantidade)}
                    />
                    <Text></Text>
                    <Text style={textStyles.paragrafoNeg}>Categoria</Text>
                    <TouchableOpacity
                        style={styles.categoriaButton}
                        onPress={() => setIsModalVisible(true)}
                    >
                        <Text style={{ color: "#000" }}>{categoria || "Selecione a categoria"}</Text>
                    </TouchableOpacity>
                    {isModalVisible && renderCategoriaList()}
                    <Text></Text>
                    <Text style={textStyles.paragrafoNeg}>Endereço</Text>
                    <TouchableOpacity
                        style={styles.categoriaButton}
                        onPress={() => setIsModalVisible(true)}
                    >
                        <Text style={{ color: "#000" }}>{endereco || "Selecione o endereco"}</Text>
                    </TouchableOpacity>
                    {isModalVisible && renderEnderecoList()}
                    <Text></Text>
                    <Text style={textStyles.paragrafoNeg}>Descrição</Text>
                    <TextInput
                        style={styles.textInputDesc}
                        editable
                        multiline
                        numberOfLines={5}
                        maxLength={40}
                        onChangeText={(descricao) => setDescricao(descricao)}
                        placeholder="Descricao"
                        value={descricao}
                    />

                <Text style={textStyles.paragrafoNeg}>File</Text>
                <TextInput
                    style={styles.textInputDesc}
                    editable
                    multiline
                    numberOfLines={5}
                    maxLength={200}
                    onChangeText={(file) => setFile(file)}
                    placeholder="Descricao"
                    value={file}
                />

                    <TouchableOpacity
                        style={styles.adicionarButton}
                        onPress={cadastrarDoacao}
                    >
                        <Text style={{ color: "#000", fontSize: 16, fontWeight: "bold" }}>Adicionar</Text>
                    </TouchableOpacity>
                </View>
            ) : (
                <View style={styles.noAddressContainer}>
                    <Text style={textStyles.paragrafoNeg}>
                        Você não possui um endereço cadastrado.
                    </Text>
                    <TouchableOpacity
                        style={styles.addAddressButton}
                        onPress={redirectToLocationScreen}
                    >
                        <Text style={{ color: "#000", fontSize: 16, fontWeight: "bold" }}>
                            Adicionar Endereço
                        </Text>
                    </TouchableOpacity>
                </View>
                )}
            </ScrollView>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#0047AB",
        padding: 20,
    },
    containerText: {
        top: 10,
        marginLeft: 50,
        marginRight: 50,
    },
    noAddressContainer: {
        marginTop: 20,
        alignItems: "center",
    },
    addAddressButton: {
        backgroundColor: "#FFFFFF",
        height: 40,
        borderRadius: 5,
        marginTop: 10,
        justifyContent: 'center',
        alignItems: 'center',
    },
    textInput: {
        textAlign: "center",
        backgroundColor: "#FFFFFF",
        height: 40,
        padding: 10,
        borderRadius: 5,
        marginTop: 10,
        fontSize: 15,
    },
    categoriaButton: {
        backgroundColor: "#FFFFFF",
        height: 40,
        width: 150,
        padding: 10,
        borderRadius: 5,
        marginLeft: 50,
        marginTop: 10,
        fontSize: 15,
        alignItems: "center",
    },
    adicionarButton: {
        backgroundColor: "#FFFFFF",
        height: 40,
        borderRadius: 5,
        marginTop: 10,
        justifyContent: 'center',
        alignItems: 'center',
    },
    textInputDesc: {
        textAlign: "center",
        backgroundColor: "#FFFFFF",
        height: 50,
        borderRadius: 5,
        marginTop: 10,
        fontSize: 15,
        height: 100,
    },
    quant: {
        textAlign: "center",
        backgroundColor: "#FFFFFF",
        height: 50,
        padding: 10,
        borderRadius: 5,
        marginTop: 10,
        marginLeft: 100,
        marginRight: 100,
        fontSize: 15,
    },
    categoriaItem: {
        padding: 1,
        borderBottomWidth: 1,
        borderBottomColor: "#ccc",
    },
    BotaoVoltar: {
        left: 20,
        fontWeight: "bold",
        color: "white",
        fontSize: 30,
        marginBottom: 10,
    },
});