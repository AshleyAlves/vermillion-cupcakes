package com.vermillioncupcakes.controller;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.vermillioncupcakes.models.Product;
import com.vermillioncupcakes.service.ProductService;

@RestController
@RequestMapping("/api/produtos")
@CrossOrigin(origins = "http://localhost:4200")
public class ProductController {

    @Autowired
    private ProductService productService;

    @GetMapping("/{id}")
    public ResponseEntity<Product> findById(@PathVariable Long id) {
        Optional<Product> product = productService.getProductById(id);
        return product.map(ResponseEntity::ok).orElseGet(() -> ResponseEntity.notFound().build());
    }

    @PutMapping("/{id}")
    public ResponseEntity<Product> update(@PathVariable Long id, @RequestBody Product productUpdated) {
        Optional<Product> productExistente = productService.getProductById(id);
        if (productExistente.isPresent()) {
            Product product = productExistente.get();
            product.setNome(productUpdated.getNome());
            product.setPreco(productUpdated.getPreco());
            product.setDescricao(productUpdated.getDescricao());
            product.setQuantidade(productUpdated.getQuantidade());
            product.setImagem(productUpdated.getImagem());
            return ResponseEntity.ok(productService.save(product));
        } else {
            return ResponseEntity.notFound().build();
        }
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteById(@PathVariable Long id) {
        Optional<Product> product = productService.getProductById(id);
        if (product.isPresent()) {
            productService.deleteById(id);
            return ResponseEntity.noContent().build();
        } else {
            return ResponseEntity.notFound().build();
        }
    }

    @GetMapping("/pesquisa")
    public List<Product> searchProducts(@RequestParam String keyword) {
        return productService.searchProducts(keyword);
    }

    @GetMapping 
    public ResponseEntity<List<Product>> getProducts() { 
        List<Product> products = productService.getProducts(); 
        return ResponseEntity.ok(products); 
    } 
    
    @PostMapping 
    public ResponseEntity<Product> addProduct(@RequestBody Product product) { 
        Product newProduct = productService.addProduct(product); 
        return ResponseEntity.ok(newProduct);
    }
}
