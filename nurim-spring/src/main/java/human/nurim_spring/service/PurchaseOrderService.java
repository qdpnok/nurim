package human.nurim_spring.service;

import human.nurim_spring.constant.OrderStatus;
import human.nurim_spring.constant.OrderType;
import human.nurim_spring.dto.CreateOrderReqDto;
import human.nurim_spring.dto.CreateOrderResDto;
import human.nurim_spring.dto.PurchaseCartDto;
import human.nurim_spring.dto.PurchaseOrderPageRes;
import human.nurim_spring.entity.*;
import human.nurim_spring.error.BusinessException;
import human.nurim_spring.repository.*;
import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;

@Slf4j
@Service
@RequiredArgsConstructor
public class PurchaseOrderService {
    private final MemberRepository memberRepository;
    private final ProductRepository productRepository;
    private final PurchaseCartItemRepository purchaseCartItemRepository;
    private final OrderRepository orderRepository;
    private final PurchaseRepository purchaseRepository;
    private final DeliveryRepository deliveryRepository;

    // 상품에서 결제 화면으로 직접 접근 시, 화면 렌더링에 사용할 메서드
    public PurchaseOrderPageRes directOrderPage(Long memberId, Long productId, Long quantity) {
        List<PurchaseCartDto> list = new ArrayList<>();
        long discountPrice;
        long paymentPrice;

        Member member = memberRepository.findById(memberId)
                .orElseThrow(() -> new BusinessException("NOT_EXIST_MEMBER", "해당 회원이 존재하지 않습니다."));

        Product product = productRepository.findById(productId)
                .orElseThrow(() -> new BusinessException("NOT_EXIST_PRODUCT", "해당 상품이 존재하지 않습니다."));

        if(product.getDiscountRate() == null) {
            discountPrice = 0;
        } else {
            discountPrice = product.getPrice()*product.getDiscountRate()/ 100;
        }

        paymentPrice = product.getPrice() - discountPrice + 3000L;

        list.add(convertProductToDto(product, quantity));

        return convertEntityToDto(member, list, 1L, product.getPrice(), discountPrice, 3000L, paymentPrice);
    }
    // 장바구니에서 결제 화면으로 접근 시, 화면 렌더링에 사용할 메서드
    public PurchaseOrderPageRes cartOrderPage(Long memberId, List<Long> cartItemIds) {
        List<PurchaseCartDto> list = new ArrayList<>();
        long totalPrice = 0;
        long discountPrice = 0;
        long paymentPrice;

        Member member = memberRepository.findById(memberId)
                .orElseThrow(() -> new BusinessException("NOT_EXIST_MEMBER", "해당 회원이 존재하지 않습니다."));

        for (Long cartItemId : cartItemIds) {
            PurchaseCartItem purchaseCartItem = purchaseCartItemRepository.findById(cartItemId)
                   .orElseThrow(() -> new BusinessException("NOT_EXIST_CAERITEM", "해당 장바구니 상품이 존재하지 않습니다."));

            list.add(convertCartItemToDto(purchaseCartItem));

            long price = purchaseCartItem.getPrice();

            totalPrice += price;
            if(purchaseCartItem.getProduct().getDiscountRate() == null) {
                discountPrice = 0;
            } else {
                discountPrice += purchaseCartItem.getPrice()*purchaseCartItem.getProduct().getDiscountRate()/100;
            }
        }

        Long count = (long) list.size();
        paymentPrice = totalPrice - discountPrice + 3000L;

        return convertEntityToDto(member, list, count, totalPrice, discountPrice, 3000L, paymentPrice);
    }

    // 주문, 구독, 배송 생성
    @Transactional
    public CreateOrderResDto createOrder(Long memberId, CreateOrderReqDto dto) {
        Member member = memberRepository.findById(memberId)
                .orElseThrow(() -> new BusinessException("NOT_EXIST_MEMBER", "해당 회원이 존재하지 않습니다."));

        // 주문 데이터 생성
        Orders orders = orderRepository.save(buildOrder(member, dto.getName(), dto.getEmail(), dto.getPhoneNum()));

        // 구매 데이터 생성
        for (Long num : dto.getCartItemList()) {
            PurchaseCartItem item = purchaseCartItemRepository.findById(num)
                    .orElseThrow(() -> new BusinessException("NOT_EXIST_ITEM", "장바구니에 해당 상품이 존재하지 않습니다."));

            purchaseRepository.save(buildPurchase(member, item.getProduct(), orders, item));
        }

        deliveryRepository.save(buildDelivery(member, orders, dto));

        return new CreateOrderResDto(orders.getNum());
    }

    private PurchaseCartDto convertProductToDto(Product product, Long quantity) {
        return PurchaseCartDto.builder()
                .productNum(product.getNum())
                .name(product.getName())
                .price(product.getPrice())
                .quantity(quantity)
                .img(product.getImg())
                .build();
    }

    private PurchaseOrderPageRes convertEntityToDto(Member member, List<PurchaseCartDto> list, Long count,
                                                    Long totalPrice, Long discountPrice, Long deliveryPrice, Long paymentPrice) {
        return PurchaseOrderPageRes.builder()
                .memberName(member.getName())
                .email(member.getEmail())
                .phoneNum(member.getPhoneNum())
                .purchaseCartDtoList(list)
                .count(count)
                .totalPrice(totalPrice)
                .discountPrice(discountPrice)
                .deliveryPrice(deliveryPrice)
                .paymentPrice(paymentPrice)
                .build();
    }

    private PurchaseCartDto convertCartItemToDto(PurchaseCartItem item) {
        return PurchaseCartDto.builder()
                .cartItemNum(item.getNum())
                .productNum(item.getNum())
                .name(item.getProduct().getName())
                .brand(item.getProduct().getBrand())
                .price(item.getPrice())
                .quantity(item.getQuantity())
                .build();
    }

    private Orders buildOrder(Member member, String name, String email, String phone) {
        return Orders.builder()
                .member(member)
                .orderName(name)
                .orderEmail(email)
                .orderPhone(phone)
                .orderType(OrderType.PURCHASE)
                .orderStatus(OrderStatus.ORDERED)
                .build();
    }

    private Purchase buildPurchase(Member member, Product product, Orders orders, PurchaseCartItem item) {
        return Purchase.builder()
                .member(member)
                .product(product)
                .orders(orders)
                .purchase_data(LocalDateTime.now())
                .quantity(item.getQuantity())
                .price(item.getPrice()*item.getQuantity())
                .installment_state(1L)
                .build();
    }

    private Delivery buildDelivery(Member member, Orders orders, CreateOrderReqDto dto) {
        return Delivery.builder()
                .member(member)
                .orders(orders)
                .address(dto.getAddress())
                .quantity((long)dto.getCartItemList().size())
                .delivery_message(dto.getDeliveryMessage())
                .isAdvance_visit(dto.getIsVisit())
                .deliveryDate(dto.getDeliveryDate())
                .build();
    }
}
