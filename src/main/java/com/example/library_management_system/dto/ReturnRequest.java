package com.example.library_management_system.dto;

import jakarta.validation.constraints.NotNull;

public class ReturnRequest {

    @NotNull(message = "Transaction ID is required")
    private Long transactionId;

    // Constructors
    public ReturnRequest() {}

    public ReturnRequest(Long transactionId) {
        this.transactionId = transactionId;
    }

    // Getters and Setters
    public Long getTransactionId() {
        return transactionId;
    }

    public void setTransactionId(Long transactionId) {
        this.transactionId = transactionId;
    }
}
