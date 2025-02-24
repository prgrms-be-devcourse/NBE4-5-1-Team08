package com.java.NBE4_5_1_8.domain.item.dto;

import jakarta.validation.constraints.Min;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import org.springframework.web.multipart.MultipartFile;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class ItemForm {

    @NotBlank(message = "상품명은 필수 입력 항목입니다.")
    private String itemName;

    @NotBlank(message = "카테고리는 필수 입력 항목입니다.")
    private String category;

    @NotBlank(message = "상품 설명은 필수 입력 항목입니다.")
    private String description;

    @Min(value = 0, message = "재고 수량은 0 이상이여야 합니다.")
    @NotNull(message = "재고 수량은 필수 입력 항목입니다.")
    private Integer stockQuantity;

    @Min(value = 0, message = "가격은 0 이상이여야 합니다.")
    @NotNull(message = "가격은 필수 입력 항목입니다.")
    private Integer price;

    private MultipartFile image;
}
