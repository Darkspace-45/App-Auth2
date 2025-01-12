import { Alert, Button, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';
import React, { useState } from 'react';
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
import { auth } from '../config/Config';

export default function LoginScreen({ navigation }: any) {
    const [correo, setCorreo] = useState('');
    const [contraseña, setContraseña] = useState('');

    function login() {
        signInWithEmailAndPassword(auth, correo, contraseña)
            .then((userCredential) => {
                const user = userCredential.user;
                setCorreo('');
                setContraseña('');
                navigation.navigate('Welcome');
            })
            .catch((error) => {
                const errorCode = error.code;
                const errorMessage = error.message;
                let titulo = "";
                let mensaje = "";

                switch (errorCode) {
                    case 'auth/invalid-credentials':
                        titulo = "Credenciales Inválidas";
                        mensaje = "Las credenciales introducidas son inválidas";
                        break;
                    case 'auth/invalid-email':
                        titulo = "Correo Inválido";
                        mensaje = "El correo introducido es inválido";
                        break;
                    default:
                        titulo = "Error";
                        mensaje = "Verifique correo y contraseña";
                        break;
                }

                Alert.alert(titulo, mensaje);
            });
    }

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Iniciar Sesión</Text>
            <TextInput
                placeholder='Correo electrónico'
                placeholderTextColor="#ccc"
                value={correo}
                onChangeText={setCorreo}
                style={styles.input} />
            <TextInput
                placeholder='Contraseña'
                placeholderTextColor="#ccc"
                value={contraseña}
                onChangeText={setContraseña}
                style={styles.input}
                secureTextEntry={true}
            />
            <TouchableOpacity style={styles.button} onPress={login}>
                <Text style={styles.buttonText}>Ingresar</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => { navigation.navigate('Register'); }}>
                <Text style={styles.link}>Crear una cuenta</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => { navigation.navigate('Restablecer'); }}>
                <Text style={styles.link}>¿Olvidaste tu contraseña?</Text>
            </TouchableOpacity>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#f5f5f5',
        padding: 20,
    },
    title: {
        fontSize: 32,
        fontWeight: 'bold',
        marginBottom: 20,
        color: '#333',
    },
    input: {
        width: '90%',
        height: 50,
        backgroundColor: '#e8e8e8',
        borderRadius: 10,
        paddingHorizontal: 15,
        fontSize: 18,
        marginVertical: 10,
    },
    button: {
        width: '90%',
        height: 50,
        backgroundColor: '#007AFF',
        borderRadius: 10,
        justifyContent: 'center',
        alignItems: 'center',
        marginVertical: 10,
    },
    buttonText: {
        color: '#fff',
        fontSize: 18,
        fontWeight: '600',
    },
    link: {
        color: '#007AFF',
        fontSize: 16,
        marginTop: 10,
    },
});
