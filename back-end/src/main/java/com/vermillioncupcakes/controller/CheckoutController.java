package com.vermillioncupcakes.controller;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import com.vermillioncupcakes.models.Order;
import com.vermillioncupcakes.service.CheckoutService;

@RestController
@RequestMapping("api/checkout")
@CrossOrigin(origins = "http://localhost:4200")
public class CheckoutController {

    private final CheckoutService checkoutService;

    public CheckoutController(CheckoutService checkoutService) {
        this.checkoutService = checkoutService;
    }

    @PostMapping
    public ResponseEntity<Void> processPayment(@RequestBody Order order) {
        boolean success = checkoutService.processPayment(order);
        if (success) {
            return ResponseEntity.ok().build();
        } else {
            return ResponseEntity.status(400).build();
        }
    }
}
