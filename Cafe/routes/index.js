var sequelize = require('sequelize');
var express = require('express');
let models = require('../models');
var router = express.Router();
const Op = sequelize.Op;

/* GET home page. */
router.get('/', function(req, res, next) {
    var id = req.cookies.member_id;
    res.render('main', { member_id: id });
});

router.get('/main', function(req, res, next) {
    var id = req.cookies.member_id;

    res.render('main', { member_id: id });
});

router.get('/login', function(req, res, next) {
    var id = req.cookies.member_id;

    res.render('login', { member_id: id });
});

router.get('/sign_up', function(req, res, next) {
    var id = req.cookies.member_id;

    res.render('sign_up', { member_id: id });
});

router.get('/cart', function(req, res, next) {
    var id = req.cookies.member_id;

    res.render('cart', { member_id: id });
});

router.get('/find_id', function(req, res, next) {
    var id = req.cookies.member_id;

    res.render('find_id', { member_id: id });
});

router.get('/find_pw', function(req, res, next) {
    var id = req.cookies.member_id;

    res.render('find_pw', { member_id: id });
});

router.get('/about', function(req, res, next) {
    var id = req.cookies.member_id;

    res.render('about', { member_id: id });
});

router.get('/contact', function(req, res, next) {
    var id = req.cookies.member_id;

    res.render('contact', { member_id: id });
});

router.get('/menu', function(req, res, next) {
    var id = req.cookies.member_id;

    res.render('menu', { member_id: id });
});

router.get('/events', function(req, res, next) {
    var id = req.cookies.member_id;

    res.render('events', { member_id: id });
});

router.get('/info', function(req, res, next) {
    var id = req.cookies.member_id;

    res.render('info', { member_id: id });
});

router.get('/manage', function(req, res, next) {
    var id = req.cookies.member_id;

    res.render('manage', { member_id: id });
});

router.get('/order', function(req, res, next) {
    var id = req.cookies.member_id;

    res.render('order', { member_id: id });
});

router.get('/sales', function(req, res, next) {
    var id = req.cookies.member_id;

    res.render('sales', { member_id: id });
});

router.get('/ingredient', function(req, res, next) {
    var id = req.cookies.member_id;

    res.render('ingredient', { member_id: id });
});

router.get('/customer', function(req, res, next) {
    var id = req.cookies.member_id;

    res.render('customer', { member_id: id });
});

router.get('/shop', function(req, res, next) {
    var id = req.cookies.member_id;

    res.render('shop', { member_id: id });
});

router.get('/order2', function(req, res, next) {
    var id = req.cookies.member_id;

    res.render('order2', { member_id: id });
});


// 아이디 체크 o
router.post('/checkID', function(req, res, next) {
    console.log(req.body);
    var id = req.body.id;
    if (id == "") {
        res.send({ result: "input_failed" });
    } else {

        models.user.findOne({
                where: { user_id: id }
            })
            .then(function(result) {
                if (result != null) {
                    console.log("id check failed");
                    console.log(id);
                    res.send({ result: "failed" });
                } else {
                    console.log("id check success");
                    res.send({ result: "success" });
                }
            });

    };

});


// 회원가입 o
router.post('/sign_up', function(req, res, next) {
    var check = req.body.id_check;
    var body = req.body;
    var password_check = body.password_check;

    if (body.id == "" || body.password == "" || body.password_check == "" || body.name == "" || body.phone1 == "" || body.phone2 == "") {
        console.log("register failed");
        res.send({ result: "empty" });
    } else {
    	if (check == "uncheck") {
            console.log("register failed");
            res.send({ result: "check failed" });
        } else if (body.password != password_check) {
            console.log("register failed");
            res.send({ result: "pw failed" });
        } else if (req.body.id == 'admin') {
            models.user.create({
                user_id: body.id,
                password: body.password,
                name: body.name,
                phone: body.phone + body.phone1 + body.phone2,
                stamp: 0,
                coupon: 0,
                birth: null,
                favorite: null,
                recent_order_time: null,
                total_order_num: 0,
                isAdmin: true

            }).then(result3 => {
                res.send({ result: "success" });
                console.log("회원가입 완료");

            }).catch(err => {
                console.log(err);
                res.send({ result: "failed" });
                console.log("회원가입 실패");
            });
        }else{

        	var birth = body.birth;
            var coffee = body.coffee;

            if (birth == '') {
                birth = null;
            } else if (coffee == '') {
                coffee = null;
            } else if (birth == '' && coffee == '') {
            	birth = null;
                coffee - null;
            }else{

            }

            if (coffee != '') {
                models.coffee.findOne({
                        where: { id: body.coffee }

                }).then(result => {
                    models.user.create({
                        user_id: body.id,
                        password: body.password,
                        name: body.name,
                        phone: body.phone + body.phone1 + body.phone2,
                        stamp: 0,
                        coupon: 0,
                        birth: birth,
                        favorite: result.coffee_name,
                        recent_order_time: null,
                        total_order_num: 0,
                        isAdmin: false

                    }).then(result2 => {
                        models.favorite.create({
                            user_id: body.id,
                            coffee_id: body.coffee,
                            coffee_name: result.coffee_name
                        }).then(result3 => {
                            res.send({ result: "success" });
                            console.log("회원가입 완료");
                        });
                    }).catch(err => {
                        console.log(err);
                    });
                }).catch(err => {
                    console.log(err);
                    res.send({ result: "failed" });
                    console.log("회원가입 실패");
                });

            } else {
                models.user.create({
                    user_id: body.id,
                    password: body.password,
                    name: body.name,
                    phone: body.phone + body.phone1 + body.phone2,
                    stamp: 0,
                    coupon: 0,
                    birth: birth,
                    favorite: null,
                    recent_order_time: null,
                    total_order_num: 0,
                    isAdmin: false

                }).then(result3 => {
                    res.send({ result: "success" });
                    console.log("회원가입 완료");

                }).catch(err => {
                    console.log(err);
                    res.send({ result: "failed" });
                    console.log("회원가입 실패");
                });

            } 
        
        }
    }   
});

// 로그인 o
router.post('/login', function(req, res, next) {
    var id = req.body.id;
    var password = req.body.password;
    var cookie_id = req.body.id;
    var cookie_pw = req.body.password;

    if (req.body.id == "" && req.body.password != "") {
        console.log("failed");
        res.send({ result: "id_empty" });
    } else if (req.body.id != "" && req.body.password == "") {
        console.log("failed");
        res.send({ result: "pw_empty" });
    } else if (req.body.id == "" && req.body.password == "") {
        console.log("failed");
        res.send({ result: "empty" });

    } else {
        models.user.findOne({
                where: { user_id: id, password: password }
            })
            .then(result => {
                if (result != null) {

                    res.cookie('member_id', cookie_id);
                    res.cookie('member_pw', cookie_pw);

                    if (id == "admin") {
                        console.log("admin login success");
                        console.log("로그인 완료");
                        res.send({ result: "admin success" });
                    } else {
                        console.log("member login success");
                        console.log("로그인 완료");
                        res.send({ result: "member success" });
                    }
                } else {
                    console.log("login failed");
                    res.send({ result: "failed" });
                }


            })
            .catch(err => {
                console.log(err);
                console.log("로그인 실패");
            });

    }

});


// 아이디 찾기 o
router.post('/find_id', function(req, res, next) {
    console.log(req.body);
    var name = req.body.name;
    var phone = req.body.phone + req.body.phone1 + req.body.phone2;

    models.user.findOne({
            where: { name: name, phone: phone }
        })
        .then(docs => {
            if (docs == null) {
                console.log("id find failed");
                res.send({ result: "failed" });
            } else {
                console.log("id find success");
                res.send({ result: "success", user: docs });
            }
        });
});

// 비밀번호 찾기 o
router.post('/find_pw', function(req, res, next) {
    console.log(req.body);
    var id = req.body.id;
    var phone = req.body.phone + req.body.phone1 + req.body.phone2;

    models.user.findOne({
            where: { user_id: id, phone: phone }
        })
        .then(docs => {
            if (docs == null) {
                console.log("register failed");
                res.send({ result: "failed" });
            } else {
                console.log("register success");
                res.send({ result: "success", user: docs });
            }
        });

});

//로그아웃 o
router.post('/logout', function(req, res) {
    console.log("logout success");
    res.clearCookie('member_id');
    res.clearCookie('member_pw');
    console.log("cookies removed");
    res.send({ result: "success" });
    console.log(req.cookies);

});

//회원정보 불러오기 o
router.post('/info', function(req, res) {
    var id = req.cookies.member_id;
    if (id != null) {
        models.user.findOne({
                where: { user_id: id }
            })
            .then(docs => {
                res.send({ result: 'success', users: docs, member_id: id });
            });
    }

});

// 회원 목록 불러오기
router.post('/user', function(req, res) {
    var id = req.cookies.member_id;
    models.user.findAll({
            where: {
                [sequelize.notIn]: 'admin' }
        })
        .then(docs => {
            res.send({ result: 'success', users: docs, member_id: id });
        });
});



// 결제하기
router.post('/order', function(req, res, sequelize)
{

    var id = req.cookies.member_id;
    var num = 0;
    var ten = 10;
    var time = Date.now();
    var requirement = req.body.requirement;

    models.cart.findAll({
        where: { user_id: id }
    }).then(result => 
    {

        for (var i = 0; i < result.length; i++){
            models.orderlist.create({
                user_id: result[i].user_id,
                coffee_id: result[i].coffee_id,
                coffee_name: result[i].coffee_name,
                number: result[i].number,
                size: result[i].size,
                shot: result[i].shot,
                takeout: result[i].takeout,
                order_time: time
            });

            models.total_orderlist.create({
                user_id: result[i].user_id,
                coffee_id: result[i].coffee_id,
                coffee_name: result[i].coffee_name,
                number: result[i].number,
                size: result[i].size,
                shot: result[i].shot,
                takeout: result[i].takeout,
                order_time: time
            });

            models.sales.create({
                user_id: result[i].user_id,
                coffee_id: result[i].coffee_id,
                coffee_name: result[i].coffee_name,
                number: result[i].number,
                size: result[i].size,
                shot: result[i].shot,
                takeout: result[i].takeout,
                order_time: time,
                cost: result[i].coffee_price * result[i].number
            });
        }

        // 주문 요구사항 저장
        if (requirement != null) {
            models.orderlist.findOne({
                where: {
                    user_id: result[result.length - 1].user_id,
                    coffee_id: result[result.length - 1].coffee_id,
                    coffee_name: result[result.length - 1].coffee_name,
                    number: result[result.length - 1].number,
                    size: result[result.length - 1].size,
                    shot: result[result.length - 1].shot,
                    takeout: result[result.length - 1].takeout
                }
            }).then(result1 => {

                models.order_requirement.create({
                    id: result[result.length - 1].id,
                    requirement: requirement
                });

            });
        }

        // 주문완료 후 장바구니에서 삭제
        models.cart.destroy({
            where: { user_id: id }
        }).then(result2 => {
            console.log("삭제 완료");
        });

        for (var i = 0; i < result.length; i++) 
        {
            num = num + result[i].number;
        }


        // 음료 갯수만큼 적립
        // 스탬프 10개면 쿠폰 1개
        models.user.findOne({
            where: { user_id: id }
        }).then(result3 => {

            var total = result3.stamp + num;
            var temp = total / 10;
            temp = parseInt(temp);

            if (total < 10){
                console.log("< 10");
                models.user.update(
                {
                    stamp: result3.stamp + num
                },
                {
                    where: { user_id: id }
                });

                models.user.update(
                {
                    recent_order_time: time
                },
                {
                    where: { user_id: id }
                });

                models.user.update(
                {
                    total_order_num: result3.total_order_num + num
                },
                {
                    where: { user_id: id }
                });
            } else {
                console.log("> 10");
                models.user.update(
                {
                    stamp: result3.stamp - 10 * temp + num
                },
                {
                    where: { user_id: id }
                });

                models.user.update(
                {
                    coupon: result3.coupon + 1 * temp
                },
                {
                    where: { user_id: id }
                });

                models.user.update(
                {
                    recent_order_time: time
                },
                {
                    where: { user_id: id }
                });

                models.user.update(
                {
                    total_order_num: result3.total_order_num + num
                },
                {
                    where: { user_id: id }
                });

            }
        });

        res.send({ result: 'success', member_id: id });
    }).catch(error => {
        console.log(error);
        res.send({ result: 'failed' });
    });
});


// 장바구니 담기 o
router.post('/put_in', function(req, res, next) {

    var id = req.cookies.member_id;
    var coffee_id = req.body.C_value;
    coffee_id = parseInt(coffee_id);
    var number = req.body.number;
    number = parseInt(number);
    var size = req.body.size;
    var shot = req.body.shot;
    var shot_check = false;
    var takeout = req.body.takeout;
    var takeout_check = false;
    var price;

    // Find some documents 
    console.log(shot);
    console.log(takeout);
    models.coffee.findOne({
        where: { id: coffee_id }
    }).then(docs => {
        console.log("커피 일치");
        if (docs != null) {
            models.cart.findOne({
                    where: { user_id: id, coffee_id: coffee_id }
            }).then(docs2 => {
            	if (docs2 == null) {
            		console.log("NULL");
            		if (size == "S") {
            			price = docs.coffee_price;
            		} else if (size == "M") {
            			price = docs.coffee_price + 500;
            			console.log(price);
            		} else {
            			price = docs.coffee_price + 1000;
            			console.log(price);
            		}

            		if (shot == "add_shot") {
            			price = price + 500;
            			shot_check = true;
            		}

            		if (takeout == "takeout") {
            			takeout_check = true;
            		}

            		models.cart.create({
            			user_id: id,
            			coffee_id: coffee_id,
            			coffee_name: docs.coffee_name,
            			number: number,
            			coffee_price: price,
            			size: size,
            			shot: shot_check,
            			takeout: takeout_check
            		})
            		.then(result => {
            			res.send({ result: 'success' });
            			console.log("장바구니 담기 완료");
            		})


            	} else {
            		console.log("NOT NULL");
            		if (size == "S") {
            			price = docs.coffee_price;
            		} else if (size == "M") {
            			price = docs.coffee_price + 500;
            			console.log(price);
            		} else {
            			price = docs.coffee_price + 1000;
            			console.log(price);
            		}

            		if (shot == "add_shot") {
            			price = price + 500;
            			shot_check = true;
            		}

            		if (takeout == "takeout") {
            			takeout_check = true;
            		}

                    // 이미 들어있다면 갯수만 증가
                    if (docs2.size == size && docs2.shot == shot_check && docs2.takeout == takeout_check) {
                    	models.cart.update({
                    		number: docs2.number + number
                    	}, {
                    		where: { id: docs2.id }
                    	})
                    	.then(result => {
                    		res.send({ result: 'success' });
                    		console.log("장바구니 담기 완료");
                    	})
                    } else {
                    	models.cart.create({
                    		user_id: id,
                    		coffee_id: coffee_id,
                    		coffee_name: docs.coffee_name,
                    		number: number,
                    		coffee_price: price,
                    		size: size,
                    		shot: shot_check,
                    		takeout: takeout_check
                    	})
                    	.then(result => {
                    		res.send({ result: 'success' });
                    		console.log("장바구니 담기 완료");
                    	})
                    }

                }
            })
        }
    })
});


// 장바구니 삭제 o
router.post('/remove_cart', function(req, res, next) {

    var id = req.cookies.member_id;
    var cart_id = req.body.num;
    cart_id = parseInt(cart_id);

    models.cart.destroy({
            where: { user_id: id, id: cart_id }
    }).then(docs => {
    	if (docs != null) {
    		console.log("remove success");
    		res.send({ result: "success" });
    	} else {
    		console.log("remove failed");
    		res.send({ result: "failed" });
    	}
    });
});

// 장바구니 전체 삭제 o
router.post('/all_remove_cart', function(req, res, next) {

    var id = req.cookies.member_id;

    models.cart.destroy({
        where: { user_id: id }
    }).then(docs => {
    	if (docs != null) {
    		console.log("all remove success");
    		res.send({ result: "success" });
    	} else {
    		console.log("all remove failed");
    		res.send({ result: "failed" });
    	}
    });
});

//장바구니 불러오기 o
router.post('/cart', function(req, res) {
    var id = req.cookies.member_id;
    if (id != null) {
        models.cart.findAll({
            where: { user_id: id }
        }).then(docs => {
            res.send({ result: 'success', carts: docs, member_id: id });
        })
    }

});

//주문 목록 불러오기 o
router.post('/order2', function(req, res) {
    var id = req.cookies.member_id;
    models.orderlist.findAll({

    }).then(docs => {
    	models.order_requirement.findAll({

    	}).then(docs2 => {
    		res.send({ result: 'success', orderlists: docs, order_requirements: docs2, member_id: id });
    	})
        
    })
});

// 주문 목록 완료
router.post('/complete_order', function(req, res, next) {

    var order_id = req.body.num;
    var user_id = req.body.user_id;
    order_id = parseInt(order_id);


    models.orderlist.destroy({
        where: { user_id: user_id, id: order_id }
    }).then(docs => {

    	models.order_requirement.destroy({
    		where:{ id: order_id}
    	})

    	if (docs != null) {
    		console.log("complete success");
    		res.send({ result: "success" });
    	} else {
    		console.log("complete failed");
    		res.send({ result: "failed" });
    	}
    });
});

// 주문 목록 전체 완료
router.post('/all_complete_order', function(req, res, next) {

    models.orderlist.destroy({
            where: {}
    }).then(docs => {

    	models.order_requirement.destroy({
    		where:{}
    	})
    	if (docs != null) {
    		console.log("all complete success");
    		res.send({ result: "success" });
    	} else {
    		console.log("all complete failed");
    		res.send({ result: "failed" });
    	}
    });
});

// 고객 목록 불러오기
router.post('/customer', function(req, res, Sequelize) {
    var login_id = req.cookies.member_id;
    models.user.findAll({
        where: {
            user_id: {
                [Op.notLike]: 'admin'
            }
        }
    }).then(docs => {
        res.send({ result: 'success', users: docs, member_id: login_id });
    })
});

// 총 매출 목록 불러오기
router.post('/total_sales', function(req, res, Sequelize) {
    var login_id = req.cookies.member_id;
    models.sales.findAll({
        where: {}
    }).then(docs => {
        res.send({ result: 'success', sales: docs, member_id: login_id });
    })
});


// 날짜별 매출 불러오기
router.post('/date_sales', function(req, res, Sequelize) {
    var login_id = req.cookies.member_id;
    var date1 = req.body.order_date;
    var date2 = new Date(date1);
    var date3 = new Date(date1);

    date2.setHours(0, 0, 0, 0);
    date3.setHours(23, 59, 59, 999);
    console.log(date2);
    console.log(date3);
    if (date1 == "") {
        res.send({ result: 'date_sales_failed' });
    } else {
        models.sales.findAll({
            where: {
                order_time: {
                    [Op.between]: [date2, date3]
                }
            }
        }).then(docs => {
            res.send({ result: 'success', sales: docs, member_id: login_id });
        })
    }

});

// 월별 매출 불러오기
router.post('/month_sales', function(req, res, Sequelize) {
    var login_id = req.cookies.member_id;
    var date1 = req.body.order_month;
    var date2 = new Date(date1);
    var date3 = new Date(date1);
    var mm = date3.getMonth() + 1;
    date2.setHours(0, 0, 0, 0);
    date3.setMonth(mm);
    date3.setHours(0, 0, 0, 0);
    date3.setHours(0, 0, 0, -1);
    console.log(date2);
    console.log(date3);
    if (date1 == "") {
        res.send({ result: 'month_sales_failed' });
    } else {
        models.sales.findAll({
            where: {
                order_time: {
                    [Op.between]: [date2, date3]
                }
            }
        }).then(docs => {
            res.send({ result: 'success', sales: docs, member_id: login_id });
        })
    }

});

// 고객별 매출 불러오기
router.post('/id_sales', function(req, res, Sequelize) {
    var login_id = req.cookies.member_id;
    var user_id = req.body.order_id;
    if (user_id == "") {
        res.send({ result: 'id_sales_failed' });
    } else {
        models.sales.findAll({
            where: {
                user_id: user_id
            }
        }).then(docs => {
            res.send({ result: 'success', sales: docs, member_id: login_id });
        })
    }

});

// 커피 판매 순위 불러오기
router.post('/coffee_rank', function(req, res, Sequelize) {
    // SELECT coffee_name, sum(number) AS number FROM sales GROUP BY coffee_name ORDER BY number DESC 
    models.sales.findAll({
        attributes: ['coffee_name', [sequelize.fn('sum', sequelize.col('number')), 'number']],
        group: ['coffee_name'],
        order: sequelize.literal('number DESC')
    }).then(docs => {
        res.send({ result: 'success', sales: docs });
    });
});

module.exports = router;