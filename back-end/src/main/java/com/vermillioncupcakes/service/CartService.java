package com.vermillioncupcakes.service;

import java.util.ArrayList;
import java.util.List;

import org.springframework.stereotype.Service;

import com.vermillioncupcakes.models.Product;

@Service
public class CartService {

    private final List<Product> cartItems = new ArrayList<>();

    public void addToCart(Product product) {
        cartItems.add(product);
    }

    public List<Product> getCartItems() {
        return new ArrayList<>(cartItems);
    }

    public void clearCart() {
        cartItems.clear();
    }
}
