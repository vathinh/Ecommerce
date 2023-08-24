package com.cntt2.payment.dto;

import java.math.BigDecimal;

public record PaymentRequest (
        String name,
        String type,
        BigDecimal balance
) {

}
