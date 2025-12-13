package human.nurim_spring.error;

import human.nurim_spring.dto.ErrorResDto;
import jakarta.persistence.EntityNotFoundException;
import lombok.extern.slf4j.Slf4j;
import org.hibernate.boot.model.naming.IllegalIdentifierException;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.ControllerAdvice;
import org.springframework.web.bind.annotation.ExceptionHandler;

import java.time.LocalDateTime;
import java.util.Map;

@Slf4j
@ControllerAdvice
public class GlobalExceptionHandler {
    // 처리되지 않은 모든 예외
    @ExceptionHandler(Exception.class)
    public ResponseEntity<ErrorResDto> handleException(Exception e) {
        log.error("서버 내부 예외 발생", e);
        return ResponseEntity
                .status(HttpStatus.INTERNAL_SERVER_ERROR)
                .body(new ErrorResDto("INTERNAL_ERROR", "서버 내부 예외 발생", LocalDateTime.now()));
    }

    // 비즈니스 예외
    @ExceptionHandler(BusinessException.class)
    public ResponseEntity<ErrorResDto> handleBusinessException(BusinessException e) {
      log.error("비즈니스 예외 : {}", e.getMessage());
      return ResponseEntity
              .status(HttpStatus.BAD_REQUEST)
              .body(new ErrorResDto(e.getErrorCode(), e.getMessage(), LocalDateTime.now()));
    }

}
