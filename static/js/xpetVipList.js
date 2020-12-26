var bindIostAccount = '';
var bindEosAccount = '';
var bindAccountTimer;
var roleid = '';
var limitNum = 100;
var stackTokenListData = {};
var userUseTokenData = '';

$(function() {
    if(getURLPara("token")){
        setCookie("token",getURLPara("token"))
    }
    // setTimeout(function(){})
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
    $.ajax({
        type: 'get',
        url: '/api/listMyRoleInfo.do',
        headers: {
            'Authorization': "BASIC " + getCookie("token")
        },
        dataType: 'json',
        success: function(data) {
            if (data.success) {
                var obj = data.object.content;
                var html = '',
                    html2 = '';

                html += '<table border="1" style=""> ';
                html += '   <tbody>';
                html += '    <tr> ';
                html += '     <td align="center" style="width:105px;">服务器</td> ';
                html += '     <td align="center" style="width:100px;">角色</td> ';
                html += '     <td align="center" style="width:50px;">VIP</td> ';
                html += '     <td align="center" style="min-width:50px;">积分</td> ';
                html += '     <td align="center" style="width:180px;">操作</td> ';
                html += '    </tr>';

                // avata: "{"avatarTag":"clothes1005","head4":"100010_2","weaponTag":"weapon005"}"
                // createDate: 1607073731000
                // customerId: 457
                // id: 7
                // lastModifyDate: 1607073731000
                // masterPlace: 1
                // name: "鸡鸣不已"
                // race: 1
                // roleId: 65219803290824
                // serverTag: "server_2"
                // sex: 0

                $.each(obj, function(i, n) {
                    html += '<tr id="list_' + n.roleId + '"> ';
                    html += ' <td align="center" style="color:#a1a1a1;">' + n.serverTag + '</td> ';
                    html += ' <td align="center" style="color:#a1a1a1;">' + n.name + '</td> ';
                    html += ' <td align="center" style="color:#a1a1a1;">' + n.vipLevel + '</td> ';
                    html += ' <td align="center" style="color:#a1a1a1;" class="integral">--</td> ';
                    html += ' <td align="center">';
                    html += '   <button class="xBlueBtn" onclick="stacklpShow(' + n.roleId + ')" style="">抵押</button>';
                    html += '   <button class="xBlueBtn" onclick="unstacklpShow(' + n.roleId + ')" style="">解压</button>';
                    html += ' </td> ';
                    html += '</tr>';
                })
                html += '   </tbody> ';
                html += '</table>';
                $(".BrowseKittyGallery .MyInvitedUser").html(html);
                setTimeout(function(){
                    getUserLpToken();
                    getUserUseLpToken();
                },1000)
                
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

function stacklpShow(id) {
    roleid = id;
    getUserStackToken(id);
    $("#stacklpBoxShow").show();
}

function stacklp() {
    if ($('#stacklpNum').val() == '') {
        showMsg("请输入要抵押的数量");
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
                name: 'stacklp',
                authorization: authorization,
                data: {
                    roleid: roleid,
                    acc: account,
                    lptoken: $('#stacklpNum').val()
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