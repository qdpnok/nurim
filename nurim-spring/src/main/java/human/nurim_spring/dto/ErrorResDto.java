package human.nurim_spring.dto;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.time.LocalDateTime;

@Getter @Setter
@NoArgsConstructor @AllArgsConstructor
public class ErrorResDto {
    private String errorCode;
    private String message;
    private LocalDateTime timestamp;
}
