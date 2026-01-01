package human.nurim_spring.dto;

import lombok.*;

@Getter @Setter @NoArgsConstructor
@Builder @AllArgsConstructor
public class ProductDetailResDto {
    private Long num;
    private String brand;
    private String serialNum;
    private Double scopeAvg;
    private String spec;
    private Long price;
    private Long price48;
    private Long price36;
    private Long discount;
    private String img;
    private String name;
}
