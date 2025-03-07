import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, FlatList } from 'react-native';
import { useNavigation, useRoute } from '@react-navigation/native';
import { Props } from '../navigation/props';

interface ProductItem {
  productID: number;
  name: string;
  price: number;
  quantity: number;
}

const CartScreen: React.FC<Props> = () => {
  const navigation = useNavigation();
  const route = useRoute();

  // Extract cart and products passed from HomeScreen
  const { cart: initialCart, products } = route.params as {
    cart: { [key: number]: number };
    products: ProductItem[];
  };

  // Local cart state initialized with the passed cart
  const [cart, setCart] = useState<{ [key: number]: number }>(initialCart);

  // Function to add to cart
  const addToCart = (productId: number) => {
    setCart((prevCart) => ({
      ...prevCart,
      [productId]: (prevCart[productId] || 0) + 1,
    }));
  };

  // Function to remove from cart
  const removeFromCart = (productId: number) => {
    setCart((prevCart) => {
      const updatedCart = { ...prevCart };
      if (updatedCart[productId] > 1) {
        updatedCart[productId] -= 1;
      } else {
        delete updatedCart[productId]; // Remove product if quantity reaches 0
      }
      return updatedCart;
    });
  };

  const cartItems = products // Filter products to include only those in the cart
    .filter((product) => cart[product.productID] > 0)
    .map((product) => ({
      ...product,
      quantity: cart[product.productID],
      totalCost: cart[product.productID] * product.price, // Calculate total cost per product
    }));

  const total = cartItems.reduce((sum, item) => sum + item.totalCost, 0); // Calculate total price

  // Check if the cart is empty
  const isCartEmpty = cartItems.length === 0;

  return (
    <View style = { styles.container }>
      <Text style = { styles.headerText }>Cart</Text>

      {isCartEmpty ? (
        <Text style = { styles.text }>Your cart is empty.</Text>
      ) : (
        <FlatList
          data = { cartItems }
          keyExtractor = { (item) => item.productID.toString() }
          renderItem = { ({ item }) => (
            <View style = { styles.cartItem }>
              <View style = { styles.itemDetails }>
                <Text style = { styles.itemName }>{ item.name }</Text>
                <Text style = { styles.itemPrice }>Php { item.price.toFixed(2) }</Text>
                <Text style = { styles.itemTotalCost }>
                  Total: Php { item.totalCost.toFixed(2) }
                </Text>
              </View>
              <View style = { styles.quantityControl }>
                <TouchableOpacity onPress = { () => removeFromCart(item.productID) }>
                  <Text style = { styles.buttonText }>-</Text>
                </TouchableOpacity>
                <Text style = { styles.quantityText }>{ item.quantity }</Text>
                <TouchableOpacity onPress = { () => addToCart(item.productID) }>
                  <Text style = { styles.buttonText }>+</Text>
                </TouchableOpacity>
              </View>
            </View>
          )}
        />
      )}

      <Text style = { styles.totalText }>Total: Php { total.toFixed(2) }</Text>

      <View style = { styles.buttonContainer }>
        <TouchableOpacity
          style = {[
            styles.checkoutButton,
            isCartEmpty && styles.disabledButton, // Apply disabled style if cart is empty
          ]}
          onPress = { () => {
            if (!isCartEmpty) {
              navigation.navigate('Checkout', { cart, products, total });
            }
          }}
          disabled = { isCartEmpty } // Disable the button if the cart is empty
        >
          <Text style = { styles.buttonText }>Go to Checkout</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default CartScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#A98307',
  },
  headerText: {
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 20,
    color: '#fff',
  },
  text: {
    fontSize: 16,
    color: '#fff',
    marginVertical: 5,
    textAlign: 'center',
  },
  cartItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: '#fff',
    padding: 15,
    borderRadius: 10,
    marginBottom: 10,
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
  itemTotalCost: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#007bff',
  },
  quantityControl: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  buttonText: {
    fontSize: 18,
    marginHorizontal: 10,
    color: '#007bff',
  },
  buttonContainer: {
    alignItems: 'center',
    marginTop: 20,
  },
  quantityText: {
    fontSize: 16,
    marginHorizontal: 10,
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
  disabledButton: {
    backgroundColor: '#ccc',
    opacity: 0.6,
  },
});