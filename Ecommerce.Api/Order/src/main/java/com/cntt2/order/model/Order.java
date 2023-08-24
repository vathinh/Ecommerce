package com.cntt2.order.model;

import com.sun.istack.NotNull;
import lombok.*;
import org.hibernate.annotations.CreationTimestamp;
import org.hibernate.annotations.GenericGenerator;
import org.hibernate.annotations.UpdateTimestamp;

import javax.persistence.*;
import java.math.BigDecimal;
import java.util.Date;
import java.util.List;

@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
@Entity
@Table(name = "orders")
@Setter @Getter
public class Order {
    @Id
    @GeneratedValue(generator = "uuid2")
    @GenericGenerator(name = "uuid2", strategy = "org.hibernate.id.UUIDGenerator")
    @Column(name = "id", columnDefinition = "VARCHAR(255)")
    private String id;

    @Column(name="status", columnDefinition = "varchar(255) default 'CART'")
    private String status;

    @Column(name="products")
    @OneToMany(cascade = CascadeType.ALL)
    private List<OrderProductItem> products;

    @NotNull
    @Column(name="total")
    private BigDecimal total;

    @NotNull
    @Column(name="createdBy")
    private String createdBy;

    @CreationTimestamp
    @Column(name="createdDate", nullable = false, updatable = false)
    private Date createdDate;

    @NotNull
    @Column(name="updatedBy")
    private String updatedBy;

    @UpdateTimestamp
    @Column(name="updatedDate", nullable = false, updatable = true)
    private Date updatedDate;
}
