package human.nurim_spring.service;

import human.nurim_spring.dto.MyInfoResDto;
import human.nurim_spring.dto.MyPageResDto;
import human.nurim_spring.entity.Member;
import human.nurim_spring.error.BusinessException;
import human.nurim_spring.repository.MemberRepository;
import human.nurim_spring.repository.PurchaseRepository;
import human.nurim_spring.repository.SubscriptionRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;

@Slf4j
@Service
@RequiredArgsConstructor
public class MemberService {
    private final PurchaseRepository purchaseRepository;
    private final SubscriptionRepository subscriptionRepository;
    private final MemberRepository memberRepository;

    // 마이페이지 메인 렌더링
    public MyPageResDto main(Long memberNum) {
        Member member = memberRepository.findById(memberNum)
                .orElseThrow(() -> new BusinessException("NOT_EXIST_MEMBER", "해당 회원이 존재하지 않습니다."));

        Long purchaseCount = purchaseRepository.countByMember(member);
        Long subscriptionCount = subscriptionRepository.countByMember(member);

        return new MyPageResDto(member.getName(), subscriptionCount, purchaseCount);
    }

    // 회원 정보 수정 페이지 렌더링
    public MyInfoResDto myInfo(Long memberNum) {
        Member member = memberRepository.findById(memberNum)
                .orElseThrow(() -> new BusinessException("NOT_EXIST_MEMBER", "해당 회원이 존재하지 않습니다."));

        return new MyInfoResDto(member.getId(), member.getEmail(), member.getName(), member.getPhoneNum());
    }
}
