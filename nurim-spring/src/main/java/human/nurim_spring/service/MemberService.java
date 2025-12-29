package human.nurim_spring.service;

import human.nurim_spring.dto.ChangeInfoReqDto;
import human.nurim_spring.dto.MyInfoResDto;
import human.nurim_spring.dto.MyPageResDto;
import human.nurim_spring.dto.ProductManageResDto;
import human.nurim_spring.entity.Member;
import human.nurim_spring.error.BusinessException;
import human.nurim_spring.repository.*;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

@Slf4j
@Service
@RequiredArgsConstructor
public class MemberService {
    private final PurchaseRepository purchaseRepository;
    private final SubscriptionRepository subscriptionRepository;
    private final MemberRepository memberRepository;
    private final PasswordEncoder passwordEncoder;
    private final AcquisitionRepository acquisitionRepository;
    private final ReturnRepository returnRepository;

    // 마이페이지 메인 렌더링
    public MyPageResDto mainPage(Long memberNum) {
        Member member = memberRepository.findById(memberNum)
                .orElseThrow(() -> new BusinessException("NOT_EXIST_MEMBER", "해당 회원이 존재하지 않습니다."));

        Long purchaseCount = purchaseRepository.countByMember(member);
        Long subscriptionCount = subscriptionRepository.countByMember(member);

        return new MyPageResDto(member.getName(), subscriptionCount, purchaseCount);
    }

    // 회원 정보 수정 페이지 렌더링, 회원 정보 수정 페이지 렌더링
    public MyInfoResDto myInfo(Long memberNum) {
        Member member = memberRepository.findById(memberNum)
                .orElseThrow(() -> new BusinessException("NOT_EXIST_MEMBER", "해당 회원이 존재하지 않습니다."));

        return new MyInfoResDto(member.getId(), member.getEmail(), member.getName(), member.getPhoneNum());
    }

    // 회원 정보 수정: 비밀번호 변경
    public void changePwd(Long memberNum, String pwd) {
        Member member = memberRepository.findById(memberNum)
                .orElseThrow(() -> new BusinessException("NOT_EXIST_MEMBER", "해당 회원이 존재하지 않습니다."));

        member.setPwd(passwordEncoder.encode(pwd));
        memberRepository.save(member);
    }

    // 회원 정보 수정: 회원 정보 변경
    public MyInfoResDto changeInfo(Long memberNum, ChangeInfoReqDto dto) {
        Member member = memberRepository.findById(memberNum)
                .orElseThrow(() -> new BusinessException("NOT_EXIST_MEMBER", "해당 회원이 존재하지 않습니다."));

        if(memberRepository.existsByPhoneNumAndNumNot(dto.getPhone(), memberNum))
            throw new BusinessException("DUPLICATE_PHONE", "이미 사용 중인 번호입니다.");

        member.setName(dto.getName());
        member.setPhoneNum(dto.getPhone());

        member = memberRepository.save(member);

        return new MyInfoResDto(member.getId(), member.getEmail(), member.getName(), member.getPhoneNum());
    }

    // 제품 관리 렌더링
    public ProductManageResDto myProduct(Long memberNum) {
        Member member = memberRepository.findById(memberNum)
                .orElseThrow(() -> new BusinessException("NOT_EXIST_MEMBER", "해당 회원이 존재하지 않습니다."));

        long acquisitionCount = acquisitionRepository.countByMember(member);
        long returnCount = returnRepository.countByMember(member);

        return new ProductManageResDto(acquisitionCount, returnCount);
    }

    // 인수/반납 신청 페이지&모달창 렌더링
    public
    // 인수 신청 비즈니스 로직
    // 반납 신청 비즈니스 로직
}
