package com.cntt2.product.dto;

import java.math.BigDecimal;
import java.util.List;

public record ProductRequest (
    String name,
    BigDecimal price,
    String condition,
    String description,
    Integer quantity,
    String brand,
    String category,
    String thumbnail,
    List<String> images
) {

}
