package human.nurim_spring.dto;

import lombok.*;

@Getter @Setter @NoArgsConstructor
@AllArgsConstructor @Builder
public class ProductListResDto {
    private Long num;
    private String name;
    private Long price;
    private String spec;
    private String brand;
    private String img;
    private Long discountRate;
    private Long scopeCount;
    private Double scopeAvg;
}
