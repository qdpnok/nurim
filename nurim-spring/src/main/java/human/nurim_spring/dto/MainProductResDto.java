package human.nurim_spring.dto;

import lombok.*;

@Getter @Setter @NoArgsConstructor
@Builder @AllArgsConstructor
public class MainProductResDto {
    private Long num;
    private String name;
    private Long price;
    private Long discountRate;
}
