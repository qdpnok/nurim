package human.nurim_spring.repository;

import human.nurim_spring.constant.PermissionStatus;
import human.nurim_spring.entity.Member;
import io.lettuce.core.dynamic.annotation.Param;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.time.LocalDateTime;
import java.util.Optional;

@Repository
public interface MemberRepository extends JpaRepository<Member,Long> {
    boolean existsByEmail(String email);
    boolean existsById(String id);
    boolean existsByPhoneNumAndNumNot(String phoneNum, Long num);
    Optional<Member> findById(String id);
    Optional<Member> findByEmail(String email);

    @Query ("""
            SELECT m FROM Member m WHERE
            (:id IS NULL OR m.id LIKE %:id%) AND
            (:name IS NULL OR m.name LIKE %:name%) AND
            (:status IS NULL OR m.status = :status) AND
            (:isQuit IS NULL OR
                        (:isQuit = true AND m.quitDate IS NOT NULL) OR
                        (:isQuit = false AND m.quitDate IS NULL))
            """)
    Page<Member> searchMember(
            @Param("id")String id,
            @Param("name")String name,
            @Param("status")PermissionStatus status,
            @Param("isQuit")Boolean isQuit,
            Pageable pageable
            );
}
