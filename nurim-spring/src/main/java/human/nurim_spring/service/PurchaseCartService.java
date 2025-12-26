package human.nurim_spring.service;

import human.nurim_spring.dto.PurchaseCartDto;
import human.nurim_spring.dto.PurchaseCartItemReqDto;
import human.nurim_spring.dto.PurchaseCartResDto;
import human.nurim_spring.entity.Member;
import human.nurim_spring.entity.Product;
import human.nurim_spring.entity.PurchaseCart;
import human.nurim_spring.entity.PurchaseCartItem;
import human.nurim_spring.error.BusinessException;
import human.nurim_spring.repository.MemberRepository;
import human.nurim_spring.repository.ProductRepository;
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
    private final ProductRepository productRepository;

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

    // 장바구니에 아이템 삽입
    @Transactional
    public void saveItem(PurchaseCartItemReqDto dto) {
        log.info("memberNum = {}", dto.getMemberNum());
        log.info("productNum = {}", dto.getProductNum());

        Member member = memberRepository.findById(dto.getMemberNum())
                .orElseThrow(() -> new BusinessException("NOT_EXIST_MEMBER", "해당 회원이 존재하지 않습니다."));

        // 장바구니 없으면 생성하기
        PurchaseCart purchaseCart = purchaseCartRepository.findByMember(member);
        if(purchaseCart == null) {
            purchaseCart = purchaseCartRepository.save(buildCart(member));
        }

        Product product = productRepository.findById(dto.getProductNum())
                .orElseThrow(() -> new BusinessException("NOT_EXIST_PRODUCT", "해당 상품을 찾지 못했습니다."));

        purchaseCartItemRepository.save(buildCartItem(purchaseCart, product, dto.getQuantity(), product.getPrice()));
    }

    // 장바구니 수량 수정
    @Transactional
    public void updateQty(Long cartItemNum, Long quantity) {
        PurchaseCartItem purchaseCartItem = purchaseCartItemRepository.findById(cartItemNum)
                .orElseThrow(() -> new BusinessException("NOT_EXIST_ITEM", "장바구니 안에 해당 상품이 존재하지 않습니다."));

        // 수량이 0 초과면 수정, 이하면 삭제
        if(quantity > 0) {
            purchaseCartItem.setQuantity(quantity);
            purchaseCartItemRepository.save(purchaseCartItem);
        } else {
            deleteItem(cartItemNum);
        }
    }

    // 장바구니 상품 삭제
    public void deleteItem(Long cartItemNum) {
        PurchaseCartItem purchaseCartItem = purchaseCartItemRepository.findById(cartItemNum)
                .orElseThrow(() -> new BusinessException("NOT_EXIST_ITEM", "장바구니 안에 해당 상품이 존재하지 않습니다."));

        purchaseCartItemRepository.delete(purchaseCartItem);

        PurchaseCart cart = purchaseCartRepository.findById(purchaseCartItem.getPurchaseCart().getNum())
                .orElseThrow(() -> new BusinessException("NOT_EXIST_CART", "장바구니가 존재하지 않습니다."));

        // 장바구니 안에 아이템이 없다면 장바구니 삭제
        if(cart.getPurchaseCartItems().isEmpty()) purchaseCartRepository.delete(cart);
    }


    private PurchaseCartDto buildCartDto(PurchaseCartItem purchaseCartItem) {
        return PurchaseCartDto.builder()
                .cartItemNum(purchaseCartItem.getNum())
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
                // 리스트 삽입할 때 빈 값이면 null, ArrayList를 생성해서 삽입하면 isEmpty 쓸 수 있음
                .purchaseCartItems(new ArrayList<>())
                .build();
    }

    private PurchaseCartItem buildCartItem(PurchaseCart purchaseCart, Product product, Long quantity, Long price) {
        return PurchaseCartItem.builder()
                .purchaseCart(purchaseCart)
                .product(product)
                .quantity(quantity)
                .price(price)
                .build();
    }
}
