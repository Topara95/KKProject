package kkproject.domain;

import java.util.Date;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.OneToOne;
import javax.persistence.Table;
import javax.persistence.Temporal;
import javax.persistence.TemporalType;

@Entity
@Table(name= "vesti")
public class News {
	
	@Id
	@GeneratedValue(strategy = GenerationType.AUTO)
	private Long id;
	
	@Column(nullable = false, name="naslov")
	private String title;
	
	@Column(nullable = false, name="sadržaj")
	private String content;
	
	@OneToOne
	private ImageModel titleImg;
	
	@Column(name="datum")
	@Temporal(TemporalType.DATE)
	private Date creationDate;
	
	@Column(name="vreme")
	@Temporal(TemporalType.TIME)
	private Date creationTime;
	
	@Column(name="video")
	private String videoLink;
	
	@Column(name="sortstamp")
	@Temporal(TemporalType.TIMESTAMP)
	private Date sortstamp;
	
	public News(){
		this.creationDate = new Date();
		this.creationTime = new Date();
		this.sortstamp = new Date();
	}
	
	public News(String title, String content, ImageModel titleImg, String videoLink){
		this.title = title;
		this.content = content;
		this.titleImg = titleImg;
		this.creationDate = new Date();
		this.creationTime = new Date();
		this.videoLink = videoLink;
	}

	public Long getId() {
		return id;
	}

	public void setId(Long id) {
		this.id = id;
	}

	public String getTitle() {
		return title;
	}

	public void setTitle(String title) {
		this.title = title;
	}

	public String getContent() {
		return content;
	}

	public void setContent(String content) {
		this.content = content;
	}

	public Date getCreationDate() {
		return creationDate;
	}

	public void setCreationDate(Date creationDate) {
		this.creationDate = creationDate;
	}

	public Date getCreationTime() {
		return creationTime;
	}

	public void setCreationTime(Date creationTime) {
		this.creationTime = creationTime;
	}

	public String getVideoLink() {
		return videoLink;
	}

	public void setVideoLink(String videoLink) {
		this.videoLink = videoLink;
	}

	public ImageModel getTitleImg() {
		return titleImg;
	}

	public void setTitleImg(ImageModel titleImg) {
		this.titleImg = titleImg;
	}

	public Date getSortstamp() {
		return sortstamp;
	}

	public void setSortstamp(Date sortstamp) {
		this.sortstamp = sortstamp;
	}
}
