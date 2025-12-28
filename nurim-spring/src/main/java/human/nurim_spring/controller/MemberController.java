package human.nurim_spring.controller;

import human.nurim_spring.dto.MyPageResDto;
import human.nurim_spring.service.MemberService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@Slf4j
@RestController
@RequestMapping("/api/auth")
@RequiredArgsConstructor
public class MemberController {
    private final MemberService memberService;

    @GetMapping("/{memberNum}")
    public ResponseEntity<MyPageResDto> main(@PathVariable Long memberNum) {
        return ResponseEntity.ok(memberService.main(memberNum));
    }

}
