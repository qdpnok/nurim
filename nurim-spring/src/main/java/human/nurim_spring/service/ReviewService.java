package human.nurim_spring.service;

import human.nurim_spring.dto.ReviewReqDto;
import human.nurim_spring.dto.ReviewResDto;
import human.nurim_spring.entity.Member;
import human.nurim_spring.entity.Product;
import human.nurim_spring.entity.Purchase;
import human.nurim_spring.entity.Reviews;
import human.nurim_spring.repository.MemberRepository;
import human.nurim_spring.repository.ProductRepository;
import human.nurim_spring.repository.PurchaseRepository;
import human.nurim_spring.repository.ReviewsRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.format.DateTimeFormatter;
import java.util.ArrayList;
import java.util.List;

@Service
@RequiredArgsConstructor
@Transactional(readOnly = true)
public class ReviewService {

    private final ReviewsRepository reviewsRepository;
    private final ProductRepository productRepository;
    private final MemberRepository memberRepository;
    private final PurchaseRepository purchaseRepository;

    // 상품별 리뷰 조회
    public List<ReviewResDto> getReviewsByProduct(Long productNum) {
        Product product = productRepository.findById(productNum)
                .orElseThrow(() -> new IllegalArgumentException("존재하지 않는 상품입니다."));

        List<Reviews> reviewsList = reviewsRepository.findByProduct(product);
        List<ReviewResDto> result = new ArrayList<>();
        DateTimeFormatter formatter = DateTimeFormatter.ofPattern("yyyy-MM-dd");

        for (Reviews review : reviewsList) {
            String dateStr = (review.getRegDate() != null)
                    ? review.getRegDate().format(formatter)
                    : "날짜없음";

            ReviewResDto dto = ReviewResDto.builder()
                    .writer(review.getMember().getName())
                    .scope(review.getScope().intValue())
                    .content(review.getContent())
                    .date(dateStr)
                    .build();
            result.add(dto);
        }
        return result;
    }

    // 리뷰 작성하기
    @Transactional // 쓰기 모드 활성화 (저장해야 하니까!)
    public String createReview(ReviewReqDto dto) {
        // 회원 확인
        Member member = memberRepository.findById(dto.getMemberNum())
                .orElseThrow(() -> new IllegalArgumentException("존재하지 않는 회원입니다."));

        // 상품 확인
        Product product = productRepository.findById(dto.getProductNum())
                .orElseThrow(() -> new IllegalArgumentException("존재하지 않는 상품입니다."));

        // 구매 내역 확인 (이 사람이 이 물건을 샀는지?)
        Purchase purchase = purchaseRepository.findTopByMemberAndProductOrderByNumDesc(member, product)
                .orElseThrow(() -> new IllegalArgumentException("구매 내역이 없습니다. 구매 후 리뷰를 작성해주세요."));

        // 리뷰 만들기
        Reviews review = Reviews.builder()
                .member(member)
                .product(product)
                .purchase(purchase)  // 구매 내역 연결
                .scope((long) dto.getScope())  // 별점
                .content(dto.getContent())  // 내용
                .title(member.getName() + "님의 후기")  // 제목은 임시로 자동 생성
                .isRelease(true)  // 공개 여부
                .img(null)  // 일단 비워두기
                .build();

        // 저장
        reviewsRepository.save(review);

        return "작성 완료";
    }
}