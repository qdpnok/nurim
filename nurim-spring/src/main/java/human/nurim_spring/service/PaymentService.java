package human.nurim_spring.service;

import human.nurim_spring.dto.PaymentReqDto;
import human.nurim_spring.entity.Member;
import human.nurim_spring.entity.Orders;
import human.nurim_spring.entity.Payment;
import human.nurim_spring.entity.Subscription;
import human.nurim_spring.error.BusinessException;
import human.nurim_spring.repository.MemberRepository;
import human.nurim_spring.repository.OrderRepository;
import human.nurim_spring.repository.PaymentRepository;
import human.nurim_spring.repository.SubscriptionRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;

import java.util.List;

@Slf4j
@Service
@RequiredArgsConstructor
public class PaymentService {
    private final PaymentRepository paymentRepository;
    private final MemberRepository memberRepository;
    private final OrderRepository orderRepository;
    private final SubscriptionRepository subscriptionRepository;

    public void add(PaymentReqDto dto) {
        // memberId
        Member member = memberRepository.findById(dto.getMemberId())
                .orElseThrow(() -> new BusinessException("NOT_EXIST_MEMBER", "해당 회원이 존재하지 않습니다."));

        Orders orders = orderRepository.findById(dto.getOrderId())
                .orElseThrow(() -> new BusinessException("NOT_EXIST_ORDERS", "해당 주문 기록이 존재하지 않습니다."));

        List<Subscription> subscriptions = subscriptionRepository.findByOrders(orders);
        if(subscriptions.isEmpty()) throw new BusinessException("NOT_EXISTS_SUBSCRIPTION", "구독 정보가 존재하지 않습니다.");

        long quantity = subscriptions.size();
        long totalPrice = 0;

        for (Subscription subscription : subscriptions) {
            totalPrice += subscription.getPrice();
        }

        paymentRepository.save(buildPayment(member, orders, dto.getMethod(), quantity, totalPrice));
    }

    private Payment buildPayment(Member member, Orders orders, String method, Long qty, Long price) {
        return Payment.builder()
                .member(member)
                .orders(orders)
                .quantity(qty)
                .total_price(price)
                .payment_method(method)
                .bye_state("PENDING")
                .build();
    }
}
