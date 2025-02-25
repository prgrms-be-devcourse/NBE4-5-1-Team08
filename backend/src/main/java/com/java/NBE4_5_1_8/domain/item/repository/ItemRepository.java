package com.java.NBE4_5_1_8.domain.item.repository;

import com.java.NBE4_5_1_8.domain.item.entity.Item;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface ItemRepository extends JpaRepository<Item, Long> {
    List<Item> findAllByDeletedFalse();
}
