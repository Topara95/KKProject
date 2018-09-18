var news_url="../api/news/pages?page=0&size=5";
var news_add_url="../api/news";
var news_size;



//bind the on-change event
$(document).ready(function() {
  $("#upload-file-input").on("change", uploadFile);
  $("#upload-file-input-modify").on("change", uploadFileModify);
});

/**
 * Upload the file sending it via Ajax at the Spring Boot server.
 */
function uploadFile() {
  $.ajax({
    url: "api/news/uploadFile",
    type: "POST",
    data: new FormData($("#upload-file-form")[0]),
    enctype: 'multipart/form-data',
    processData: false,
    contentType: false,
    cache: false,
    success: function (data) {
      // Handle upload success
      // ...
    	$("#saveNews").attr('name',data.id)
    	toastr.success("slika uspesno upload-ovana");
    },
    error: function () {
      // Handle upload error
      // ...
    	toastr.error("slika nije upload-ovana");
    }
  });
} // function uploadFile

function uploadFileModify() {
	  $.ajax({
	    url: "api/news/uploadFile",
	    type: "POST",
	    data: new FormData($("#upload-file-form-modify")[0]),
	    enctype: 'multipart/form-data',
	    processData: false,
	    contentType: false,
	    cache: false,
	    success: function (data) {
	      // Handle upload success
	      // ...
	    	$("#upload-file-form-modify").attr('name',data.id)
	    	toastr.success("slika uspesno upload-ovana");
	    },
	    error: function () {
	      // Handle upload error
	      // ...
	    	toastr.error("slika nije upload-ovana");
	    }
	  });
	}




function generatePagination(){
	console.log("Generisem");
	
	$("#paginationList").append(`<li class="page-item"><a class="page-link" href="#">5</a></li>`);
	
}

function checkLogged(){
	console.log("checkiram");
	$.ajax({
		 url: "../api/news/checklogged",
		 method: "GET",
		 success: function(data){
			 loadNews();
			 loadAllNews();
			 $("#dodajv").attr('hidden',false);
		 },
		 error: function(){
			 toastr.error("Nemate pristup ovoj stranici");
			 $("#dodajv").attr('hidden',true);
		 }
	});
}


function loadAllNews(){
	var counter = 0;
	pagcounter = 0;
	$.ajax({
		 url: "../api/news",
		 method: "GET",
		 success: function(data){
			 if(data!=null){
				 for(i=0;i<data.length;i++){
					 pagcounter++;
					 if(pagcounter % 5 === 0){
						 counter++;
						 $("#paginationList").append(`<li class="page-item"><a name=`+counter+` class="page-link changepage" >`+counter+`</a></li>`);
					 }
				 }
				 counter++;
				 $("#paginationList").append(`<li class="page-item"><a name=`+counter+` class="page-link changepage" >`+counter+`</a></li>`);
			 }
		 },
		 error: function(){
			 toastr.error("Paginacija se ne moze generisati!");
		 }
	});
}

$(document).on('click','.changepage',function(){
	$("#paginationList").children().removeClass('active');
	var page = parseInt($(this).attr('name')) - 1;
	$(this).parent().addClass('active');
	console.log(page);
	news_url="../api/news/pages?page="+page+"&size=5";
	loadNews();
});

function loadNews(){
	$.ajax({
		 url: news_url,
		 method: "GET",
		 success: function(data){
			 if(data!=null){
				 $("#newsTable").empty();
				 for(i=0;i<data.content.length;i++){
					 $("#newsTable").append(`
							 <tr>
							 	<td>`+data.content[i].title+`</td>
							 	<td>`+data.content[i].creationDate+`</td>
							 	<td>`+data.content[i].creationTime+`</td>
							 	<td class="updateNews" data-toggle="modal" data-target="#promeniVestModal" id=`+data.content[i].id+`><img src="images/update.png"></td>
							 	<td class="deleteNews" id=`+data.content[i].id+`><img src="images/x-button.png"></td>
							 </tr>
					 `);
				 }
			 }
		 },
		 error: function(){
			 toastr.error("Vesti se ne mogu ucitati!");
		 }
	});
}

$(document).on('click','.deleteNews',function(){
	var id = $(this).attr('id');
	$.ajax({
		 url: "../api/news/"+id,
		 method: "DELETE",
		 success: function(data){
			 if(data!=null){
				 loadNews();
				 toastr.success("Uspesno ste obrisali vest!");
			 }
		 },
		 error: function(){
			 toastr.error("Vesti se ne mogu obrisati");
		 }
	});
});


$(document).on('click','.updateNews',function(e){
	e.preventDefault();
	var id = $(this).attr('id');
	$.ajax({
		 url: "../api/news/"+id,
		 method: "GET",
		 success: function(data){
			 if(data!=null){
				 $("#newsTitleModify").val(data.title);
				 $("#newsContentModify").val(data.content);
				 $("#upload-file-form-modify").attr('name',data.titleImg.id)
				 $("#newsVideoLinkModify").val(data.videoLink);
				 $("#saveNewsModify").attr('name',data.id);
			 }
		 },
		 error: function(){
			 toastr.error("Vest se ne moze ucitati!");
		 }
	});
});

$(document).on('click','#saveNews',function(e){
	e.preventDefault();
	$.ajax({
		type : 'POST',
		url : news_add_url+"/"+$("#saveNews").attr('name'),
		contentType : 'application/json',
		dataType : "json",
		data:formToJSON(),
		success : function(res) {
			toastr.success("Vest je dodata!")
			$('#unesiVestModal').modal('toggle');
			loadNews();
		},
		error : function(XMLHttpRequest, textStatus, errorThrown) {
			toastr.error("Vest nije dodata!");
		}
	});
});

$(document).on('click','#saveNewsModify',function(e){
	e.preventDefault();
	var id = $("#saveNewsModify").attr('name');
	var imgId = $("#upload-file-form-modify").attr('name');
	$.ajax({
		type : 'PUT',
		url : "../api/news/"+id+"/"+imgId,
		contentType : 'application/json',
		dataType : "json",
		data:formToJSONModify(),
		success : function(res) {
			toastr.success("Vest je azurirana!")
			$('#promeniVestModal').modal('toggle');
			loadNews();
		},
		error : function(XMLHttpRequest, textStatus, errorThrown) {
			toastr.error("Vest nije azurirana!");
		}
	});
});

function formToJSON() {
	var link = $('#newsVideoLink').val();
	var clink = [];
	if(!link.includes("embed") && link !== ""){
		clink = link.split("watch?v=");
		clink[0]+="embed/";
		link = clink[0]+clink[1];
	}
	return JSON.stringify({
    "title":$('#newsTitle').val(),
    "content":$('#newsContent').val(),
    "videoLink":link
	});
}

function formToJSONModify() {
	var link = $('#newsVideoLinkModify').val();
	var clink = [];
	if(!link.includes("embed") && link !== ""){
		clink = link.split("watch?v=");
		clink[0]+="embed/";
		link = clink[0]+clink[1];
	}
	return JSON.stringify({
    "title":$('#newsTitleModify').val(),
    "content":$('#newsContentModify').val(),
    "videoLink":link
	});
}

function onReturnHome(){
	window.location.href = "index.html";
}