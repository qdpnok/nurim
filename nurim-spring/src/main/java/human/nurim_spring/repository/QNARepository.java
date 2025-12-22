package human.nurim_spring.repository;

import human.nurim_spring.entity.Member;
import human.nurim_spring.entity.QNA;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface QNARepository extends JpaRepository<QNA, Long> {
    List<QNA> findAllByMemberOrderByNumDesc(Member member);  // 문의글 찾기
}
