package com.cntt2.history.dto;

public record HistoryRequest (
        String type,
        String productId,
        Integer quantity,
        Integer star,
        String content
) {
}
