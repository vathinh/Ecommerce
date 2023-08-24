package com.cntt2.payment.repository;

import com.cntt2.payment.model.Payment;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.Optional;

public interface PaymentRepository extends JpaRepository<Payment, String> {
    List<Payment> findByUserId(String userId);

    Optional<Payment> findByIdAndUserId(String id, String userId);
}
