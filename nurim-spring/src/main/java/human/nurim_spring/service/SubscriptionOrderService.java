package human.nurim_spring.service;

import human.nurim_spring.constant.OrderStatus;
import human.nurim_spring.constant.OrderType;
import human.nurim_spring.dto.CreateOrderReqDto;
import human.nurim_spring.dto.CreateOrderResDto;
import human.nurim_spring.dto.SubOrderPageRes;
import human.nurim_spring.dto.SubscriptionCartDto;
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
public class SubscriptionOrderService {
    private final MemberRepository memberRepository;
    private final ProductRepository productRepository;
    private final SubscriptionCartItemRepository subscriptionCartItemRepository;
    private final OrderRepository orderRepository;
    private final SubscriptionRepository subscriptionRepository;
    private final DeliveryRepository deliveryRepository;

    // 상품에서 결제 화면으로 직접 접근 시, 화면 렌더링에 사용할 메서드
    public SubOrderPageRes directOrderPage(Long memberId, Long productId, Long month) {
        List<SubscriptionCartDto> list = new ArrayList<>();
        Long price;
        long discountPrice;
        long paymentPrice;

        Member member = memberRepository.findById(memberId)
                .orElseThrow(() -> new BusinessException("NOT_EXIST_MEMBER", "해당 회원이 존재하지 않습니다."));

        Product product = productRepository.findById(productId)
                .orElseThrow(() -> new BusinessException("NOT_EXIST_PRODUCT", "해당 상품이 존재하지 않습니다."));

        if(month == 60) {
            price = product.getPrice();
        } else if(month == 48) {
            price = product.getPrice48();
        } else {
            price = product.getPrice36();
        }

        if(product.getDiscountRate() == null) {
            discountPrice = 0;
        } else {
            discountPrice = price*product.getDiscountRate()/ 100;
        }
        paymentPrice = price - discountPrice + 3000L;

        list.add(convertProductToDto(product, price, month));

        return convertEntityToDto(member, list, 1L, price, discountPrice, 3000L, paymentPrice);
    }

    // 장바구니에서 결제 화면으로 접근 시, 화면 렌더링에 사용할 메서드
    public SubOrderPageRes cartOrderPage(Long memberId, List<Long> cartItemIds) {
        List<SubscriptionCartDto> list = new ArrayList<>();
        long totalPrice = 0;
        long discountPrice = 0;
        long paymentPrice;

        Member member = memberRepository.findById(memberId)
                .orElseThrow(() -> new BusinessException("NOT_EXIST_MEMBER", "해당 회원이 존재하지 않습니다."));

        for (Long cartItemId : cartItemIds) {
            SubscriptionCartItem subscriptionCartItem = subscriptionCartItemRepository.findById(cartItemId)
                    .orElseThrow(() -> new BusinessException("NOT_EXIST_CAERITEM", "해당 장바구니 상품이 존재하지 않습니다."));

            list.add(convertCartItemToDto(subscriptionCartItem));

            long price = subscriptionCartItem.getPrice();

            totalPrice += price;
            if(subscriptionCartItem.getProduct().getDiscountRate() == null) {
                discountPrice = 0;
            } else {
                discountPrice += price*subscriptionCartItem.getProduct().getDiscountRate()/ 100;
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

        // 구독 데이터 생성
        for (Long num : dto.getCartItemList()) {
            SubscriptionCartItem item = subscriptionCartItemRepository.findById(num)
                    .orElseThrow(() -> new BusinessException("NOT_EXIST_ITEM", "장바구니에 해당 상품이 존재하지 않습니다."));

            long dDay = item.getMonth()*30;
            long totalCoast = item.getMonth()* item.getPrice();

            subscriptionRepository.save(buildSubscription(member, item.getProduct(), orders, item.getMonth(), item.getPrice(), totalCoast, dDay));
        }

        // 배송 데이터 생성
        deliveryRepository.save(buildDelivery(member, orders, dto));

        return new CreateOrderResDto(orders.getNum());
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

    private Subscription buildSubscription(Member member, Product product, Orders orders,
                                           Long month, Long price, Long cost, Long dDay) {
        return Subscription.builder()
                .member(member)
                .product(product)
                .orders(orders)
                .start_data(LocalDateTime.now())
                .end_data(LocalDateTime.now().plusMonths(month))
                .next_pay(LocalDateTime.now().plusMonths(1).withDayOfMonth(20))
                .price(price)
                .d_day(dDay)
                .remaining_cost(cost)
                .build();
    }

    private Orders buildOrder(Member member, String name, String email, String phone) {
        return Orders.builder()
                .member(member)
                .orderName(name)
                .orderEmail(email)
                .orderPhone(phone)
                .orderType(OrderType.SUBSCRIPTION)
                .orderStatus(OrderStatus.ORDERED)
                .build();
    }

    private SubOrderPageRes convertEntityToDto(Member member, List<SubscriptionCartDto> list, Long count,
                                               Long totalPrice, Long discountPrice, Long deliveryPrice, Long paymentPrice) {
        return SubOrderPageRes.builder()
                .memberName(member.getName())
                .email(member.getEmail())
                .phoneNum(member.getPhoneNum())
                .subscriptionCartDtoList(list)
                .count(count)
                .totalPrice(totalPrice)
                .discountPrice(discountPrice)
                .deliveryPrice(deliveryPrice)
                .paymentPrice(paymentPrice)
                .build();
    }

    private SubscriptionCartDto convertProductToDto(Product product, Long price, Long month) {
        return SubscriptionCartDto.builder()
                .productNum(product.getNum())
                .name(product.getName())
                .brand(product.getBrand())
                .price(price)
                .month(month)
                .build();
    }

    private SubscriptionCartDto convertCartItemToDto(SubscriptionCartItem item){
        return SubscriptionCartDto.builder()
                .cartItemNum(item.getNum())
                .productNum(item.getProduct().getPrice())
                .name(item.getProduct().getName())
                .brand(item.getProduct().getBrand())
                .price(item.getPrice())
                .month(item.getMonth())
                .build();
    }
}
