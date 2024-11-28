package com.vermillioncupcakes.controller;

import java.util.List;
import java.util.Optional;
import java.util.Set;
import java.util.stream.Collectors;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.vermillioncupcakes.models.Product;
import com.vermillioncupcakes.models.User;
import com.vermillioncupcakes.service.ProductService;
import com.vermillioncupcakes.service.UserService;

@RestController
@RequestMapping("/api")
@CrossOrigin(origins = "http://localhost:4200")
public class UserController {

    @Autowired
    private UserService userService;

    @Autowired
    private ProductService productService;

    @GetMapping
    public List<User> getAllUsers() {
        return userService.getAllUsers();
    }

    @PostMapping("/register")
    public ResponseEntity<User> registerUser(@RequestBody User user) {
        User savedUser = userService.save(user);
        HttpHeaders headers = new HttpHeaders();
        headers.add("Content-Type", "application/json; charset=UTF-8");
        return new ResponseEntity<>(savedUser, headers, HttpStatus.CREATED);
    }

    @GetMapping("/{id}")
    public ResponseEntity<User> getUserById(@PathVariable Long id) {
        Optional<User> user = userService.getUserById(id);
        return user.map(ResponseEntity::ok).orElseGet(() -> ResponseEntity.notFound().build());
    }

    @PutMapping("/usuario/{id}")
    public ResponseEntity<User> updateUser(@PathVariable Long id, @RequestBody User updatedUser) {
        Optional<User> userOptional = userService.getUserById(id);
        if (userOptional.isPresent()) {
            User user = userOptional.get();
            user.setFullname(updatedUser.getFullname());
            user.setEmail(updatedUser.getEmail());
            user.setPassword(updatedUser.getPassword());
            user.setPhonenumber(updatedUser.getPhonenumber());
            user.setAddress(updatedUser.getAddress());
            user.setCity(updatedUser.getCity());
            user.setDistrict(updatedUser.getDistrict());
            user.setHousenumber(updatedUser.getHousenumber());
            user.setZipcode(updatedUser.getZipcode());
            user.setCpf(updatedUser.getCpf());
            return ResponseEntity.ok(userService.save(user));
        } else {
            return ResponseEntity.notFound().build();
        }
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteUser(@PathVariable Long id) {
        userService.deleteUser(id);
        return ResponseEntity.noContent().build();
    }

    @PutMapping("/{userId}/favoritos/{productId}")
    public ResponseEntity<Void> addToFavorites(@PathVariable Long userId, @PathVariable Long productId) {
        boolean added = userService.addProductToFavorites(userId, productId);
        if (added) {
            return ResponseEntity.ok().build();
        } else {
            return ResponseEntity.status(400).build();
        }
    }

    @GetMapping("/{userId}/favoritos")
    public ResponseEntity<Set<Product>> getFavorites(@PathVariable Long userId) {
        Optional<Set<Long>> favoriteProductIds = userService.getFavorites(userId);
        if (favoriteProductIds.isPresent()) {
            Set<Product> favoriteProducts = favoriteProductIds.get().stream()
                    .map(productId -> productService.getProductById(productId).orElse(null))
                    .filter(product -> product != null)
                    .collect(Collectors.toSet());
            return ResponseEntity.ok(favoriteProducts);
        } else {
            return ResponseEntity.notFound().build();
        }
    }

    @DeleteMapping("/{userId}/favoritos/{productId}") 
    public ResponseEntity<Void> removeFromFavorites(@PathVariable Long userId, @PathVariable Long productId) { 
        boolean removed = userService.removeProductFromFavorites(userId, productId); 
        if (removed) { 
            return ResponseEntity.ok().build(); 
        } else { 
            return ResponseEntity.status(400).build(); 
        } 
}

    @PostMapping("/login")
    public ResponseEntity<User> loginUser(@RequestBody User user) {
        Optional<User> userOptional = userService.getUserByEmailAndPassword(user.getEmail(), user.getPassword());
        if (userOptional.isPresent()) {
            return ResponseEntity.ok(userOptional.get());
        } else {
            return ResponseEntity.status(401).build();
        }
    }
}
