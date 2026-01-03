package human.nurim_spring.dto;

import lombok.*;

import java.util.List;

@Getter @Setter @NoArgsConstructor
@Builder @AllArgsConstructor
public class MemberPageResDto {
    private List<MemberListDto> members;
    private int totalPages;
    private Long totalElements;
    private int currentPage;
    private int pageSize;
}
