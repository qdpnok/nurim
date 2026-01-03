package human.nurim_spring.dto;

import human.nurim_spring.constant.PermissionStatus;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter @Setter @NoArgsConstructor
public class MemberListDto {
    private Long num;
    private String id;
    private String email;
    private PermissionStatus status;
    private Boolean isQuit;
}
