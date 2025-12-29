package human.nurim_spring.repository;

import human.nurim_spring.constant.SubscriptionStatus;
import human.nurim_spring.entity.Member;
import human.nurim_spring.entity.Orders;
import human.nurim_spring.entity.Subscription;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface SubscriptionRepository extends JpaRepository<Subscription, Long> {
    List<Subscription> findByOrders(Orders orders);
    @Query("""
    SELECT s
    FROM Subscription s
    WHERE s.member = :member
      AND s.subscriptionStatus IN (:statuses)
    """)
    List<Subscription> findActiveOrPausedByMember(
            @Param("member") Member member,
            @Param("statuses") List<SubscriptionStatus> statuses
    );
    Long countByMember(Member member);
    List<Subscription> findByMember(Member member);
}
