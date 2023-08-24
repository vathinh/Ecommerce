package com.cntt2.history.repository;

import com.cntt2.history.model.Purchase;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface PurchaseRepository extends JpaRepository<Purchase, String> {
    List<Purchase> findByProductIdIn(List<String> productId);
}
