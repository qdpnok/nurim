package human.nurim_spring.service;

import human.nurim_spring.dto.SignUpReqDto;
import human.nurim_spring.entity.Member;
import human.nurim_spring.repository.MemberRepository;
import jakarta.mail.MessagingException;
import jakarta.mail.internet.MimeMessage;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

@Slf4j
@Service
@RequiredArgsConstructor
public class AuthService {
    private final MemberRepository memberRepository;
    private final JavaMailSender javaMailSender;
    private static final String senderEmail = "nurim1210@gmail.com";
    private static int number;
    private final PasswordEncoder passwordEncoder;

    // 이메일 중복 확인
    public boolean existsByEmail(String email) {
        return memberRepository.existsByEmail(email);
    }

    // 아이디 중복 확인
    public boolean existsById(String id) {
        return memberRepository.existsById(id);
    }

    // 이메일 인증
    // 랜덤으로 숫자 생성
    public static void createNumber() {
        number = (int)(Math.random() * 90000) + 100000;
    }
    // 메일 작성
    public MimeMessage createMail(String email) {
        createNumber();
        MimeMessage message = javaMailSender.createMimeMessage();

        // post-it github 참고
        // mailService, verifyCode
        try {
            message.setFrom(senderEmail);
            message.setRecipients(MimeMessage.RecipientType.TO, email);
            message.setSubject("이메일 인증");
            String body = "";
            body += "<h3>" + "요청하신 인증 번호입니다." + "</h3>";
            body += "<h1>" + number + "</h1>";
            body += "<h3>" + "감사합니다." + "</h3>";
            message.setText(body, "UTF-8", "html");
        } catch(MessagingException e) {
            log.error("인증 메시지 생성 오류: ", e);
        }
        return message;
    }

    public int sendMail(String email) {
        MimeMessage message = createMail(email);
        javaMailSender.send(message);
        return number;
    }

    // 회원 가입
    public boolean signUp(SignUpReqDto dto) {
        try {
            Member member = convertSignUpReqToMember(dto);
            memberRepository.save(member);
            return true;
        } catch(Exception e) {
            log.error("회원 가입 시 DB 오류 발생 : {}", e.getMessage());
            return false;
        }
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
}
