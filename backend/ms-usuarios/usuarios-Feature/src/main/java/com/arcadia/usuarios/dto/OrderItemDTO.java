package com.arcadia.usuarios.dto;

public class OrderItemDTO {
    private String comicId;
    private Integer quantity;

    public OrderItemDTO() {
    }

    public OrderItemDTO(String comicId, Integer quantity) {
        this.comicId = comicId;
        this.quantity = quantity;
    }

    public String getComicId() {
        return comicId;
    }

    public void setComicId(String comicId) {
        this.comicId = comicId;
    }

    public Integer getQuantity() {
        return quantity;
    }

    public void setQuantity(Integer quantity) {
        this.quantity = quantity;
    }
}
