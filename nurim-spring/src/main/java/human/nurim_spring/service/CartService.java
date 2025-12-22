package human.nurim_spring.service;

import human.nurim_spring.repository.CartItemRepository;
import human.nurim_spring.repository.CartRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;

@Slf4j
@Service
@RequiredArgsConstructor
public class CartService {
    private final CartRepository cartRepository;
    private final CartItemRepository cartItemRepository;

    // 카트 아이템 추가
    public void add() {

    }
    // 카트 내 아이템 조회
    // 카트 내 아이템 전체 삭제
    // 카트 아이템 선택 삭제
}
