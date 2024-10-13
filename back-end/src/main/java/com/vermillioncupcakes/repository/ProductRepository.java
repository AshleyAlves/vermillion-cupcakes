package com.vermillioncupcakes.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.vermillioncupcakes.models.Product;

@Repository
public interface ProductRepository extends JpaRepository<Product, Long> {

}