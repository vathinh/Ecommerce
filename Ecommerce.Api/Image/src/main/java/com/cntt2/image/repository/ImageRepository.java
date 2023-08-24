package com.cntt2.image.repository;

import com.cntt2.image.model.Image;
import org.springframework.data.mongodb.repository.MongoRepository;

public interface ImageRepository extends MongoRepository<Image, String> { }
