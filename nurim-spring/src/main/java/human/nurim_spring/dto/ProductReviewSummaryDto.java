package human.nurim_spring.dto;

import human.nurim_spring.entity.Product;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor // JPA가 결과 담을 때 필요함
public class ProductReviewSummaryDto {

    private Product product;
    private Long reviewCount;
    private Double avgScope;

    public ProductReviewSummaryDto(Product product, Long reviewCount, Double avgScope) {
        this.product = product;
        this.reviewCount = reviewCount;
        // 리뷰가 하나도 없어서 평균이 null로 오면 0.0점으로 바꿔주는 안전장치
        this.avgScope = (avgScope != null) ? avgScope : 0.0;
    }
}