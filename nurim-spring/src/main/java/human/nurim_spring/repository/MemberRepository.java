package human.nurim_spring.repository;

import human.nurim_spring.entity.Member;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface MemberRepository extends JpaRepository<Member,Long> {
    boolean existsByEmail(String email);
    boolean existsById(String id);
    Optional<Member> findById(String id);
    Optional<Member> findByEmail(String email);
}
