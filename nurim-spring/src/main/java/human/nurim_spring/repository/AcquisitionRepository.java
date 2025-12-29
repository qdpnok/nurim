package human.nurim_spring.repository;

import human.nurim_spring.entity.Acquisition;
import human.nurim_spring.entity.Member;
import org.springframework.data.jpa.repository.JpaRepository;

public interface AcquisitionRepository extends JpaRepository<Acquisition, Long> {
    Long countByMember(Member member);
}
