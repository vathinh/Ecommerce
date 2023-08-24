package com.cntt2.image.model;

import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import org.bson.types.Binary;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

@Document(collection = "images")
@Setter @Getter @NoArgsConstructor
public class Image {
    @Id
    private String id;

    private Binary image;
}
