package com.java.NBE4_5_1_8.domain.item.service;

import com.java.NBE4_5_1_8.domain.item.dto.ItemForm;
import com.java.NBE4_5_1_8.domain.item.entity.Category;
import com.java.NBE4_5_1_8.domain.item.entity.Item;
import com.java.NBE4_5_1_8.domain.item.repository.CategoryRepository;
import com.java.NBE4_5_1_8.domain.item.repository.ItemRepository;
import com.java.NBE4_5_1_8.domain.orderitem.repository.OrderItemRepository;
import com.java.NBE4_5_1_8.global.exception.ServiceException;
import com.java.NBE4_5_1_8.global.message.ErrorMessage;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.nio.file.StandardCopyOption;
import java.util.List;

@Service
@RequiredArgsConstructor
public class ItemService {
    private final ItemRepository itemRepository;
    private final CategoryRepository categoryRepository;
    private final OrderItemRepository orderItemRepository;

    @Value("${file.upload-dir}")
    private String itemsDir;

    private String saveImage(MultipartFile file, Long itemId) {
        try {
            String fileName = "item" + itemId + "." + getFileExtension(file);
            Path filePath = Paths.get(itemsDir, fileName);

            if (!Files.exists(filePath.getParent())) {
                Files.createDirectories(filePath.getParent());
            }

            Files.copy(file.getInputStream(), filePath, StandardCopyOption.REPLACE_EXISTING);
            return "/items/" + fileName;

        } catch (IOException e) {
            System.out.println("이미지 업로드 실패: " + e.getMessage());
            return "/items/default.png"; // 추후 수정 필요
        }
    }

    private String getFileExtension(MultipartFile file) {
        String fileName = file.getOriginalFilename();
        return fileName != null && fileName.contains(".") ? fileName.substring(fileName.lastIndexOf(".") + 1) : "png";
    }

    @Transactional
    public Item createItem(ItemForm requestForm) {
        Category category = categoryRepository.findByCategoryName(requestForm.getCategory())
                .orElseGet(() -> {
                    Category newCategory = new Category();
                    newCategory.setCategoryName(requestForm.getCategory());
                    return categoryRepository.save(newCategory);
                });

        Item item = new Item();
        item.setItemName(requestForm.getItemName());
        item.setCategory(category.getCategoryName());
        item.setDescription(requestForm.getDescription());
        item.setStockQuantity(requestForm.getStockQuantity());
        item.setPrice(requestForm.getPrice());

        itemRepository.save(item);

        String imageUrl = "/items/default.png"; // 추후 수정 필요
        if (requestForm.getItemImage() != null && !requestForm.getItemImage().isEmpty()) {
            imageUrl = saveImage(requestForm.getItemImage(), item.getItemId());
        }
        item.setImageUrl(imageUrl);

        return itemRepository.save(item);
    }

    public List<Item> getItemList() {
        return itemRepository.findAll();
    }

    public Item getItemById(Long itemId) {
        return itemRepository.findById(itemId)
                .orElseThrow(() -> new ServiceException(HttpStatus.BAD_REQUEST, ErrorMessage.ITEM_NOT_FOUND));
    }

    public long count() {
        return itemRepository.count();
    }

    @Transactional
    public void updateItem(Item item, ItemForm requestForm) {

        item.setItemName(requestForm.getItemName());
        item.setCategory(requestForm.getCategory());
        item.setDescription(requestForm.getDescription());
        item.setStockQuantity(requestForm.getStockQuantity());
        item.setPrice(requestForm.getPrice());

        Long itemId = item.getItemId();
        if (requestForm.getItemImage() != null && !requestForm.getItemImage().isEmpty()) {
            String imageUrl = saveImage(requestForm.getItemImage(), itemId);
            item.setImageUrl(imageUrl);
        }
    }

    public void deleteItem(Item item) {

        boolean hasOrderHistory = orderItemRepository.existsByItem(item);
        if (hasOrderHistory) {
            throw new ServiceException(HttpStatus.BAD_REQUEST, ErrorMessage.ITEM_CANNOT_BE_DELETED);
        }

        itemRepository.delete(item);
    }

    public List<Item> findAll() {
        return itemRepository.findAll();
    }
}
