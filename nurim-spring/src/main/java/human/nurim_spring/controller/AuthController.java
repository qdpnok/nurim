package human.nurim_spring.controller;

import human.nurim_spring.dto.*;
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
    public ResponseEntity<TokenDto> login(@RequestBody LoginReqDto dto) {
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

    // [변경] 인증 메일 전송: 회원 가입 (Session 사용 X)
    @PostMapping("/signup-send-email")
    public ResponseEntity<Void> send(@RequestParam String email) {
        authService.send(email);
        return ResponseEntity.ok().build();
    }

    // [변경] 인증 메일 체크: 회원 가입
    // ★중요: 세션이 없으므로 클라이언트가 email을 같이 보내줘야 합니다.
    @PostMapping("/signup-valid-email")
    public ResponseEntity<Void> validEmail(@RequestParam String email, @RequestParam String code) {
        authService.valid(email, code);
        return ResponseEntity.ok().build();
    }

    // [변경] 인증 메일 전송: 아이디 찾기
    @PostMapping("/findId-send-email")
    public ResponseEntity<Void> findIdSend(@RequestParam String email) {
        authService.findIdSend(email);
        return ResponseEntity.ok().build();
    }

    // [변경] 인증 메일 체크: 아이디 찾기 (아이디 반환)
    @PostMapping("/findId-valid-email")
    public ResponseEntity<String> findIdValidEmail(@RequestParam String email, @RequestParam String code) {
        return ResponseEntity.ok(authService.findIdValid(email, code));
    }

    // [변경] 인증 메일 전송: 비밀번호 재설정
    @PostMapping("/resetPwd-send-email")
    public ResponseEntity<Void> resetPwdSend(
            @RequestParam String email,
            @RequestParam(required = false) String memberId // 아이디 추가 (선택적)
    ) {
        if (memberId != null && !memberId.isEmpty()) {
            // 아이디와 이메일이 일치하는지 확인하는 로직 수행
            authService.resetPwdSend(email, memberId);
        } else {
            // 기존 로직 (이메일만 확인)
            authService.resetPwdSend(email);
        }
        return ResponseEntity.ok().build();
    }

    // [변경] 인증 메일 체크: 비밀번호 재설정
    // 인증 성공 시 Redis에 재설정 권한 토큰이 생성됨
    @PostMapping("/resetPwd-valid-email")
    public ResponseEntity<Void> resetPwdValidEmail(@RequestParam String email, @RequestParam String code) {
        authService.resetPwdValid(email, code);
        return ResponseEntity.ok().build();
    }

    // [변경] 비밀번호 재설정
    // DTO에 email 필드가 포함되어 있어야 합니다.
    @PostMapping("/resetPwd")
    public ResponseEntity<Void> resetPwd(@RequestBody PwdDto pwd) {
        // PwdDto에 email, pwd가 있어야 함
        authService.resetPwd(pwd.getEmail(), pwd.getPwd());
        return ResponseEntity.ok().build();
    }
}