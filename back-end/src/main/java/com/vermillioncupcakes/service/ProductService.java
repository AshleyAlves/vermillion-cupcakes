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

    // Método para listar todos os produtos
    public List<Product> listAll() {
        return productRepository.findAll();
    }

    // Método para buscar produto por ID
    public Optional<Product> findById(Long id) {
        return productRepository.findById(id);
    }

    // Método para criar ou atualizar produto
    public Product save(Product product) {
        return productRepository.save(product);
    }

    // Método para deletar produto
    public void deleteById(Long id) {
        productRepository.deleteById(id);
    }
}