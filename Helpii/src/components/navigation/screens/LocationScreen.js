import React, { useState } from 'react';
import { StyleSheet, Text, TextInput, TouchableOpacity, SafeAreaView } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { obterUrlBase } from "../../autenticacao/AuthContext";

const LocationScreen = () => {
    const navigation = useNavigation();

    const handleSave = async () => {
        try {
            const userId = await AsyncStorage.getItem("userId");
            const token = await AsyncStorage.getItem('userToken');
            const enderecoData = {
                rua,
                cidade,
                uf,
                userId,
            };

            const url = `${obterUrlBase()}/api/endereco`
            const response = await fetch(url, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${token}`,
                },
                body: JSON.stringify(enderecoData),
            });

            if (response.ok) {
                console.log('Endereço cadastrado com sucesso!');
                navigation.reset({
                    index: 0,
                    routes: [{ name: 'Desc' }],
                });
            } else {
                console.error('Falha ao cadastrar endereço. Status:', response.status);
            }
        } catch (error) {
            console.error('Erro ao cadastrar endereço:', error.message);
        }
    };

    const [rua, onChangeRua] = useState('');
    const [cidade, onChangeCidade] = useState('');
    const [uf, onChangeUF] = useState('');

    return (
        <SafeAreaView style={styles.container}>
            <Text style={styles.text}>Rua</Text>
            <TextInput
                style={styles.textInput}
                editable
                multiline
                numberOfLines={1}
                maxLength={40}
                onChangeText={rua => onChangeRua(rua)}
                placeholder='Rua'
                value={rua}
            />
            <Text style={styles.text}>Cidade</Text>
            <TextInput
                style={styles.textInput}
                editable
                multiline
                numberOfLines={1}
                maxLength={40}
                onChangeText={cidade => onChangeCidade(cidade)}
                placeholder='Cidade'
                value={cidade}
            />
            <Text style={styles.text}>UF</Text>
            <TextInput
                style={styles.textInput}
                editable
                multiline
                numberOfLines={1}
                maxLength={40}
                onChangeText={uf => onChangeUF(uf)}
                placeholder='UF'
                value={uf}
            />

            <TouchableOpacity style={styles.saveButton} onPress={handleSave}>
                <Text style={styles.buttonText}>Salvar</Text>
            </TouchableOpacity>
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#0047AB',
        padding: 20,
    },
    text: {
        color: '#FFFFFF',
        fontSize: 15,
        marginTop: 15,
        marginLeft: 5,
    },
    textInput: {
        backgroundColor: '#FFFFFF',
        height: 50,
        padding: 10,
        borderRadius: 10,
        marginTop: 15,
        fontSize: 15,
    },
    saveButton: {
        backgroundColor: 'purple',
        padding: 10,
        borderRadius: 5,
        alignItems: 'center',
        marginTop: 25,
    },
    buttonText: {
        color: '#FFFFFF',
    },
});

export default LocationScreen;