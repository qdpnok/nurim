package human.nurim_spring.service;

import human.nurim_spring.dto.PurchaseCartDto;
import human.nurim_spring.dto.PurchaseCartResDto;
import human.nurim_spring.entity.Member;
import human.nurim_spring.entity.PurchaseCart;
import human.nurim_spring.entity.PurchaseCartItem;
import human.nurim_spring.error.BusinessException;
import human.nurim_spring.repository.MemberRepository;
import human.nurim_spring.repository.PurchaseCartItemRepository;
import human.nurim_spring.repository.PurchaseCartRepository;
import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;

@Slf4j
@Service
@RequiredArgsConstructor
public class PurchaseCartService {
    private final MemberRepository memberRepository;
    private final PurchaseCartRepository purchaseCartRepository;
    private final PurchaseCartItemRepository purchaseCartItemRepository;

    // 장바구니 조회
    public PurchaseCartResDto getCart(Long memberNum) {
        List<PurchaseCartDto> list = new ArrayList<>();
        // 회원 번호로 회원 조회
        Member member = memberRepository.findById(memberNum)
                .orElseThrow(() -> new BusinessException("NOT_EXIST_MEMBER", "해당 회원이 존재하지 않습니다."));

        // 장바구니 조회, 없으면 빈 장바구니 상태가 감
        PurchaseCart cart = purchaseCartRepository.findByMember(member);
        if(cart == null) return new PurchaseCartResDto(false, null);

        List<PurchaseCartItem> purchaseCartItems = purchaseCartItemRepository.findByPurchaseCart(cart);

        for (PurchaseCartItem purchaseCartItem : purchaseCartItems) {
            list.add(buildCartDto(purchaseCartItem));
        }

        return new PurchaseCartResDto(true, list);
    }

    private PurchaseCartDto buildCartDto(PurchaseCartItem purchaseCartItem) {
        return PurchaseCartDto.builder()
                .itemNum(purchaseCartItem.getNum())
                .productNum(purchaseCartItem.getProduct().getNum())
                .name(purchaseCartItem.getProduct().getName())
                .serialNum(purchaseCartItem.getProduct().getSerialNum())
                .price(purchaseCartItem.getProduct().getPrice())
                .discountRate(purchaseCartItem.getProduct().getDiscountRate())
                .quantity(purchaseCartItem.getQuantity())
                .img(purchaseCartItem.getProduct().getImg())
                .build();
    }

    private PurchaseCart buildCart(Member member) {
        return PurchaseCart.builder()
                .member(member)
                .build();
    }
}
