package human.nurim_spring.dto;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Setter @Getter @NoArgsConstructor
@AllArgsConstructor
public class SubscriptionCartItemReqDto {
    private Long memberNum;
    private Long productNum;
    private Long month;
}
