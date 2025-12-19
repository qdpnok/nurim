package human.nurim_spring.service;

import jakarta.mail.MessagingException;
import jakarta.mail.internet.MimeMessage;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.scheduling.annotation.Async;
import org.springframework.scheduling.annotation.EnableAsync;
import org.springframework.stereotype.Service;

import java.util.concurrent.CompletableFuture;

@Slf4j
@Service
@RequiredArgsConstructor
@EnableAsync
public class MailService {
    private final JavaMailSender javaMailSender;
    private static final String senderEmail = "nurim1210@gmail.com";
    private static int number;

    // 이메일 인증
    // 랜덤으로 숫자 생성
    public static void createNumber() {number = (int)(Math.random() * 90000) + 100000;}
    // 메일 작성
    public MimeMessage createMail(String email) {
        createNumber();
        MimeMessage message = javaMailSender.createMimeMessage();

        // post-it github 참고해서 html 부분 분리할 수 있음
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

    @Async
    public CompletableFuture<Integer> sendMail(String email) {
        MimeMessage message = createMail(email);
        javaMailSender.send(message);
        return CompletableFuture.completedFuture(1);
    }
}
