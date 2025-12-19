package human.nurim_spring.dto;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.time.LocalDateTime;
import java.util.concurrent.CompletableFuture;

@Getter @Setter @NoArgsConstructor
@AllArgsConstructor
public class AuthEmailResDto {
    String email;
    int code;
    LocalDateTime validTime;

    public AuthEmailResDto(String email, CompletableFuture<Integer> code, LocalDateTime validTime) {
    }
}
