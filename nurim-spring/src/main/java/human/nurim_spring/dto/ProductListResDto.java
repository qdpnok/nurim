package human.nurim_spring.dto;

import lombok.*;

import java.util.List;

@Getter @Setter @NoArgsConstructor
@AllArgsConstructor @Builder
public class ProductListResDto {
    private List<ProductListDto> productListDtoList;
    private int totalPages;
    private Long totalElements;
    private int currentPage;
    private int pageSize;
}
