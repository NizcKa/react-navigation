import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, FlatList, Alert } from 'react-native';
import { Props } from '../navigation/props';

interface ProductItem {
  productID: number;
  name: string;
  price: number;
  quantity: number;
}

const CheckoutScreen: React.FC<Props<'Checkout'>> = ({ navigation, route }) => {
  // Extract cart, products, and total from route params
  const { cart, products, total } = route.params;

  // Filter products to include only those in the cart
  const cartItems = products
    .filter((product) => cart[product.productID] > 0)
    .map((product) => ({
      ...product,
      quantity: cart[product.productID],
      totalCost: cart[product.productID] * product.price,
    }));

  // Handle checkout button press
  const handleCheckout = () => {
    Alert.alert(
      'Checkout Successful', // Title
      'Your order has been placed successfully!', // Message
      [
        {
          text: 'OK', // Button text
          onPress: () => navigation.navigate('Home'), // Navigate to HomeScreen
        },
      ]
    );
  };

  return (
    <View style = { styles.container }>
      <Text style = { styles.headerText }>Checkout</Text>

      {/* Render cart items using FlatList */}
      <FlatList
        data = { cartItems }
        keyExtractor = { (item) => item.productID.toString() }
        renderItem = { ({ item }) => (
          <View style = { styles.cartItem }>
            <Text style = { styles.itemName }>{ item.name }</Text>
            <Text style = { styles.itemPrice }>Price: Php { item.price.toFixed(2) }</Text>
            <Text style = { styles.itemQuantity }>Quantity: { item.quantity }</Text>
            <Text style = { styles.itemTotalCost }>Total: Php { item.totalCost.toFixed(2) }</Text>
          </View>
        )}
      />

      {/* Display total */}
      <Text style = { styles.totalText }>Total: Php { total.toFixed(2) }</Text>

      {/* Checkout Button */}
      <TouchableOpacity style = { styles.checkoutButton } onPress = { handleCheckout }>
        <Text style = { styles.buttonText }>Checkout</Text>
      </TouchableOpacity>
    </View>
  );
};

export default CheckoutScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#924E7D',
  },
  headerText: {
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 20,
    color: '#fff',
  },
  cartItem: {
    backgroundColor: '#fff',
    padding: 15,
    borderRadius: 10,
    marginBottom: 10,
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
  itemQuantity: {
    fontSize: 14,
    color: '#666',
  },
  itemTotalCost: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#007bff',
  },
  totalText: {
    fontSize: 18,
    fontWeight: 'bold',
    textAlign: 'right',
    marginTop: 20,
    color: '#fff',
  },
  checkoutButton: {
    backgroundColor: '#F7B733',
    paddingVertical: 15,
    alignItems: 'center',
    borderRadius: 10,
    marginTop: 20,
  },
  buttonText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#fff',
  },
});