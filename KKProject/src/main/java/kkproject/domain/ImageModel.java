package kkproject.domain;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.Lob;
import javax.persistence.Table;

@Entity
@Table(name="image_model")
public class ImageModel {
	
	@Id
	@GeneratedValue(strategy = GenerationType.AUTO)
    private Long id;
	
    @Column(name = "name")
	private String name;
    
    @Column(name = "type")
	private String type;
	
	@Lob
    @Column(name="pic")
    private byte[] pic;
	
	public ImageModel(){}
	
	public ImageModel(String name, String type, byte[] pic){
		this.name = name;
		this.type = type;
		this.pic = pic;
	}
	
	public Long getId(){
		return this.id;
	}
	
	public void setId(Long id){
		this.id = id;
	}
	
	public String getName(){
		return this.name;
	}
	
	public void setName(String name){
		this.name = name;
	}
	
	public String getType(){
		return this.type;
	}
	
	public void setType(String type){
		this.type = type;
	}
	
	public byte[] getPic(){
		return this.pic;
	}
	
	public void setPic(byte[] pic){
		this.pic = pic;
	}
}
