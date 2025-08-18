package com.example.portalprodutosback.dtos;

import com.example.portalprodutosback.models.Product;

public class ProductRequest {

    private String name;
    private String description;
    private Double price;
    private String category;
    private String pictureUrl;

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public Double getPrice() {
        return price;
    }

    public void setPrice(Double price) {
        this.price = price;
    }

    public String getCategory() {
        return category;
    }

    public void setCategory(String category) {
        this.category = category;
    }

    public String getPictureUrl() {
        return pictureUrl;
    }

    public void setPictureUrl(String pictureUrl) {
        this.pictureUrl = pictureUrl;
    }

    public Product toModel() {
        Product model = new Product();
        model.setName(name);
        model.setDescription(description);
        model.setPrice(price);
        model.setCategory(category);
        model.setPictureUrl(pictureUrl);
        return model;
    }
}
