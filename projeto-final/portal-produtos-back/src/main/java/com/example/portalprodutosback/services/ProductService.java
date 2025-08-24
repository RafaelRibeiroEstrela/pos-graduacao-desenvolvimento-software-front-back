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

    public Product findById(Long id) {
        return productRepository.findById(id).orElseThrow(() -> new RuntimeException("Nenhum produto encontrado"));
    }

    public Product update(ProductRequest request, long id) {
        Product model = request.toModel();
        model.setId(id);
        return productRepository.save(model);
    }

    public void delete(long id) {
        productRepository.deleteById(id);
    }

}
