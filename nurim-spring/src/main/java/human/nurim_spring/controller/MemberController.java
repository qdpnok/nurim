package human.nurim_spring.controller;

import human.nurim_spring.dto.MyInfoResDto;
import human.nurim_spring.dto.MyPageResDto;
import human.nurim_spring.service.MemberService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.apache.coyote.Response;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@Slf4j
@RestController
@RequestMapping("/api/mypage")
@RequiredArgsConstructor
public class MemberController {
    private final MemberService memberService;

    @GetMapping("/{memberNum}")
    public ResponseEntity<MyPageResDto> mainPage(@PathVariable Long memberNum) {
        return ResponseEntity.ok(memberService.mainPage(memberNum));
    }

    @GetMapping("/my-info/{memberNum}")
    public ResponseEntity<MyInfoResDto> info(@PathVariable Long memberNum) {
        return ResponseEntity.ok(memberService.myInfo(memberNum));
    }


}
