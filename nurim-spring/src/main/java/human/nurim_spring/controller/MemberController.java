package human.nurim_spring.controller;

import human.nurim_spring.dto.ChangeInfoReqDto;
import human.nurim_spring.dto.MyInfoResDto;
import human.nurim_spring.dto.MyPageResDto;
import human.nurim_spring.service.MemberService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Map;

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

    @PostMapping("/my-info/pwd/{memberNum}")
    public ResponseEntity<Void> changePwd(@PathVariable Long memberNum, @RequestBody Map<String, String> body) {
        String pwd = body.get("pwd");
        memberService.changePwd(memberNum, pwd);
        return ResponseEntity.status(HttpStatus.OK).build();
    }

    @PostMapping("/my-info/info/{memberNum}")
    public ResponseEntity<MyInfoResDto> changeInfo(@PathVariable Long memberNum, @RequestBody ChangeInfoReqDto dto) {
        return ResponseEntity.ok(memberService.changeInfo(memberNum, dto));
    }

}
