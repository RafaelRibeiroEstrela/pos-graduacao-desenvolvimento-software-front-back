package com.example.portalprodutosback.repositories;

import com.example.portalprodutosback.models.Product;

import java.util.List;

public interface ProductRepository {

    List<Product> findAll();
    Product save(Product product);
}
