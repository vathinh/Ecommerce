package com.cntt2.order.service;

import com.cntt2.order.controller.OrderRequest;
import com.cntt2.order.dto.ProductResponse;
import com.cntt2.order.model.Order;

import com.cntt2.order.model.OrderProductItem;
import com.cntt2.order.model.OrderStatus;
import com.cntt2.order.repository.OrderRepository;
import lombok.AllArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.web.reactive.function.client.WebClient;

import javax.persistence.Transient;
import java.math.BigDecimal;
import java.util.Arrays;
import java.util.List;
import java.util.Optional;

@Service
@AllArgsConstructor
public class OrderService {
    private final OrderRepository orderRepository;
    private final WebClient.Builder webClientBuilder;

    public static boolean containStatus(String input) {
        for (OrderStatus o : OrderStatus.values()) {
            if (o.name().equals(input)) {
                return true;
            }
        }
        return false;
    }

    @Transient
    public BigDecimal getTotalOrderPrice(List<OrderProductItem> orderProducts) {
        BigDecimal sum = BigDecimal.valueOf(0);
        for (OrderProductItem op : orderProducts) {
            sum = sum.add(op.getPrice().multiply(BigDecimal.valueOf(op.getQuantity())));
        }
        return sum;
    }

    public void checkExistProducts(OrderRequest request) {
        //request product => list product id
        List<String> idList = request.products().stream()
                .map(OrderProductItem::getId)
                .toList();

        //get products by id
        ProductResponse[] productResponseArray = webClientBuilder.build().get()
                .uri("http://product/api/v1/product",
                        uriBuilder -> uriBuilder.queryParam("id", idList).build())
                .retrieve()
                .bodyToMono(ProductResponse[].class)
                .block();

        //check quantity
        Arrays.stream(productResponseArray).forEach(product -> {
            OrderProductItem productInStock = (OrderProductItem) request.products().stream()
                    .filter(p -> p.getId().equals(product.getId()) && product.getQuantity() >= p.getQuantity())
                    .findFirst()
                    .orElse(null);

            if(productInStock == null) {
                throw new IllegalArgumentException("Product is not in stock, please try again later");
            }
        });
    }

    ////////////////////////////////////////////////////////////////////////////////////////

    public ResponseEntity<List<Order>> getOrders(
            List<String> status,
            String userId,
            Boolean isAdmin) {
        if(isAdmin) {
            return ResponseEntity.ok(orderRepository.findAll());
        }
        if(status != null) {
            return ResponseEntity.ok(
                    orderRepository.findByStatusInAndCreatedByOrderByUpdatedDateDesc(status, userId));
        }
        return ResponseEntity.ok(orderRepository.findByCreatedByOrderByUpdatedDateDesc(userId));
    }

    public ResponseEntity<Order> getSingleOrder(String orderId) {
        Optional<Order> orderData = orderRepository.findById(orderId);
        if (orderData.isEmpty()) {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
        return new ResponseEntity<Order>(orderData.get(), HttpStatus.OK);
    }

    public ResponseEntity<Order> createOrder(OrderRequest request, String userId) {
        //check order request
        checkExistProducts(request);

        Order order = Order.builder()
                .status(OrderStatus.PENDING.name())
                .total(getTotalOrderPrice(request.products()))
                .products(request.products())
                .createdBy(userId)
                .updatedBy(userId)
                .build();

        return new ResponseEntity<Order>(orderRepository.save(order), HttpStatus.OK);
    }

    public ResponseEntity<Order> updateOrder(String orderId, OrderRequest request, String userId) {
        Optional<Order> orderData = orderRepository.findById(orderId);
        if(orderData.isEmpty()) {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }

        if(!containStatus(request.status())) {
            return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
        }

        if(request.status().equalsIgnoreCase(OrderStatus.PAID.name())) {
            //check exist products
            checkExistProducts(request);
        }

        //update
        if(request.status() != null) { orderData.get().setStatus(request.status()); }
        if(request.products() != null) {
            orderData.get().setTotal(getTotalOrderPrice(request.products()));
            orderData.get().setProducts(request.products());
        }
        orderData.get().setUpdatedBy(userId);

        return new ResponseEntity<Order>(orderRepository.save(orderData.get()), HttpStatus.OK);
    }

    public ResponseEntity deleteOrder(String orderId) {
        Optional<Order> orderData = orderRepository.findById(orderId);
        if (orderData.isEmpty()) {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
        orderRepository.deleteById(orderId);
        return new ResponseEntity<>(HttpStatus.OK);
    }
}
