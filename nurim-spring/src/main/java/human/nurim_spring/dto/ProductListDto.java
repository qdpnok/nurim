package human.nurim_spring.dto;

public record ProductListDto(
        Long purchaseProductNum,
        Long subscriptionProductNum,
        String name,
        Long purchasePrice,
        String img
) {
}
