package human.nurim_spring.service;

import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.test.context.TestPropertySource;
import org.springframework.transaction.annotation.Transactional;

import static org.junit.jupiter.api.Assertions.*;

@SpringBootTest
@Transactional
@Slf4j
@TestPropertySource(locations="classpath:application-test.properties")
class PurchaseCartServiceTest {
    @Autowired
    PurchaseCartService purchaseCartService;

    // 장바구니에 아이템 삽입: saveItem
    // 장바구니 조회: getCart
    // 장바구니 수량 수정: updateQty
    // 장바구니 상품 삭제: deleteItem

}