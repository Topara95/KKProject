package kkproject.service;

import java.util.List;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

import kkproject.domain.News;

public interface NewsService {
	
	News save(News news);
	
	News remove(Long newsId);
	
	News modify(Long oldId,News news);
	
	List<News> findByTitle(String title);
	
	List<News> getAllNews();
	
	Page<News> getNewsByPage(Pageable pageable);
	
	News findById(Long newsId);
}
