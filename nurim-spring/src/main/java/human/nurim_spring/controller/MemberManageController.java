package human.nurim_spring.controller;

import human.nurim_spring.constant.PermissionStatus;
import human.nurim_spring.dto.MemberPageResDto;
import human.nurim_spring.service.MemberManageService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@Slf4j
@RestController
@RequestMapping("/api/admin/members")
@RequiredArgsConstructor
public class MemberManageController {
    private final MemberManageService memberManageService;

    @GetMapping
    public ResponseEntity<MemberPageResDto> list(
            @RequestParam(required = false) String id,
            @RequestParam(required = false) String name,
            @RequestParam(required = false) PermissionStatus status,
            @RequestParam(required = false) Boolean isQuit,
            @RequestParam(required = false) Integer page,
            @RequestParam(required = false) Integer size // size 파라미터 추가
            ) {
        return ResponseEntity.ok(memberManageService.search(id, name, status, isQuit, page, size));
    }

    @DeleteMapping("/{memberNum}")
    public ResponseEntity<Void> delete(@PathVariable Long memberNum) {
        memberManageService.delete(memberNum);
        return ResponseEntity.noContent().build();
    }

}
