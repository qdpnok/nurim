package human.nurim_spring.dto;

import lombok.*;

@Getter @Setter @NoArgsConstructor
@Builder @AllArgsConstructor
public class ProductListDto {
    private Long pNum;
    private Long sNum;
    private String category;
    private String name;
    private Long pPrice;
    private Long sPrice;
    private String img;
    private String serialNum;
    private String spec;
    private String brand;
    private Long pDiscountRate;
    private Long sDiscountRate;
    private Long scopeCount;
    private Double scopeAvg;
    private Long price_36;
}
