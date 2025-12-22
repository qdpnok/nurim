package human.nurim_spring.service;

import human.nurim_spring.dto.ReviewResDto;
import human.nurim_spring.entity.Product;
import human.nurim_spring.entity.Reviews;
import human.nurim_spring.repository.ProductRepository;
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

    public List<ReviewResDto> getReviewsByProduct(Long productNum) {
        // 상품 확인
        Product product = productRepository.findById(productNum)
                .orElseThrow(() -> new IllegalArgumentException("존재하지 않는 상품입니다."));

        // 리뷰 목록 가져오기 (Reviews 엔티티 사용함)
        List<Reviews> reviewsList = reviewsRepository.findByProduct(product);

        // DTO로 변환
        List<ReviewResDto> result = new ArrayList<>();
        DateTimeFormatter formatter = DateTimeFormatter.ofPattern("yyyy-MM-dd");

        for (Reviews review : reviewsList) {
            // 날짜가 없으면 오늘 날짜로 표시하게 예외 처리함
            String dateStr = (review.getRegDate() != null)
                    ? review.getRegDate().format(formatter)
                    : "날짜없음";

            ReviewResDto dto = ReviewResDto.builder()
                    .writer(review.getMember().getName()) // 작성자 이름
                    .scope(review.getScope().intValue())  // Long -> int 변환함
                    .content(review.getContent())
                    .date(dateStr)
                    .build();
            result.add(dto);
        }

        return result;
    }
}