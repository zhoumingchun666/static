var bindIostAccount = '';
var bindEosAccount = '';
var bindAccountTimer;

$(function() {
    if (getCookie("token")) {

        listMyAccountMapping();
    }
})

function clearBindAccountTimer(){
    clearTimeout(bindAccountTimer);
    var val = $('#getCode');
    val.css('color', '#fff');
    val.css('background', '#2c82ff');
    val.removeAttr('disabled');
    val.text('获取验证码');
    val.on('click', getCode);
    $('#bindAccount').hide();
    $('#smscode').val('');
}

function listMyAccountMapping() {
    $.ajax({
        type: 'get',
        url: '/api/listMyAccountMapping.do',
        headers: {
            'Authorization': "BASIC " + getCookie("token")
        },
        dataType: 'json',
        success: function(data) {
            if (data.success) {
                var obj = data.object;
                $.each(obj, function(i, n) {
                    if (n.chainType == "IOST") {
                        bindIostAccount = n.account;
                    }
                    if (n.chainType == "EOS") {
                        bindEosAccount = n.account;
                    }
                    // if (n.chainType == "COCOS") {
                    //   cocosAccount = n.account;
                    // }
                })
                getMonsterList();
            }
        }
    })
}

function getMonsterList() {


    var html = '',
        html2 = '';



    html += '<table border="1" style=""> ';
    html += '   <tbody>';
    html += '    <tr> ';
    html += '     <td align="center" style="min-width:180px;">账号</td> ';
    html += '     <td align="center" style="max-width:200px;">公链</td> ';
    html += '     <td align="center">操作</td> ';
    html += '    </tr>';



    var textShow, textShow2, textShow3;
    bindIostAccount == '' ? textShow = '绑定' : textShow = '修改';
    bindEosAccount == '' ? textShow2 = '绑定' : textShow2 = '修改';
    // cocosAccount == '' ? textShow3 = '绑定' : textShow3 = '修改';

    // if (getBlockName() != "IOST") {
    html += '<tr> ';
    html += ' <td align="center" style="">' + bindIostAccount + '</td> ';
    html += ' <td align="center" style="">IOST</td> ';
    html += ' <td align="center"><button class="xBlueBtn" onclick="bindAccountShow(\'IOST\')" style="width:180px;">' + textShow + '</button></td> ';
    html += '</tr>';
    // }
    // if (getBlockName() != "EOS") {
    html += '<tr> ';
    html += ' <td align="center" style="">' + bindEosAccount + '</td> ';
    html += ' <td align="center" style="">EOS</td> ';
    html += ' <td align="center"><button class="xBlueBtn" onclick="bindAccountShow(\'EOS\')" style="width:180px;">' + textShow2 + '</button></td> ';
    html += '</tr>';

    // }
    // // if (getBlockName() != "COCOS") {
    //   html += '<tr> ';
    //   html += ' <td align="center" style="">' + cocosAccount + '</td> ';
    //   html += ' <td align="center" style="">COCOS</td> ';
    //   html += ' <td align="center"><button class="xBlueBtn" onclick="bindAccountShow(\'COCOS\')" style="width:180px;">' + textShow3 + '</button></td> ';
    //   html += '</tr>';
    // // }



    html += '   </tbody> ';
    html += '</table>';



    $(".BrowseKittyGallery .MyInvitedUser").html(html);

}

function bindAccountShow(type) {

    selectBlockchain = type;
    var html = '';
    var value = '';
    switch (type) {
        case "IOST":
            value = bindIostAccount;

            break;
        case "EOS":
            value = bindEosAccount;
            break;
    }

    if ($('#bindAccount').length == 0) {

        html += '<div id="bindAccount">';
        html += '  <div class="alert">';
        html += '    <div>';
        html += '      <h4>绑定账号</h4>';
        html += '      <ul>';
        html += '        <li class="flex">';
        html += '          <div>绑定的账号：</div>';
        html += '          <input type="text" id="bindAccountInput" placeholder="请输入你要绑定的账号" value="' + value + '" style="flex: 1;">';
        html += '        </li>';
        html += '        <p style="font-size: 1.7rem;">你正在绑定 <span id="accountTips">' + type + '</span> 账号，请绑定正确的账号，绑错账号造成损失无法追回</p>';
        html += '        <li class="clear">';
        html += '          <button class="right btn2 ok" onclick="bindAccountFun()">确认</button>';
        html += '          <button class="right btn2 cancel" onclick="$(\'#bindAccount\').hide()">取消</button>';
        html += '        </li>';
        html += '      </ul>';
        html += '    </div>';
        html += '  </div>';
        html += '</div>';

        $('body').append(html);
    } else {
        $("#accountTips").html(type);
        $("#bindAccountInput").val(value);
    }
    $("#bindAccount").show();
}

function bindAccountFun() {
    if ($("#telNumber").val() == '') {
        showMsg('请输入手机号码');
        return
    }
    if ($("#bindAccountInput").val() == '') {
        showMsg('请输入要绑定的账号');
        return
    }
    if ($("#smscode").val() == '') {
        showMsg('请输入验证码');
        return
    }
    bindAccount();
}

function bindAccount() {
    var url = '';
    var selfData = {};
    switch (selectBlockchain) {
        case "IOST":
            url = '/api/xpet/bindIOST.do';
            selfData = {
                iostAccount: $("#bindAccountInput").val(),
                code: $("#smscode").val()
            };
            break;
        case "EOS":
            url = '/api/bindEOS.do';
            selfData = {
                eosAccount: $("#bindAccountInput").val(),
                code: $("#smscode").val()
            };
            break;
        case "COCOS":
            url = '/api/bindCOCOSAccount.do';
            selfData = {
                cocosAccount: $("#bindAccountInput").val()
            };
            break;
    }
    $.ajax({
        type: 'post',
        url: url,
        data: selfData,
        headers: {
            'Authorization': "BASIC " + getCookie("token")
        },
        dataType: 'json',
        success: function(data) {
            if (data.code == 200) {
                alert("绑定成功");
                clearBindAccountTimer();
                listMyAccountMapping();
            } else {
                alert(data.message);
            }
        },
        error: function(data) {
            alert(data.message);
        }
    });
}

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

function getCode() {
    // telNumber = $('#telNumber').val();
    // // var img_code = $('#imgcode').val();
    // if (telNumber.length != 11) {
    //     alert("手机号码错误")
    //     return;
    // }
    // if(!img_code){
    //  alert("请输入图形验证码")
    //  return;
    // }


    //  @RequestMapping(value = "mycode.do", method = RequestMethod.GET)
    // public Result getMyCode(HttpServletRequest request) {
    //     logger.info("codes.do, telNumber = {}, reason = {}");
    //     codeManager.sendSmsCode(getCustomerTelnumber(request), SmsReason.ANY_OP);
    //     return Result.success();
    // }
    $('#getCode').off('click');
    var opt = {
        countTime: 60,
        getContent: "获取验证码",
        reGetContent: "重新获取",
        sC: '#000',
        eC: '#fff',
        obj: $('#getCode'),
        callback: getCode
    };
    $.ajax({
        type: 'GET',
        url: '/api/mycode.do',
        dataType: "json",
        data: {
            reason: 'ANY_OP',
            // telNumber: telNumber,
            // imgcode:img_code,
            // reqId : reqId,
        },
        headers: {
          'Authorization': "BASIC " + getCookie("token")
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
        bindAccountTimer = setTimeout(function() {
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
                alert('密码修改' + data.message + ',请登录...');
                setTimeout(function() {
                    window.location.href = "xpetLogin.html" + location.search;
                }, 1000);
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




