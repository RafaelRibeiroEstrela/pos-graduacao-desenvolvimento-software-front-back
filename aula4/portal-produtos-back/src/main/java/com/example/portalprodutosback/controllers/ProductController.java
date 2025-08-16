package com.example.portalprodutosback.controllers;

import com.example.portalprodutosback.dtos.ProductRequest;
import com.example.portalprodutosback.dtos.ProductResponse;
import com.example.portalprodutosback.models.Product;
import com.example.portalprodutosback.services.ProductService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.ArrayList;
import java.util.List;

@RestController
@RequestMapping("/products")
public class ProductController {

    private final ProductService productService;

    public ProductController(ProductService productService) {
        this.productService = productService;
    }

    @PostMapping
    public ResponseEntity<ProductResponse> create(@RequestBody ProductRequest productRequest) {
        Product model = productService.create(productRequest);
        return ResponseEntity.status(HttpStatus.CREATED).body(new ProductResponse(model));
    }

    @GetMapping
    public ResponseEntity<List<ProductResponse>> find() {
        List<Product> models = productService.findAll();
        return ResponseEntity.ok().body(models.stream().map(ProductResponse::new).toList());
    }

    @GetMapping("/{id}")
    public ResponseEntity<List<ProductResponse>> findById(@PathVariable Long id) {
        Product model = productService.findById(id);
        if (model == null) {
            return ResponseEntity.ok().body(new ArrayList<>());
        }
        return ResponseEntity.ok().body(List.of(new ProductResponse(model)));
    }
}
