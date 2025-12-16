package human.nurim_spring.dto;

import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter @Setter
@NoArgsConstructor
public class SignUpReqDto {
    private String id;
    private String pwd;
    private String email;
    private String name;
    private String phoneNum;
}
