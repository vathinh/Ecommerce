package com.cntt2.history.service;

import com.cntt2.history.dto.HistoryRequest;
import com.cntt2.history.dto.HistoryResponse;
import com.cntt2.history.model.HistoryType;
import com.cntt2.history.model.Purchase;
import com.cntt2.history.model.Rating;
import com.cntt2.history.model.View;
import com.cntt2.history.repository.PurchaseRepository;
import com.cntt2.history.repository.RatingRepository;
import com.cntt2.history.repository.ViewRepository;
import lombok.AllArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;

@Service
@AllArgsConstructor
public class HistoryService {
    private final ViewRepository viewRepository;
    private final PurchaseRepository purchaseRepository;
    private final RatingRepository ratingRepository;

    public static boolean containType(String input) {
        for (HistoryType o : HistoryType.values()) {
            if (o.name().equals(input)) {
                return true;
            }
        }
        return false;
    }

    public ResponseEntity<HistoryResponse> getHistories(
            List<String> productId
    ) {
        System.out.println("get");
        List<View> viewData;
        List<Purchase> purchaseData;
        List<Rating> ratingData;

        if(productId != null) {
            viewData = viewRepository.findByProductIdIn(productId);
            purchaseData = purchaseRepository.findByProductIdIn(productId);
            ratingData = ratingRepository.findByProductIdIn(productId);
        } else {
            viewData = viewRepository.findAll();
            purchaseData = purchaseRepository.findAll();
            ratingData = ratingRepository.findAll();
        }

        HistoryResponse response = HistoryResponse.builder()
                .views(viewData)
                .purchases(purchaseData)
                .ratings(ratingData)
                .build();

        return ResponseEntity.ok(response);
    }

    public ResponseEntity postHistory(HistoryRequest request) {
        System.out.println("post");
        if(request.type() == null || !containType(request.type())) {
            throw new IllegalArgumentException("Invalid type");
        }

        if(request.type().equalsIgnoreCase(HistoryType.VIEW.name())) {
            View data = View.builder()
                    .type(request.type())
                    .productId(request.productId())
                    .build();
            System.out.println(data);
            return ResponseEntity.ok(viewRepository.save(data));
        }

        if(request.type().equalsIgnoreCase(HistoryType.PURCHASE.name())) {
            Purchase data = Purchase.builder()
                    .type(request.type())
                    .quantity(request.quantity())
                    .productId(request.productId())
                    .build();
            return ResponseEntity.ok(purchaseRepository.save(data));
        }

        if(request.type().equalsIgnoreCase(HistoryType.RATING.name())) {
            Rating data = Rating.builder()
                    .type(request.type())
                    .star(request.star())
                    .content(request.content())
                    .productId(request.productId())
                    .build();
            return ResponseEntity.ok(ratingRepository.save(data));
        }

        return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
    }
}
