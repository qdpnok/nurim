package human.nurim_spring.dto;

import com.fasterxml.jackson.databind.PropertyNamingStrategies;
import com.fasterxml.jackson.databind.annotation.JsonNaming;
import lombok.*;

import java.util.List;

@Getter @Setter @NoArgsConstructor
@AllArgsConstructor
@JsonNaming(PropertyNamingStrategies.SnakeCaseStrategy.class)
public class PurchaseCartResDto {
    private boolean hasCart;
    private Long count;
    private Long totalPrice;
    private Long discountPrice;
    private Long deliveryPrice;
    private Long paymentPrice;
    private List<PurchaseCartDto> purchaseCartDto;
}
