package com.vermillioncupcakes.service;

import org.springframework.stereotype.Service;

import com.vermillioncupcakes.models.Order;

@Service
public class CheckoutService {

    public boolean processPayment(Order order) {
        // Lógica de processamento de pagamento com cartão de crédito a ser implementada
        return true;
    }
}
