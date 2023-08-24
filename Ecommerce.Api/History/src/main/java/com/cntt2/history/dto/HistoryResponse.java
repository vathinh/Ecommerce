package com.cntt2.history.dto;

import com.cntt2.history.model.Purchase;
import com.cntt2.history.model.Rating;
import com.cntt2.history.model.View;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;

@Builder
@Data
@AllArgsConstructor
@NoArgsConstructor
public class HistoryResponse {
    private List<View> views;
    private List<Purchase> purchases;
    private List<Rating> ratings;
}
