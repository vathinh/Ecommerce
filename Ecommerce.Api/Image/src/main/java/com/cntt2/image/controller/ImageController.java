package com.cntt2.image.controller;

import com.cntt2.image.model.Image;
import com.cntt2.image.service.ImageService;
import lombok.extern.slf4j.Slf4j;
import org.bson.types.Binary;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.Base64;
import java.util.List;

@Slf4j
@RestController
@RequestMapping("api/v1/image")
public class ImageController {
    @Autowired
    private ImageService imageService;

    @GetMapping(path = "{id}")
    public ResponseEntity<byte []> getPhoto(@PathVariable String id, Model model) {
        Image image = imageService.getPhoto(id);
        Binary binary = image.getImage();

        return ResponseEntity.ok().contentType(MediaType.IMAGE_JPEG).body(binary.getData());
    }

    @PostMapping
    public List<String> addPhoto(@RequestParam("image") List<MultipartFile> images, Model model)
            throws IOException {
        List<String> ids = imageService.addPhoto(images);
        return ids;
    }
}
