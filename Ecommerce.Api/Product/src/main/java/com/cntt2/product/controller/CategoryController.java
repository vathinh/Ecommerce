package com.cntt2.product.controller;

import com.cntt2.product.dto.BrandRequest;
import com.cntt2.product.dto.CategoryRequest;
import com.cntt2.product.model.Brand;
import com.cntt2.product.model.Category;
import com.cntt2.product.service.CategoryService;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@Slf4j
@RestController
@RequestMapping("api/v1/category")
public record CategoryController(CategoryService categoryService) {
    //get all categories
    @GetMapping
    public ResponseEntity<List<Category>> getCategories() {
        return categoryService.getCategories();
    }

    //get single category
    @GetMapping(path = "{categoryId}")
    public ResponseEntity<Category> getSingleCategory(@PathVariable("categoryId") String id) {
        return categoryService.getSingleCategory(id);
    }

    //create category
    @PostMapping
    public ResponseEntity<Category> createCategory(@RequestBody CategoryRequest request) {
        return categoryService.createCategory(request);
    }

    //update category
    @PutMapping(path = "{categoryId}")
    public ResponseEntity<Category> updateCategory(
            @PathVariable("categoryId") String id,
            @RequestBody CategoryRequest request
    ) {
        return categoryService.updateCategory(id, request);
    }

    //delete category
    @DeleteMapping(path = "{categoryId}")
    public ResponseEntity deleteCategory(@PathVariable("categoryId") String id) {
        return categoryService.deleteCategory(id);
    }
}
