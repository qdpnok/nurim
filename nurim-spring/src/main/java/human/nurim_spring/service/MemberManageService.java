package human.nurim_spring.service;

import human.nurim_spring.constant.PermissionStatus;
import human.nurim_spring.dto.MemberListDto;
import human.nurim_spring.dto.MemberPageResDto;
import human.nurim_spring.entity.Member;
import human.nurim_spring.repository.MemberRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;

@Slf4j
@Service
@RequiredArgsConstructor
public class MemberManageService {
    private final MemberRepository memberRepository;

    // 회원 관리 정보 조회
    public MemberPageResDto searchMember(String id, String name, PermissionStatus status, Boolean isQuit,
                                         Integer pageNum, Integer size) {
        List<MemberListDto> list = new ArrayList<>();
        int pageSize = (size == null) ? 20 : size;
        int pNum = pageNum == null ? 0 : pageNum - 1;
        Pageable pageable = PageRequest.of(pNum, pageSize);

        Page<Member> result = memberRepository.searchMember(id, name, status, isQuit, pageable);

        for (Member member : result.getContent()) {
            list.add(convertEntityToMemberList(member));
        }

        return convertResultToMemberPageRes(result, list, pNum, pageSize);
    }

    // 유저 삭제

    private MemberListDto convertEntityToMemberList(Member member) {
        return MemberListDto.builder()
                .num(member.getNum())
                .id(member.getId())
                .email(member.getName())
                .status(member.getStatus())
                .isQuit(member.getQuitDate() != null)
                .build();
    }

    private MemberPageResDto convertResultToMemberPageRes(Page<Member> result, List<MemberListDto> list, int pageNum, int pageSize) {
        return MemberPageResDto.builder()
                .members(list)
                .totalPages(result.getTotalPages())
                .totalElements(result.getTotalElements())
                .currentPage(pageNum)
                .pageSize(pageSize)
                .build();
    }
}
