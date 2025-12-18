package human.nurim_spring.controller;

import human.nurim_spring.dto.*;
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

    // 인증 메일 전송: 회원 가입
    @PostMapping("/signup-send-email")
    public ResponseEntity<Void> send(@RequestParam String email, HttpSession session) {
        AuthEmailResDto dto = authService.send(email);

        session.setAttribute("SIGNUP_EMAIL_CODE", dto.getCode());
        session.setAttribute("SIGNUP_EMAIL_EXPIRE", dto.getValidTime());

        return ResponseEntity.ok().build();
    }

    // 인증 메일 체크: 회원 가입
    @PostMapping("/signup-valid-email")
    public ResponseEntity<Void> validEmail(@RequestParam int code, HttpSession session){
        int sessionCode = (int) session.getAttribute("SIGNUP_EMAIL_CODE");
        LocalDateTime validTime = (LocalDateTime) session.getAttribute("SIGNUP_EMAIL_EXPIRE") ;
        authService.valid(code, sessionCode, validTime);
        return ResponseEntity.ok().build();
    }

    // 인증 메일 전송: 아이디 찾기
    @PostMapping("/findId-send-email")
    public ResponseEntity<Void> findIdSend(@RequestParam String email, HttpSession session) {
        AuthEmailResDto dto = authService.findIdSend(email);

        session.setAttribute("FIND_ID_EMAIL", dto.getEmail());
        session.setAttribute("FIND_ID_EMAIL_CODE", dto.getCode());
        session.setAttribute("FIND_ID_EMAIL_EXPIRE", dto.getValidTime());

        return ResponseEntity.ok().build();
    }

    // 인증 메일 체크: 아이디 찾기
    @PostMapping("/findId-valid-email")
    public ResponseEntity<String> findIdValidEmail(@RequestParam int code, HttpSession session){
        String email = (String) session.getAttribute("FIND_ID_EMAIL");
        int sessionCode = (int) session.getAttribute("FIND_ID_EMAIL_CODE");
        LocalDateTime validTime = (LocalDateTime) session.getAttribute("FIND_ID_EMAIL_EXPIRE");
        return ResponseEntity.ok(authService.findIdValid(email, code, sessionCode, validTime));
    }

    // 인증 메일 전송: 비밀번호 재설정
    @PostMapping("/resetPwd-send-email")
    public ResponseEntity<Void> resetPwdSend(@RequestParam String email, HttpSession session) {
        AuthEmailResDto dto = authService.resetPwdSend(email);

        session.setAttribute("RESET_PWD_EMAIL", dto.getEmail());
        session.setAttribute("RESET_PWD_CODE", dto.getCode());
        session.setAttribute("RESET_PWD_EXPIRE", dto.getValidTime());

        return ResponseEntity.ok().build();
    }

    // 인증 메일 체크: 비밀번호 재설정
    @PostMapping("/resetPwd-valid-email")
    public ResponseEntity<Void> resetPwdValidEmail(@RequestParam int code, HttpSession session){
        int sessionCode = (int) session.getAttribute("RESET_PWD_CODE");
        LocalDateTime validTime = (LocalDateTime) session.getAttribute("RESET_PWD_EXPIRE");
        authService.valid(code, sessionCode, validTime);
        session.setAttribute("RESET_PWD_AUTH", true);
        return ResponseEntity.ok().build();
    }

    // 비밀번호 재설정
    @PostMapping("/resetPwd")
    public ResponseEntity<Boolean> resetPwd(@RequestBody PwdDto pwd, HttpSession session) {
        if(!(boolean) session.getAttribute("RESET_PWD_AUTH")) {
            throw new RuntimeException("인증되지 않았습니다.");
        }

        String email = (String) session.getAttribute("RESET_PWD_EMAIL");
        log.info("reset_pwd_email : {}", email);
        log.info("new pwd : {}", pwd);
        authService.resetPwd(email, pwd.getPwd());
        return ResponseEntity.ok().build();
    }
}