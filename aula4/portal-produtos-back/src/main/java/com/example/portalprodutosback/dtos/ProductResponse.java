package com.example.portalprodutosback.dtos;

import com.example.portalprodutosback.models.Product;

public class ProductResponse {

    private Long id;
    private String name;
    private String description;
    private Double price;
    private String category;
    private String pictureUrl;

    public ProductResponse() {}

    public ProductResponse(Product model) {
        this.id = model.getId();
        this.name = model.getName();
        this.description = model.getDescription();
        this.price = model.getPrice();
        this.category = model.getCategory();
        this.pictureUrl = model.getPictureUrl();
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

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
}
