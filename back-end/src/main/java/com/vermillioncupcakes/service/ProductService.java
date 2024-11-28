package com.vermillioncupcakes.service;
import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.vermillioncupcakes.models.Product;
import com.vermillioncupcakes.repository.ProductRepository;

@Service
public class ProductService {

    @Autowired
    private ProductRepository productRepository;

    public List<Product> listAll() {
        return productRepository.findAll();
    }

    public Optional<Product> getProductById(Long id) { 
        return productRepository.findById(id); 
    }

    public Product save(Product product) {
        return productRepository.save(product);
    }

    public void deleteById(Long id) {
        productRepository.deleteById(id);
    }

    public List<Product> searchProducts(String keyword) {
        return productRepository.findByNomeContainingIgnoreCase(keyword);
    }

    public List<Product> getProducts() { 
        return productRepository.findAll(); 
    } 
    
    public Product addProduct(Product product) { 
        return productRepository.save(product); 
    }
}