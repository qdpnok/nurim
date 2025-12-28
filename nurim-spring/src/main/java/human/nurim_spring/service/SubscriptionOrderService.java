package human.nurim_spring.service;

import human.nurim_spring.dto.SubOrderPageRes;
import human.nurim_spring.dto.SubscriptionCartDto;
import human.nurim_spring.entity.Member;
import human.nurim_spring.entity.Product;
import human.nurim_spring.entity.Subscription;
import human.nurim_spring.entity.SubscriptionCartItem;
import human.nurim_spring.error.BusinessException;
import human.nurim_spring.repository.MemberRepository;
import human.nurim_spring.repository.ProductRepository;
import human.nurim_spring.repository.SubscriptionCartItemRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;

@Slf4j
@Service
@RequiredArgsConstructor
public class SubscriptionOrderService {
    private final MemberRepository memberRepository;
    private final ProductRepository productRepository;
    private final SubscriptionCartItemRepository subscriptionCartItemRepository;

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

        discountPrice = price*product.getDiscountRate()/100;
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
            discountPrice += price*subscriptionCartItem.getProduct().getDiscountRate() / 100;
        }

        Long count = (long) list.size();
        paymentPrice = totalPrice - discountPrice + 3000L;

        return convertEntityToDto(member, list, count, totalPrice, discountPrice, 3000L, paymentPrice);
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
