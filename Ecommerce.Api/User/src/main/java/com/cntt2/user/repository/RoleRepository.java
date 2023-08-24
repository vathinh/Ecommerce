package com.cntt2.user.repository;

import com.cntt2.user.model.Role;
import org.springframework.data.jpa.repository.JpaRepository;

public interface RoleRepository extends JpaRepository<Role, String> {
    public Role findByName(String role);
}
