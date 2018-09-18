var news_url="../api/news";
var news_p_url="../api/news/pages?page=0&size=6"

$(document).on('click','.changepage',function(){
	$("#paginationList").children().removeClass('active');
	var page = parseInt($(this).attr('name')) - 1;
	$(this).parent().addClass('active');
	console.log(page);
	news_p_url="../api/news/pages?page="+page+"&size=6";
	loadNews();
});
	
	
function loadPagination(){
	var counter = 0;
	var pagcounter = 0;
	$.ajax({
		 url: news_url,
		 method: "GET",
		 success: function(data){
			 if(data!=null){ 
				 for(i=0;i<data.length;i++){
					 pagcounter++;
					 if(pagcounter % 6 === 0){
						 counter++;
						 $("#paginationList").append(`<li class="page-item"><a name=`+counter+` class="page-link changepage" >`+counter+`</a></li>`);
					 }
				 }
				 counter++;
				 $("#paginationList").append(`<li class="page-item"><a name=`+counter+` class="page-link changepage" >`+counter+`</a></li>`);
				 $('#paginationList li:first').addClass('active');
			 }
		 },
		 error: function(){
			 toastr.error("Vesti se ne mogu ucitati!");
		 }
	});
}


function loadNews(){
	$.ajax({
		 url: news_p_url,
		 method: "GET",
		 success: function(data){
			 if(data!=null){
				 $("#newsContainer").empty();
				 for(i=0;i<data.content.length;i++){
					 var contsb = data.content[i].content.substring(0, 60);
					 contsb += "...";
					 $("#newsContainer").append(`
							 <div class="col-auto mb-3 d-flex align-items-stretch">
								 <div class="card" style="width: 18rem;">
								  <img class="card-img-top" src=../myImage/imageDisplay/`+data.content[i].titleImg.id+` alt="Card image cap">
								  <div class="card-body">
								    <h5 class="card-title">`+data.content[i].title+`</h5>
								    <p class="card-text">`+contsb+`</p>
								    <a href="" id=`+data.content[i].id+` class="btn btn-primary goToNews">Pročitaj</a>
								  </div>
								  <div class="card-footer">
								    <small class="text-muted">`+data.content[i].creationDate+` u `+data.content[i].creationTime+`</small>
							      </div>
								</div>
							</div>
					 `);
				 }
			 }
		 },
		 error: function(){
			 toastr.error("Vesti se ne mogu ucitati!");
		 }
	});
}

$(document).on('click','.goToNews',function(e){
	e.preventDefault();
	var id = $(this).attr('id');
	sessionStorage.setItem("currentNewsId",id);
	window.location.href = "news.html";
});
