package human.nurim_spring.controller;

import human.nurim_spring.dto.SubscriptionCartItemReqDto;
import human.nurim_spring.dto.SubscriptionCartResDto;
import human.nurim_spring.service.SubscriptionCartService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@Slf4j
@RestController
@CrossOrigin(origins = "http://localhost:3000")
@RequestMapping("/api/subscription-cart")
@RequiredArgsConstructor
public class SubscriptionCartController {
    private final SubscriptionCartService subscriptionCartService;

    @PostMapping("/add")
    public ResponseEntity<Void> add(@RequestBody SubscriptionCartItemReqDto dto) {
        subscriptionCartService.saveItem(dto);
        return ResponseEntity.status(HttpStatus.CREATED).build();
    }

    @GetMapping("/{memberNum}")
    public ResponseEntity<SubscriptionCartResDto> find(@PathVariable Long memberNum) {
        return ResponseEntity.ok(subscriptionCartService.getCart(memberNum));
    }

    @DeleteMapping("/item/{cartItemNum}")
    public ResponseEntity<Void> delete(@PathVariable Long cartItemNum) {
        subscriptionCartService.deleteItem(cartItemNum);
        return ResponseEntity.noContent().build();
    }

}
