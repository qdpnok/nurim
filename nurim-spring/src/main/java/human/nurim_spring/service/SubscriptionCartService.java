package human.nurim_spring.service;

import human.nurim_spring.dto.SubscriptionCartDto;
import human.nurim_spring.dto.SubscriptionCartItemReqDto;
import human.nurim_spring.dto.SubscriptionCartResDto;
import human.nurim_spring.entity.*;
import human.nurim_spring.error.BusinessException;
import human.nurim_spring.repository.MemberRepository;
import human.nurim_spring.repository.ProductRepository;
import human.nurim_spring.repository.SubscriptionCartItemRepository;
import human.nurim_spring.repository.SubscriptionCartRepository;
import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;

@Slf4j
@Service
@RequiredArgsConstructor
public class SubscriptionCartService {
    private final MemberRepository memberRepository;
    private final SubscriptionCartRepository subscriptionCartRepository;
    private final SubscriptionCartItemRepository subscriptionCartItemRepository;
    private final ProductRepository productRepository;

//     장바구니 조회
    public SubscriptionCartResDto getCart(Long memberNum) {
        List<SubscriptionCartDto> list = new ArrayList<>();
        Long discountPrice = 0L;
        Long totalPrice = 0L;

        Member member = memberRepository.findById(memberNum)
                .orElseThrow(() -> new BusinessException("NOT_EXIST_MEMBER", "해당 회원이 존재하지 않습니다."));

        SubscriptionCart cart = subscriptionCartRepository.findByMember(member);
        // 카트가 존재하지 않으면 hasCart에 false를 담아 빈 dto를 전송
        if(cart == null) {
            SubscriptionCartResDto dto = new SubscriptionCartResDto();
            dto.setHasCart(false);
            return dto;
        }

        List<SubscriptionCartItem> subscriptionCartItems = subscriptionCartItemRepository.findBySubscriptionCart(cart);

        for (SubscriptionCartItem subscriptionCartItem : subscriptionCartItems) {
            list.add(convertEntityToDto(subscriptionCartItem));
            Long price = subscriptionCartItem.getPrice();
            totalPrice += price;
            discountPrice += price * subscriptionCartItem.getProduct().getDiscountRate() / 100;
        }

        return new SubscriptionCartResDto(true, totalPrice, discountPrice, totalPrice-discountPrice, list);
    }

    // 장바구니에 아이템 삽입
    @Transactional
    public void saveItem(SubscriptionCartItemReqDto dto) {
        Member member = memberRepository.findById(dto.getMemberNum())
                .orElseThrow(() -> new BusinessException("NOT_EXIST_MEMBER", "해당 회원이 존재하지 않습니다."));

        // 장바구니 없으면 생성하기
        SubscriptionCart subscriptionCart = subscriptionCartRepository.findByMember(member);
        if(subscriptionCart == null) {
            subscriptionCart = subscriptionCartRepository.save(buildCart(member));
        }

        Product product = productRepository.findById(dto.getProductNum())
                .orElseThrow(() -> new BusinessException("NOT_EXIST_PRODUCT", "해당 상품을 찾지 못했습니다."));

        Long price = 0L;
        if (dto.getMonth() == 36L) {
            price = product.getPrice36();
        } else if (dto.getMonth() == 48L) {
            price = product.getPrice48();
        } else if (dto.getMonth() == 60L) {
            price = product.getPrice();
        }

        subscriptionCartItemRepository.save(buildCartItem(subscriptionCart, product, price, dto.getMonth()));
    }

    private SubscriptionCartDto convertEntityToDto(SubscriptionCartItem cartItem) {
        return SubscriptionCartDto.builder()
                .cartItemNum(cartItem.getNum())
                .productNum(cartItem.getProduct().getNum())
                .name(cartItem.getProduct().getName())
                .brand(cartItem.getProduct().getBrand())
                .serialNum(cartItem.getProduct().getSerialNum())
                .price(cartItem.getPrice())
                .img(cartItem.getProduct().getImg())
                .month(cartItem.getMonth())
                .build();
    }

    private SubscriptionCartItem buildCartItem(SubscriptionCart subscriptionCart, Product product, Long price, Long month) {
        return SubscriptionCartItem.builder()
                .subscriptionCart(subscriptionCart)
                .product(product)
                .price(price)
                .month(month)
                .build();
    }

    private SubscriptionCart buildCart(Member member) {
        return SubscriptionCart.builder()
                .member(member)
                // 리스트 삽입할 때 빈 값이면 null, ArrayList를 생성해서 삽입하면 isEmpty 쓸 수 있음
                .subscriptionCartItems(new ArrayList<>())
                .build();
    }
}
