package human.nurim_spring.dto;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.util.List;

@Getter @Setter @NoArgsConstructor
@AllArgsConstructor
public class SubscriptionCartResDto {
    private boolean hasCart;
    private Long totalPrice;
    private Long discountPrice;
    private Long paymentPrice;
    private List<SubscriptionCartDto> subscriptionCartDto;
}
