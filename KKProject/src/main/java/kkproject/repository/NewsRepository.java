package kkproject.repository;

import java.util.List;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;

import kkproject.domain.News;

public interface NewsRepository extends JpaRepository<News,Long>{
	
	List<News> findByTitleContainingIgnoreCase(String title);
	
	Page<News> findAllByOrderBySortstampDesc(Pageable pageable);
	
}
