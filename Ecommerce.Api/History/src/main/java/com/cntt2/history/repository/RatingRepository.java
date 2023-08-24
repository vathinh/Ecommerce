package com.cntt2.history.repository;

import com.cntt2.history.model.Rating;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface RatingRepository extends JpaRepository<Rating, String> {
    List<Rating> findByProductIdIn(List<String> productId);
}
