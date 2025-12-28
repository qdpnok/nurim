package human.nurim_spring.controller;

import human.nurim_spring.dto.CreateOrderReqDto;
import human.nurim_spring.dto.CreateOrderResDto;
import human.nurim_spring.dto.PurchaseOrderPageRes;
import human.nurim_spring.dto.SubOrderPageRes;
import human.nurim_spring.service.PurchaseOrderService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@Slf4j
@RestController
@CrossOrigin(origins = "http://localhost:3000")
@RequestMapping("/api/purchase-order")
@RequiredArgsConstructor
public class PurchaseOrderController {
    private PurchaseOrderService purchaseOrderService;

    @GetMapping("/{memberNum}/{type}")
    public ResponseEntity<PurchaseOrderPageRes> orderPage(@PathVariable Long memberNum, @PathVariable String type,
                                                     @RequestParam(required = false) Long quantity, @RequestParam(required = false) Long productId,
                                                     @RequestParam(required = false) List<Long> cartItemIds) {
        if(type.equals("product")) return ResponseEntity.ok(purchaseOrderService.directOrderPage(memberNum, productId, quantity));
        else return ResponseEntity.ok(purchaseOrderService.cartOrderPage(memberNum, cartItemIds));
    }

    @PostMapping("/add/{memberNum}")
    public ResponseEntity<CreateOrderResDto> add(@PathVariable Long memberNum, @RequestBody CreateOrderReqDto dto) {
        return ResponseEntity.ok(purchaseOrderService.createOrder(memberNum, dto));
    }
}
