package com.arcadia.comics.model;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class Comic {
    private String id;
    private String titulo;
    private String autor;
    private String editorial;
    private Double precio;
    private Integer stock;
}
