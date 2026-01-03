package human.nurim_spring.dto;

import human.nurim_spring.constant.PermissionStatus;
import lombok.*;

@Getter @Setter @NoArgsConstructor
@Builder @AllArgsConstructor
public class MemberListDto {
    private Long num;
    private String id;
    private String email;
    private PermissionStatus status;
    private Boolean isQuit;
}
