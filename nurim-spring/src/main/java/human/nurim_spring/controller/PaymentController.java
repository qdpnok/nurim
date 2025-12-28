package human.nurim_spring.controller;

import human.nurim_spring.dto.PaymentReqDto;
import human.nurim_spring.service.PaymentService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@Slf4j
@RestController
@CrossOrigin(origins = "http://localhost:3000")
@RequestMapping("/api/orders")
@RequiredArgsConstructor
public class PaymentController {
    private final PaymentService paymentService;

    @PostMapping
    public ResponseEntity<Void> add(@RequestBody PaymentReqDto dto) {
        paymentService.add(dto);
        return ResponseEntity.status(HttpStatus.CREATED).build();
    }
}
