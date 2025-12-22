package human.nurim_spring.controller;

import human.nurim_spring.dto.QnaReqDto;
import human.nurim_spring.service.QNAService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/qna")
@RequiredArgsConstructor
@CrossOrigin(origins = "http://localhost:3000")
public class QNAController {

    private final QNAService qnaService;

    // 문의 작성(POST)
    // URL: http://localhost:8080/api/qna
    @PostMapping("")
    public ResponseEntity<String> writeQna(@RequestBody QnaReqDto dto) {
        String result = qnaService.createQna(dto);
        return ResponseEntity.ok(result);
    }
}