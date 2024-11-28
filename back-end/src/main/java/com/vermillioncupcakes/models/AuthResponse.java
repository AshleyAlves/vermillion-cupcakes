package com.vermillioncupcakes.models;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class AuthResponse {
    private String token;
    private boolean isAdmin;
}
