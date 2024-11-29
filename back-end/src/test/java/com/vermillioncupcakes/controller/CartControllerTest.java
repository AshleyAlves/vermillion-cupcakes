package com.vermillioncupcakes.controller;

import java.util.ArrayList;
import java.util.List;

import static org.junit.jupiter.api.Assertions.assertEquals;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import static org.mockito.Mockito.doNothing;
import static org.mockito.Mockito.times;
import static org.mockito.Mockito.verify;
import static org.mockito.Mockito.when;
import org.mockito.MockitoAnnotations;
import org.springframework.http.ResponseEntity;

import com.vermillioncupcakes.models.Product;
import com.vermillioncupcakes.service.CartService;

public class CartControllerTest {

    @InjectMocks
    private CartController cartController;
    @Mock
    private CartService cartService;

    @BeforeEach
    void setUp() {
        MockitoAnnotations.openMocks(this);
    }

    @Test
    void testAddToCart() {
        Product product = new Product(); 

        doNothing().when(cartService).addToCart(product); 
        
        ResponseEntity<Void> response = cartController.addToCart(product); 
        assertEquals(ResponseEntity.ok().build(), response); 
        verify(cartService, times(1)).addToCart(product); 
    } 
        
    @Test void testGetCartItems() { 
        List<Product> productList = new ArrayList<>(); 
        when(cartService.getCartItems()).thenReturn(productList); 
        
        ResponseEntity<List<Product>> response = cartController.getCartItems(); 
        
        assertEquals(ResponseEntity.ok(productList), response); 
        verify(cartService, times(1)).getCartItems(); 
    } 
    
    @Test void testClearCart() { 
        doNothing().when(cartService).clearCart(); 
        ResponseEntity<Void> response = cartController.clearCart(); 
        assertEquals(ResponseEntity.ok().build(), response); 
        verify(cartService, times(1)).clearCart(); 
    }
}
