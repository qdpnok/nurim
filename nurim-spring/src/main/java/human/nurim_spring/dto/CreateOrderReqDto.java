package human.nurim_spring.dto;

import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.time.LocalDateTime;
import java.util.List;

@Getter @Setter @NoArgsConstructor
public class CreateOrderReqDto {
    private String name;
    private String email;
    private String phoneNum;
    private List<Long> cartItemList;
    private String address;
    private Long quantity;
    private String deliveryMessage;
    private Boolean isVisit;
    private Long invoiceNum;
    private LocalDateTime deliveryDate;
}
