package human.nurim_spring.dto;

import lombok.*;

import java.time.LocalDateTime;

@Getter @Setter @NoArgsConstructor
@Builder @AllArgsConstructor
public class SubProductDto {
    private Long subNum;
    private String name;
    private String brand;
    private Long month;
    private LocalDateTime startDate;
    private LocalDateTime endDate;
    private LocalDateTime nextDate;
    private Long price;
    private Long remainingCost;
    private String img;
    private Long settlement;
}
