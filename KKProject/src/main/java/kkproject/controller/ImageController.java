package kkproject.controller;

import java.io.IOException;
import java.util.Optional;

import javax.servlet.ServletException;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;

import kkproject.domain.ImageModel;
import kkproject.repository.ImageRepository;

@Controller
@RequestMapping("/myImage")
public class ImageController {



@Autowired
private ImageRepository imgRepository;

@RequestMapping(value = "/imageDisplay/{id}", method = RequestMethod.GET)
  public void showImage(@PathVariable("id") Long itemId, HttpServletResponse response,HttpServletRequest request) 
          throws ServletException, IOException{


    Optional<ImageModel> item = imgRepository.findById(itemId);        
    response.setContentType("image/jpeg, image/jpg, image/png, image/gif");
    response.getOutputStream().write(item.get().getPic());


    response.getOutputStream().close();
}
}