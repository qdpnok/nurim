package human.nurim_spring.service;

import human.nurim_spring.dto.*;
import human.nurim_spring.entity.Member;
import human.nurim_spring.error.BusinessException;
import human.nurim_spring.jwt.TokenProvider;
import human.nurim_spring.repository.MemberRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.data.redis.core.StringRedisTemplate;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.config.annotation.authentication.builders.AuthenticationManagerBuilder;
import org.springframework.security.core.Authentication;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.concurrent.TimeUnit;

@Slf4j
@Service
@RequiredArgsConstructor
public class AuthService {
    private final MemberRepository memberRepository;
    private final PasswordEncoder passwordEncoder;
    private final MailService mailService;
    private final AuthenticationManagerBuilder managerBuilder;
    private final TokenProvider tokenProvider;
    private final StringRedisTemplate redisTemplate;

    // --- [NEW] 인증번호 생성 편의 메서드 ---
    private String createNumber() {
        return String.valueOf((int)(Math.random() * 90000) + 100000);
    }

    // --- [NEW] 인증번호 공통 검증 메서드 ---
    private boolean verifyCode(String email, String inputCode) {
        String storedCode = redisTemplate.opsForValue().get(email);
        return storedCode != null && storedCode.equals(inputCode);
    }

    // 이메일 중복 확인
    public boolean existsByEmail(String email) {
        return memberRepository.existsByEmail(email);
    }

    // 아이디 중복 확인
    public boolean existsById(String id) {
        return memberRepository.existsById(id);
    }

    // 회원 가입
    public void signUp(SignUpReqDto dto) {
        if (memberRepository.existsByEmail(dto.getEmail())) {
            throw new BusinessException("DUPLICATE_EMAIL", "이미 사용 중인 이메일입니다.");
        }
        if (memberRepository.existsById(dto.getId())) {
            throw new BusinessException("DUPLICATE_ID", "이미 사용 중인 아이디입니다.");
        }
        Member member = convertSignUpReqToMember(dto);
        memberRepository.save(member);
    }

    // 로그인
    public TokenDto login(LoginReqDto dto) {
        UsernamePasswordAuthenticationToken authenticationToken = dto.toAuthentication();
        Authentication authentication = managerBuilder.getObject().authenticate(authenticationToken);
        return tokenProvider.generateTokenDto(authentication);
    }

    // [수정] 이메일 인증번호 전송: 회원 가입
    public void send(String email) {
        if(memberRepository.existsByEmail(email)) {
            throw new BusinessException("DUPLICATE_EMAIL", "이미 사용 중인 이메일입니다.");
        }
        sendVerificationCodeInternal(email);
    }

    // [수정] 이메일 인증번호 검증: 회원 가입
    public void valid(String email, String code) {
        if (!verifyCode(email, code)) {
            throw new BusinessException("CODE_MISMATCH", "인증 코드가 일치하지 않거나 만료되었습니다.");
        }
        redisTemplate.delete(email);
    }

    // [수정] 이메일 인증번호 전송: 아이디 찾기
    public void findIdSend(String email) {
        if(!memberRepository.existsByEmail(email)){
            throw new BusinessException("NOT_EXIST_MEMBER", "해당 회원이 존재하지 않습니다.");
        }
        sendVerificationCodeInternal(email);
    }

    // [수정] 이메일 인증번호 검증: 아이디 찾기
    public String findIdValid(String email, String code) {
        if (!verifyCode(email, code)) {
            throw new BusinessException("CODE_MISMATCH", "인증 코드가 일치하지 않거나 만료되었습니다.");
        }

        Member member = memberRepository.findByEmail(email)
                .orElseThrow(() -> new BusinessException("NOT_EXIST_MEMBER", "해당 회원이 존재하지 않습니다."));

        redisTemplate.delete(email); // 인증 완료 후 삭제
        return member.getId();
    }

    // [기존] 이메일 인증번호 전송: 비밀번호 재설정 (이메일만 체크)
    public void resetPwdSend(String email) {
        if(!memberRepository.existsByEmail(email)){
            throw new BusinessException("NOT_EXIST_MEMBER", "회원 정보가 일치하지 않습니다.");
        }
        sendVerificationCodeInternal(email);
    }

    // [추가] 이메일 인증번호 전송: 비밀번호 재설정 (아이디 + 이메일 체크)
    public void resetPwdSend(String email, String memberId) {
        Member member = memberRepository.findByEmail(email)
                .orElseThrow(() -> new BusinessException("NOT_EXIST_MEMBER", "회원 정보가 일치하지 않습니다."));

        if (!member.getId().equals(memberId)) {
            throw new BusinessException("NOT_EXIST_MEMBER", "아이디와 이메일 정보가 일치하지 않습니다.");
        }

        sendVerificationCodeInternal(email);
    }

    // ★★★ [누락된 부분 추가] 비밀번호 재설정 인증번호 검증 ★★★
    public void resetPwdValid(String email, String code) {
        if (!verifyCode(email, code)) {
            throw new BusinessException("CODE_MISMATCH", "인증 코드가 일치하지 않거나 만료되었습니다.");
        }

        // 인증 성공 시 Redis에 "RESET_AUTH:이메일" 키 저장 (10분간 비밀번호 변경 권한 부여)
        redisTemplate.opsForValue().set("RESET_AUTH:" + email, "TRUE", 10, TimeUnit.MINUTES);
        redisTemplate.delete(email); // 사용한 인증번호는 삭제
    }

    // 비밀번호 재설정 (최종)
    public void resetPwd(String email, String pwd) {
        // RESET_AUTH 토큰 확인
        String isAuth = redisTemplate.opsForValue().get("RESET_AUTH:" + email);
        if (isAuth == null) {
            throw new BusinessException("UNAUTHORIZED_ACCESS", "인증 시간이 만료되었거나 인증되지 않았습니다.");
        }

        Member member = memberRepository.findByEmail(email)
                .orElseThrow(() -> new BusinessException("NOT_EXIST_MEMBER", "해당 회원이 존재하지 않습니다."));

        member.setPwd(passwordEncoder.encode(pwd));
        memberRepository.save(member);

        redisTemplate.delete("RESET_AUTH:" + email); // 재설정 후 권한 삭제
    }

    // [공통 내부 메소드] 인증번호 생성 및 메일 발송
    private void sendVerificationCodeInternal(String email) {
        String number = createNumber();
        redisTemplate.opsForValue().set(email, number, 3, TimeUnit.MINUTES);
        log.info("인증번호 전송: {} -> {}", email, number);
        mailService.sendMail(email, number);
    }

    private Member convertSignUpReqToMember(SignUpReqDto dto) {
        return Member.builder()
                .id(dto.getId())
                .pwd(passwordEncoder.encode(dto.getPwd()))
                .email(dto.getEmail())
                .name(dto.getName())
                .phoneNum(dto.getPhoneNum())
                .build();
    }
}