package human.nurim_spring.dto;

import com.fasterxml.jackson.databind.PropertyNamingStrategies;
import com.fasterxml.jackson.databind.annotation.JsonNaming;
import lombok.*;

@Getter @Setter @NoArgsConstructor
@Builder @AllArgsConstructor
@ToString
@JsonNaming(PropertyNamingStrategies.SnakeCaseStrategy.class)
public class SubscriptionCartDto {
    private Long cartItemNum;
    private Long productNum;
    private String name;
    private String brand;
    private String serialNum;
    private Long price;
    private String img;
    private Long month;
}
