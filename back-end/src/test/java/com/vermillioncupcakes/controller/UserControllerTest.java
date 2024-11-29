package com.vermillioncupcakes.controller;

import java.util.ArrayList;
import java.util.Arrays;
import java.util.HashSet;
import java.util.List;
import java.util.Optional;
import java.util.Set;

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
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;

import com.vermillioncupcakes.models.Product;
import com.vermillioncupcakes.models.User;
import com.vermillioncupcakes.service.ProductService;
import com.vermillioncupcakes.service.UserService;

public class UserControllerTest {

    @InjectMocks
    private UserController userController;

    @Mock
    private UserService userService;

    @Mock
    private ProductService productService;

    @BeforeEach
    void setUp() {
        MockitoAnnotations.openMocks(this);
    }

    @Test
    void testGetAllUsers() {
        List<User> userList = new ArrayList<>();
        when(userService.getAllUsers()).thenReturn(userList);

        List<User> response = userController.getAllUsers();

        assertEquals(userList, response);
        verify(userService, times(1)).getAllUsers();
    }

    @Test
    void testRegisterUser() {
        User user = new User();
        when(userService.save(user)).thenReturn(user);

        ResponseEntity<User> response = userController.registerUser(user);

        assertEquals(HttpStatus.CREATED, response.getStatusCode());
        assertEquals(user, response.getBody());
        verify(userService, times(1)).save(user);
    }

    @Test
    void testGetUserById() {
        Long userId = 1L;
        User user = new User();
        when(userService.getUserById(userId)).thenReturn(Optional.of(user));

        ResponseEntity<User> response = userController.getUserById(userId);

        assertEquals(ResponseEntity.ok(user), response);
        verify(userService, times(1)).getUserById(userId);
    }

    @Test
    void testUpdateUser() {
        Long userId = 1L;
        User existingUser = new User();
        User updatedUser = new User();
        when(userService.getUserById(userId)).thenReturn(Optional.of(existingUser));
        when(userService.save(existingUser)).thenReturn(existingUser);

        ResponseEntity<User> response = userController.updateUser(userId, updatedUser);

        assertEquals(ResponseEntity.ok(existingUser), response);
        verify(userService, times(1)).getUserById(userId);
        verify(userService, times(1)).save(existingUser);
    }

    @Test
    void testDeleteUser() {
        Long userId = 1L;
        doNothing().when(userService).deleteUser(userId);

        ResponseEntity<Void> response = userController.deleteUser(userId);

        assertEquals(ResponseEntity.noContent().build(), response);
        verify(userService, times(1)).deleteUser(userId);
    }

    @Test
    void testAddToFavorites() {
        Long userId = 1L;
        Long productId = 1L;
        when(userService.addProductToFavorites(userId, productId)).thenReturn(true);

        ResponseEntity<Void> response = userController.addToFavorites(userId, productId);

        assertEquals(ResponseEntity.ok().build(), response);
        verify(userService, times(1)).addProductToFavorites(userId, productId);
    }

    @Test
    void testGetFavorites() {
        Long userId = 1L;
        Set<Long> favoriteProductIds = new HashSet<>(Arrays.asList(1L, 2L));
        Product product1 = new Product();
        Product product2 = new Product();
        Set<Product> favoriteProducts = new HashSet<>(Arrays.asList(product1, product2));
        when(userService.getFavorites(userId)).thenReturn(Optional.of(favoriteProductIds));
        when(productService.getProductById(1L)).thenReturn(Optional.of(product1));
        when(productService.getProductById(2L)).thenReturn(Optional.of(product2));
        ResponseEntity<Set<Product>> response = userController.getFavorites(userId);
        assertEquals(ResponseEntity.ok(favoriteProducts), response);
        verify(userService, times(1)).getFavorites(userId);
        verify(productService, times(1)).getProductById(1L);
        verify(productService, times(1)).getProductById(2L);
    }

    @Test
    void testRemoveFromFavorites() {
        Long userId = 1L;
        Long productId = 1L;
        when(userService.removeProductFromFavorites(userId, productId)).thenReturn(true);

        ResponseEntity<Void> response = userController.removeFromFavorites(userId, productId);

        assertEquals(ResponseEntity.ok().build(), response);
        verify(userService, times(1)).removeProductFromFavorites(userId, productId);
    }

    @Test
    void testLoginUser() {
        User user = new User();
        when(userService.getUserByEmailAndPassword(user.getEmail(), user.getPassword())).thenReturn(Optional.of(user));

        ResponseEntity<User> response = userController.loginUser(user);

        assertEquals(ResponseEntity.ok(user), response);
        verify(userService, times(1)).getUserByEmailAndPassword(user.getEmail(), user.getPassword());
    }
}
