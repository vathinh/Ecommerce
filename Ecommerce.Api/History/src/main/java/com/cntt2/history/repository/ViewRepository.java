package com.cntt2.history.repository;

import com.cntt2.history.model.View;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface ViewRepository extends JpaRepository<View, String> {
    List<View> findByProductIdIn(List<String> productId);
}
