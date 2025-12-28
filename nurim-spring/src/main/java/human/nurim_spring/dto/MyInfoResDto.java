package human.nurim_spring.dto;

import lombok.*;

@Getter @Setter @NoArgsConstructor
@AllArgsConstructor @ToString
public class MyInfoResDto {
    private String id;
    private String email;
    private String name;
    private String phone;
}
