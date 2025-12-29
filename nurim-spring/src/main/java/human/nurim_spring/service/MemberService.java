package human.nurim_spring.service;

import human.nurim_spring.dto.*;
import human.nurim_spring.entity.*;
import human.nurim_spring.error.BusinessException;
import human.nurim_spring.repository.*;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDateTime;
import java.util.List;
import java.util.stream.Collectors;

@Slf4j
@Service
@RequiredArgsConstructor
@Transactional
public class MemberService {
    private final PurchaseRepository purchaseRepository;
    private final SubscriptionRepository subscriptionRepository;
    private final MemberRepository memberRepository;
    private final PasswordEncoder passwordEncoder;
    private final AcquisitionRepository acquisitionRepository;
    private final ProductRepository productRepository;

    // [수정] ReturnRepository -> ReturnsRepository로 변경
    private final ReturnRepository returnsRepository;

    // 마이페이지 메인 렌더링
    @Transactional(readOnly = true)
    public MyPageResDto mainPage(Long memberNum) {
        Member member = memberRepository.findById(memberNum)
                .orElseThrow(() -> new BusinessException("NOT_EXIST_MEMBER", "해당 회원이 존재하지 않습니다."));

        Long purchaseCount = purchaseRepository.countByMember(member);
        Long subscriptionCount = subscriptionRepository.countByMember(member);

        return new MyPageResDto(member.getName(), subscriptionCount, purchaseCount);
    }

    // 회원 정보 조회
    @Transactional(readOnly = true)
    public MyInfoResDto myInfo(Long memberNum) {
        Member member = memberRepository.findById(memberNum)
                .orElseThrow(() -> new BusinessException("NOT_EXIST_MEMBER", "해당 회원이 존재하지 않습니다."));

        return new MyInfoResDto(member.getId(), member.getEmail(), member.getName(), member.getPhoneNum());
    }

    // 비밀번호 변경
    public void changePwd(Long memberNum, String pwd) {
        Member member = memberRepository.findById(memberNum)
                .orElseThrow(() -> new BusinessException("NOT_EXIST_MEMBER", "해당 회원이 존재하지 않습니다."));

        member.setPwd(passwordEncoder.encode(pwd));
        memberRepository.save(member);
    }

    // 회원 정보 변경
    public MyInfoResDto changeInfo(Long memberNum, ChangeInfoReqDto dto) {
        Member member = memberRepository.findById(memberNum)
                .orElseThrow(() -> new BusinessException("NOT_EXIST_MEMBER", "해당 회원이 존재하지 않습니다."));

        if(memberRepository.existsByPhoneNumAndNumNot(dto.getPhone(), memberNum))
            throw new BusinessException("DUPLICATE_PHONE", "이미 사용 중인 번호입니다.");

        member.setName(dto.getName());
        member.setPhoneNum(dto.getPhone());
        memberRepository.save(member);

        return new MyInfoResDto(member.getId(), member.getEmail(), member.getName(), member.getPhoneNum());
    }

    // 제품 관리 렌더링 (인수/반납 개수)
    @Transactional(readOnly = true)
    public ProductManageResDto myProduct(Long memberNum) {
        Member member = memberRepository.findById(memberNum)
                .orElseThrow(() -> new BusinessException("NOT_EXIST_MEMBER", "해당 회원이 존재하지 않습니다."));

        long acquisitionCount = acquisitionRepository.countByMember(member);
        // [수정] returnsRepository 사용
        long returnCount = returnsRepository.countByMember(member);

        return new ProductManageResDto(acquisitionCount, returnCount);
    }

    // 구독 내역 조회
    @Transactional(readOnly = true)
    public List<ProductListDto> getSubscriptions(Long memberNum) {
        Member member = memberRepository.findById(memberNum)
                .orElseThrow(() -> new BusinessException("NOT_EXIST_MEMBER", "회원이 존재하지 않습니다."));

        List<Subscription> list = subscriptionRepository.findByMember(member);

        return list.stream().map(sub -> {
            Product product = sub.getProduct();
            String categoryName = (product.getSubCategory() != null) ? product.getSubCategory().getName() : "기타";

            return ProductListDto.builder()
                    .pNum(product.getNum())
                    .sNum(sub.getNum())
                    .name(product.getName())
                    .img(product.getImg())
                    .brand(product.getBrand())
                    .spec(product.getSpec())
                    .category(categoryName)
                    .sPrice(product.getPrice36())
                    .price_36(product.getPrice36())
                    .build();
        }).collect(Collectors.toList());
    }

    // 구매 내역 조회
    @Transactional(readOnly = true)
    public List<ProductListDto> getOrders(Long memberNum) {
        Member member = memberRepository.findById(memberNum)
                .orElseThrow(() -> new BusinessException("NOT_EXIST_MEMBER", "회원이 존재하지 않습니다."));

        List<Purchase> list = purchaseRepository.findByMember(member);

        return list.stream().map(order -> {
            Product product = order.getProduct();
            String categoryName = (product.getSubCategory() != null) ? product.getSubCategory().getName() : "기타";

            return ProductListDto.builder()
                    .pNum(product.getNum())
                    .name(product.getName())
                    .img(product.getImg())
                    .brand(product.getBrand())
                    .spec(product.getSpec())
                    .category(categoryName)
                    .pPrice(product.getPrice())
                    .build();
        }).collect(Collectors.toList());
    }

    // 인수 신청
    public void applyAcquisition(ApplicationReqDto dto) {
        Member member = memberRepository.findById(dto.getMemberNum())
                .orElseThrow(() -> new BusinessException("NOT_EXIST_MEMBER", "회원 없음"));

        Product product = productRepository.findById(dto.getProductNum())
                .orElseThrow(() -> new BusinessException("NOT_EXIST_PRODUCT", "제품 없음"));

        Acquisition acquisition = Acquisition.builder()
                .member(member)
                .product(product)
                .acquisition_data(LocalDateTime.now())
                .build();

        acquisitionRepository.save(acquisition);
    }

    // [수정] 반납 신청 (Returns 엔티티 사용)
    public void applyReturn(ApplicationReqDto dto) {
        Member member = memberRepository.findById(dto.getMemberNum())
                .orElseThrow(() -> new BusinessException("NOT_EXIST_MEMBER", "회원 없음"));

        Product product = productRepository.findById(dto.getProductNum())
                .orElseThrow(() -> new BusinessException("NOT_EXIST_PRODUCT", "제품 없음"));

        // Returns 엔티티 빌더 사용
        Returns returnReq = Returns.builder()
                .member(member)
                .product(product)
                .return_data(LocalDateTime.now()) // 엔티티의 return_data 필드
                .quantity(1L) // 기본 수량 1 설정 (필요시 수정)
                .build();

        returnsRepository.save(returnReq);
    }
}