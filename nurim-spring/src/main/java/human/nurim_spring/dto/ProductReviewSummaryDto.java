package human.nurim_spring.dto;

import human.nurim_spring.entity.Product;
import lombok.Getter;

public record ProductReviewSummaryDto(
        Product product,
        Long reviewCount,
        Double avgScope
) { }