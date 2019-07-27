
var express = require('express');
let models = require('../models');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
	var id = req.cookies.member_id;
	res.render('main', {member_id : id});
});

router.get('/main', function(req, res, next){
	var id = req.cookies.member_id;

	res.render('main', {member_id : id});
});

router.get('/login', function(req, res, next){
	var id = req.cookies.member_id;

	res.render('login', {member_id : id});
});

router.get('/sign_up', function(req, res, next){
	var id = req.cookies.member_id;

	res.render('sign_up', {member_id : id});
});

router.get('/cart', function(req, res, next){
	var id = req.cookies.member_id;
	
	res.render('cart', {member_id : id});
});

router.get('/find_id', function(req, res, next){
	var id = req.cookies.member_id;

	res.render('find_id', {member_id : id});
});

router.get('/find_pw', function(req, res, next){
	var id = req.cookies.member_id;

	res.render('find_pw', {member_id : id});
});

router.get('/about', function(req, res, next){
	var id = req.cookies.member_id;

	res.render('about', {member_id : id});
});

router.get('/contact', function(req, res, next){
	var id = req.cookies.member_id;

	res.render('contact', {member_id : id});
});

router.get('/menu', function(req, res, next){
	var id = req.cookies.member_id;

	res.render('menu', {member_id : id});
});

router.get('/events', function(req, res, next){
	var id = req.cookies.member_id;

	res.render('events', {member_id : id});
});

router.get('/info', function(req, res, next){
	var id = req.cookies.member_id;

	res.render('info', {member_id : id});
});

router.get('/manage', function(req, res, next){
	var id = req.cookies.member_id;

	res.render('manage', {member_id : id});
});

router.get('/order', function(req, res, next){
	var id = req.cookies.member_id;

	res.render('order', {member_id : id});
});

router.get('/sales', function(req, res, next){
	var id = req.cookies.member_id;

	res.render('sales', {member_id : id});
});

router.get('/ingredient', function(req, res, next){
	var id = req.cookies.member_id;

	res.render('ingredient', {member_id : id});
});

router.get('/customer', function(req, res, next){
	var id = req.cookies.member_id;

	res.render('customer', {member_id : id});
});

router.get('/shop', function(req, res, next){
	var id = req.cookies.member_id;

	res.render('shop', {member_id : id});
});




// 아이디 체크 o
router.post('/checkID', function(req, res, next){
	console.log(req.body);
	var id = req.body.id;
	console.log("ㅁㄴㅇㅁㄴㅇㅁㄴㅇㅁㄴㅇ");
	if(id == ""){
		res.send({result : "input_failed"});
	}else{

		models.user.findOne({
			where:{user_id : id}
		})
		.then(function(result){
			if(result != null){
				console.log("id check failed");
				console.log(id);
				res.send({result : "failed"});	
			}else{
				console.log("id check success");
				res.send({result : "success"});
			}
		});

	};
	
});


// 회원가입 o
router.post('/sign_up', function(req, res, next) {
	var check = req.body.id_check;
	var body = req.body;
	var password_check = body.password_check;

	if(req.body.id == "" || req.body.password == "" || req.body.password_check == "" ||req.body.name == "" || req.body.phone1 == "" || req.body.phone2 == ""){
		console.log("register failed");
		res.send({result : "empty"});
	}
	else{

		if(check == "uncheck"){
			console.log("register failed");
			res.send({result : "check failed"});	
		}else if(body.password != password_check){
			console.log("register failed");
			res.send({result : "pw failed"});	
		}else if(req.body.id == 'admin'){
			models.coffee.findOne({
				where: {id: body.coffee}

			}).then(result => {
				models.user.create({
					user_id: body.id,
					password: body.password,
					name: body.name,
					phone: body.phone + body.phone1 + body.phone2,
					stamp: 0,
					coupon: 0,
					birth: body.birth,
					favorite: result.coffee_name,
					isAdmin: true

				}).then(result2 => {
					models.favorite.create({
						user_id: body.id,
						coffee_id: body.coffee,
						coffee_name: result.coffee_name
					}).then(result3 => {
						res.send({result : "success"});
						console.log("회원가입 완료");
					})
				}).catch(err => {
					console.log(err);
				})
				
				
			})
			.catch(err => {
				console.log(err);
				res.send({result : "failed"});	
				console.log("회원가입 실패");
			});
		}else{
			models.coffee.findOne({
				where: {id: body.coffee}

			}).then(result => {
				models.user.create({
					user_id: body.id,
					password: body.password,
					name: body.name,
					phone: body.phone + body.phone1 + body.phone2,
					stamp: 0,
					coupon: 0,
					birth: body.birth,
					favorite: result.coffee_name,
					isAdmin: false

				}).then(result2 => {
					models.favorite.create({
						user_id: body.id,
						coffee_id: body.coffee,
						coffee_name: result.coffee_name
					}).then(result3 => {
						res.send({result : "success"});
						console.log("회원가입 완료");
					})
				}).catch(err => {
					console.log(err);
				})
				
				
			})
			.catch(err => {
				console.log(err);
				res.send({result : "failed"});	
				console.log("회원가입 실패");
			});
		}

	}

});

// 로그인 o
router.post('/login', function(req, res, next){
	console.log(req.body);

	var id = req.body.id;
	var password = req.body.password;
	var cookie_id = req.body.id;
	var cookie_pw = req.body.password;

	if(req.body.id == "" && req.body.password != ""){
		console.log("failed");
		res.send({result : "id_empty"});
	}else if(req.body.id != "" && req.body.password == ""){
		console.log("failed");
		res.send({result : "pw_empty"});		
	}else if(req.body.id == "" && req.body.password == ""){
		console.log("failed");
		res.send({result : "empty"});
		
	}else{
		models.user.findOne({
			where: {user_id: id, password: password}
		})
		.then(result => {
			if(result != null){

				res.cookie('member_id', cookie_id);
				res.cookie('member_pw', cookie_pw);

				if(id == "admin"){	
					console.log("admin login success");
					console.log("로그인 완료");				
					res.send({result : "admin success"});
				}else{
					console.log("member login success");
					console.log("로그인 완료");	
					res.send({result : "member success"});
				}
			}
			else{
				console.log("login failed");
				res.send({result : "failed"});
			}
			
			
		})
		.catch(err => {
			console.log(err);
			console.log("로그인 실패");
		});

	}	

});


// 아이디 찾기 o
router.post('/find_id', function(req, res, next){
	console.log(req.body);
	var name = req.body.name;
	var phone = req.body.phone + req.body.phone1 + req.body.phone2;

	models.user.findOne({
		where: {name : name, phone : phone}
	})
	.then(docs =>{
		if(docs == null){
			console.log("id find failed");
			res.send({result : "failed"});	
		}else{
			console.log("id find success");
			res.send({result : "success", user : docs});
		}
	});
});

// 비밀번호 찾기 o
router.post('/find_pw', function(req, res, next){
	console.log(req.body);
	var id = req.body.id;
	var phone = req.body.phone + req.body.phone1 + req.body.phone2;

	models.user.findOne({
		where:{user_id : id, phone : phone}
	})
	.then(docs =>{
		if(docs == null){
			console.log("register failed");
			res.send({result : "failed"});	
		}else{
			console.log("register success");
			res.send({result : "success", user : docs});
		}
	});

});

//로그아웃 o
router.post('/logout', function(req, res){
	console.log("logout success");
	res.clearCookie('member_id');
	res.clearCookie('member_pw');
	console.log("cookies removed");
	res.send({result : "success"});
	console.log(req.cookies);

});

//회원정보 불러오기 o
router.post('/info', function(req, res){
	var id = req.cookies.member_id;
	models.user.findOne({
		where: {user_id: id}
	})
	.then(docs =>{
		res.send({ result : 'success', users: docs, member_id: id});
	});
});



// 결제하기
router.post('/order', function(req, res, sequelize){
	var id = req.cookies.member_id;
	var num = 0;
	var ten = 10;
	models.cart.findAll({
		where: {user_id: id}
	}).then( result =>{
		for (var i = 0; i < result.length; i++) {
			models.orderlist.create({
				user_id: result[i].user_id,						
				coffee_id: result[i].coffee_id,
				coffee_name: result[i].coffee_name,
				number: result[i].number,
				size: result[i].size,
				shot: result[i].shot
			})
		}
		
		// 주문완료 후 장바구니에서 삭제
		models.cart.destroy({
			where: {user_id: id}
		}).then( result2 =>{
			console.log("삭제 완료");
		})
		
		for (var i = 0; i < result.length; i++) {
			num = num + result[i].number;
		}

		// 음료 갯수만큼 적립
		// 스탬프 10개면 쿠폰 1개
		models.user.findOne({
			where:{user_id: id}
		}).then(result =>{
			var total = result.stamp + num;	
			var temp = total / 10;
			temp = parseInt(temp);		
			console.log(total);
			console.log(temp);
			if(total < 10){
				console.log("< 10");
				models.user.update(
				{
					stamp: result.stamp + num
				}, 
				{
					where: {user_id: id}
				})
			}else{
				console.log("> 10");
				models.user.update(
				{
					stamp: result.stamp - 10*temp + num
				}, 
				{
					where: {user_id: id}
				})

				models.user.update(
				{
					coupon: result.coupon + 1*temp
				}, 
				{
					where: {user_id: id}
				})
				.then( result3 =>{

					console.log("적립 완료");
				});
				
			}


		})
		

		res.send({ result : 'success'});

	}).catch( error =>{
		console.log(error);
	})

	
});


// 장바구니 담기 o
router.post('/put_in', function(req, res, next){

	var id = req.cookies.member_id;
	var coffee_id = req.body.C_value;
	coffee_id = parseInt(coffee_id);
	var number = req.body.number;
	number = parseInt(number);
	var size = req.body.size;
	var shot = req.body.shot;
	var price;

	// Find some documents 

	models.coffee.findOne({
		where: {id : coffee_id}
	})
	.then(docs =>{
		console.log("커피 일치");
		if(docs != null){
			models.cart.findOne({
				where: {user_id : id, coffee_id : coffee_id}
			})
			.then(docs2 =>{
				if(docs2 == null){
					console.log("NULL");
					if(size == "S"){
						price = docs.coffee_price;
					}else if(size == "M"){
						price = docs.coffee_price + 500;
						console.log(price);
					}else{
						price = docs.coffee_price + 1000;
						console.log(price);
					}

					if(shot != null){
						price = price + 500;
					}

					models.cart.create({
						user_id: id,						
						coffee_id: coffee_id,
						coffee_name: docs.coffee_name,
						number: number,
						coffee_price: price,
						size: size,
						shot: shot
					})
					.then(result =>{
						res.send({ result : 'success'});
						console.log("장바구니 담기 완료");
					});


				}else{
					console.log("NOT NULL");
					if(size == "S"){
						price = docs.coffee_price;
					}else if(size == "M"){
						price = docs.coffee_price + 500;
						console.log(price);
					}else{
						price = docs.coffee_price + 1000;
						console.log(price);
					}

					if(shot != null){
						price = price + 500;
					}


					 // 이미 들어있다면 갯수만 증가
					 if(docs2.size == size && docs2.shot == shot){
					 	models.cart.update({
					 		number: number + 1
					 	}, {
					 		where: {id: docs2.id}
					 	})
					 	.then( result =>{
					 		res.send({ result : 'success'});
					 		console.log("장바구니 담기 완료");
					 	});							
					 }else{
					 	models.cart.create({
					 		user_id: id,						
					 		coffee_id: coffee_id,
					 		coffee_name: docs.coffee_name,
					 		number: number,
					 		coffee_price: price,
					 		size: size,
					 		shot: shot
					 	})
					 	.then(result =>{
					 		res.send({ result : 'success'});
					 		console.log("장바구니 담기 완료");
					 	});
					 }

					}
				});
		}
	});
});


// 장바구니 삭제 o
router.post('/remove', function(req, res, next){

	var id = req.cookies.member_id;
	var cart_id = req.body.num;
	cart_id = parseInt(cart_id);

	models.cart.destroy({
		where: {user_id: id, id: cart_id}
	})
	.then(docs =>{
		if(docs != null){
			console.log("remove success");
			res.send({result : "success"});	
		}else{
			console.log("remove failed");
			res.send({result : "failed"});
		}
	});


});

// 장바구니 전체 삭제 o
router.post('/all_remove', function(req, res, next){

	var id = req.cookies.member_id;

	models.cart.destroy({
		where: {user_id: id}
	})
	.then(docs =>{
		if(docs != null){
			console.log("all remove success");
			res.send({result : "success"});	
		}else{
			console.log("all remove failed");
			res.send({result : "failed"});
		}
	});
});

//장바구니 불러오기 o
router.post('/cart', function(req, res){
	var id = req.cookies.member_id;
	models.cart.findAll({
		where: {user_id: id}
	}).then(docs =>{
		res.send({ result : 'success', carts: docs, member_id: id});
	})
});


module.exports = router;
