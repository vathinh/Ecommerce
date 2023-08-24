package com.cntt2.order.controller;

import com.cntt2.order.model.OrderProductItem;

import java.math.BigDecimal;
import java.util.List;

public record OrderRequest (
        String status,

        List<OrderProductItem> products
) {

}

