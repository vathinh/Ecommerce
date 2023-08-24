package com.cntt2.product.repository;

import com.cntt2.product.model.Category;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;
import java.util.Optional;

public interface CategoryRepository extends JpaRepository<Category, String> {
    Category findBySlug(String slug);

    List<Category> findByParent(String parent);
}
