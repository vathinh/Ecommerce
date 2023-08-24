package com.cntt2.product.controller;

import com.cntt2.product.dto.BrandRequest;
import com.cntt2.product.model.Brand;
import com.cntt2.product.service.BrandService;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@Slf4j
@RestController
@RequestMapping("api/v1/brand")

public record BrandController(BrandService brandService) {
    //get all brands
    @GetMapping
    public ResponseEntity<List<Brand>> getBrands() {
        return brandService.getBrands();
    }

    //get single brand
    @GetMapping(path = "{brandId}")
    public ResponseEntity<Brand> getSingleBrand(@PathVariable("brandId") String id) {
        return brandService.getSingleBrand(id);
    }

    //create brand
    @PostMapping
    public ResponseEntity<Brand> createProduct(@RequestBody BrandRequest brandRequest) {
        return brandService.createBrand(brandRequest);
    }

    //update brand
    @PutMapping(path = "{brandId}")
    public ResponseEntity<Brand> updateBrand(
            @PathVariable("brandId") String id,
            @RequestBody BrandRequest request
    ) {
        return brandService.updateBrand(id, request);
    }

    //delete brand
    @DeleteMapping(path = "{brandId}")
    public ResponseEntity deleteBrand(@PathVariable("brandId") String id) {
        return brandService.deleteBrand(id);
    }
}
