import { Button, StyleSheet, Text, View } from 'react-native';
import React from 'react';
import { signOut } from 'firebase/auth';
import { auth } from '../config/Config';

export default function WelcomeScreen({ navigation }: any) {

    function logout() {
        signOut(auth).then(() => {
            // Sign-out successful.
            navigation.navigate('Login');
        }).catch((error) => {
            // An error happened.
            console.error(error);
        });
    }

    return (
        <View style={styles.container}>
            <Text style={styles.title}>¡Bienvenido!</Text>
            <Text style={styles.subtitle}>Estás conectado correctamente.</Text>
            <Button title="Cerrar Sesión" onPress={() => logout()} color="#FF3B30" />
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        padding: 20,
        backgroundColor: '#F9F9F9',
    },
    title: {
        fontSize: 30,
        fontWeight: 'bold',
        color: '#333',
        marginBottom: 10,
    },
    subtitle: {
        fontSize: 18,
        color: '#777',
        marginBottom: 30,
    },
});
