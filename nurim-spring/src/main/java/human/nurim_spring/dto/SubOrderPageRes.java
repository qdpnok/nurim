package human.nurim_spring.dto;

import lombok.*;

import java.util.List;

@Getter @Setter @NoArgsConstructor
@Builder @AllArgsConstructor
@ToString
public class SubOrderPageRes {
    private String memberName;
    private String email;
    private String phoneNum;
    private List<SubscriptionCartDto> subscriptionCartDtoList;
    private Long count;
    private Long totalPrice;
    private Long discountPrice;
    private Long deliveryPrice;
    private Long paymentPrice;
}
