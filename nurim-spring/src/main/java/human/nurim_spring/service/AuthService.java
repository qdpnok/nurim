package human.nurim_spring.service;

import human.nurim_spring.dto.LoginReqDto;
import human.nurim_spring.dto.LoginResDto;
import human.nurim_spring.dto.SignUpReqDto;
import human.nurim_spring.entity.Member;
import human.nurim_spring.error.BusinessException;
import human.nurim_spring.repository.MemberRepository;
import jakarta.mail.MessagingException;
import jakarta.mail.internet.MimeMessage;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.security.core.parameters.P;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

@Slf4j
@Service
@RequiredArgsConstructor
public class AuthService {
    private final MemberRepository memberRepository;
    private final PasswordEncoder passwordEncoder;

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
        if(memberRepository.existsByPhoneNum(dto.getPhoneNum())) {
            throw new BusinessException("DUPLICATE_PHONE", "이미 사용 중인 휴대폰 번호입니다.");
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
