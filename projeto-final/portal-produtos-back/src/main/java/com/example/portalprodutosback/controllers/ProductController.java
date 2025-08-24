package com.example.portalprodutosback.controllers;

import com.example.portalprodutosback.dtos.ProductRequest;
import com.example.portalprodutosback.dtos.ProductResponse;
import com.example.portalprodutosback.models.Product;
import com.example.portalprodutosback.services.ProductService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

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
        Product model = productService.save(productRequest);
        return ResponseEntity.status(HttpStatus.CREATED).body(new ProductResponse(model));
    }

    @GetMapping
    public ResponseEntity<List<ProductResponse>> find() {
        List<Product> models = productService.findAll();
        return ResponseEntity.ok().body(models.stream().map(ProductResponse::new).toList());
    }

    @GetMapping("/{id}")
    public ResponseEntity<ProductResponse> findById(@PathVariable Long id) {
        Product model = productService.findById(id);
        return ResponseEntity.ok().body(new ProductResponse(model));
    }

    @PutMapping("/{id}")
    public ResponseEntity<ProductResponse> update(@RequestBody ProductRequest productRequest, @PathVariable Long id) {
        Product model = productService.update(productRequest, id);
        return ResponseEntity.ok().body(new ProductResponse(model));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<ProductResponse> delete(@PathVariable Long id) {
        productService.delete(id);
        return ResponseEntity.noContent().build();
    }

    @PostMapping("/import")
    public ResponseEntity<List<ProductResponse>> importProducts(@RequestBody List<ProductRequest> productRequestList) {
        List<Product> models = productRequestList.stream()
                .map(productService::save)
                .toList();
        return ResponseEntity.status(HttpStatus.CREATED).body(models.stream().map(ProductResponse::new).toList());
    }
}
