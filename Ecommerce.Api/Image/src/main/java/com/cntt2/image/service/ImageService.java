package com.cntt2.image.service;

import com.cntt2.image.model.Image;
import com.cntt2.image.repository.ImageRepository;
import org.bson.BsonBinarySubType;
import org.bson.types.Binary;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.ArrayList;
import java.util.List;

@Service
public class ImageService {
    @Autowired
    private ImageRepository imageRepository;

    public List<String> addPhoto(List<MultipartFile> files) throws IOException {
        List<String> result = new ArrayList<>();
        for(MultipartFile file : files) {
            Image photo = new Image();
            photo.setImage(
                    new Binary(BsonBinarySubType.BINARY, file.getBytes()));
            photo = imageRepository.insert(photo);
            result.add(photo.getId());
        }
        return result;
    }

    public Image getPhoto(String id) {
        return imageRepository.findById(id).get();
    }
}
