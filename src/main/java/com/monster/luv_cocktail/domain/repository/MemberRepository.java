package com.monster.luv_cocktail.domain.repository;

import com.monster.luv_cocktail.domain.entity.Member;
import java.util.Optional;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface MemberRepository extends JpaRepository<Member, Long> {
    Optional<Member> findByEmail(String email);

    Optional<Member> findByEmailAndPassword(String email, String Password);

    Optional<Member> findById(Long id);

    void deleteByEmail(String email);
}
