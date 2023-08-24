package com.cntt2.user.repository;

import com.cntt2.user.model.Authority;
import org.springframework.data.jpa.repository.JpaRepository;

public interface AuthorityRepository extends JpaRepository<Authority, String> {
    public Authority findByName(String name);
}
