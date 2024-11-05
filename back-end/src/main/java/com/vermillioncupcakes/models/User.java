package com.vermillioncupcakes.models;

import java.io.Serializable;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import lombok.Getter;
import lombok.Setter;

@Entity
@Table(name = "users")
@Getter
@Setter
public class User implements Serializable {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false, name = "full_name")
    private String full_name;

    @Column(nullable = false, unique = true, name = "email")
    private String email;

    @Column(nullable = false, name = "password")
    private String password;

    @Column(nullable = false, name = "phone_number")
    private String phone_number;

    @Column(nullable = true, name = "address")
    private String address;

    @Column(nullable = true, name = "cpf")
    private String cpf;

    @Column(nullable = true, name = "house_number")
    private String house_number;

    @Column(nullable = true, name = "district")
    private String district;

    @Column(nullable = true, name = "zip_code")
    private String zip_code;

    @Column(nullable = true, name = "city")
    private String city;

}