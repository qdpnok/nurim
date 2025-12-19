package human.nurim_spring.dto;

import lombok.*;

@ToString
@Getter @Setter @NoArgsConstructor
@AllArgsConstructor @Builder
public class LoginResDto {
    private Long num;
    private String name;
    private String accessToken;
}
