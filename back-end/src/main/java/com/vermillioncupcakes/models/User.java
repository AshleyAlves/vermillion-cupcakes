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

    @Column(nullable = false, name = "fullName")
    private String fullName;

    @Column(nullable = false, unique = true, name = "email")
    private String email;

    @Column(nullable = false, name = "password")
    private String password;

    @Column(nullable = false, name = "phoneNumber")
    private String phoneNumber;

    @Column(nullable = true, name = "address")
    private String address;

    @Column(nullable = true, name = "cpf")
    private String cpf;

    @Column(nullable = true, name = "houseNumber")
    private String houseNumber;

    @Column(nullable = true, name = "district")
    private String district;

    @Column(nullable = true, name = "zipCode")
    private String zipCode;

    @Column(nullable = true, name = "city")
    private String city;

}