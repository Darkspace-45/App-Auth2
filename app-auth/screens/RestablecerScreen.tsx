import { Alert, Button, StyleSheet, Text, TextInput, View } from 'react-native'
import React, { useState } from 'react'
import { sendPasswordResetEmail } from 'firebase/auth';
import { auth } from '../config/Config';

export default function RestablecerScreen() {

    const [correo, setcorreo] = useState('');

    function restablecer() {
        sendPasswordResetEmail(auth, correo)
            .then(() => {
                // Password reset email sent!
                // ..
                Alert.alert('Mensaje','Se ha enviado un correo para restablecer la contraseña')
            })
            .catch((error) => {
                const errorCode = error.code;
                const errorMessage = error.message;
                // ..
                Alert.alert(errorCode, errorMessage);
            });
    }

    return (
        <View>
            <Text>RestablecerScreen</Text>
            <TextInput
                placeholder='Introducir Correo'
                keyboardType='email-address' 
                onChangeText={setcorreo}/>
            <Button title='Enviar' onPress={() => restablecer()} />
        </View>
    )
}

const styles = StyleSheet.create({})