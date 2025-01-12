import { useState } from 'react';
import { Button, Image, View, Text, StyleSheet, ImageBackground } from 'react-native';
import * as ImagePicker from 'expo-image-picker';

export default function ImagePickerExample() {
    const [image, setImage] = useState<string | null>(null);

    const pickImage = async () => {
        let result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ['images', 'videos'],
            allowsEditing: true,
            aspect: [16, 9],
            quality: 1,
        });

        console.log(result);

        if (!result.canceled) {
            setImage(result.assets[0].uri);
        }
    };

    return (
        <ImageBackground
            source={{ uri: 'https://images.unsplash.com/photo-1517191434949-5e90cd67d2b6?q=80&w=1470&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D' }}
            style={styles.container}
        >
            <Text style={styles.title}>Selecciona una Imagen</Text>
            <Button title="Elegir desde la galería" onPress={pickImage} color="#6200ee" />
            {image && <Image source={{ uri: image }} style={styles.image} />}
            {!image && <Text style={styles.instructions}>No has seleccionado ninguna imagen.</Text>}
        </ImageBackground>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        padding: 20,
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        color: '#fff',
        marginBottom: 20,
    },
    image: {
        width: 250,
        height: 250,
        borderRadius: 10,
        borderWidth: 2,
        borderColor: '#ddd',
        marginTop: 20,
    },
    instructions: {
        marginTop: 20,
        color: '#fff',
        fontSize: 16,
        textAlign: 'center',
    },
});
