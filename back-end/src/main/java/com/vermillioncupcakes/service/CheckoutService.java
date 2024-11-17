package com.vermillioncupcakes.service;

import org.springframework.stereotype.Service;

import com.vermillioncupcakes.models.Order;

@Service
public class CheckoutService {

    public boolean processPayment(Order order) {
        // Lógica de processamento de pagamento com cartão de crédito
        // Pode ser uma chamada a um gateway de pagamento
        // Para este exemplo, assumimos que o pagamento é sempre bem-sucedido
        return true;
    }
}
