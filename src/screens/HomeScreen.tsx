import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, FlatList } from 'react-native';
import { Props } from '../navigation/props';

interface ProductItem {
    productID: number;
    name: string;
    price: number;
}

const HomeScreen: React.FC<Props> = ({ navigation }) => {
    const [ cart, setCart ] = useState<{ [ key: number ]: number }>( {} ); // Cart containing the held items

    const addToCart = ( productId: number ) => {
        setCart(( prevCart ) => ({
            ...prevCart,
            [ productId ]: ( prevCart[ productId ] || 0 ) + 1
        }));
    };

    const deleteFromCart = ( productId: number ) => {
        setCart(( prevCart ) => {
            const updatedCart = { ...prevCart };
            delete updatedCart[ productId ];
            return updatedCart;
        });
    };

    const products = [
        { productID: 1, name: 'Pneumonoultramicroscopicsilicovolcanoconiosis', price: 150 },
        { productID: 2, name: 'Supercalifragilisticexpialidocious', price: 78.50 },
        { productID: 3, name: 'Dog', price: 9.99 },
        { productID: 5, name: 'Defenestrate', price: 20.75 },
        { productID: 6, name: 'Pogchamp', price: 12 },
        { productID: 7, name: 'Sus', price: 2.25 },
    ];

    const renderProducts = ({ item }: { item: ProductItem }) => {
        const inCart = cart[ item.productID ] || 0;

        const formattedPrice = item.price.toFixed( 2 ); // Format price to two decimal places

        return (
            <View style = { styles.productContainer }>
                <View style = { styles.itemDetails }>
                    <Text style = { styles.itemName }>{ item.name }</Text>
                    <Text style = { styles.itemPrice }>Php { formattedPrice }</Text>
                </View>

                <TouchableOpacity
                    style = {[
                        styles.actionButton,
                        inCart > 0 ? styles.removeButton : styles.addButton
                    ]}
                    onPress = { () =>
                        inCart > 0
                            ? deleteFromCart( item.productID )
                            : addToCart( item.productID )
                    }
                >
                    <Text style = { styles.buttonText }>
                        { inCart > 0 ? 'Remove from Cart' : 'Add to Cart' }
                    </Text>
                </TouchableOpacity>
            </View>
        );
    };

    return (
        <View style = { styles.container }>
            <Text style = { styles.headerText }>Welcome to the Word Shop</Text>

            <FlatList
                data = { products }
                keyExtractor = { ( item ) => item.productID.toString() }
                renderItem = { renderProducts }
            />

            <View style = { styles.buttonContainer }>
                <TouchableOpacity
                    style = { styles.cartButton }
                    onPress = { () => navigation.navigate( 'Cart', { cart, products }) } // Passes the cart onto the cart screen
                >
                    <Text style = { styles.buttonText }>Cart</Text>
                </TouchableOpacity>
            </View>
        </View>
    );
};

export default HomeScreen;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 20,
        backgroundColor: "#A98307",
    },
    headerText: {
        fontSize: 24,
        fontWeight: 'bold',
        textAlign: 'center',
        marginBottom: 20,
        color: '#fff',
    },
    productContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        backgroundColor: '#fff',
        padding: 15,
        marginVertical: 5,
        borderRadius: 10,
    },
    itemDetails: {
        flex: 1,
    },
    itemName: {
        fontSize: 16,
        fontWeight: 'bold',
        color: '#333',
    },
    itemPrice: {
        fontSize: 14,
        color: '#666',
    },
    actionButton: {
        paddingVertical: 10,
        paddingHorizontal: 15,
        borderRadius: 10,
        alignItems: 'center',
        justifyContent: 'center',
    },
    addButton: {
        backgroundColor: "#F7B733", // Yellow for "Add to Cart"
    },
    removeButton: {
        backgroundColor: '#f44336', // Red for "Remove from Cart"
    },
    buttonContainer: {
        alignItems: 'center',
        marginTop: 20,
    },
    cartButton: {
        backgroundColor: "#F7B733",
        minWidth: "50%",
        paddingVertical: 15,
        alignItems: "center",
        borderRadius: 10,
    },
    buttonText: {
        color: "#fff",
        fontSize: 16,
        fontWeight: "bold",
    },
});