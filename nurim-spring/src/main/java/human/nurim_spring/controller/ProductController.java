package human.nurim_spring.controller;

import human.nurim_spring.dto.ProductResDto;
import human.nurim_spring.entity.Product;
import human.nurim_spring.service.ProductService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@Slf4j
@RestController
@CrossOrigin(origins = "http://localhost:3000")
@RequestMapping("/api/product")
@RequiredArgsConstructor
public class ProductController {
    private final ProductService productService;

    // 상품 목록 조회:
    // 카테고리 번호가 있으면 해당 제품만, 없으면 전체
    // required = false 파라미터 없어도 된다
    @GetMapping("/list")
    public ResponseEntity<List<ProductResDto>> list(@RequestParam(required = false) Long id) {
        return ResponseEntity.ok(productService.getList(id));
    }

    // 상품 상세 조회
    @GetMapping("/detail/{num}")
    public ResponseEntity<ProductResDto> get(@PathVariable Long num) {
        return ResponseEntity.ok(productService.get(num));
    }

    // 검색 API
    // http://localhost:8080/api/product/search?keyword=삼성
    @GetMapping("/search")
    public ResponseEntity<List<ProductResDto>> search(@RequestParam(value = "keyword") String keyword) {
        return ResponseEntity.ok(productService.searchProducts(keyword));
    }
}
