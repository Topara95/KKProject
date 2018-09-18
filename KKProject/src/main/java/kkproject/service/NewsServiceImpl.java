package kkproject.service;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import kkproject.domain.News;
import kkproject.repository.NewsRepository;

@Service
public class NewsServiceImpl implements NewsService{
	
	@Autowired
	private NewsRepository newsRepository;

	@Override
	public News save(News news) {
		return newsRepository.save(news);
	}

	@Override
	public News remove(Long newsId) {
		Optional<News> news = newsRepository.findById(newsId);
		if(news.isPresent()){
			News newsval = news.get();
			newsRepository.delete(newsval);
			return newsval;
		}else{
			return null;
		}
	}

	@Override
	public News modify(Long oldId,News news) {
		Optional<News> old = newsRepository.findById(oldId);
		if(old.isPresent()){
			News oldNews = old.get();
			if(news.getTitle()!=null){
			 oldNews.setTitle(news.getTitle());
			}
			if(news.getContent()!=null){
				oldNews.setContent(news.getContent());
			}
			if(news.getTitleImg() != null){
				oldNews.setTitleImg(news.getTitleImg());
			}
			if(news.getVideoLink() != null){
				oldNews.setVideoLink(news.getVideoLink());
			}
			return newsRepository.save(oldNews);
		}else{
			return null;
		}
	}

	@Override
	public List<News> findByTitle(String title) {
		return newsRepository.findByTitleContainingIgnoreCase(title);
	}

	@Override
	public List<News> getAllNews() {
		return newsRepository.findAll();
	}

	@Override
	public Page<News> getNewsByPage(Pageable pageable) {
		return newsRepository.findAllByOrderBySortstampDesc(pageable);
	}

	@Override
	public News findById(Long newsId) {
		Optional<News> news = newsRepository.findById(newsId);
		if(news.isPresent()){
			News newsval = news.get();
			return newsval;
		}else{
			return null;
		}
	}

}
