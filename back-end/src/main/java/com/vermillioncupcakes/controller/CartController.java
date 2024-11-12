package com.vermillioncupcakes.controller;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import com.vermillioncupcakes.models.Product;
import com.vermillioncupcakes.service.CartService;

@RestController
@RequestMapping("/api/carrinho")
@CrossOrigin(origins = "http://localhost:4200")
public class CartController {

    private final CartService cartService;

    public CartController(CartService cartService) {
        this.cartService = cartService;
    }

    @PostMapping("/adicionar")
    public ResponseEntity<Void> addToCart(@RequestBody Product product) {
        cartService.addToCart(product);
        return ResponseEntity.ok().build();
    }

    @GetMapping
    public ResponseEntity<List<Product>> getCartItems() {
        List<Product> cartItems = cartService.getCartItems();
        return ResponseEntity.ok(cartItems);
    }

    @DeleteMapping("/limpar")
    public ResponseEntity<Void> clearCart() {
        cartService.clearCart();
        return ResponseEntity.ok().build();
    }
}
