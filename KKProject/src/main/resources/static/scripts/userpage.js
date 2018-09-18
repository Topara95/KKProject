var loggeduser = JSON.parse(sessionStorage.getItem('loggedUser'));
var edit_url="../api/users/"+loggeduser.id
var requests_url = "../api/users/getRequests/"+loggeduser.id
var friends_url = "../api/users/getFriends/"+loggeduser.id
var theaters_url = "../api/culturalVenues/getTheaters"
var cinemas_url = "../api/culturalVenues/getCinemas"
var reservations_url = "../api/reservations/getAllForLogged"
var visits_url = "../api/reservations/getVisitsForLogged"

$(document).on('submit','.editform', function(e) {
	e.preventDefault();
	var p = $('#password').val();
	var cp = $('#password-confirm').val();
	if(p == cp){
		$.ajax({
			type : 'PUT',
			url : edit_url,
			contentType : 'application/json',
			dataType : "json",
			data:formToJSON(),
			success : function(data) {
				toastr.success("Your information was successfuly edited!");
				location.reload();
				sessionStorage.setItem('loggedUser',JSON.stringify(data));
			},
			error : function(XMLHttpRequest, textStatus, errorThrown) {
				alert("AJAX ERROR: " + errorThrown+"signin");
			}
		});
	}else{
		toastr.warning("Passwords must match!");
	}
});

function generateNavbar2(){
	$.ajax({
		 url: islogged_url,
		 method: "GET",
		 success: function(data){
			 var user = data;
			 if(user.email!=null){
				 $(".navitems").empty();
				 $(".navitems").append(`<li class="nav-item active">
	                <a class="nav-link" href="#">Home
	                  <span class="sr-only">(current)</span>
	                </a>
	              </li>
	              <li class="nav-item">
	                <a class="nav-link" href="fanzone.html">FanZone</a>
	              </li>
	              <li class="nav-item">
	                <a class="nav-link" href="#">About</a>
	              </li>
	              <li class="nav-item">
	                <a class="nav-link" href="#">Services</a>
	              </li>
	              <li class="nav-item">
	                <a class="nav-link" href="userpage.html">User `+user.name+` signed in</a>
	              </li>
	              <li class="nav-item">
	                <a class="nav-link" href="index.html" onclick="logout()">Sign out</a>
	              </li>`);
			 }else{
			    	$(".navitems").empty();
			    	$(".navitems").append(`<li class="nav-item active">
			                <a class="nav-link" href="#">Home
			                  <span class="sr-only">(current)</span>
			                </a>
			              </li>
			              <li class="nav-item">
			                <a class="nav-link" href="#">About</a>
			              </li>
			              <li class="nav-item">
			                <a class="nav-link" href="register.html">Register</a>
			              </li>
			              <li class="nav-item">
			                <a class="nav-link" href="signin.html">Sign in</a>
			              </li>`);
			 }
	        
	    },
	    error:function(data){
	    	
	    }
	 });
}

function formToJSON() {
	return JSON.stringify({
	"id":loggeduser.id,
	"email":loggeduser.email,
    "name":$('#name').val(),
    "surname":$('#surname').val(),
    "city":$('#city').val(),
    "phone":$('#phone').val(),
    "password":$('#password').val()
	});
}

function generateUserInfo(){
	document.getElementById("name").value = loggeduser.name;
	document.getElementById("surname").value = loggeduser.surname;
	document.getElementById("city").value = loggeduser.city;
	document.getElementById("phone").value = loggeduser.phone;
	document.getElementById("password").value = loggeduser.password;
	document.getElementById("password-confirm").value = loggeduser.password;
}

function generateProfile(){
	$("#profilediv").append(`<div class="row">
						    <div class="col-md-2">
						      <label><h6>Email:</h6></label>
						    </div>
						    <div class="col-md-10">
						      <i>`+loggeduser.email+`</i>
						    </div>
						  </div>
						  <div class="row">
						    <div class="col-md-2">
						      <label><h6>Name:</h6></label>
						    </div>
						    <div class="col-md-10">
						      <i>`+loggeduser.name+`</i>
						    </div>
						  </div>
						  <div class="row">
						    <div class="col-md-2">
						      <label><h6>Surname:</h6></label>
						    </div>
						    <div class="col-md-10">
						      <i>`+loggeduser.surname+`</i>
						    </div>
						  </div>
						  <div class="row">
						    <div class="col-md-2">
						      <label><h6>Address:</h6></label>
						    </div>
						    <div class="col-md-10">
						      <i>`+loggeduser.city+`</i>
						    </div>
						  </div>
						  <div class="row">
						    <div class="col-md-2">
						      <label><h6>Phone:</h6></label>
						    </div>
						    <div class="col-md-10">
						      <i>`+loggeduser.phone+`</i>
						    </div>
						  </div>`);
}

function getFriendRequests(){
	$.ajax({
		 url: requests_url,
		 method: "GET",
		 success: function(data){
			 $(".freqtable").empty();
			 for(i=0;i<data.length;i++){
				 $(".freqtable").append(`<tr>
                                <td>
                                   <span class="pull-xs-right font-weight-bold">`+data[i].name+` `+data[i].surname+`</span> sent you a friend request
                                   <span class="float-right"><button type="button" name=`+data[i].id+` class="btn btn-success btn-sm accreq">Accept</button>
                                   <button type="button" name=`+data[i].id+` class="btn btn-danger btn-sm decreq">Decline</button></span>
                                </td>
                            </tr>`);
			 }
		 },
		 error: function(){
			 alert("Error while getting friend requests!");
		 }
	});
}

function getFriends(){
	$.ajax({
		 url: friends_url,
		 method: "GET",
		 success: function(data){
			 $(".friendsTable").empty();
			 for(i=0;i<data.length;i++){
				 $(".friendsTable").append(`<tr>
                               <td>
                                  <span class="font-weight-bold">`+data[i].name+`  `+data[i].surname+` | `+data[i].email+` | `+data[i].city+` | `+data[i].phone+`</span>
                                  <span class="float-right"><a href="#"><img onclick="removeFriend(`+data[i].id+`)" src="images/remove.png" title="remove from friends"></img></a></span>
                               </td>
                           </tr>`);
			 }
		 },
		 error: function(){
			 alert("Error while getting Friends!");
		 }
	});
}

$(document).on('click','.accreq', function(e) {
	e.preventDefault();
	var id = $(this).attr('name');
	$.ajax({
		 url: "../api/users/approveFriendRequest/"+id,
		 method: "GET",
		 success: function(){
			 
				 getFriendRequests();
				 getFriends();
				 toastr.success("You have accepted a friend request!")
		 },
		 error: function(){
			 alert("Error approving request");
		 }
	});
});

$(document).on('click','.decreq', function(e) {
	e.preventDefault();
	//alert($(this).attr('name'));
	var id = $(this).attr('name');
	$.ajax({
		 url: "../api/users/declineRequest/"+id,
		 method: "GET",
		 success: function(){
			 
				 getFriendRequests();
				 toastr.info('You have declined a friend request!');
				 
			 
		 },
		 error: function(){
			 alert("Error approving request");
		 }
	});
});

$(document).on('click','#searchPeople',function(e){
	e.preventDefault();
	var name = $('#searchname').val();
	var surname = $('#searchsurname').val();
	var loggedId = loggeduser.id;
	if(name == ''){
		name = "nema";
	}
	if(surname ==''){
		surname="nema";
	}
	
	$.ajax({
		 url: "../api/users/search/"+name+"/"+surname,
		 method: "GET",
		 success: function(data){
			 $(".searchedpeople").empty();
			 for(i=0;i<data.length;i++){
				 if(data[i].id != loggedId){
					 $(".searchedpeople").append(`<tr>
	                         <td>
	                            <span class="font-weight-bold">`+data[i].name+`  `+data[i].surname+` | `+data[i].email+` | `+data[i].city+` | `+data[i].phone+`</span>
	                            <span class="float-right"><a href="#"><img src="images/sendRequest.png" onclick="sendFriendRequest(`+data[i].id+`)" title="send friend request"></img></a></span>
	                         </td>
	                     </tr>`);
				 }
			 }
				 
		 },
		 error: function(){
			 alert("Error searching people");
		 }
	});
});

function sendFriendRequest(receiverid){
	$.ajax({
		 url: "../api/users/sendFriendRequest/"+receiverid,
		 method: "GET",
		 success: function(){
			 toastr.success("Friend request sent!");
				 
		 },
		 error: function(){
			 toastr.error("Sending request failed. You have already sent one!");
		 }
	});
}

function removeFriend(removingId){
	$.ajax({
		 url: "../api/users/removeFriend/"+removingId,
		 method: "GET",
		 success: function(){
			 toastr.info("Friend removed!");
			 getFriends();
		 },
		 error: function(){
			 toastr.error("Error removing friend");
		 }
	});
}

function getTheaters(){
	$.ajax({
		 url: theaters_url,
		 method: "GET",
		 success: function(data){
			 $(".theatersTable").empty();
			 for(i=0;i<data.length;i++){
				 $(".theatersTable").append(`<tr>
                               <td><span class="font-weight-bold">`+data[i].name+`</span></td>
                              <td><span class="font-weight-bold">`+data[i].address+`</span></td>
                              <td><span class="font-weight-bold">`+data[i].description+`</span></td>
                              <td><button onclick="generateRepertoire(`+data[i].id+`)" id=`+data[i].id+` type="button" class="btn btn-info btn-sm" data-toggle="modal" data-target="#exampleModalR">Look</button></td>
                           </tr>`);
			 }
		 },
		 error: function(){
			 alert("Error while getting theaters!");
		 }
	});
}

function getCinemas(){
	$.ajax({
		 url: cinemas_url,
		 method: "GET",
		 success: function(data){
			 $(".cinemasTable").empty();
			 for(i=0;i<data.length;i++){
				 $(".cinemasTable").append(`<tr>
                              <td><span class="font-weight-bold">`+data[i].name+`</span></td>
                              <td><span class="font-weight-bold">`+data[i].address+`</span></td>
                              <td><span class="font-weight-bold">`+data[i].description+`</span></td>
                              <td><button onclick="generateRepertoire(`+data[i].id+`)" id=`+data[i].id+` type="button" class="btn btn-info btn-sm" data-toggle="modal" data-target="#exampleModalR">Look</button></td>
                          </tr>`);
			 }
		 },
		 error: function(){
			 alert("Error while getting cinemas!");
		 }
	});
}


function getVisits(){
	$.ajax({
		 url: visits_url,
		 method: "GET",
		 success: function(data){
			 $("#visits").empty();
			 for(i=0;i<data.length;i++){
				 $("#visits").append(`<tr>
                             <td><span class="font-weight-bold">`+data[i].projectionTime.eventProjection.projectionDate+`</span></td>
                             <td><span class="font-weight-bold">`+data[i].projectionTime.time+`</span></td>
                             <td><span class="font-weight-bold">`+data[i].projectionTime.eventProjection.event.name+`</span></td>
                             <td><button onclick="generateDetails(`+data[i].id+`)" name=`+data[i].id+` type="button" class="btn btn-info btn-sm" data-toggle="modal" data-target="#reservationsModal">Look</button></td>
                             <td><select id="combo`+data[i].projectionTime.eventProjection.event.id+`">
                             	<option id="5" name="5" value=5>5</option>
                             	<option id="4" name="4" value=4>4</option>
                             	<option id="3" name="3" value=3>3</option>
                             	<option id="2" name="2" value=2>2</option>
                             	<option id="1" name="1" value=1>1</option>
                             </select></td>
                             <td><button onclick="ocjeniEvent(this)" name="ocjeni`+data[i].projectionTime.eventProjection.event.id+`" type="button" class="btn btn-success">Confirm</button></td>
                         </tr>`);
			 }
		 },
		 error: function(){
			 alert("Error while getting visits!");
		 }
	});
}

function ocjeniEvent(obj) {
	var pokusaj = obj.name;
	var id = pokusaj.split("ocjeni")[1];
	//alert(id);
	var ocjena = $("#combo"+id+" option:selected").attr('name');
	//alert(ocjena);
	$.ajax({
		method : 'GET',
		url : "../api/events/rate/"+id+"/"+ocjena,
		success : function(data){
			console.log("uspjesno!");
			window.location.href = "userpage.html";
		},
		error: function(){
			console.log("neuspesno");
		}
	});
}

function getReservations(){
	$.ajax({
		 url: reservations_url,
		 method: "GET",
		 success: function(data){
			 $(".reservationsTable").empty();
			 for(i=0;i<data.length;i++){
				 $(".reservationsTable").append(`<tr>
                              <td><span class="font-weight-bold">`+data[i].projectionTime.eventProjection.projectionDate+`</span></td>
                              <td><span class="font-weight-bold">`+data[i].projectionTime.time+`</span></td>
                              <td><span class="font-weight-bold">`+data[i].projectionTime.eventProjection.event.name+`</span></td>
                              <td><button onclick="generateDetails(`+data[i].id+`)" name=`+data[i].id+` type="button" class="btn btn-info btn-sm" data-toggle="modal" data-target="#reservationsModal">Look</button></td>
                              <td><button onclick="cancelReservation(`+data[i].id+`)" type="button" class="btn btn-danger btn-sm" >Cancel</button></td>
                          </tr>`);
			 }
		 },
		 error: function(){
			 alert("Error while getting reservations!");
		 }
	});
}


function cancelReservation(id){
	$.ajax({
		 url: "../api/reservations/cancel/"+id,
		 method: "DELETE",
		 success: function(data){
			 getReservations();
			 toastr.warning("Reservation has been canceled");
		 },
		 error: function(){
			 toastr.error("You can't cancel the reservation. Projection starts in less than 30 minutes!");
		 }
	});
}

function generateDetails(id){
	$.ajax({
		 url: "../api/reservations/"+id,
		 method: "GET",
		 success: function(data){
			 var seats = [];
			 for(i=0;i<data.seats.length;i++){
				 var seatInfo = data.seats[i].row+"_"+data.seats[i].seatInRow;
				 seats.push(seatInfo);
			 }
			 $("#rmodalbody").empty();
				 $("#rmodalbody").append(`<form>
										  <div class="form-row">
										    <div class="col">
										      <h5>Date:</h5>
										    </div>
										    <div class="col">
										      <h5>`+data.projectionTime.eventProjection.projectionDate+`</h5>
										    </div>
										  </div>
										  <div class="form-row">
										    <div class="col">
										      <h5>Time:</h5>
										    </div>
										    <div class="col">
										      <h5>`+data.projectionTime.time+`</h5>
										    </div>
										  </div>
										  <div class="form-row">
										    <div class="col">
										      <h5>Venue:</h5>
										    </div>
										    <div class="col">
										      <h5>`+data.projectionTime.eventProjection.event.culturalVenue.name+`</h5>
										    </div>
										  </div>
										  <div class="form-row">
										    <div class="col">
										      <h5>Event:</h5>
										    </div>
										    <div class="col">
										      <h5>`+data.projectionTime.eventProjection.event.name+`</h5>
										    </div>
										  </div>
										  <div class="form-row">
										    <div class="col">
										      <h5>Hall:</h5>
										    </div>
										    <div class="col">
										      <h5>`+data.projectionTime.hall.hallId+`</h5>
										    </div>
										  </div>
										  <div class="form-row">
										    <div class="col">
										      <h5>Seats:</h5>
										    </div>
										    <div class="col">
										      <h5>`+seats+`</h5>
										    </div>
										  </div>
										  <div class="form-row">
										    <div class="col">
										      <h5>Total price:</h5>
										    </div>
										    <div class="col">
										      <h5>`+data.totalprice+` RSD</h5>
										    </div>
										  </div>
										</form>`);
		 },
		 error: function(){
			 alert("Error while getting reservation!");
		 }
	});
}

function generateRepertoire(id){
	$("#events").attr('disabled',false);
	$("#genProjectionDates").attr('disabled',false);
	$.ajax({
		 url: "../api/culturalVenues/"+id+"/getEvents",
		 method: "GET",
		 success: function(data){
			 $("#events").empty();
			 $("#projectiondiv").empty();
			 $("#timesdiv").empty();
			 $("#seatsdiv").empty();
			 $("#invitediv").empty();
			 for(i=0;i<data.length;i++){
				 $("#events").append(`<option id=`+data[i].id+`>`+data[i].name+`</option>`);
			 }
		 },
		 error: function(){
			 alert("Error while getting repertoire!");
		 }
	});
	
}

$(document).on('click','#genProjectionDates',function(e){
	e.preventDefault();
	$("#events").attr('disabled',true);
	$(this).attr('disabled',true);
	var id = $('#events option:selected').attr('id')
	$.ajax({
		 url: "../api/events/"+id+"/eventProjections",
		 method: "GET",
		 success: function(data){
			 $("#projectiondiv").empty();
			 $("#timesdiv").empty();
			 $("#seatsdiv").empty();
			 $("#invitediv").empty();
			 if(data.length != 0){
				 $("#projectiondiv").append(`<label for="projectiondates">Date: </label>`);
				 $("#projectiondiv").append(`<select id="projectiondates">
	                              	</select>
	                              	<button type="button" class="btn btn-info btn-sm" id="genProjectionTimes">Continue</button>`);
			 }
			 for(i=0;i<data.length;i++){
				 $("#projectiondates").append(`<option id=`+data[i].id+`>`+data[i].projectionDate+`</option>`);
			 }
		 },
		 error: function(){
			 alert("Error while getting projections!");
		 }
	});
});

$(document).on('click','#genProjectionTimes',function(e){
	$("#projectiondates").attr('disabled',true);
	$(this).attr('disabled',true);
	var eventId = $('#events option:selected').attr('id')
	var projectionId = $('#projectiondates option:selected').attr('id')
	$.ajax({
		 url: "../api/events/"+eventId+"/eventProjections/"+projectionId+"/projectionTimes",
		 method: "GET",
		 success: function(data){
			 $("#timesdiv").empty();
			 $("#seatsdiv").empty();
			 $("#invitediv").empty();
			 if(data.length != 0){
				 $("#timesdiv").append(`<label for="projectiontimes">Time and hall: </label>`);
				 $("#timesdiv").append(`<select id="projectiontimes">
	                              	</select>
	                              	<button type="button" class="btn btn-info btn-sm" id="genSeats">Continue</button>`);
			 }
			 for(i=0;i<data.length;i++){
				 $("#projectiontimes").append(`<option name=`+data[i].hall.id+` id=`+data[i].id+`>`+data[i].time+` Hall:`+data[i].hall.hallId+` Price:`+data[i].price+`</option>`);
			 }
		 },
		 error: function(){
			 alert("Error while getting projectiontimes!");
		 }
	});
});

$(document).on('click','#searchTheaters',function(e){
	e.preventDefault();
	var name = $('#theaterName').val();
	var address = $('#theaterAddress').val();
	var loggedId = loggeduser.id;
	if(name == ''){
		name = "nema";
	}
	if(address ==''){
		address="nema";
	}
	
	$.ajax({
		 url: "../api/culturalVenues/searchTheaters/"+name+"/"+address,
		 method: "GET",
		 success: function(data){
			 $(".theatersTable").empty();
			 for(i=0;i<data.length;i++){
				 $(".theatersTable").append(`<tr>
                         <td><span class="font-weight-bold">`+data[i].name+`</span></td>
                        <td><span class="font-weight-bold">`+data[i].address+`</span></td>
                        <td><span class="font-weight-bold">`+data[i].description+`</span></td>
                        <td><button onclick="generateRepertoire(`+data[i].id+`)" id=`+data[i].id+` type="button" class="btn btn-info btn-sm" data-toggle="modal" data-target="#exampleModalR">Look</button></td>
                     </tr>`);
			 }
				 
		 },
		 error: function(){
			 alert("Error searching theaters");
		 }
	});
});

$(document).on('click','#searchCinemas',function(e){
	e.preventDefault();
	var name = $('#cinemaName').val();
	var address = $('#cinemaAddress').val();
	var loggedId = loggeduser.id;
	if(name == ''){
		name = "nema";
	}
	if(address ==''){
		address="nema";
	}
	
	$.ajax({
		 url: "../api/culturalVenues/searchCinemas/"+name+"/"+address,
		 method: "GET",
		 success: function(data){
			 $(".cinemasTable").empty();
			 for(i=0;i<data.length;i++){
				 $(".cinemasTable").append(`<tr>
                         <td><span class="font-weight-bold">`+data[i].name+`</span></td>
                        <td><span class="font-weight-bold">`+data[i].address+`</span></td>
                        <td><span class="font-weight-bold">`+data[i].description+`</span></td>
                        <td><button onclick="generateRepertoire(`+data[i].id+`)" id=`+data[i].id+` type="button" class="btn btn-info btn-sm" data-toggle="modal" data-target="#exampleModalR">Look</button></td>
                     </tr>`);
			 }
				 
		 },
		 error: function(){
			 alert("Error searching cinemas");
		 }
	});
});