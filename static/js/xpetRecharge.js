var bindIostAccount = '';
var bindEosAccount = '';
var bindAccountTimer;
var roleid = '';
var limitNum = 100;
var stackTokenListData = {};
var userUseTokenData = '';
var selectType = '';
var rate = '';

$(function() {
    if(getURLPara("token")){
        setCookie("token",getURLPara("token"))
    }
    exchangeRate();
    // getConnectOk();
})

function getConnectOk(){

    if (getCookie("token")) {
        listMyRoleInfo();
    }
    connectEOS();
    $("#listMyRoleInfoShow").hide();
}

function clearStacklpBoxShow() {
    $('#stacklpBoxShow').hide();
    $('#stacklpNum').val('');
}

function clearUnStacklpBoxShow() {
    $('#unstacklpBoxShow').hide();
    $('#unstacklpNum').val('');
}

function listMyRoleInfo() {

    var html = '';
    html += '<table border="1" style=""> ';
    html += '   <tbody>';
    html += '    <tr>';
    html += '     <td align="center" style="width:105px;">充值代币</td>';
    html += '     <td align="center" style="width:180px;">操作</td>';
    html += '    </tr>';

    html += '    <tr>';
    html += '     <td align="center" style="color:#a1a1a1;">XPC</td>';
    html += '     <td>';
    html += '       <button class="xBlueBtn" onclick="stacklpShow(1)">充值</button>';
    html += '     </td>';
    html += '    </tr>';
    html += '    <tr>';
    html += '     <td align="center" style="color:#a1a1a1;">EOS</td>';
    html += '     <td>';
    html += '       <button class="xBlueBtn" onclick="stacklpShow(2)">充值</button>';
    html += '     </td>';
    html += '    </tr>';
    html += '   </tbody>';
    html += '</table>';
    $(".BrowseKittyGallery .MyInvitedUser").html(html);

}



function exchangeRate() {
    $.ajax({
        type: 'get',
        url: '/api/exchangeRate.do',
        headers: {
            'Authorization': "BASIC " + getCookie("token")
        },
        data:{
            code:'EOS2RMB'
        },
        dataType: 'json',
        success: function(data) {
            if (data.success) {
                var obj = data.object;
                if(obj){
                    rate = obj.rate;
                }
                
            }
        }
    })
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

function stacklpShow(type) {
    // roleid = id;
    selectType = type;
    // getUserStackToken(id);
    // $("#stacklpBoxShow").show();
    stacklp()
}

function stacklp() {
    // if ($('#stacklpNum').val() == '') {
    //     showMsg("请输入要充值的数量");
    //     return
    // }
    var name = '';
    var quantity = '';
    var amount = getURLPara("amount");
    if(selectType == 1){
        name = 'xpctokencore';
        // quantity = Number($('#stacklpNum').val()).toFixed(4)+" XPC";
        quantity = "0.0001 XPC";
    }else{
        name = 'eosio.token';

        // quantity = Number($('#stacklpNum').val()).toFixed(4)+" EOS";
        quantity = Number(Math.floor(amount * 0.1) / rate).toFixed(4) + " EOS";
        // console.log(amount,Math.floor(amount * 0.1),rate);
    }

    var memo = 'BUYYUANBAO-'+ getURLPara("roleid") +'-'+amount;
    
    checkScatter(function(user) {
        var authorization;
        const eos = loot.scatter.eos(network, Eos);
        const account = user.name;
        authorization = [{
            actor: account,
            permission: user.authority
        }]
        eos.transaction({
            actions: [{
                account: name,
                name: 'transfer',
                authorization: authorization,
                data: {
                    from: account,
                    to: 'mhxpetshopco',
                    quantity: quantity,
                    memo: memo
                }
            }]
        }).then(res => {
            showMsg("抵押成功！");
            $('#stacklpBoxShow').hide();
            setTimeout(function(){
                listMyRoleInfo();    
            },3000)
        }).catch(e => {
            eosErrorShow(e);
        });
    })
}


function unstacklpShow(id) {
    roleid = id;
    getUserStackToken(id);
    $("#unstacklpBoxShow").show();
}

function unstacklp() {
    if ($('#unstacklpNum').val() == '') {
        showMsg("请输入要解压的数量");
        return
    }
    checkScatter(function(user) {
        var authorization;
        const eos = loot.scatter.eos(network, Eos);
        const account = user.name;
        authorization = [{
            actor: account,
            permission: user.authority
        }]
        eos.transaction({
            actions: [{
                account: tokenContractName,
                name: 'unstacklp',
                authorization: authorization,
                data: {
                    roleid: roleid,
                    acc: account,
                    lptoken: $('#unstacklpNum').val()
                }
            }]
        }).then(res => {
            showMsg("解压成功！");
            $('#unstacklpBoxShow').hide();
            setTimeout(function(){
                listMyRoleInfo();    
            },3000)
            
        }).catch(e => {
            eosErrorShow(e);
        });
    })
}

function getUserLpToken() {
    checkScatter(function(user) {
        var authorization;
        const eos = loot.scatter.eos(network, Eos);
        const account = user.name;
        var api = get_random_api();
        var selfData = {
            json: true,
            code: tokenContractName,
            scope: account,
            table: 'vipstack',
            index_position: 1,
            key_type: "i64",
            lower_bound: '',
            limit: limitNum,
            reverse: false,
            show_payer: false,
        }
        console.log("data:",selfData)
        // return
        getLinkData(api, selfData, function(data) {
            for (x in data["rows"]) {
                var obj = data["rows"][x];
                stackTokenListData[obj.roleid] = obj;
                $("#list_"+obj.roleid+" .integral").html(obj.stacktoken);
                console.log("data:",obj)
            }
        })
    })
}
function getUserUseLpToken() {
    checkScatter(function(user) {
        var authorization;
        const eos = loot.scatter.eos(network, Eos);
        const account = user.name;
        var api = get_random_api();
        var selfData = {
            json: true,
            code: 'loottimebank',
            scope: 'loottimebank',
            table: 'customer',
            index_position: 1,
            key_type: "i64",
            lower_bound: account,
            limit: 1,
            reverse: false,
            show_payer: false,
        }
        console.log("data:",selfData)
        // return
        getLinkData(api, selfData, function(data) {
            for (x in data["rows"]) {
                var obj = data["rows"][x];
                userUseTokenData = obj;
            }
        })
    })
}





function getLinkData(api,selfData,fun){
  $.post(api + "/v1/chain/get_table_rows", JSON.stringify(selfData),
    function(data, status) {
      if(status){
        fun(data);
      }else{
        console.log("获取不到数据",api,selfData)
        // getLinkData(api,selfData,fun);
      }
    }, "json"
  );
}

function getUserStackToken(id){
    var num = 0;
    var useNum = 0;
    if(stackTokenListData){
        if(stackTokenListData[id]){
            num = stackTokenListData[id].stacktoken;
        }
    }
    if(userUseTokenData){
        useNum = userUseTokenData.freelptoken;
    }

    $(".stackTokenNum").html(num);
    $(".useStackTokenNum").html(useNum);
}