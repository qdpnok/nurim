package human.nurim_spring.controller;

import human.nurim_spring.dto.*;
import human.nurim_spring.service.MemberService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;

@Slf4j
@RestController
@RequestMapping("/api/mypage")
@RequiredArgsConstructor
public class MemberController {
    private final MemberService memberService;

    // 1. 마이페이지 메인 (요약 정보)
    @GetMapping("/{memberNum}")
    public ResponseEntity<MyPageResDto> mainPage(@PathVariable Long memberNum) {
        return ResponseEntity.ok(memberService.mainPage(memberNum));
    }

    // 2. 내 정보 조회
    @GetMapping("/my-info/{memberNum}")
    public ResponseEntity<MyInfoResDto> info(@PathVariable Long memberNum) {
        return ResponseEntity.ok(memberService.myInfo(memberNum));
    }

    // 3. 비밀번호 변경
    @PostMapping("/my-info/pwd/{memberNum}")
    public ResponseEntity<Void> changePwd(@PathVariable Long memberNum, @RequestBody Map<String, String> body) {
        String pwd = body.get("pwd");
        memberService.changePwd(memberNum, pwd);
        return ResponseEntity.status(HttpStatus.OK).build();
    }

    // 4. 회원 정보 변경
    @PostMapping("/my-info/info/{memberNum}")
    public ResponseEntity<MyInfoResDto> changeInfo(@PathVariable Long memberNum, @RequestBody ChangeInfoReqDto dto) {
        return ResponseEntity.ok(memberService.changeInfo(memberNum, dto));
    }

    // [추가] 구독 관리 리스트
    @GetMapping("/subscriptions/{memberNum}")
    public ResponseEntity<List<ProductListDto>> getSubscriptions(@PathVariable Long memberNum) {
        return ResponseEntity.ok(memberService.getSubscriptions(memberNum));
    }

    // [추가] 구매 관리 리스트
    @GetMapping("/orders/{memberNum}")
    public ResponseEntity<List<ProductListDto>> getOrders(@PathVariable Long memberNum) {
        return ResponseEntity.ok(memberService.getOrders(memberNum));
    }

    // [추가] 인수 신청
    @PostMapping("/acquisition")
    public ResponseEntity<Void> applyAcquisition(@RequestBody ApplicationReqDto dto) {
        memberService.applyAcquisition(dto);
        return ResponseEntity.ok().build();
    }

    // [추가] 반납 신청
    @PostMapping("/return")
    public ResponseEntity<Void> applyReturn(@RequestBody ApplicationReqDto dto) {
        memberService.applyReturn(dto);
        return ResponseEntity.ok().build();
    }
}