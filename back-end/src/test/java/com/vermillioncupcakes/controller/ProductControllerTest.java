package com.vermillioncupcakes.controller;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

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
import com.vermillioncupcakes.service.ProductService;

public class ProductControllerTest {

    @InjectMocks
    private ProductController productController;

    @Mock
    private ProductService productService;

    @BeforeEach
    void setUp() {
        MockitoAnnotations.openMocks(this);
    }

    @Test
    void testFindById() {
        Long productId = 1L;
        Product product = new Product();
        when(productService.getProductById(productId)).thenReturn(Optional.of(product));

        ResponseEntity<Product> response = productController.findById(productId);

        assertEquals(ResponseEntity.ok(product), response);
        verify(productService, times(1)).getProductById(productId);
    }

    @Test
    void testUpdate() {
        Long productId = 1L;
        Product existingProduct = new Product();
        Product updatedProduct = new Product();
        when(productService.getProductById(productId)).thenReturn(Optional.of(existingProduct));
        when(productService.save(existingProduct)).thenReturn(existingProduct);

        ResponseEntity<Product> response = productController.update(productId, updatedProduct);

        assertEquals(ResponseEntity.ok(existingProduct), response);
        verify(productService, times(1)).getProductById(productId);
        verify(productService, times(1)).save(existingProduct);
    }

    @Test
    void testDeleteById() {
        Long productId = 1L;
        Product product = new Product();
        when(productService.getProductById(productId)).thenReturn(Optional.of(product));
        doNothing().when(productService).deleteById(productId);

        ResponseEntity<Void> response = productController.deleteById(productId);

        assertEquals(ResponseEntity.noContent().build(), response);
        verify(productService, times(1)).getProductById(productId);
        verify(productService, times(1)).deleteById(productId);
    }

    @Test
    void testSearchProducts() {
        String keyword = "cupcake";
        List<Product> productList = new ArrayList<>();
        when(productService.searchProducts(keyword)).thenReturn(productList);

        List<Product> response = productController.searchProducts(keyword);

        assertEquals(productList, response);
        verify(productService, times(1)).searchProducts(keyword);
    }

    @Test
    void testGetProducts() {
        List<Product> productList = new ArrayList<>();
        when(productService.getProducts()).thenReturn(productList);

        ResponseEntity<List<Product>> response = productController.getProducts();

        assertEquals(ResponseEntity.ok(productList), response);
        verify(productService, times(1)).getProducts();
    }

    @Test
    void testAddProduct() {
        Product product = new Product();
        when(productService.addProduct(product)).thenReturn(product);

        ResponseEntity<Product> response = productController.addProduct(product);

        assertEquals(ResponseEntity.ok(product), response);
        verify(productService, times(1)).addProduct(product);
    }
}
