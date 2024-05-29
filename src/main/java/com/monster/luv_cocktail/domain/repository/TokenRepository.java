package com.monster.luv_cocktail.domain.repository;

import com.monster.luv_cocktail.domain.entity.JwtToken;
import java.util.Optional;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface TokenRepository extends JpaRepository<JwtToken, Long> {
    Optional<JwtToken> findByRefreshToken(String email);
    Optional<JwtToken> findByMemberEmail(String email);
}

