package a107.cardmore.util.constant;

public enum MerchantCategory {
    REFUELING("대외활동"),
    MARKET("대형마트"),
    TRAFFIC("교통"),
    EDUCATION("기타"),
    COMMUNICATION("통신"),
    FOREIGN("해외"),
    LIFE("생활");

    private final String value;

    MerchantCategory(String value) {
        this.value = value;
    }

    public String getValue() {
        return value;
    }
}
