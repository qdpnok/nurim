package human.nurim_spring.service;

import human.nurim_spring.dto.LoginReqDto;
import human.nurim_spring.dto.LoginResDto;
import human.nurim_spring.dto.AuthEmailResDto;
import human.nurim_spring.dto.SignUpReqDto;
import human.nurim_spring.entity.Member;
import human.nurim_spring.error.BusinessException;
import human.nurim_spring.repository.MemberRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;

@Slf4j
@Service
@RequiredArgsConstructor
public class AuthService {
    private final MemberRepository memberRepository;
    private final PasswordEncoder passwordEncoder;
    private final MailService mailService;

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
    public LoginResDto login(LoginReqDto dto) {
        Member member = memberRepository.findById(dto.getId())
                .orElseThrow(() -> new BusinessException("LOGIN_FAIL", "아이디 또는 비밀번호가 올바르지 않습니다."));
        if(!passwordEncoder.matches(dto.getPwd(), member.getPwd()))
            throw new BusinessException("LOGIN_FAIL", "아이디 또는 비밀번호가 올바르지 않습니다.");
        return convertMemberToLoginRes(member);
    }

    // 이메일 인증번호 전송
    public AuthEmailResDto send(String email) {
        if(memberRepository.existsByEmail(email)) {
            throw new BusinessException("DUPLICATE_EMAIL", "이미 사용 중인 이메일입니다.");
        }

        LocalDateTime validTime = LocalDateTime.now().plusMinutes(5);
        int code = mailService.sendMail(email);

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
        int code = mailService.sendMail(email);

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
        int code = mailService.sendMail(email);

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
