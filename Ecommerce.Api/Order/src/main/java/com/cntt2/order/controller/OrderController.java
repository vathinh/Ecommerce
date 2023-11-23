package com.cntt2.order.controller;

import com.cntt2.order.model.Order;
import com.cntt2.order.service.ExcelServiceImpl;
import com.cntt2.order.service.OrderService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.core.io.InputStreamResource;
import org.springframework.core.io.Resource;
import org.springframework.http.HttpHeaders;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@Slf4j
@RestController
@RequestMapping("api/v1/order")
public class OrderController {

    @Autowired
    private ExcelServiceImpl fileService;

    @Autowired
    private OrderService orderService;

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

    @GetMapping("/download")
    public ResponseEntity<Resource> getFile() {
        String filename = "tutorials.xlsx";
        InputStreamResource file = new InputStreamResource(fileService.load());

        return ResponseEntity.ok()
                .header(HttpHeaders.CONTENT_DISPOSITION, "attachment; filename=" + filename)
                .contentType(MediaType.parseMediaType("application/vnd.ms-excel"))
                .body(file);
    }

}
