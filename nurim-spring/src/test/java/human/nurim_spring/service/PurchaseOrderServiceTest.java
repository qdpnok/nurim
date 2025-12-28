package human.nurim_spring.service;

import human.nurim_spring.dto.*;
import human.nurim_spring.repository.DeliveryRepository;
import human.nurim_spring.repository.MemberRepository;
import human.nurim_spring.repository.OrderRepository;
import human.nurim_spring.repository.PurchaseRepository;
import lombok.extern.slf4j.Slf4j;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.test.context.TestPropertySource;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;

import static org.junit.jupiter.api.Assertions.*;

@SpringBootTest
@Transactional
@Slf4j
@TestPropertySource(locations="classpath:application-test.properties")
class PurchaseOrderServiceTest {
    @Autowired
    PurchaseOrderService purchaseOrderService;
    @Autowired
    PurchaseCartService purchaseCartService;
    @Autowired
    OrderRepository orderRepository;
    @Autowired
    PurchaseRepository purchaseRepository;
    @Autowired
    DeliveryRepository deliveryRepository;

    @Test
    @DisplayName("구매 주문 조회 및 데이터 추가")
    public void orderTest() {
        // 상품 페이지에서 주문으로 직접 접근
        PurchaseOrderPageRes res = purchaseOrderService.directOrderPage(1L, 2L, 3L);
        log.info("주문 페이지 정보: {}", res);
        log.info("주문 상품 리스트: {}", res.getPurchaseCartDtoList().get(0));

        // 장바구니에 아이템 삽입
        purchaseCartService.saveItem(new PurchaseCartItemReqDto(1L, 2L, 4L));
        purchaseCartService.saveItem(new PurchaseCartItemReqDto(1L, 3L, 2L));
        purchaseCartService.saveItem(new PurchaseCartItemReqDto(1L, 4L, 5L));

        List<Long> itemIds = new ArrayList<>();
        for (long i = 1L; i<4L; i++) {
            itemIds.add(i);
        }

        res = purchaseOrderService.cartOrderPage(1L, itemIds);
        log.info("주문 페이지 정보: {}", res);
        for (PurchaseCartDto dto: res.getPurchaseCartDtoList()) {
            log.info("주문 상품 리스트: {}", dto);
        }

        CreateOrderReqDto createDto = new CreateOrderReqDto("이상미", "tkdal@gmail.com", "010-1234-1234",
                itemIds, "구성동~", "집으로~", true, LocalDateTime.now());

        purchaseOrderService.createOrder(1L, createDto);

        log.info("주문 정보: {}", orderRepository.findAll().get(0));
        log.info("구독 정보: {}", purchaseRepository.findAll().get(0));
        log.info("배송 정보: {}", deliveryRepository.findAll().get(0));
    }
}