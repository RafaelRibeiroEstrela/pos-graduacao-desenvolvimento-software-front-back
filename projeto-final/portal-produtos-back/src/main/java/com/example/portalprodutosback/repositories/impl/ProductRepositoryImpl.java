package com.example.portalprodutosback.repositories.impl;

import com.example.portalprodutosback.models.Product;
import com.example.portalprodutosback.repositories.ProductRepository;
import com.fasterxml.jackson.core.type.TypeReference;
import com.fasterxml.jackson.databind.ObjectMapper;
import org.springframework.stereotype.Repository;

import java.io.File;
import java.io.IOException;
import java.util.List;

@Repository
public class ProductRepositoryImpl implements ProductRepository {

    private final List<Product> products;

    private long id = 300L;

    public ProductRepositoryImpl() {
        ObjectMapper mapper = new ObjectMapper();
        try {
            products = mapper.readValue(
                    new File("data.json"),
                    new TypeReference<>() {}
            );
        } catch (IOException e) {
            throw new RuntimeException("Erro ao ler o arquivo JSON", e);
        }
    }

    @Override
    public List<Product> findAll() {
        return products;
    }

    @Override
    public Product save(Product product) {
        product.setId(generateId());
        products.add(product);
        return product;
    }

    private synchronized long generateId() {
        id++;
        return id;
    }
}
