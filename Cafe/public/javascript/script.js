

// admin 계정일 때만 실행되도록 하기
// 정보 출력
var isLogin = 0;
(function(){ 
	if(isLogin == 0){
		loadInfo();
		loadCart();
		loadUser();
		loadOrder();
		loadRank();
	}
})();


// 5초 마다 주문 목록 불러오기 
window.setInterval(function(){
	loadOrder();
	loadRank();
}, 5000);


//회원정보 출력
function loadInfo(){

	$.ajax({
		type : "POST",                      
		url : "/info",
		success : function(res){
			if(res.result == "success"){
				var i;
				var res_users = res.users;
				var login_id = res.member_id;
				var info = ['info_name', 'info_stamp', 'info_name2', 'info_id', 'info_phone', 'info_coupon', 'info_birth', 'info_favorite'];
				for(i = 0; i < info.length; i++)
				{
					$('#'+ info[i]).empty();
				}

				$('#info_name').append(res_users.name + "님");
				$('#info_stamp').append(res_users.stamp);
				$('#info_name2').append(res_users.name);
				$('#info_id').append(res_users.user_id);
				$('#info_phone').append(res_users.phone);
				$('#info_coupon').append(res_users.coupon);
				$('#info_birth').append(res_users.birth);
				$('#info_favorite').append(res_users.favorite);
				console.log("info load success");
			}else{
				console.log("info load failed");
			}
		}
	});	
}

// 장바구니 출력 

function loadCart(){

	var checkBtn = $(this);
	var tr = checkBtn.parent().parent();
	var td = tr.children();
	var cart_num = td.eq(0).text();
	$.ajax({
		type : "POST",                       
		url : "/cart",
		success : function(res){
			if(res.result == "success"){
				var i;
				var total_number = 0;
				var total_price = 0;
				var id = res.member_id;
				var res_cart = res.carts;
				var parts = ['C_name', 'C_num', 'C_price', 'C_option', 'C_cancel'];
				var btn = '<input type="button" id="cancelBtn" value="삭제"/>';
				var btn2 = '<input type="hidden" id="cart_num"/>';
				var shot;
				var takeout;

				$('#cart_table > tbody').empty();
				$('#total_num').empty();
				$('#total_price').empty();

				
				if(id != null){
					for(i = 0; i < res_cart.length; i++){

						if(res_cart[i].shot == 1){
							shot = "O";
						}else{
							shot = "X";							
						}
						if(res_cart[i].takeout == 1){
							takeout = "O";
						}else{
							takeout = "X";
						}
						
											
						$('#cart_table > tbody:last').append('<tr><td class="hidden">' + res_cart[i].id + '</td><td>' + btn + '</td><td>' + res_cart[i].coffee_name + '</td><td>' + "사이즈 : " + res_cart[i].size  + "<br>" + "샷추가 :  " + shot + "<br>" + "테이크아웃 :  " + takeout +'</td><td>' +  addComma(res_cart[i].coffee_price) + "원" + '</td><td>' +  res_cart[i].number + "개" + '</td><td>' + addComma(res_cart[i].number * res_cart[i].coffee_price) + "원" + '</td></tr>');
						total_number += parseInt(res_cart[i].number);
						total_price = total_price + (res_cart[i].number * res_cart[i].coffee_price);
					}
					
					
				}
				
				$('#total_num').append(total_number + "개");
				$('#total_price').append(addComma(total_price) + "원");
				console.log("cart load success");
			}else{
				console.log("cart load failed");
			}
		}
	});	
}

// 주문 목록 출력
function loadOrder(){

	var checkBtn = $(this);
	var tr = checkBtn.parent().parent();
	var td = tr.children();
	var order_num = td.eq(0).text();;  
	$.ajax({
		type : "POST",                       
		url : "/order2",
		success : function(res){
			if(res.result == "success"){
				var i, j = 0;
				var total_number = 0;
				var id = res.member_id;
				var res_order = res.orderlists;
				var res_requirement = res.order_requirements;
				var parts = ['U_name','C_name', 'C_num', 'C_option', 'C_complete', 'order_time'];
				var btn = '<input type="button" id="completeBtn" value="완료"/>';
				var btn2 = '<input type="hidden" id="order_num"/>';
				var shot;
				var takeout;

				$('#order2_table > tbody').empty();
				$('#total_num2').empty();
				if(id != null){
					for(i = 0; i < res_order.length; i++){

						if(res_order[i].shot == 1){
							shot = "O";
						}else{
							shot = "X";
						}

						if(res_order[i].takeout == 1){
							takeout = "O";
						}else{
							takeout = "X";
						}

						if(res_order[i].id == res_requirement[j].id){
							$('#order2_table > tbody:last').append('<tr><td class="hidden">' + res_order[i].id + '</td><td>' + btn + '</td><td>' + res_order[i].user_id + '</td><td>'  + res_order[i].coffee_name + '</td><td>' + "사이즈 : " + res_order[i].size  + "<br>" + "샷추가 :  " + shot + '</td><td>' +  takeout + '</td><td>' + res_order[i].order_time + '</td><td>' + res_requirement[j].requirement + '</td><td>' + res_order[i].number + "개" + '</td></tr>');
							total_number += parseInt(res_order[i].number);
							j++;
						}else{
							$('#order2_table > tbody:last').append('<tr><td class="hidden">' + res_order[i].id + '</td><td>' + btn + '</td><td>' + res_order[i].user_id + '</td><td>'  + res_order[i].coffee_name + '</td><td>' + "사이즈 : " + res_order[i].size  + "<br>" + "샷추가 :  " + shot + '</td><td>' +  takeout + '</td><td>' + res_order[i].order_time + '</td><td>' + " " + '</td><td>' + res_order[i].number + "개" + '</td></tr>');
							total_number += parseInt(res_order[i].number);
						}
						
						
					}
					
					
				}
				
				$('#total_num2').append(total_number + "개");

				console.log("order load success");
			}else{
				console.log("order load failed");
			}
		}
	});	
}

// 총 매출 목록 출력
function loadSales(res){

	if(res.result == "success"){
		var i;
		var total_cost = 0;
		var id = res.member_id;
		var res_order = res.sales;

		$('#sales_table > tbody').empty();
		$('#total_cost').empty();

		if(id != null){
			for(i = 0; i < res_order.length; i++){
				$('#sales_table > tbody:last').append('<tr><td>' + res_order[i].id + '</td><td>' + res_order[i].user_id + '</td><td>' + res_order[i].coffee_name + '</td><td>'  + res_order[i].number + "개" + '</td><td>' + res_order[i].order_time + '</td><td>' + addComma(res_order[i].cost) + "원" + '</td><tr>');
				total_cost += parseInt(res_order[i].cost);
			}

		}

		$('#total_cost').append(addComma(total_cost) + "원");

		console.log("sales load success");
	}else if(res.result == "date_sales_failed" || res.result == "month_sales_failed"){
		alert('날짜를 입력해주세요.');
	}else{
		alert('아이디를 입력해주세요.');
	}
}

/*
// 날짜별 매출 목록 출력
function loadSales2(){

	var checkBtn = $(this);
	var tr = checkBtn.parent().parent();
	var td = tr.children();

	$.ajax({
		type : "POST",                       
		url : "/date_sales",
		success : function(res){
			if(res.result == "success"){
				var i;
				var total_cost = 0;
				var id = res.member_id;
				var res_order = res.sales;

				$('#sales_table > tbody').empty();
				$('#total_cost').empty();

				if(id != null){
					for(i = 0; i < res_order.length; i++){
						$('#sales_table > tbody:last').append('<tr><td>' + res_order[i].id + '</td><td>' + res_order[i].user_id + '</td><td>' + res_order[i].coffee_name + '</td><td>'  + res_order[i].number + "개" + '</td><td>' + res_order[i].order_time + '</td><td>' + addComma(res_order[i].cost) + "원" + '</td><tr>');
						total_cost += parseInt(res_order[i].cost);
					}

				}
				
				$('#total_cost').append(addComma(total_cost) + "원");

				console.log("sales load success");
			}else{
				console.log("sales load failed");
			}
		}
	});	
}

// 회원별 매출 목록 출력
function loadSales3(){

	var checkBtn = $(this);
	var tr = checkBtn.parent().parent();
	var td = tr.children();
	$.ajax({
		type : "POST",                       
		url : "/id_sales",
		success : function(res){
			if(res.result == "success"){
				var i;
				var total_cost = 0;
				var id = res.member_id;
				var res_order = res.sales;

				$('#sales_table > tbody').empty();
				$('#total_cost').empty();

				if(id != null){
					for(i = 0; i < res_order.length; i++){
						$('#sales_table > tbody:last').append('<tr><td>' + res_order[i].id + '</td><td>' + res_order[i].user_id + '</td><td>' + res_order[i].coffee_name + '</td><td>'  + res_order[i].number + "개" + '</td><td>' + res_order[i].order_time + '</td><td>' + addComma(res_order[i].cost) + "원" + '</td><tr>');
						total_cost += parseInt(res_order[i].cost);
					}

				}
				
				$('#total_cost').append(addComma(total_cost) + "원");

				console.log("sales load success");
			}else{
				console.log("sales load failed");
			}
		}
	});	
}
*/

// 회원 목록 출력
function loadUser(){

	var checkBtn = $(this);
	var tr = checkBtn.parent().parent();
	var td = tr.children();
	var order_num = td.eq(0).text();;  
	$.ajax({
		type : "POST",                       
		url : "/customer",
		success : function(res){
			if(res.result == "success"){
				var i;
				var total_number = 0;
				var id = res.member_id;
				var res_user = res.users;
				var parts = ['U_id','U_name', 'U_birth', 'U_favorite', 'U_order_date', 'U_order_num'];

				$('#user_table > tbody').empty();

				if(id != null){
					for(i = 0; i < res_user.length; i++){

						$('#user_table > tbody:last').append('<tr><td>' + (res_user[i].id - 1) + '</td><td>' + res_user[i].user_id + '</td><td>' + res_user[i].name + '</td><td>'  + res_user[i].birth + '</td><td>' + res_user[i].phone  +  '</td><td>' + res_user[i].favorite + '</td><td>' +  res_user[i].recent_order_time + '</td><td>' + res_user[i].total_order_num + "개" + '</td></tr>');
					}					
				}

				console.log("user load success");
			}else{
				console.log("user load failed");
			}
		}
	});	
}

// 커피 순위 출력
function loadRank(){
	$.ajax({
		type : "POST",                       
		url : "/coffee_rank",
		success : function(res){
			if(res.result == "success"){
				var i;
				var res_sales = res.sales;
				var parts = ['coffee_name', 'number'];
				for(i = 0; i < res_sales.length; i++)
				{	
					$("#rank_table > tbody:last").append( '<tr><td>' + (i + 1)  +  '</td><td>' +res_sales[i].coffee_name + '</td><td>' +  res_sales[i].number + '</td></tr>');
				}


				console.log("student info load success");
			}else{
				console.log("student info load failed");
			}
		}
	});	
}

// 3자리수마다 콤마 삽입

function addComma(num) {
	var regexp = /\B(?=(\d{3})+(?!\d))/g;
	return num.toString().replace(regexp, ',');
}

//사이드 메뉴바

function openNav() {
	document.getElementById("mySidenav").style.width = "200px";
	document.getElementById("overlay").style.opacity = "0.5";
}

function closeNav() {
	document.getElementById("mySidenav").style.width = "0";
	setTimeout(function(){
		document.getElementById("overlay").style.opacity = "1";
	}, 400);
}


//주문하기

function order(){
	$.ajax({
		type : "POST",                       
		url : "/order",
		success : function(res){
			if(res.result == "success"){
				console.log("order success");
				alert("주문 완료되었습니다.");
			}else{
				console.log("order failed");
				alert("주문 실패하였습니다.");
			}
		}
	});	
}


// 배너 
$(document).ready(function() {
	var $banner = $(".banner").find("ul");

	var $bannerWidth = $banner.children().outerWidth();//이미지의 폭
	var $bannerHeight = $banner.children().outerHeight(); // 높이
	var $length = $banner.children().length;//이미지의 갯수
	var rollingId;

	//정해진 초마다 함수 실행
	rollingId = setInterval(function() { rollingStart(); }, 4000);//다음 이미지로 롤링 애니메이션 할 시간차

	function rollingStart() {
		$banner.css("width", $bannerWidth * $length + "%");
		$banner.css("height", $bannerHeight + "px");
		//alert(bannerHeight);
		//배너의 좌측 위치를 옮겨 준다.
		$banner.animate({left: - $bannerWidth + "px"}, 2000, function() { //숫자는 롤링 진행되는 시간이다.
			//첫번째 이미지를 마지막 끝에 복사(이동이 아니라 복사)해서 추가한다.
			$(this).append("<li>" + $(this).find("li:first").html() + "</li>");
			//뒤로 복사된 첫번재 이미지는 필요 없으니 삭제한다.
			$(this).find("li:first").remove();
			//다음 움직임을 위해서 배너 좌측의 위치값을 초기화 한다.
			$(this).css("left", 0);
			//이 과정을 반복하면서 계속 롤링하는 배너를 만들 수 있다.
		});
	}
}); 



$(function(){

	// 옵션 선택창(바로 주문)

	$(".OrderBtn").click(function(){
		var modal = document.getElementById('myModal');
		modal.style.display = "block";
        // Get the button that opens the modal
        // Get the <span> element that closes the modal
        var span = document.getElementsByClassName("close")[0];                                          
        var num = $(this).attr("value");	
        // When the user clicks on the button, open the modal 
        $('#btn0').attr({
        	'value' : "주문하기",

        });
        $('#coffee_num').attr('value', num);
        // When the user clicks on <span> (x), close the modal
        span.onclick = function() {
        	modal.style.display = "none";
        }

        // When the user clicks anywhere outside of the modal, close it
        window.onclick = function(event) {
        	if (event.target == modal) {
        		modal.style.display = "none";
        	}
        }
    });

	// 옵션 선택창(장바구니 담기)

	$(".PutInBtn").click(function(){
		var modal = document.getElementById('myModal');
		modal.style.display = "block";
        // Get the button that opens the modal
        // Get the <span> element that closes the modal
        var span = document.getElementsByClassName("close")[0];                                          
        var num =  $(this).attr("value");

        // When the user clicks on the button, open the modal 
        $('#btn0').attr({
        	'value' : "담기",

            //'onclick' : 'loadCart()'
        });
        $('#coffee_num').attr('value', num);

        // When the user clicks on <span> (x), close the modal
        span.onclick = function() {
        	modal.style.display = "none";
        }

        // When the user clicks anywhere outside of the modal, close it
        window.onclick = function(event) {
        	if (event.target == modal) {
        		modal.style.display = "none";
        	}
        }
    });

	
	// 로그아웃

	$("#LogoutBtn").click(function(){
		$.ajax({
			type : "POST",                       
			url : "/logout",
			success : function(res){
				if(res.result == "success"){
					console.log("logout success");
					window.location.href = "/";
				}else{
					console.log("logout failed");
				}
			}
		});	
	});

	// 아이디 찾기
	$("#find_idBtn").click(function(){
		var formData = $("#FindID").serialize();
		$.ajax({
			type : "POST",                       
			url : "/find_id",
			data : formData,	
			success : function(res){
				if(res.result == "success"){
					var id = res.user.user_id;
					alert("회원님의 아이디는 \"" + id + "\"입니다.");
					console.log("id find success");
					window.location.href = "/login";
				}else{
					alert("입력하신 정보로 등록된 회원이 없습니다.");
					console.log("id find failed");
				}
			}
		});	
	});

	// 비밀번호 찾기
	$("#find_pwBtn").click(function(){
		var formData = $("#FindPW").serialize();
		$.ajax({
			type : "POST",                       
			url : "/find_pw",
			data : formData,
			success : function(res){
				if(res.result == "success"){
					var pw = res.user.password;
					alert("회원님의 비밀번호는 \"" + pw + "\"입니다.");
					console.log("pw find success");
					window.location.href = "/login";
				}else{
					alert("입력하신 정보로 등록된 회원이 없습니다.");
					console.log("pw find failed");
				}
			}
		});	
	});


	//로그인 
	$("#LoginBtn").click(function(){
		var formData = $("#LoginForm").serialize();
		$.ajax({
			type : "POST",                       
			url : "/login",
			data : formData,
			success : function(res){
				if(res.result == "admin success"){
					console.log("admin login success");
					window.location.href = "/manage";
				}else if(res.result == "member success"){
					console.log("member login success");
					isLogin = 1;
					window.location.href = "/";
				}else{
					if(res.result == "failed"){
						console.log("login failed");
						alert("아이디 또는 비밀번호를 확인해주세요.");
					}else if(res.result == "id_empty"){
						console.log("login failed");
						alert("아이디를 입력해주세요.");
					}else if(res.result == "pw_empty"){
						console.log("login failed");
						alert("비밀번호를 입력해주세요.");
					}else if(res.result == "empty"){
						console.log("login failed");
						alert("아이디와 비밀번호를 입력해주세요.");
					}
				} 
			}
		});
	});

	
	//회원가입
	$("#RegisterBtn").click(function(){
		var formData = $("#RegisterForm").serialize();
		$.ajax({
			type : "POST",                       
			url : "/sign_up",
			data : formData,
			success : function(res){
				if(res.result == "success"){
					console.log("id register success");
					window.location.href = "/";
				}else{
					if(res.result == "check failed"){
						console.log("id check failed");
						alert("아이디 중복체크를 해주세요.");
					}else if(res.result == "pw failed"){
						console.log("pw check failed");
						alert("비밀번호와 비밀번호 확인이 다릅니다.");
					}else if(res.result == "empty"){
						console.log("register failed");
						alert("기본정보를 모두 입력해주세요.");
					}
					
				}
			}
		});
	});

	//아이디 중복확인 버튼(회원가입)

	$("#checkIDbtn").click(function(){
		var formData = $("#register_id");
		$.ajax({
			type : "POST",                       
			url : "/checkID",
			data : formData,
			success : function(res){
				if(res.result == "success"){
					document.getElementById("checkID").value = 'checked';
					console.log("id check success");
					alert("사용 가능합니다.");
				}else if(res.result == "failed"){
					console.log("id check failed");
					alert("입력하신 아이디가 이미 존재합니다.");
				}else if(res.result == "input_failed"){
					console.log("id check failed");
					alert("아이디를 입력해주세요.");
				}										
				
			}
		});
	});




	//주문하기 or 담기 버튼

	$(document).on("click","#btn0",function(){
		location.href = "/order";
		var check = $(this).attr('value');
		var number = $("#coffee_num").attr('value');
		$("#coffee_value").attr('value', number);
		var formData = $("#OptionForm").serialize();

		if(check == "주문하기"){        	
			$.ajax({
				type : "POST",                       
				url : "/order",
				data : formData,
				success : function(res){
					if(res.result == "success"){						
						console.log("send success");
					}else{
						if(res.result == "failed"){
							alert("재료 소진으로 주문 불가능합니다.");
							console.log("send failed");
						}				
					}
				}
			});
		}else if(check == "담기"){
			$("#OptionForm").attr('action', "/menu");
			$.ajax({
				type : "POST",                       
				url : "/put_in",
				data : formData,
				success : function(res){
					if(res.result == "success"){						
						console.log("put success");
					}else{
						if(res.result == "failed"){
							alert("재료 소진으로 주문 불가능합니다.");
							console.log("put failed");
						}				
					}
				}
			});
		}

		
	});

	// 삭제 버튼
	$(document).on("click","#cancelBtn",function(){
		var checkBtn = $(this);
		var tr = checkBtn.parent().parent();
		var td = tr.children();
		var cart_num = td.eq(0).text();  
		$.ajax({
			type : "POST",                       
			url : "/remove_cart",
			data : {num : cart_num},
			success : function(res){
				if(res.result == "success"){
					loadCart();
					console.log("remove success");
				}else{
					if(res.result == "failed"){
						console.log("remove failed");
					}

					
				}
			}
		});
	});

	// 전체 삭제 버튼
	$(document).on("click","#All_cancelBtn",function(){
		alert("전체 삭제");
		$.ajax({
			type : "POST",                       
			url : "/all_remove_cart",
			success : function(res){
				if(res.result == "success"){
					loadCart();
					console.log("all remove success");
				}else{
					if(res.result == "failed"){
						console.log("all remove failed");
					}

					
				}
			}
		});
	});

	// 완료 버튼
	$(document).on("click","#completeBtn",function(){

		var checkBtn = $(this);
		var tr = checkBtn.parent().parent();
		var td = tr.children();
		var order_num = td.eq(0).text();
		var user_id = td.eq(2).text();

		if (confirm("주문을 완료처리 하시겠습니까?\n(주문 고객님에게 알림이 갑니다.)")) {
			$.ajax({
				type : "POST",                       
				url : "/complete_order",
				data : {user_id : user_id, num : order_num},
				success : function(res){
					if(res.result == "success"){
						loadOrder();
						console.log("complete success");
					}else{
						if(res.result == "failed"){
							console.log("complete failed");
						}
					}
				}
			});
		} else {
    		// Do nothing!
    	}    

    });

	// 전체 완료 버튼
	$(document).on("click","#All_completeBtn",function(){

		if (confirm("모든 주문을 완료처리 하시겠습니까?\n(모든 주문 고객님들에게 알림이 갑니다.)")) {
			$.ajax({
				type : "POST",                       
				url : "/all_complete_order",
				success : function(res){
					if(res.result == "success"){
						loadOrder();
						console.log("all complete success");
					}else{
						if(res.result == "failed"){
							console.log("all complete failed");
						}				
					}
				}
			});
		} else {
    		// Do nothing!
    	}    

    });

	// 결제하기
	$("#OrderBtn").click(function(){
		var checkBtn = $("#cancelBtn");
		var tr = checkBtn.parent().parent();
		var td = tr.children();
		var cart_num = td.eq(0).text();
		var requirement = $("#requirement");

		if(cart_num == ""){
			alert("장바구니를 채워주세요.");
		}else{
			var requirement = $("#order_requirement");
			if(confirm("결제하시겠습니까?")){
				$.ajax({
					type : "POST",                       
					url : "/order",
					data : requirement,
					success : function(res){
						if(res.result == "success"){						
							console.log("order success");
						}else{
							if(res.result == "failed"){
								alert("재료 소진으로 주문 불가능합니다.");
								console.log("put failed");
							}				
						}
					}
				});
				window.location.href = "/";

			}else{

			}
		} 
		
	});

	// 총 매출 리스트 불러오기
	$("#SalesBtn_total").click(function(){
		var checkBtn = $(this);
		var tr = checkBtn.parent().parent();
		var td = tr.children();
		$.ajax({
			type : "POST",                       
			url : "/total_sales",
			success : function(res){
				loadSales(res);
			}
		});		
	});


	// 날짜별 매출 리스트 불러오기
	$("#SalesBtn_date").click(function(){
		var formData = $("#sales_date");
		var checkBtn = $(this);
		var tr = checkBtn.parent().parent();
		var td = tr.children();
			
		$.ajax({
			type : "POST",                       
			url : "/date_sales",
			data : formData,
			success : function(res){
				loadSales(res);
			}
		});	
	});

	// 월별 매출 리스트 불러오기
	$("#SalesBtn_month").click(function(){
		var formData = $("#sales_month");
		var checkBtn = $(this);
		var tr = checkBtn.parent().parent();
		var td = tr.children();

		$.ajax({
			type : "POST",                       
			url : "/month_sales",
			data : formData,
			success : function(res){
				loadSales(res);
			}
		});	
	});

	// 고객별 매출 리스트 불러오기
	$("#SalesBtn_id").click(function(){
		var formData = $("#sales_id");
		var checkBtn = $(this);
		var tr = checkBtn.parent().parent();
		var td = tr.children();

		$.ajax({
			type : "POST",                       
			url : "/id_sales",
			data : formData,
			success : function(res){
				loadSales(res);
			}
		});	
	});

	// 달력
	$(function() {
		$( "#sales_date" ).datepicker({
			dateFormat: 'yy-mm-dd',
			prevText: '이전 달',
			nextText: '다음 달',
			monthNames: ['1월','2월','3월','4월','5월','6월','7월','8월','9월','10월','11월','12월'],
			monthNamesShort: ['1월','2월','3월','4월','5월','6월','7월','8월','9월','10월','11월','12월'],
			dayNames: ['일','월','화','수','목','금','토'],
			dayNamesShort: ['일','월','화','수','목','금','토'],
			dayNamesMin: ['일','월','화','수','목','금','토'],
			showMonthAfterYear: true,
			changeMonth: true,
			changeYear: true,
		});
	});

	$(function() {
		$( "#sales_month" ).monthpicker({

			monthNames: ['1월','2월','3월','4월','5월','6월','7월','8월','9월','10월','11월','12월'],
			monthNamesShort: ['1월','2월','3월','4월','5월','6월','7월','8월','9월','10월','11월','12월'],

		});
	});
});

