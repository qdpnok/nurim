package human.nurim_spring.dto;

import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter @Setter @NoArgsConstructor
public class PaymentReqDto {
    private Long memberId;
    private Long orderId;
    private String method;
}
