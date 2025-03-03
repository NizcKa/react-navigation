import React, { useState, useContext } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, FlatList } from 'react-native';
import { Props } from '../navigation/props'

interface ProductItem {
    productID: number;
    name: string;
    price: number;
    quantity: number;
}

const HomeScreen: React.FC<Props> = ({ navigation }) => {

    const [ cart, setCart ] = useState< { [ key: number ]: number } >( {} );    //user's cart containing items

    const addToCart = ( productId: number ) => {    //takes the productID and addes it to the cart with its quantity
        setCart( ( prevCart ) => ( {
            ...prevCart,
            [ productId ]: ( prevCart[ productId ] || 0 ) + 1
        } ) );
    };

    const removeFromCart = ( productId: number ) => {   //subtracts quantity of item in cart with productID by 1. 
        setCart( ( prevCart ) => {
            const updatedCart = { ...prevCart };
            if ( updatedCart[ productId ] > 1 ) {
                updatedCart[ productId ] -= 1;
            } else {    // if the quantity is < 1, the item is deleted from the cart
                delete updatedCart[ productId ];
            }
            return updatedCart;
        } );
    };

    const products = [
        { productID: 1, name: 'Product A', price: 10, quantity: 5 },
        { productID: 2, name: 'Product B', price: 15, quantity: 10 },
        { productID: 3, name: 'Product C', price: 20, quantity: 3 },
    ];

    const renderProducts = ( { item }: { item: ProductItem } ) => {

        const inCart = cart[ item.productID ] || 0; //counts the number of items in the cart
        
        const remainingStock = item.quantity - inCart;  //counts the remianing stock of an item
    
        return (
            <View style = { styles.productContainer }>
                <Text style = { styles.productText }>{ `${ item.name } - Php ${ item.price } - Stock: ${ remainingStock }` }</Text>
                
                { inCart > 0 ? (
                    <View style = { styles.quantityContainer }>
                        <TouchableOpacity style = { styles.quantityButton } onPress = { () => removeFromCart( item.productID ) }>
                            <Text style = { styles.buttonText }>-</Text>
                        </TouchableOpacity>
                        
                        <Text style = { styles.quantityText }>{ inCart }</Text>
    
                        <TouchableOpacity 
                            style = { [ styles.quantityButton, remainingStock === 0 && styles.disabledButton ] } 
                            onPress = { () => addToCart( item.productID ) }
                            disabled = { remainingStock === 0 }
                        >
                            <Text style = { styles.buttonText }>+</Text>
                        </TouchableOpacity>
                    </View>
                ) : (
                    <TouchableOpacity style = { styles.addButton } onPress = { () => addToCart( item.productID ) }>
                        <Text style = { styles.buttonText }>Add to Cart</Text>
                    </TouchableOpacity>
                ) }
            </View>
        );
    };

    return (
        <View style = { styles.container }>
            <Text style = { styles.headerText }>Home Screen</Text>

            <FlatList
                data = { products }
                keyExtractor = { ( item ) => item.productID.toString() }
                renderItem = { renderProducts }
            />

            <View style = { styles.buttonContainer }>
                <TouchableOpacity style = { styles.button } onPress = { () => navigation.navigate( 'Cart' ) }>
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
    productText: {
        fontSize: 16,
        color: '#333',
    },
    addButton: {
        backgroundColor: "#F7B733",
        paddingVertical: 10,
        paddingHorizontal: 15,
        borderRadius: 10,
    },
    buttonContainer: {
        alignItems: 'center',
        marginTop: 20,
    },
    button: {
        backgroundColor: "#F7B733",
        minWidth: "50%",
        paddingVertical: 15,
        alignItems: "center",
        borderRadius: 10,
    },
    buttonText: {
        color: "#fff",
        fontSize: 18,
        fontWeight: "bold",
    },
    quantityContainer: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    quantityButton: {
        backgroundColor: "#F7B733",
        paddingVertical: 5,
        paddingHorizontal: 10,
        borderRadius: 5,
        marginHorizontal: 5,
    },
    quantityText: {
        fontSize: 18,
        fontWeight: "bold",
        color: "#333",
    },
    disabledButton: {
        backgroundColor: "#ccc",
    },
    
});