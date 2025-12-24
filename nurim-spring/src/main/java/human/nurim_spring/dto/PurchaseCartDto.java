package human.nurim_spring.dto;

import com.fasterxml.jackson.databind.PropertyNamingStrategies;
import com.fasterxml.jackson.databind.annotation.JsonNaming;
import lombok.*;

@Getter @Setter @NoArgsConstructor
@Builder @AllArgsConstructor
@JsonNaming(PropertyNamingStrategies.SnakeCaseStrategy.class)
public class PurchaseCartDto {
    private Long cartItemNum;
    private Long productNum;
    private String name;
    private String serialNum;
    private Long price;
    private Long discountRate;
    private Long quantity;
    private String img;
}
