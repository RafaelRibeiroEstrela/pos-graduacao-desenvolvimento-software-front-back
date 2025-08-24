package com.example.portalprodutosback.repositories;

import com.example.portalprodutosback.models.Product;

import java.util.List;
import java.util.Optional;

public interface ProductRepository {

    List<Product> findAll();
    Optional<Product> findById(long id);
    Product save(Product product);
    void deleteById(long id);
}
