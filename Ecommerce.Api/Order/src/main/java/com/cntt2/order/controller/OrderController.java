package com.cntt2.order.controller;

import com.cntt2.order.dto.ProductResponse;
import com.cntt2.order.model.Order;
import com.cntt2.order.service.OrderService;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@Slf4j
@RestController
@RequestMapping("api/v1/order")
public record OrderController(OrderService orderService) {

    //get all orders
    @GetMapping
    public ResponseEntity<List<Order>> getOrders(
            @RequestParam(name = "status", required = false) List<String> status,
            @RequestAttribute String userId,
            @RequestAttribute Boolean isAdmin) {

        return orderService.getOrders(status, userId, isAdmin);
    }

    //get single order
    @GetMapping(path = "{orderId}")
    public ResponseEntity<Order> getSingleOrder(@PathVariable("orderId") String id) {
        return orderService.getSingleOrder(id);
    }

    //create order
    @PostMapping
    public ResponseEntity<Order> createOrder(
            @RequestBody OrderRequest orderRequest,
            @RequestAttribute String userId
    ) {
        return orderService.createOrder(orderRequest, userId);
    }

    //update order
    @PutMapping(path = "{orderId}")
    public ResponseEntity<Order> updateOrder(
            @PathVariable("orderId") String id,
            @RequestBody OrderRequest orderRequest,
            @RequestAttribute String userId
    ) {
        return orderService.updateOrder(id, orderRequest, userId);
    }

    //delete order
    @DeleteMapping(path = "{orderId}")
    public ResponseEntity deleteOrder(@PathVariable("orderId") String id) {
        return orderService.deleteOrder(id);
    }
}
