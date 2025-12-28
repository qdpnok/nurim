package human.nurim_spring.dto;

import lombok.*;

@Getter @Setter @NoArgsConstructor
@AllArgsConstructor @ToString
public class MyPageResDto {
    String name;
    Long subscriptionCount;
    Long purchaseCount;
}
