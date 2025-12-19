package human.nurim_spring.dto;

import lombok.*;

@Getter @Setter @NoArgsConstructor
@AllArgsConstructor @Builder
public class ProductResDto {
    private Long num;
    private String name;
    private Long price;
}
