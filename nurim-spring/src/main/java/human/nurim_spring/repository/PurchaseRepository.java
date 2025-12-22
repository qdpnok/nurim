package human.nurim_spring.repository;

import human.nurim_spring.entity.Member;
import human.nurim_spring.entity.Product;
import human.nurim_spring.entity.Purchase;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface PurchaseRepository extends JpaRepository<Purchase, Long> {
    // 회원과 상품으로 가장 최근 구매 내역 1개 찾기
    Optional<Purchase> findTopByMemberAndProductOrderByNumDesc(Member member, Product product);
}
