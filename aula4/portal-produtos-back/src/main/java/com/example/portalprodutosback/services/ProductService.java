package com.example.portalprodutosback.services;

import com.example.portalprodutosback.dtos.ProductRequest;
import com.example.portalprodutosback.models.Product;
import com.example.portalprodutosback.repositories.ProductRepository;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class ProductService {

    private final ProductRepository productRepository;


    public ProductService(ProductRepository productRepository) {
        this.productRepository = productRepository;
    }

    public Product save(ProductRequest request) {
        Product model = request.toModel();
        return productRepository.save(model);
    }

    public List<Product> findAll() {
        return productRepository.findAll();
    }


}
