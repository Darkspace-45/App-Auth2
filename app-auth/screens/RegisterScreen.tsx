import { Alert, TouchableOpacity, StyleSheet, Text, TextInput, View } from 'react-native';
import React, { useState } from 'react';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { auth } from '../config/Config';

export default function RegisterScreen({ navigation }: any) {
    const [correo, setCorreo] = useState('');
    const [contraseña, setContraseña] = useState('');

    function register() {
        createUserWithEmailAndPassword(auth, correo, contraseña)
            .then((userCredential) => {
                setCorreo('');
                setContraseña('');
                navigation.navigate('Login');
            })
            .catch((error) => {
                let titulo = "";
                let mensaje = "";

                switch (error.code) {
                    case 'auth/email-already-in-use':
                        titulo = "Correo En Uso";
                        mensaje = "El correo introducido ya se encuentra en uso.";
                        break;
                    case 'auth/invalid-email':
                        titulo = "Correo Inválido";
                        mensaje = "El correo introducido no es válido.";
                        break;
                    case 'auth/weak-password':
                        titulo = "Contraseña Débil";
                        mensaje = "La contraseña introducida es demasiado débil.";
                        break;
                    default:
                        titulo = "Error";
                        mensaje = "Ocurrió un error. Verifique correo y contraseña.";
                        break;
                }

                Alert.alert(titulo, mensaje);
            });
    }

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Registro</Text>
            <TextInput
                placeholder="Correo Electrónico"
                value={correo}
                onChangeText={setCorreo}
                style={styles.input}
                keyboardType="email-address"
            />
            <TextInput
                placeholder="Contraseña"
                value={contraseña}
                onChangeText={setContraseña}
                style={styles.input}
                secureTextEntry={true}
            />
            <TouchableOpacity style={styles.button} onPress={register}>
                <Text style={styles.buttonText}>Registrar</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => navigation.navigate('Login')}>
                <Text style={styles.loginText}>¿Ya tienes cuenta? Inicia sesión</Text>
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
        paddingHorizontal: 20,
    },
    title: {
        fontSize: 28,
        fontWeight: 'bold',
        marginBottom: 20,
        color: '#333',
    },
    input: {
        width: '100%',
        height: 50,
        backgroundColor: '#e0e0e0',
        borderRadius: 10,
        paddingHorizontal: 15,
        fontSize: 16,
        marginBottom: 15,
    },
    button: {
        backgroundColor: '#007BFF',
        paddingVertical: 15,
        paddingHorizontal: 30,
        borderRadius: 10,
        width: '100%',
        alignItems: 'center',
    },
    buttonText: {
        color: '#fff',
        fontSize: 16,
        fontWeight: 'bold',
    },
    loginText: {
        marginTop: 15,
        color: '#007BFF',
        fontSize: 14,
        textAlign: 'center',
    },
});
