package com.vermillioncupcakes.service;

import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.vermillioncupcakes.models.User;
import com.vermillioncupcakes.repository.UserRepository;

@Service
public class AdminAuthService {

    @Autowired
    private UserRepository usersRepository;

    public User login(String email, String password) { 
        Optional<User> optionalUser = usersRepository.findByEmailAndPassword(email, password); 
        if (optionalUser.isPresent()) { 
            User user = optionalUser.get(); 
            return user;
        } return null;
    }
}
