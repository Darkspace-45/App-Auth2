import { Alert, TouchableOpacity, StyleSheet, Text, TextInput, View } from 'react-native';
import React, { useState } from 'react';
import { sendPasswordResetEmail } from 'firebase/auth';
import { auth } from '../config/Config';

export default function RestablecerScreen() {
    const [correo, setCorreo] = useState('');

    function restablecer() {
        sendPasswordResetEmail(auth, correo)
            .then(() => {
                Alert.alert('Mensaje', 'Se ha enviado un correo para restablecer la contraseña');
                setCorreo(''); // Limpiar el campo después de enviar el correo
            })
            .catch((error) => {
                let titulo = "Error";
                let mensaje = "";

                switch (error.code) {
                    case 'auth/invalid-email':
                        titulo = "Correo Inválido";
                        mensaje = "El correo introducido no es válido.";
                        break;
                    case 'auth/user-not-found':
                        titulo = "Usuario No Encontrado";
                        mensaje = "No se encontró una cuenta con este correo.";
                        break;
                    default:
                        titulo = "Error";
                        mensaje = "Ocurrió un error al enviar el correo.";
                        break;
                }

                Alert.alert(titulo, mensaje);
            });
    }

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Recuperar Contraseña</Text>
            <TextInput
                style={styles.input}
                placeholder="Introducir Correo"
                keyboardType="email-address"
                value={correo}
                onChangeText={setCorreo}
            />
            <TouchableOpacity style={styles.button} onPress={restablecer}>
                <Text style={styles.buttonText}>Enviar</Text>
            </TouchableOpacity>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#f2f2f2',
        paddingHorizontal: 20,
    },
    title: {
        fontSize: 26,
        fontWeight: 'bold',
        color: '#333',
        marginBottom: 20,
        textAlign: 'center',
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
        padding: 15,
        borderRadius: 10,
        width: '100%',
        alignItems: 'center',
    },
    buttonText: {
        color: '#fff',
        fontSize: 16,
        fontWeight: 'bold',
    },
});
