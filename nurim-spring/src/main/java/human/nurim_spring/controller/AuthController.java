package human.nurim_spring.controller;

import human.nurim_spring.dto.LoginReqDto;
import human.nurim_spring.dto.LoginResDto;
import human.nurim_spring.dto.SignUpReqDto;
import human.nurim_spring.service.AuthService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@Slf4j
@RestController
@CrossOrigin(origins = "http://localhost:3000")
@RequestMapping("/api/auth")
@RequiredArgsConstructor
public class AuthController {
    private final AuthService authService;

    // 로그인
    @PostMapping("/login")
    public ResponseEntity<LoginResDto> login(@RequestBody LoginReqDto dto) {
        return ResponseEntity.ok(authService.login(dto));
    }

    // 회원가입
    @PostMapping("/join")
    public ResponseEntity<Void> signup(@RequestBody SignUpReqDto dto) {
        authService.signUp(dto);
        return ResponseEntity.status(HttpStatus.CREATED).build();
    }

    // 아이디 중복 확인
    @GetMapping("/check-id/{id}")
    public ResponseEntity<Boolean> checkId(@PathVariable String id) {
        boolean isTrue = authService.existsById(id);
        return ResponseEntity.ok(!isTrue);
    }

    // 이메일 중복 확인
    @GetMapping("/check-id/{email}")
    public ResponseEntity<Boolean> checkEmail(@PathVariable String email) {
        boolean isTrue = authService.existsByEmail(email);
        return ResponseEntity.ok(!isTrue);
    }
}