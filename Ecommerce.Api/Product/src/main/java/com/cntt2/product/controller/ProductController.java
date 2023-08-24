package com.cntt2.product.controller;

import com.cntt2.product.dto.ProductRequest;
import com.cntt2.product.model.Product;
import com.cntt2.product.service.ProductService;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@Slf4j
@RestController
@RequestMapping("api/v1/product")
public record ProductController(ProductService productService) {

    //get all products
    @GetMapping
    public ResponseEntity<List<Product>> getProducts(
            @RequestParam(name = "id", required = false) List<String> idList,
            @RequestParam(name = "s", required = false) String slug,
            @RequestParam(name = "c", required = false) String category,
            @RequestParam(name = "p", required = false, defaultValue = "0") String page,
            @RequestParam(name = "l", required = false, defaultValue = "10") String limit
            ) {
        return productService.getProducts(
                idList, slug, category,
                Integer.parseInt(page), Integer.parseInt(limit));
    }

    //get single product
    @GetMapping(path = "{productSlug}")
    public ResponseEntity<Product> getSingleProduct(@PathVariable("productSlug") String slug) {
        return productService.getSingleProduct(slug);
    }

    //create product
    @PostMapping
    public ResponseEntity<Product> createProduct(
            @RequestBody ProductRequest productRequest,
            @RequestAttribute String userId
    ) {
        log.info("New product created {}", productRequest);
        return productService.createProduct(productRequest, userId);
    }

    //update product
    @PutMapping(path = "{productSlug}")
    public ResponseEntity<Product> updateProduct(
            @PathVariable("productSlug") String slug,
            @RequestBody ProductRequest productRequest,
            @RequestAttribute String userId
    ) {
        return productService.updateProduct(slug, productRequest, userId);
    }

    //delete product
    @DeleteMapping(path = "{productId}")
    public ResponseEntity deleteProduct(@PathVariable("productId") String id) {
        return productService.deleteProduct(id);
    }
}
