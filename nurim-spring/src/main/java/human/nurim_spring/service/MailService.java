// MailService.java
package human.nurim_spring.service;

import jakarta.mail.MessagingException;
import jakarta.mail.internet.MimeMessage;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.scheduling.annotation.Async;
import org.springframework.stereotype.Service;

@Slf4j
@Service
@RequiredArgsConstructor
public class MailService {

    private final JavaMailSender javaMailSender;
    private static final String senderEmail = "nurim1210@gmail.com";

    // 메일 생성 (기존과 동일)
    public MimeMessage createMail(String email, String number) {
        MimeMessage message = javaMailSender.createMimeMessage();
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

    // ★ 변경점 1: @Async 어노테이션 추가 (비동기 처리)
    // ★ 변경점 2: Redis 저장 로직 제거 (AuthService로 이동)
    // ★ 변경점 3: 인증번호를 매개변수로 받음
    @Async
    public void sendMail(String email, String number) {
        MimeMessage message = createMail(email, number);
        try {
            javaMailSender.send(message); // 시간이 오래 걸리는 작업
            log.info("이메일 전송 성공: {}", email);
        } catch (Exception e) {
            log.error("이메일 전송 실패: ", e);
        }
    }
}