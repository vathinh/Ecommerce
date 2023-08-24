package com.cntt2.payment.controller;

import com.cntt2.payment.dto.PaymentRequest;
import com.cntt2.payment.model.Payment;
import com.cntt2.payment.service.PaymentService;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@Slf4j
@RestController
@RequestMapping("api/v1/payment")
public record PaymentController(PaymentService paymentService) {

    //get all payment
    @GetMapping
    public ResponseEntity<List<Payment>> getProducts(@RequestAttribute String userId) {
        return paymentService.getPayments(userId);
    }

    //get single payment
    @GetMapping(path = "{paymentId}")
    public ResponseEntity<Payment> getSinglePayment(
            @PathVariable("paymentId") String id,
            @RequestAttribute String userId
    ) {
        return paymentService.getSinglePayment(id, userId);
    }

    //create payment
    @PostMapping
    public ResponseEntity<Payment> createPayment(
            @RequestBody PaymentRequest paymentRequest,
            @RequestAttribute String userId
    ) {
        return paymentService.createPayment(paymentRequest, userId);
    }

    //update payment
    @PutMapping(path = "{paymentId}")
    public ResponseEntity<Payment> updateProduct(
            @PathVariable("paymentId") String id,
            @RequestBody PaymentRequest paymentRequest,
            @RequestAttribute String userId
    ) {
        return paymentService.updatePayment(id, paymentRequest, userId);
    }

    //delete payment
    @DeleteMapping(path = "{paymentId}")
    public ResponseEntity deletePayment(@PathVariable("paymentId") String id) {
        return paymentService.deletePayment(id);
    }
}
