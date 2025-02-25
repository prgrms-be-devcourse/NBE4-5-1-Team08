package com.java.NBE4_5_1_8.domain.item.controller;

import com.java.NBE4_5_1_8.domain.item.dto.CategoryDto;
import com.java.NBE4_5_1_8.domain.item.dto.CategoryForm;
import com.java.NBE4_5_1_8.domain.item.entity.Category;
import com.java.NBE4_5_1_8.domain.item.service.CategoryService;
import com.java.NBE4_5_1_8.global.message.SuccessMessage;
import com.java.NBE4_5_1_8.global.response.RsData;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RequiredArgsConstructor
@RestController
@RequestMapping("/v1/categories")
public class ApiV1CategoryController {
    private final CategoryService categoryService;

    @PostMapping
    public RsData<CategoryDto> createCategory(@RequestBody CategoryForm requestForm) {
        Category category = categoryService.createCategory(requestForm.getCategoryName());

        return RsData.success(
                HttpStatus.OK,
                new CategoryDto(category),
                SuccessMessage.CATEGORY_CREATED);
    }

    @GetMapping
    public RsData<List<CategoryDto>> getCategoryList() {

        List<Category> Categories = categoryService.getAllCategories();

        return RsData.success(
                HttpStatus.OK,
                Categories.stream()
                        .map(CategoryDto::new)
                        .toList(),
                SuccessMessage.CATEGORY_LIST_FETCHED);
    }
}
