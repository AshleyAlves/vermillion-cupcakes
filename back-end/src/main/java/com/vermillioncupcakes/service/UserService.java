package com.vermillioncupcakes.service;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.vermillioncupcakes.models.User;
import com.vermillioncupcakes.repository.UserRepository;

@Service
public class UserService {

    @Autowired
    private UserRepository usersRepository;

    public User save(User user) {
        return usersRepository.save(user);
    }

    public List<User> getAllUsers() {
        return usersRepository.findAll();
    }

    public Optional<User> getUserById(Long id) {
        return usersRepository.findById(id);
    }

    public void deleteUser(Long id) {
        usersRepository.deleteById(id);
    }

    public Optional<User> getUserByEmailAndPassword(String email, String password) {
        return usersRepository.findByEmailAndPassword(email, password);
    }
}