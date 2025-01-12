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
            <Text style={styles.text}>Login</Text>
            <TextInput
                placeholder='Introducir Correo'
                onChangeText={setCorreo}
                style={styles.input} />
            <TextInput
                placeholder='Introducir Contraseña'
                onChangeText={setContraseña}
                style={styles.input}
                secureTextEntry={true}
            />
            <Button title='Ingresar' onPress={() => login()} />
            <TouchableOpacity onPress={() => { navigation.navigate('Register'); }}>
                <Text style={styles.reg}>Crear una cuenta</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => { navigation.navigate('Restablecer'); }}>
                <Text style={styles.reg}>Restablecer contraseña</Text>
            </TouchableOpacity>
        </View>
    );
}

const styles = StyleSheet.create({
    input: {
        fontSize: 20,
        margin: 10,
        height: 50,
        backgroundColor: '#86999c',
        borderRadius: 20,
        paddingHorizontal: 10
    },
    container: {
        flex: 1,
        justifyContent: 'center'
    },
    text: {
        fontSize: 30,
        textAlign: 'center',
        fontWeight: 'bold'
    },
    reg: {
        color: 'blue',
        fontSize: 15,
        textAlign: 'center'
    }
});
