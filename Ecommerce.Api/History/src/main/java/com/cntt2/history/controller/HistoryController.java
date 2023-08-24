package com.cntt2.history.controller;

import com.cntt2.history.dto.HistoryRequest;
import com.cntt2.history.dto.HistoryResponse;
import com.cntt2.history.service.HistoryService;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@Slf4j
@RestController
@RequestMapping("api/v1/history")
public record HistoryController(HistoryService historyService) {
    //get all histories
    @GetMapping
    public ResponseEntity<HistoryResponse> getHistories(
            @RequestParam(name = "productId", required = false) List<String> productId
    ) {
        return historyService.getHistories(productId);
    }

    //create order
    @PostMapping
    public ResponseEntity createOrder(@RequestBody HistoryRequest historyRequest) {
        return historyService.postHistory(historyRequest);
    }

}
