package com.vermillioncupcakes.models;

import java.io.Serializable;

import jakarta.persistence.*;

@Entity
@Table(name = "users")
public class User implements Serializable {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false)
    private String fullName;

    @Column(nullable = false, unique = true)
    private String email;

    @Column(nullable = false)
    private String password;

    @Column(nullable = false)
    private String phoneNumber;

    @Column(nullable = false)
    private String address;

    @Column(nullable = false)
    private String cpf;

    @Column(nullable = false)
    private String houseNumber;

    @Column(nullable = false)
    private String district;

    @Column(nullable = false)
    private String zipCode;

    @Column(nullable = false)
    private String city;

    // Construtores
    public User() {}

    public User(String fullName, String email, String password, String phoneNumber, String address, String cpf, String houseNumber, String district, String zipCode, String city) {
        this.fullName = fullName;
        this.email = email;
        this.password = password;
        this.phoneNumber = phoneNumber;
        this.address = address;
        this.cpf = cpf;
        this.houseNumber = houseNumber;
        this.district = district;
        this.zipCode = zipCode;
        this.city = city;
    }

    // Getters e Setters
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getFullName() {
        return fullName;
    }

    public void setFullName(String fullName) {
        this.fullName = fullName;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public String getPassword() {
        return password;
    }

    public void setPassword(String password) {
        this.password = password;
    }

    public String getPhoneNumber() {
        return phoneNumber;
    }

    public void setPhoneNumber(String phoneNumber) {
        this.phoneNumber = phoneNumber;
    }

    public String getAddress() {
        return address;
    }

    public void setAddress(String address) {
        this.address = address;
    }
    
    public String getCPF() {
        return cpf;
    }

    public void setCPF(String cpf) {
        this.cpf = cpf;
    }
    public String getHouseNumber() {
        return houseNumber;
    }

    public void setHouseNumber(String houseNumber) {
        this.houseNumber = houseNumber;
    }
    public String getDistrict() {
        return district;
    }

    public void setDistrict(String district) {
        this.district = district;
    }
    public String getZipCode() {
        return zipCode;
    }

    public void setZipCode(String zipCode) {
        this.zipCode = zipCode;
    }
    public String getcity() {
        return city;
    }

    public void setCity(String city) {
        this.city = city;
    }
}