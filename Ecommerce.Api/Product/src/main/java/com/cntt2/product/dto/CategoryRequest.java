package com.cntt2.product.dto;

public record CategoryRequest (
    String name,
    String thumbnail,
    String parent
) {

}
