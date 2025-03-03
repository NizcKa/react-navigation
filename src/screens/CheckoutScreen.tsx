import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { Props } from '../navigation/props'

const CheckoutScreen: React.FC<Props> = ({ navigation }) => {
    return (
        <View style={styles.container}>
            <text>checkout Scren test?</text>

            <View style={styles.buttonContainer}>
                <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('Home')}>
                    <Text style={styles.buttonText}>Shop</Text>
                </TouchableOpacity>
            </View>
        </View>

    );
};

export default CheckoutScreen;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        padding: 20,
        backgroundColor: "#924E7D"
    },

    buttonContainer: {
        justifyContent: 'space-between',
        width: '100%',
        alignItems: 'center',
    },
    button: {
        backgroundColor: "#F7B733",
        minWidth: "30%",
        paddingVertical: 15,
        alignItems: "center",
        borderRadius: 10,
        marginVertical: 20,
    },
    buttonText: {
        color: "#fff",
        fontSize: 18,
        fontWeight: "bold",
    },
});