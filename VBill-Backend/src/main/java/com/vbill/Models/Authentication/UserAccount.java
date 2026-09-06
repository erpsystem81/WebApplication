package com.vbill.Models.Authentication;

import jakarta.persistence.*;
import java.time.LocalDateTime;

@Entity
@Table(
    name = "user_account",
    uniqueConstraints = {
        @UniqueConstraint(
            name = "uk_user_account_email",
            columnNames = "email"
        ),
        @UniqueConstraint(
            name = "uk_user_account_mobile",
            columnNames = "mobile_number"
        )
    }
)
public class UserAccount {

    @Id
    @GeneratedValue(
        strategy = GenerationType.SEQUENCE,
        generator = "user_account_seq"
    )
    @SequenceGenerator(
        name = "user_account_seq",
        sequenceName = "user_account_seq",
        allocationSize = 1
    )
    @Column(name = "user_account_id")
    private Long userAccountId;

    @Column(
        name = "first_name",
        nullable = false,
        length = 100
    )
    private String firstName;

    @Column(
        name = "last_name",
        nullable = false,
        length = 100
    )
    private String lastName;

    @Column(
        name = "email",
        nullable = false,
        unique = true,
        length = 150
    )
    private String email;

    @Column(
        name = "mobile_number",
        nullable = false,
        unique = true,
        length = 15
    )
    private String mobileNumber;

    @Column(
        name = "password",
        nullable = false,
        length = 255
    )
    private String password;

    @Column(
        name = "is_active",
        nullable = false
    )
    private Boolean isActive = true;

    @Column(
        name = "created_at",
        nullable = false
    )
    private LocalDateTime createdAt;

    @Column(name = "updated_at")
    private LocalDateTime updatedAt;

    @PrePersist
    protected void onCreate() {

        LocalDateTime now = LocalDateTime.now();

        createdAt = now;

        updatedAt = now;

        if (isActive == null) {
            isActive = true;
        }
    }

    @PreUpdate
    protected void onUpdate() {

        updatedAt = LocalDateTime.now();
    }

    // ─────────────────────────────────────────────
    // GETTERS AND SETTERS
    // ─────────────────────────────────────────────

    public Long getUserAccountId() {
        return userAccountId;
    }

    public void setUserAccountId(Long userAccountId) {
        this.userAccountId = userAccountId;
    }

    public String getFirstName() {
        return firstName;
    }

    public void setFirstName(String firstName) {
        this.firstName = firstName;
    }

    public String getLastName() {
        return lastName;
    }

    public void setLastName(String lastName) {
        this.lastName = lastName;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public String getMobileNumber() {
        return mobileNumber;
    }

    public void setMobileNumber(String mobileNumber) {
        this.mobileNumber = mobileNumber;
    }

    public String getPassword() {
        return password;
    }

    public void setPassword(String password) {
        this.password = password;
    }

    public Boolean getIsActive() {
        return isActive;
    }

    public void setIsActive(Boolean active) {
        isActive = active;
    }

    public LocalDateTime getCreatedAt() {
        return createdAt;
    }

    public void setCreatedAt(LocalDateTime createdAt) {
        this.createdAt = createdAt;
    }

    public LocalDateTime getUpdatedAt() {
        return updatedAt;
    }

    public void setUpdatedAt(LocalDateTime updatedAt) {
        this.updatedAt = updatedAt;
    }
}