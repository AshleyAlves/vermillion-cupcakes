package com.vermillioncupcakes.controller;

import static org.junit.jupiter.api.Assertions.assertEquals;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import static org.mockito.Mockito.times;
import static org.mockito.Mockito.verify;
import static org.mockito.Mockito.when;
import org.mockito.MockitoAnnotations;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;

import com.vermillioncupcakes.models.User;
import com.vermillioncupcakes.service.AdminAuthService;

public class AdminAuthControllerTest {

    @InjectMocks
    private AdminAuthController adminAuthController;

    @Mock
    private AdminAuthService adminAuthService;

    @BeforeEach
    void setUp() {
        MockitoAnnotations.openMocks(this);
    }

    @Test
    void testLogin_Success() {
        User request = new User();
        request.setEmail("admin@example.com");
        request.setPassword("password");

        User user = new User();
        when(adminAuthService.login(request.getEmail(), request.getPassword())).thenReturn(user);

        ResponseEntity<User> response = adminAuthController.login(request);

        assertEquals(HttpStatus.OK, response.getStatusCode());
        assertEquals(user, response.getBody());
        verify(adminAuthService, times(1)).login(request.getEmail(), request.getPassword());
    }

    @Test
    void testLogin_Failure() {
        User request = new User();
        request.setEmail("admin@example.com");
        request.setPassword("wrongpassword");

        when(adminAuthService.login(request.getEmail(), request.getPassword())).thenReturn(null);

        ResponseEntity<User> response = adminAuthController.login(request);

        assertEquals(HttpStatus.UNAUTHORIZED, response.getStatusCode());
        assertEquals(null, response.getBody());
        verify(adminAuthService, times(1)).login(request.getEmail(), request.getPassword());
    }
}
