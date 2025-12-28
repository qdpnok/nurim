package human.nurim_spring.dto;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.time.LocalDateTime;
import java.util.List;

@Getter @Setter @NoArgsConstructor
@AllArgsConstructor
public class CreateOrderReqDto {
    private String name;
    private String email;
    private String phoneNum;
    private List<Long> cartItemList;
    private String address;
    private String deliveryMessage;
    private Boolean isVisit;
    private LocalDateTime deliveryDate;
}
