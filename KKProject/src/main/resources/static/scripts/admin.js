var adminlogin_url="../api/news/adminlogin";

$( document ).ready(function() {
	toastr.options = {
			  "closeButton": true,
			  "debug": false,
			  "newestOnTop": false,
			  "progressBar": false,
			  "positionClass": "toast-bottom-center",
			  "preventDuplicates": false,
			  "onclick": null,
			  "showDuration": "300",
			  "hideDuration": "1000",
			  "timeOut": "5000",
			  "extendedTimeOut": "1000",
			  "showEasing": "swing",
			  "hideEasing": "linear",
			  "showMethod": "fadeIn",
			  "hideMethod": "fadeOut"
			}
});


$(document).on('click','#adminlogin',function(e){
	e.preventDefault();
	$.ajax({
		type : 'POST',
		url : adminlogin_url,
		contentType : 'application/json',
		dataType : "text",
		data:formToJSON(),
		success : function(res) {
			sessionStorage.setItem("logged",res);
			toastr.success("Uspešno ste se ulogovali!")
			window.location.href = "admindashboard.html";
		},
		error : function(XMLHttpRequest, textStatus, errorThrown) {
			toastr.error("Niste uneli ispravne podatke!");
		}
	});
});

function formToJSON() {
	return JSON.stringify({
    "username":$('#inputUsername').val(),
    "password":$('#inputPassword').val()
	});
}