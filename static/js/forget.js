

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
            val.css('background', '#d2372b');
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

function updatePass(this_but) {
    if (!$("#telNumber").val()) {
        alert('请输入手机号码!');
        return false;
    }
    if (!$("#smscode").val()) {
        alert('请输入验证码!');
        return false;
    }
    if (!$("#newpass").val()) {
        alert('请输入新密码!');
        return false;
    }
    if ($("#newpass").val() != $("#newpass2").val()) {
        alert('密码不一致!');
        return false;
    }

    $.ajax({
        type: 'PUT',
        url: '/api/forgetPassword.do',
        dataType: 'json',
        // headers: {
        //     'Authorization': "BASIC " + getCookie("token")
        // },
        data: {
            telNumber: $("#telNumber").val(),
            newPassword: $("#newpass").val(),
            code: $("#smscode").val()
        },
        success: function(data) {

            if (data.code == 200) {
                alert('密码修改' + data.message + ',正在跳转首页...');
                setTimeout(function() {
                    window.location.href = "index.html"
                }, 2000);
            } else {
                alert(data.message);
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

$(function() {


})