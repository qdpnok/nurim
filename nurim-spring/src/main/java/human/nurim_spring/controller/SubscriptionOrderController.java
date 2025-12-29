package human.nurim_spring.controller;

import human.nurim_spring.dto.CreateOrderReqDto;
import human.nurim_spring.dto.CreateOrderResDto;
import human.nurim_spring.dto.SubOrderPageRes;
import human.nurim_spring.service.SubscriptionOrderService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.apache.coyote.Response;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@Slf4j
@RestController
@CrossOrigin(origins = "http://localhost:3000", allowCredentials = "true")
@RequestMapping("/api/subscription-order")
@RequiredArgsConstructor
public class SubscriptionOrderController {
    private final SubscriptionOrderService subscriptionOrderService;

    @GetMapping("/{memberNum}/{type}")
    public ResponseEntity<SubOrderPageRes> orderPage(@PathVariable Long memberNum, @PathVariable String type,
                                                     @RequestParam(required = false) Long month, @RequestParam(required = false) Long productId,
                                                     @RequestParam(required = false)List<Long> cartItemIds) {
        if(type.equals("product")) return ResponseEntity.ok(subscriptionOrderService.directOrderPage(memberNum, productId, month));
        else return ResponseEntity.ok(subscriptionOrderService.cartOrderPage(memberNum, cartItemIds));
    }

    @PostMapping("/add/{memberNum}")
    public ResponseEntity<CreateOrderResDto> add(@PathVariable Long memberNum, @RequestBody CreateOrderReqDto dto) {
        return ResponseEntity.ok(subscriptionOrderService.createOrder(memberNum, dto));
    }
}
