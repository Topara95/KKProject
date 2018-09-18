package kkproject.controller;

import java.io.IOException;
import java.util.List;
import java.util.Optional;

import javax.servlet.http.HttpServletRequest;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.core.env.Environment;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

import kkproject.domain.ImageModel;
import kkproject.domain.News;
import kkproject.domain.User;
import kkproject.repository.ImageRepository;
import kkproject.service.NewsService;

@RestController
@RequestMapping("/api/news")
public class NewsController {
	
	@Autowired
	private NewsService newsService;
	
	@Autowired
	private ImageRepository imgRepository;
	
	@RequestMapping(method=RequestMethod.GET)
	public ResponseEntity<List<News>> getAllNews(){
		return new ResponseEntity<List<News>>(newsService.getAllNews(),HttpStatus.OK);
	}
	
	@RequestMapping(value="/adminlogin",method=RequestMethod.POST,
			consumes = MediaType.APPLICATION_JSON_VALUE,
			produces = MediaType.APPLICATION_JSON_VALUE	)
	public ResponseEntity<String> LogIn(@RequestBody User user, HttpServletRequest request){
		if(user.getUsername().equals("adminkkstrazilovo") && user.getPassword().equals("strazilovo123")){
			request.getSession().setAttribute("loggedAdmin", user.getUsername());
			return new ResponseEntity<String>("adminkkstrazilovo",HttpStatus.OK);
		}else{
			return new ResponseEntity<String>("Neispravni kredencijali",HttpStatus.BAD_REQUEST);
		}
	}
	
	@RequestMapping(value="/adminlogout",method=RequestMethod.GET)
	public ResponseEntity<String> LogOut(HttpServletRequest request){
		String username = (String) request.getSession().getAttribute("loggedAdmin");
		if(username != null && username.equals("adminkkstrazilovo")){
			request.getSession().invalidate();
			return new ResponseEntity<String>("Uspesno odjavljivanje",HttpStatus.OK);
		}else{
			return new ResponseEntity<String>("Admin nije bio ulogovan!",HttpStatus.BAD_REQUEST);
		}
	}
	
	@RequestMapping(value="/checklogged",method=RequestMethod.GET)
	public ResponseEntity<String> checkLogged(HttpServletRequest request){
		String username = (String) request.getSession().getAttribute("loggedAdmin");
		if(username!=null && username.equals("adminkkstrazilovo")){
			return new ResponseEntity<String>(username,HttpStatus.OK);
		}else{
			return new ResponseEntity<String>("niko nije ulogovan",HttpStatus.NOT_FOUND);
		}
	}
	
	@RequestMapping(value="/{imgId}",method=RequestMethod.POST,
			consumes = MediaType.APPLICATION_JSON_VALUE,
			produces = MediaType.APPLICATION_JSON_VALUE	)
	public ResponseEntity<News> addNews(@PathVariable Long imgId,@RequestBody News news, HttpServletRequest request){
		String username = (String) request.getSession().getAttribute("loggedAdmin");
		if(username!=null && username.equals("adminkkstrazilovo")){
			Optional<ImageModel> img = imgRepository.findById(imgId);
			news.setTitleImg(img.get());
			News newNews = newsService.save(news);
			return new ResponseEntity<News>(newNews,HttpStatus.CREATED);
		}else{
			return new ResponseEntity<>(null,HttpStatus.BAD_REQUEST);
		}
	}
	
	@RequestMapping(value="/{newsId}",method=RequestMethod.DELETE)
	public ResponseEntity<News> removeNews(@PathVariable Long newsId, HttpServletRequest request){
		String username = (String) request.getSession().getAttribute("loggedAdmin");
		if(username!=null && username.equals("adminkkstrazilovo")){
			News removed = newsService.remove(newsId);
			return new ResponseEntity<>(removed,HttpStatus.OK);
		}else{
			return new ResponseEntity<>(null,HttpStatus.BAD_REQUEST);
		}
	}
	
	@RequestMapping(value="{newsId}/{imgId}",method=RequestMethod.PUT)
	public ResponseEntity<News> modifyNews(@PathVariable Long newsId,@PathVariable Long imgId,@RequestBody News news, HttpServletRequest request){
		Optional<ImageModel> img = imgRepository.findById(imgId);
		news.setTitleImg(img.get());
		News modified = newsService.modify(newsId,news);
		String username = (String) request.getSession().getAttribute("loggedAdmin");
		if(username!=null && username.equals("adminkkstrazilovo") && modified != null){
			return new ResponseEntity<>(modified,HttpStatus.OK);
		}else{
			return new ResponseEntity<>(null,HttpStatus.BAD_REQUEST);
		}
	}
	
	@RequestMapping(value="{newsId}",method=RequestMethod.GET)
	public ResponseEntity<News> getOneNews(@PathVariable Long newsId){
		News n = newsService.findById(newsId);
		if(n!=null){
			return new ResponseEntity<>(n,HttpStatus.OK);
		}else{
			return new ResponseEntity<>(null,HttpStatus.BAD_REQUEST);
		}
	}
	
	
	@RequestMapping(value="/pages",method=RequestMethod.GET)
	Page<News> list( Pageable pageable){
		Page<News> news = newsService.getNewsByPage(pageable);
		//List<News> listnews = new ArrayList<News>();
		return news;
	}
	
	
	
	@RequestMapping(value = "/uploadFile", method = RequestMethod.POST)
	@ResponseBody
	public ResponseEntity<ImageModel> uploadFile(
	    @RequestParam("uploadfile") MultipartFile uploadfile) throws IOException {
	  
		byte[] arrayPic = uploadfile.getBytes();
		String[] splited = uploadfile.getOriginalFilename().toString().split("\\.");
		System.out.println(splited[0]);
		ImageModel uploadImage = new ImageModel(splited[0], splited[1], arrayPic);
		
		imgRepository.save(uploadImage);
	  
	  return new ResponseEntity<>(uploadImage,HttpStatus.OK);
	} // method uploadFile
	
	
}
