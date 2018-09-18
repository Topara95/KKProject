package kkproject;

import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Paths;

import javax.annotation.PostConstruct;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.core.io.ClassPathResource;
import org.springframework.stereotype.Component;

import kkproject.domain.ImageModel;
import kkproject.domain.News;
import kkproject.repository.ImageRepository;
import kkproject.service.NewsService;

@Component
public class TestData {
	
	@Autowired
	private NewsService newsService;
	
	@Autowired
	ImageRepository imageRepository;
	
	@PostConstruct
	private void init() throws IOException{
		String slika = "https://i.imgur.com/77cOg7pm.jpg";
		String videoLink = "https://www.youtube.com/embed/4ZKM4qok2Tg";
		
		ClassPathResource backImgFile = new ClassPathResource("static/images/kklogo.jpg");
		byte[] arrayPic = new byte[(int) backImgFile.contentLength()];
		backImgFile.getInputStream().read(arrayPic);
		ImageModel blackImage = new ImageModel("KKLOGO", "jpg", arrayPic);
		
		imageRepository.save(blackImage);
		
		
		News news1 = new News("Vest1","AJDSJJASAJDJJHDASJJSDAJ",blackImage,videoLink);
		News news2 = new News("Vest2","AJDSJJASAJDJJHDASJJSDAJ",blackImage,videoLink);
		News news3 = new News("Vest3","AJDSJJASAJDJJHDASJJSDAJ",blackImage,videoLink);
		News news4 = new News("Vest4","AJDSJJASAJDJJHDASJJSDAJ",blackImage,videoLink);
		News news5 = new News("Vest5","AJDSJJASAJDJJHDASJJSDAJ",blackImage,videoLink);
		News news6 = new News("Vest6","AJDSJJASAJDJJHDASJJSDAJ",blackImage,videoLink);
		News news7 = new News("Vest7","AJDSJJASAJDJJHDASJJSDAJ",blackImage,videoLink);
		News news8 = new News("Vest8","AJDSJJASAJDJJHDASJJSDAJ",blackImage,videoLink);
		News news9 = new News("Vest9","AJDSJJASAJDJJHDASJJSDAJ",blackImage,videoLink);
		News news10 = new News("Vest10","AJDSJJASAJDJJHDASJJSDAJ",blackImage,videoLink);
		
		newsService.save(news1);
		newsService.save(news2);
		newsService.save(news3);
		newsService.save(news4);
		newsService.save(news5);
		newsService.save(news6);
		newsService.save(news7);
		newsService.save(news8);
		newsService.save(news9);
		newsService.save(news10);
		
		
		
		
		
		for(ImageModel imageModel : imageRepository.findAll()){
			Files.write(Paths.get("upl/" + imageModel.getName() + "." + imageModel.getType()), imageModel.getPic());
		}
		
	}
}
