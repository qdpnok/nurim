package human.nurim_spring.service;

import human.nurim_spring.dto.*;
import human.nurim_spring.entity.Member;
import human.nurim_spring.error.BusinessException;
import human.nurim_spring.jwt.TokenProvider;
import human.nurim_spring.repository.MemberRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.config.annotation.authentication.builders.AuthenticationManagerBuilder;
import org.springframework.security.core.Authentication;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.concurrent.CompletableFuture;

@Slf4j
@Service
@RequiredArgsConstructor
public class AuthService {
    private final MemberRepository memberRepository;
    private final PasswordEncoder passwordEncoder;
    private final MailService mailService;
    private final AuthenticationManagerBuilder managerBuilder;
    private final TokenProvider tokenProvider;

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
        // 회원 가입 시에
        if (memberRepository.existsByEmail(dto.getEmail())) {
            throw new BusinessException("DUPLICATE_EMAIL", "이미 사용 중인 이메일입니다.");
        }
        if (memberRepository.existsById(dto.getId())) {
            throw new BusinessException("DUPLICATE_ID", "이미 사용 중인 아이디입니다.");
        }
        if (memberRepository.existsByPhoneNum(dto.getPhoneNum())) {
            throw new BusinessException("DUPLICATE_PHONE", "이미 등록된 연락처입니다.");
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

    // 이메일 인증번호 전송
    public AuthEmailResDto send(String email) {
        if(memberRepository.existsByEmail(email)) {
            throw new BusinessException("DUPLICATE_EMAIL", "이미 사용 중인 이메일입니다.");
        }

        LocalDateTime validTime = LocalDateTime.now().plusMinutes(5);
        CompletableFuture<Integer> code = mailService.sendMail(email);

        return new AuthEmailResDto(email, code, validTime);
    }

    // 이메일 인증번호 검증
    public void valid(int code, int sessionCode, LocalDateTime validTime) {
        if(code != sessionCode) throw new BusinessException("CODE_MISMATCH", "인증 코드가 일치하지 않습니다.");
        if(validTime.isBefore(LocalDateTime.now())) throw new BusinessException("CODE_TIMEOUT", "코드 유효 시간이 경과하였습니다.");
    }

    // 이메일 인증번호 전송: 아이디 찾기
    public AuthEmailResDto findIdSend(String email) {
        LocalDateTime validTime = LocalDateTime.now().plusMinutes(5);
        CompletableFuture<Integer> code = mailService.sendMail(email);

        return new AuthEmailResDto(email, code, validTime);
    }

    // 이메일 인증번호 검증: 아이디 찾기
    public String findIdValid(String email, int code, int sessionCode, LocalDateTime validTime) {
        if(code != sessionCode) throw new BusinessException("CODE_MISMATCH", "인증 코드가 일치하지 않습니다.");
        if(validTime.isBefore(LocalDateTime.now())) throw new BusinessException("CODE_TIMEOUT", "코드 유효 시간이 경과하였습니다.");
        Member member = memberRepository.findByEmail(email)
                .orElseThrow(() -> new BusinessException("NOT_EXIST_MEMBER", "해당 회원이 존재하지 않습니다."));

        return member.getId();
    }

    // 이메일 인증번호 전송: 비밀번호 재설정
    public AuthEmailResDto resetPwdSend(String email) {
        LocalDateTime validTime = LocalDateTime.now().plusMinutes(5);
        CompletableFuture<Integer> code = mailService.sendMail(email);

        return new AuthEmailResDto(email, code, validTime);
    }

    // 비밀번호 재설정
    public void resetPwd(String email, String pwd) {
        log.info(email);
        Member member = memberRepository.findByEmail(email)
                .orElseThrow(() -> new BusinessException("NOT_EXIST_MEMBER", "해당 회원이 존재하지 않습니다."));
        member.setPwd(passwordEncoder.encode(pwd));
        memberRepository.save(member);
    }

    // SignUpReq -> Member
    private Member convertSignUpReqToMember(SignUpReqDto dto) {
        return Member.builder()
                .id(dto.getId())
                .pwd(passwordEncoder.encode(dto.getPwd()))
                .email(dto.getEmail())
                .name(dto.getName())
                .phoneNum(dto.getPhoneNum())
                .build();
    }

    // Member -> LoginRes
    private LoginResDto convertMemberToLoginRes(Member member) {
        return LoginResDto.builder()
                .num(member.getNum())
                .name(member.getName())
                .build();
    }
}
