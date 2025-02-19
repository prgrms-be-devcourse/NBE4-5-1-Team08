package com.java.NBE4_5_1_8.domain.item.repository;

import com.java.NBE4_5_1_8.domain.item.entiry.Item;
import org.springframework.data.jpa.repository.JpaRepository;

public interface ItemRepository extends JpaRepository<Item, Long> {
}
