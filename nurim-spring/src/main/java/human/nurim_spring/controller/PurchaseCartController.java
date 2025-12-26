package human.nurim_spring.controller;

import human.nurim_spring.dto.PurchaseCartItemReqDto;
import human.nurim_spring.dto.PurchaseCartResDto;
import human.nurim_spring.service.PurchaseCartService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Map;

@Slf4j
@RestController
@CrossOrigin(origins = "http://localhost:3000")
@RequestMapping("/api/purchase-cart")
@RequiredArgsConstructor
public class PurchaseCartController {
    private final PurchaseCartService purchaseCartService;

    @PostMapping("/add")
    public ResponseEntity<Void> add(@RequestBody PurchaseCartItemReqDto dto) {
        purchaseCartService.saveItem(dto);
        return ResponseEntity.status(HttpStatus.CREATED).build();
    }

    @GetMapping("/{memberNum}")
    public ResponseEntity<PurchaseCartResDto> find(@PathVariable Long memberNum) {
        return ResponseEntity.ok(purchaseCartService.getCart(memberNum));
    }

    @PatchMapping("/item/{cartItemNum}")
    public ResponseEntity<Void> updateQty(@PathVariable Long cartItemNum, @RequestBody Map<String, Long> body) {
        Long quantity = body.get("quantity");

        purchaseCartService.updateQty(cartItemNum, quantity);
        return ResponseEntity.status(HttpStatus.CREATED).build();
    }

    @DeleteMapping("/item/{cartItemNum}")
    public ResponseEntity<Void> delete(@PathVariable Long cartItemNum) {
        purchaseCartService.deleteItem(cartItemNum);
        return ResponseEntity.noContent().build();
    }
}
