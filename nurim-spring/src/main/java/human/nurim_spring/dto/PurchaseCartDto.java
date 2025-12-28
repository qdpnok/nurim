package human.nurim_spring.dto;

import com.fasterxml.jackson.databind.PropertyNamingStrategies;
import com.fasterxml.jackson.databind.annotation.JsonNaming;
import lombok.*;

@Getter @Setter @NoArgsConstructor
@Builder @AllArgsConstructor
// 카멜 케이스를 스네이크 케이스로 자동 변환
@JsonNaming(PropertyNamingStrategies.SnakeCaseStrategy.class)
public class PurchaseCartDto {
    private Long cartItemNum;
    private Long productNum;
    private String name;
    private String serialNum;
    private String brand;
    private Long price;
    private Long discountRate;
    private Long quantity;
    private String img;
}
