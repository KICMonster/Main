package com.monster.luv_cocktail.domain.enumeration;

public enum ExceptionCode {
    MEMBER_EXISTS(400, "이미 존재하는 회원입니다."),
    NO_SUCH_ALGORITHM(500, "알고리즘이 존재하지 않습니다."),
    UNABLE_TO_SEND_EMAIL(500, "이메일 전송에 실패했습니다."),
    NON_EXISTENT_MEMBER(400, "존재하지 않는 회원입니다."),
    INVALID_CREDENTIALS(400, "이메일 또는 비밀번호가 올바르지 않습니다.");

    private int status;
    private String message;

    private ExceptionCode(int status, String message) {
        this.status = status;
        this.message = message;
    }

    public int getStatus() {
        return this.status;
    }

    public String getMessage() {
        return this.message;
    }
}

