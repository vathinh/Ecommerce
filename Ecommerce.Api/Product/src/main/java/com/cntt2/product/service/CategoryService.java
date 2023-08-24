package com.cntt2.product.service;

import com.cntt2.product.dto.CategoryRequest;
import com.cntt2.product.model.Brand;
import com.cntt2.product.model.Category;
import com.cntt2.product.repository.CategoryRepository;
import lombok.AllArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import java.text.Normalizer;
import java.util.List;
import java.util.Locale;
import java.util.Optional;
import java.util.regex.Pattern;

@Service
@AllArgsConstructor
public class CategoryService {
    private final CategoryRepository categoryRepository;

    private static final Pattern NONLATIN = Pattern.compile("[^\\w-]");
    private static final Pattern WHITESPACE = Pattern.compile("[\\s]");

    public static String toSlug(String input) {
        String nowhitespace = WHITESPACE.matcher(input).replaceAll("-");
        String normalized = Normalizer.normalize(nowhitespace, Normalizer.Form.NFD);
        String slug = NONLATIN.matcher(normalized).replaceAll("");
        return slug.toLowerCase(Locale.ENGLISH);
    }

    ////////////////////////////////////////////////////////////////////////////////

    public ResponseEntity<List<Category>> getCategories() {
        return ResponseEntity.ok(categoryRepository.findAll());
    }

    public ResponseEntity<Category> getSingleCategory(String categoryId) {
        Optional<Category> categoryData = categoryRepository.findById(categoryId);
        if (categoryData.isEmpty()) {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
        return new ResponseEntity<Category>(categoryData.get(), HttpStatus.OK);
    }

    public ResponseEntity<Category> createCategory(CategoryRequest request) {
        if(!request.parent().isEmpty()) {
            Optional<Category> parentCatgory = categoryRepository.findById(request.parent());
            if(parentCatgory.isEmpty()) return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
        }

        Category data = Category.builder()
                .name(request.name())
                .slug(toSlug(request.name()))
                .thumbnail(request.thumbnail())
                .parent(request.parent())
                .build();

        return new ResponseEntity<Category>(categoryRepository.save(data), HttpStatus.OK);
    }

    public ResponseEntity<Category> updateCategory(String categoryId, CategoryRequest request) {
        Optional<Category> categoryData = categoryRepository.findById(categoryId);
        if (categoryData.isEmpty()) {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }

        if(request.name() != null)
            categoryData.get().setName(request.name());
            categoryData.get().setSlug(toSlug(request.name()));
        if(request.thumbnail() != null)
            categoryData.get().setThumbnail(request.thumbnail());
        if(request.parent() != null) {
            if(!request.parent().isEmpty()) {
                Optional<Category> parentCatgory = categoryRepository.findById(request.parent());
                if(parentCatgory.isEmpty()) return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
            } else {
                categoryData.get().setParent(request.parent());
            }
        }

        return new ResponseEntity<Category>(categoryRepository.save(categoryData.get()), HttpStatus.OK);
    }

    public ResponseEntity deleteCategory(String categoryId) {
        Optional<Category> categoryData = categoryRepository.findById(categoryId);
        if (categoryData.isEmpty()) {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
        categoryRepository.deleteById(categoryId);
        return new ResponseEntity(HttpStatus.OK);
    }
}
