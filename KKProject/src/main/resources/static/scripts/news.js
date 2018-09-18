var currId = sessionStorage.getItem("currentNewsId");

function generateNewsInfo(){
	$.ajax({
		 url: "../api/news/"+currId,
		 method: "GET",
		 success: function(data){
			 if(data!=null){
				$("#title").append(data.title);
				$("#date").append(data.creationDate +" u "+ data.creationTime)
				$("#titleImageHolder").append(`<img class="vestImg" src=../myImage/imageDisplay/`+data.titleImg.id+` alt="nema">`);
				$("#content").append(data.content);
				console.log(data.videoLink);
				if(data.videoLink != null && data.videoLink !== ""){
					console.log("AHJAJAOAOSJO");
					$("#videoHolder").append(`<iframe src=`+data.videoLink+` frameborder="0" 
					allow="autoplay; encrypted-media" allowfullscreen></iframe>`);
				}
			 }
		 },
		 error: function(){
			 toastr.error("Vest se ne moze ucitati!");
		 }
	});
}