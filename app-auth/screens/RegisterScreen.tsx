import { Alert, Button, StyleSheet, Text, TextInput, View } from 'react-native';
import React, { useState } from 'react';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { auth } from '../config/Config';

export default function RegisterScreen({ navigation }: any) {

    const [correo, setCorreo] = useState('');
    const [contraseña, setContraseña] = useState('');

    function register() {
        createUserWithEmailAndPassword(auth, correo, contraseña)
            .then((userCredential) => {
                const user = userCredential.user;
                setCorreo('');
                setContraseña('');
                navigation.navigate('Login');
            })
            .catch((error) => {
                const errorCode = error.code;
                const errorMessage = error.message;
                let titulo = "";
                let mensaje = "";

                switch (errorCode) {
                    case 'auth/email-already-in-use':
                        titulo = "Correo En Uso";
                        mensaje = "El correo introducido ya se encuentra en uso";
                        break;
                    case 'auth/invalid-email':
                        titulo = "Correo Inválido";
                        mensaje = "El correo introducido es inválido";
                        break;
                    case 'auth/weak-password':
                        titulo = "Contraseña Débil";
                        mensaje = "La contraseña introducida es débil";
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
            <Text style={styles.text}>Registro</Text>
            <TextInput
                placeholder='Introducir Correo'
                onChangeText={setCorreo}
                style={styles.input} />
            <TextInput
                placeholder='Introducir Contraseña'
                onChangeText={setContraseña}
                style={styles.input}
            />
            <Button title='Registrar' onPress={() => register()} />
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
    }
});
