package human.nurim_spring.service;

import human.nurim_spring.dto.QnaReqDto;
import human.nurim_spring.entity.Member;
import human.nurim_spring.entity.QNA;
import human.nurim_spring.entity.QNA;
import human.nurim_spring.repository.MemberRepository;
import human.nurim_spring.repository.QNARepository;
import human.nurim_spring.repository.QNARepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
@RequiredArgsConstructor
@Transactional(readOnly = true)
@Slf4j
public class QNAService {

    private final QNARepository qnaRepository;
    private final MemberRepository memberRepository;

    // 문의 작성 기능
    @Transactional
    public String createQna(QnaReqDto dto) {
        // 작성자 확인 하기
        Member member = memberRepository.findById(dto.getMemberNum())
                .orElseThrow(() -> new IllegalArgumentException("존재하지 않는 회원입니다."));

        // 비밀글(혹시 프론트에서 값을 안 보내면 '공개'가 기본값임)
        boolean releaseState = (dto.getIsRelease() != null) ? dto.getIsRelease() : true;

        // 엔티티 만들기
        QNA qna = QNA.builder()
                .member(member)             // 작성자 연결
                .title(dto.getTitle())      // 제목
                .content(dto.getContent())  // 내용
                .isRelease(releaseState)    // 공개 여부 (true/false)
                .build();

        // 저장 하기
        qnaRepository.save(qna);
        log.info("문의 등록 완료: " + qna.getTitle());

        return "등록완료";
    }
}