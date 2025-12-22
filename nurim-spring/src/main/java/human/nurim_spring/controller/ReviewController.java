package human.nurim_spring.controller;

import human.nurim_spring.dto.ReviewReqDto;
import human.nurim_spring.dto.ReviewResDto;
import human.nurim_spring.service.ReviewService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/review")
@RequiredArgsConstructor
@CrossOrigin(origins = "http://localhost:3000")
public class ReviewController {

    private final ReviewService reviewService;

    // 상품 번호로 리뷰 조회 하기
    @GetMapping("/{productNum}")
    public ResponseEntity<List<ReviewResDto>> getProductReviews(@PathVariable Long productNum) {
        return ResponseEntity.ok(reviewService.getReviewsByProduct(productNum));
    }
    @PostMapping("")
    public ResponseEntity<String> writeReview(@RequestBody ReviewReqDto dto) {
        return ResponseEntity.ok(reviewService.createReview(dto));
    }
}