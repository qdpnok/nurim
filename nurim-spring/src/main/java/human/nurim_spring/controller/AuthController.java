package human.nurim_spring.controller;

import human.nurim_spring.dto.LoginReqDto;
import human.nurim_spring.dto.LoginResDto;
import human.nurim_spring.dto.SignUpEmailResDto;
import human.nurim_spring.dto.SignUpReqDto;
import human.nurim_spring.service.AuthService;
import jakarta.servlet.http.HttpSession;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDateTime;

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
    @GetMapping("/check-id")
    public ResponseEntity<Boolean> checkId(@RequestParam String memberId) {
        return ResponseEntity.ok(!authService.existsById(memberId));
    }

    // 이메일 중복 확인
    @GetMapping("/check-email")
    public ResponseEntity<Boolean> checkEmail(@RequestParam String email) {
        return ResponseEntity.ok(!authService.existsByEmail(email));
    }

    // 인증 메일 전송
    @PostMapping("/send-email")
    public ResponseEntity<Void> send(@RequestParam String email, HttpSession session) {
        SignUpEmailResDto dto = authService.send(email);

        session.setAttribute("SIGNUP_EMAIL_CODE", dto.getCode());
        session.setAttribute("SIGNUP_EMAIL_EXPIRE", dto.getValidTime());

        return ResponseEntity.ok().build();
    }

    // 인증 메일 체크
    @PostMapping("/valid-email")
    public ResponseEntity<Void> validEmail(@RequestParam int code, HttpSession session){
        int sessionCode = (int) session.getAttribute("SIGNUP_EMAIL_CODE");
        LocalDateTime validTime = (LocalDateTime) session.getAttribute("SIGNUP_EMAIL_EXPIRE") ;
        authService.valid(code, sessionCode, validTime);
        return ResponseEntity.status(HttpStatus.OK).build();
    }
}