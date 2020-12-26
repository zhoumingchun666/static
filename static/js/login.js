function showMsg(content) {
    if ($('#msg').length == 0) {
        var str = '<div id="msg" class="msgCon hide">' +
            '<p class="msg">--</p>' +
            '</div>';
        $('body').append(str);
    }
    $(".msg").html(content);
    $("#msg").removeClass('hide').show();
    setTimeout('$("#msg").fadeOut()', 1500);
}

function loginAgain(this_but) {
    if (!$("#user_no").val()) {
        alert('请输入手机号!');
        return false;
    }
    if (!$("#user_password").val()) {
        alert('请输入密码!');
        return false;
    }

    user_no = $("#user_no").val();
    password = $("#user_password").val();
    $(this_but).text('正在校验...');
    $.ajax({
        type: 'post',
        async: false,
        url: '/api/users/token.do',
        data: {
            "telNumber": user_no,
            "password": password
        },
        dataType: 'json',
        success: function(data) {
            if (data.code == 200) {
                token = data.object;
                var units = token.split(".");
                var jwt_payload = JSON.parse($d.decodeBase64Url(units[1]));
                var time_cookie = (jwt_payload.exp - jwt_payload.iat) / 3600000;
                setCookie('token', token, time_cookie / 24);


                if($(".u-checkbox-box").hasClass("active")){
                    setCookie('token', token, 7);
                }else{
                    setCookie('token', token, time_cookie / 24);
                }

                // setCookie('eos', true);
                setCookie('account', $("#user_no").val());
                setCookie("customerType", "PC");

                $(this_but).text('登陆成功');
                showMsg("登录成功")
                var date_obj = new Date();

                setTimeout(function(){
                    location.href = "index.html";
                },1000)
                // successCallback(token);

            } else if (data.code == 0) {
                $(this_but).text('确定');
                showMsg('密码错误');
            }
        }
    });
    return false;
}
//写入cookie函数
function setCookie(name, value) {
    var Days = 30;
    var exp = new Date();
    exp.setTime(exp.getTime() + Days * 24 * 60 * 60 * 1000);
    document.cookie = name + "=" + escape(value) + ";expires=" + exp.toGMTString();
}
//获取cookie
function getCookie(name) {
    var arr, reg = new RegExp("(^| )" + name + "=([^;]*)(;|$)");
    if (arr = document.cookie.match(reg))
        return unescape(arr[2]);
    else
        return null;
}
//清除cookie  
function delCookie(name) {
    setCookie(name, "", -1);
}
//获取URL的参数
function getURLPara(name) {
  var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)");
  var r = window.location.search.substr(1).match(reg);
  if (r != null) return unescape(r[2]);
  return null;
}

function getCode() {
    telNumber = $('#telNumber').val();
    // var img_code = $('#imgcode').val();
    if (telNumber.length != 11) {
        alert("手机号码错误")
        return;
    }
    // if(!img_code){
    //  alert("请输入图形验证码")
    //  return;
    // }
    $('#getCode').off('click');
    var opt = {
        countTime: 120,
        getContent: "获取验证码",
        reGetContent: "重新获取",
        sC: '#000',
        eC: '#fff',
        obj: $('#getCode'),
        callback: getCode
    };
    $.ajax({
        type: 'GET',
        url: '/api/codes.do',
        dataType: "json",
        data: {
            reason: 'REGISTER',
            telNumber: telNumber,
            // imgcode:img_code,
            // reqId : reqId,
        },
        success: function(data) {
            console.log(data);
            if (data.success == false) {
                alert(data.message);
                $('#getCode').text("获取验证码");
                $('#getCode').on('click', getCode);
                return;
            }
            // $('#getCode').text(get_lan("forgetPasswordMsg4"));
            countSixty(opt);
            code = data.object;
            $('#getCode').text(data.message);
        },
        error: function(data) {
            //判断token是否有效
            if (data.status == 401) {
                alert(data.message);
            }
        }
    });
}

function register(this_but) {
    if (!$("#telNumber").val()) {
        alert('请输入手机号码!');
        return false;
    }
    if (!$("#smscode").val()) {
        alert('请输入验证码!');
        return false;
    }
    var smscode = $("#smscode").val();
    // var smscode = '123456';

    // if(!$("#nickname").val()){
    //     alert('请输入您的昵称!');
    //     return false;
    // }
    if (!$("#nps").val()) {
        alert('请输入8位密码!');
        return false;
    }

    if ($('#nps').val().length != 8) {
        alert('密码长度不能小于8位');
        return;
    }

    // if($("#nps").val() != $("#nps2").val()){
    //     alert('密码不一致!');
    //     return false;
    // }
    var thirdTag = getURLPara('thirdTag');
    $.ajax({
        type: 'POST',
        url: '/api/regByTel.do',
        dataType: 'json',
        headers: {
            'Authorization': "BASIC " + getCookie("token")
        },
        data: {
            nickName: $("#telNumber").val(),
            tel: $("#telNumber").val(),
            pwd: $("#nps").val(),
            code: smscode,
            aId: $("#aId").val() || 0,
            thirdTag: thirdTag
        },
        success: function(data) {

            if (data.code == 200) {

                showMsg("注册成功");
                $(this_but).text('注册成功');

                token = data.object;
                var units = token.split(".");
                var jwt_payload = JSON.parse($d.decodeBase64Url(units[1]));
                var time_cookie = (jwt_payload.exp - jwt_payload.iat) / 3600000;
                setCookie('token', token, time_cookie / 24);
                setCookie('account', $("#telNumber").val());
                setCookie("customerType", "PC");

                var date_obj = new Date();

                setTimeout(function(){
                    location.href = "index.html";
                },1000)

                // successCallback(token);
            } else {
                showMsg(data.message);
            }
        },
        error: function(data) {
            //判断token是否有效
            if (data.status == 401) {
                alert(data.message);
            }
        }
    });
}

function countSixty(opt) {
    var def = {
        countTime: 60,
        getContent: '免费获取验证码',
        reGetContent: '重新发送',
        sC: '#000',
        eC: 'red',
        callback: function() {
            console.log('callback');
        }
    };
    var opt = $.extend(def, opt);
    var countdown = opt.countTime,
        getContent = opt.getContent,
        reGetContent = opt.reGetContent,
        obj = opt.obj;
    var isRun = 1;
    settime(obj);

    function settime(val) {
        if (countdown == 0) {
            val.css('color', '#fff');
            val.css('background', '#2c82ff');
            val.removeAttr('disabled');
            val.text(getContent);
            val.on('click', opt.callback);
            if (isRun) {
                countdown = opt.countTime;
            } else {
                return;
            }
        } else {
            /*val.attr('disabled', true);*/
            val.prop('disabled', true);
            // val.css('color', opt.sC);
            val.css('color', '#999');
            val.css('background', '#ddd');
            val.text(reGetContent + "(" + countdown + ")");
            countdown--;
            isRun = 0;
        }
        setTimeout(function() {
            settime(val)
        }, 1000);
    }
}

function successCallback(token){
    var platform = getURLPara("platform") || 'native';
    if(platform == "browser"){
        parent.postMessage(JSON.stringify({
            "token":token
        }),"*");
    }
    if(platform == "native"){
        document.location = 'loginkey://token='+token;
    }
}