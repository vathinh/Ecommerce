package com.cntt2.order.service;

import com.cntt2.order.model.Order;
import com.cntt2.order.repository.OrderRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.io.ByteArrayInputStream;
import java.util.List;

@Service
public class ExcelServiceImpl implements ExcelService{

    @Autowired
    OrderRepository orderRepository;

    public ByteArrayInputStream load() {
        List<Order> orders = orderRepository.findAll();

        return ExcelHelper.ordersToExcel(orders);
    }
}
