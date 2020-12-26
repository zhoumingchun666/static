var iostPendingStaus = true;
var iostSuccessStaus = true;

var dappBirdsInstance = null;
var tokenContractName = 'mhxpetvipcof';


var xworldFirst = true;
var eosAccount = '';
var publicKey = '';
var customerType = "EOS";
var IWallet, neoWallet, prepareRechargeType = "XPC";
var EOS_CONFIG;

const loot = {

};
var selectBlockchain = '';
var bindIostAccount = '';
var bindEosAccount = '';
var bindAccountTimer;

var worldcontractName, xpetcontractName, xpccontractName, chainId, contractName, network, lootcontractName;

if(window.ScatterJS){
  ScatterJS.plugins(new ScatterEOS());
}

lootcontractName = "loottokenspx";


// const cocoscontractName = "contract.testnew";
// const iostContractName = 'ContractAWD6RBwAXdvm6nnUtzuXU7q1dnFBxcF6rYMRhgozgTXK';
// if(getCookie("customerType") == 'BOS' || getCookie("blockchain") == 'BOS'){
//   worldcontractName = "petworldcorb";
//   xpetcontractName = "petxpetstore";
//   xpccontractName = "xpctokencore";
//   chainId = '33cc2426f1b258ef8c798c34c0360b31732ea27a2d7e35a65797850a86d1ba85';
//   contractName = "xpetbosecore";
//   network = ScatterJS.Network.fromJson({
//       blockchain: 'bos',
//       // host: 'bos-testnet.eosphere.io',
//       host: 'api.bostest.alohaeos.com',
//       protocol: 'https',
//       port: 443,
//       chainId: chainId
//   })
// }else{
//   worldcontractName = "petworldcorb";
//   xpetcontractName = "petxpetstore";
//   // bancorcontractName = "bancorxpetex";
//   xpccontractName = "xpctokencore";
//   // BombcontractName = "petbombcoree";
//   chainId = '5fff1dae8dc8e2fc4d5b23b2c7665c97f9e9d8edf2b6485a86ba311c25639191';
//   contractName = "asdfqaskfjhd";
//   network = ScatterJS.Network.fromJson({
//       blockchain: 'eos',
//       host: 'api-kylin.eosasia.one',
//       protocol: 'https',
//       port: 443,
//       chainId: chainId
//   })
// }

const API_ENDPOINTS2 = [
  'eospush.tokenpocket.pro',
  'eos.blockeden.cn',
  'eos.greymass.com',
  'nodes.get-scatter.com',
  'api.eossweden.se',
];

function get_random_api2() {
  // const index = Math.floor(Math.random() * API_ENDPOINTS2.length);
  var index = getCookie("nodeIndex") || nodeIndex;
  // var node = 'https://'+API_ENDPOINTS2[index];
  var node = API_ENDPOINTS2[index];
  // var node = 'https://api-kylin.eosasia.one';
  // console.log(index,node);
  return node;
}

const API_ENDPOINTS = [
  'https://eospush.tokenpocket.pro',
  'https://eos.blockeden.cn',
  'https://eos.greymass.com',
  'https://api.eossweden.se',
];
  
function get_random_api() {
  const index = Math.floor(Math.random() * API_ENDPOINTS.length);
  return API_ENDPOINTS[index];
}


const cocoscontractName = "contract.xpetstroe";
const iostContractName = 'ContractBgWwzLsEb323Gt9cHb1aYVSzKepAQPuVVDHSsLRHSSBe';
if (getCookie("customerType") == 'BOS' || getCookie("blockchain") == 'BOS') {
  // worldcontractName = "petworldcore";
  xpetcontractName = "xpetbosstore";
  // xpccontractName = "xpctokencore";
  // BombcontractName = "petbombcorea";
  chainId = 'd5a3d18fbb3c084e3b1f3fa98c21014b5f3db536cc15d08f9f6479517c6a3d86';
  contractName = "xpetbosecore";
  if(window.ScatterJS){
    network = ScatterJS.Network.fromJson({
      blockchain: 'bos',
      host: 'api.boscore.io',
      protocol: 'https',
      port: 443,
      chainId: chainId
    })
  }
    
} else {
  worldcontractName = "petworldcore";
  xpetcontractName = "xpetpetstore";
  xpccontractName = "xpctokencore";
  // BombcontractName = "petbombcorea";
  chainId = 'aca376f206b8fc25a6ed44dbdc66547c36c6c33e3a119ffbeaef943642f0e906';

  contractName = "xpetiocore11";
  if(window.ScatterJS){
    network = ScatterJS.Network.fromJson({
      blockchain: 'eos',
      // host:'api.kylin-testnet.eospacex.com',
      // https://api.eosbeijing.one
      // https://mainnet.meet.one
      host: 'api.eosn.io',
      protocol: 'https',
      port: 443,
      chainId: chainId
    })
  }
    
}

if (getURLPara("identity")) {
  setCookie("identity", getURLPara("identity").split("?language")[0]);
}
if (getURLPara("customerType")) {
  setCookie("blockchain", getURLPara("customerType").split("?language")[0]);
}

if (getCookie("blockchain") == 'NEO') {
  DappBirdsEngin.init({
    chain_type: 5,
    // test_mode: true
    test_mode: false
  }).then((DappBirdsSDK) => {
    console.log('SDK load success!');
    init();
  }).catch((ex) => {
    alert(ex.message);
    console.error(ex);
  });
}

var isDev = true;

if(window.ScatterJS){
  EOS_CONFIG = {
    chainId: chainId, // 32 byte (64 char) hex string
    keyProvider: '', // WIF string or array of keys..
    httpEndpoint: network.protocol + '://' + network.host,
    mockTransactions: () => null, // or 'fail'
    expireInSeconds: 3600,
    broadcast: true,
    verbose: isDev,
    debug: isDev, // API and transactions
    sign: true
  }
} 

var userMoneyFirst = true;
$(function() {

  if(getURLPara("block")){
    setCookie("block",getURLPara("block"))
  }
  var html = '';
  html += '<div class="header flex">';
  html += '  <span style="flex:1;"></span>';
  if(getCookie("token")){
    html += '  <span class="msgMore" id="userMsgPanel">个人中心</span>';
    html += '  &nbsp;|&nbsp;';
    html += '  <span>用户：<span class="userNameTag">'+ getCookie("account") +'</span></span>';
    html += '  &nbsp;&nbsp;';
  }else{
    html += '  <a href="login.html" style="color:#fff;">登录</a>';
    html += '  &nbsp;&nbsp;';

  }

  html += '</div>';


  if(window.location.pathname.indexOf("/index.html") > -1 || window.location.pathname.indexOf(".html") == -1){
    html += '<div style="margin-top: -22px;">';
    html += '  <img src="imgs/menpaijieshao.png">';
    html += '</div>';
    html += '<div class="menpaiBox">';
    html += '  <div class="item menpai01 active">';
    html += '    <div class="menpaiIco">';
    html += '      <div class="menpaiImgs1"></div>';
    html += '      <div class="menpaiImgs2"></div>';
    html += '    </div>';
    html += '    <div class="menpaiContent">';
    html += '      门派特色：<br>';
    html += '      擅长单点物理攻击，折冲府云集大唐军中精锐。';
    html += '    </div>';
    html += '  </div>';
    html += '  <div class="item menpai02">';
    html += '    <div class="menpaiIco">';
    html += '      <div class="menpaiImgs1"></div>';
    html += '      <div class="menpaiImgs2"></div>';
    html += '    </div>';
    html += '    <div class="menpaiContent">';
    html += '      门派特色：<br>';
    html += '      积雷山弟子师从大力牛魔王，擅长单体法术';
    html += '    </div>';
    html += '  </div>';
    html += '  <div class="item menpai03">';
    html += '    <div class="menpaiIco">';
    html += '      <div class="menpaiImgs1"></div>';
    html += '      <div class="menpaiImgs2"></div>';
    html += '    </div>';
    html += '    <div class="menpaiContent">';
    html += '      门派特色：<br>';
    html += '      门下弟子擅长各种封印咒术，山中有一斜月三星洞，西牛贺洲有一仙山，名为灵台方寸山。';
    html += '    </div>';
    html += '  </div>';
    html += '  <div class="item menpai04">';
    html += '    <div class="menpaiIco">';
    html += '      <div class="menpaiImgs1"></div>';
    html += '      <div class="menpaiImgs2"></div>';
    html += '    </div>';
    html += '    <div class="menpaiContent">';
    html += '      门派特色：<br>';
    html += '      峦头高耸接云烟，地脉遥长通海岳。盘丝洞门下弟子，擅长诅咒及辅助法术，甚是了得。';
    html += '    </div>';
    html += '  </div>';
    html += '  <div class="item menpai05">';
    html += '    <div class="menpaiIco">';
    html += '      <div class="menpaiImgs1"></div>';
    html += '      <div class="menpaiImgs2"></div>';
    html += '    </div>';
    html += '    <div class="menpaiContent">';
    html += '      门派特色：<br>';
    html += '      月上广寒宫，仙界清灵地。广寒宫门下弟子擅长各种恢复法术。';
    html += '    </div>';
    html += '  </div>';
    html += '  <div class="item menpai06">';
    html += '    <div class="menpaiIco">';
    html += '      <div class="menpaiImgs1"></div>';
    html += '      <div class="menpaiImgs2"></div>';
    html += '    </div>';
    html += '    <div class="menpaiContent">';
    html += '      门派特色：<br>';
    html += '      四海之水域，皆为龙族所领。四海龙宫门下弟子擅长群体法术';
    html += '    </div>';
    html += '  </div>';
    html += '</div>';
  }



  $(".wrap .rightBox").html(html);

  if (getCookie("token")) {

      var html2 = '';
      var itemHeight = document.body.clientHeight;
      var headerHeight = $(".head").height();
      if (headerHeight == 50) {
        itemHeight = itemHeight - 90;
      } else {
        itemHeight = itemHeight - 148;
      }
      html2 += '<ul class="newUserBox" style="height:' + itemHeight + 'px;">';
      html2 += '<div class="userHeader flex" style="justify-content: space-between;">';
      html2 += '    <img src="imgs/next.png" alt="" style="width: 28px;" onclick="newUserBoxHide()">';
      html2 += '    <div class="flex" style="flex:1;">';
      if (getCookie("account")) {
        var string = getCookie("account");
        var nickname = "";
        if (getCookie("customerType") == "NEO") {
          nickname = string.substring(0, 3) + "***" + string.substring(string.length - 3, string.length) + "@NEO";
        } else {
          nickname = string;
        }
        html2 += '<span style="color:#92acc5;" id="nameTips">' + nickname + '</span>';
      } else {
        html2 += '<span style="color:#92acc5;">账号</span>';
      }


      html2 += '    </div>';
      html2 += '    <div class="flex" style="color:#92acc5;" onclick="exit()">';
      html2 += '        <img src="imgs/exit.png" alt="" style="width: 20px;">';
      html2 += '        <span style="margin-left: 10px;">注销</span>';
      html2 += '    </div>';
      html2 += '</div>';
      html2 += '<div id="EOSAmountShow" class="flex" style="">';
      html2 += '</div>';
      html2 += '<div style="margin-bottom: 28px;">';
      html2 += '    <span style="color: #92acc5;">账号绑定:</span>';
      html2 += '    <div class="flex" style="margin-top:10px;" id="eosBindAccountNameShow">';
      html2 += '      <div>EOS账号</div>';
      html2 += '      <div style="flex:1;text-align:center;" class="accountName">--</div>';
      html2 += '      <div class="xBlueBtn" style="width:100px;text-align:center;" onclick="bindAccountShow(\'EOS\')">绑定</div>';
      html2 += '    </div>';
      html2 += '    <div class="flex" style="margin-top:10px;" id="iostBindAccountNameShow">';
      html2 += '      <div>IOST账号</div>';
      html2 += '      <div style="flex:1;text-align:center;" class="accountName">--</div>';
      html2 += '      <div class="xBlueBtn" style="width:100px;text-align:center;" onclick="bindAccountShow(\'IOST\')">绑定</div>';
      html2 += '    </div>';


      // html2 += '    <div style="color: #474d68;font-weight: bolder;margin: 10px 0;" id="getXUserXpcMoney">-- XPC</div>';
      // html2 += '    <div style="color: #474d68;font-weight: bolder;margin: 10px 0;" id="getXUserEoxMoney">-- EOS</div>';
      // html2 += '    <div style="color: #474d68;font-weight: bolder;margin: 10px 0;" id="getXUserIostMoney">0.0000 IOST</div>';
      // html2 += '    <div style="color: #474d68;font-weight: bolder;margin: 10px 0;" id="getXUserCocosMoney">0.0000 COCOS</div>';

      // html2 += '    <div class="flex">';
      // // html2 += '      <button class="xBlueBtn" onclick="prepareRechargeShow()">充值</button>';
      // html2 += '      <button class="xBlueBtn" style="margin-right:18px;" onclick="withdrawMoneyShow()">提取</button>';
      // html2 += '      <button class="xBlueBtn" onclick="getEosMapBonus()">全部提取</button>';
      // html2 += '    </div>';
      // html2 += '    <div class="flex" style="margin-top:10px;">';
      // html2 += '      <button class="xBlueBtn" onclick="getEosMapBonus()">全部提取</button>';
      // html2 += '    </div>';

      html2 += '</div>';
      // html2 += '<li><a href="bankList.html">银行流水&nbsp;&gt;&gt;</a></li>';
      // html2 += '<li><a href="myWallet.html">账号绑定&nbsp;&gt;&gt;</a></li>';
      html2 += '</ul>';

      $("body").append(html2);
      if(window.location.pathname.indexOf("/xpetVipList.html") <= -1){
        getUseInfo();
      }
      
  }
})
function connectEOS() {
  if (window.ScatterJS) {
    ScatterJS.connect(tokenContractName, {
      network
    }).then(connected => {
      console.log("connected", connected);
      loot.scatter = window.ScatterJS.scatter;

      if (!connected) return false;
      // ScatterJS.someMethod();
    });


    loot.scatter = window.ScatterJS.scatter;
    // console.log("连接信息：",window.ScatterJS.scatter);
    // window.ScatterJS = null;
  }
}
function bindAccountFun() {
  if($("#bindAccountInput").val() == ''){
    showMsg('请输入要绑定的账号');
    return
  }
  if($("#smscode").val() == ''){
    showMsg('请输入验证码');
    return
  }
  bindAccount();
}
function bindAccount() {
  var url = '';
  var selfData = {};
    switch(selectBlockchain){
      case "IOST":
      url = '/api/xpet/bindIOST.do';
      selfData = {
        iostAccount:$("#bindAccountInput").val(),
        code:$("#smscode").val()
      };
        break;
      case "EOS":
      url = '/api/bindEOS.do';
      selfData = {
        eosAccount:$("#bindAccountInput").val(),
        code:$("#smscode").val()
      };
        break;
      case "COCOS":
      url = '/api/bindCOCOSAccount.do';
      selfData = {
        cocosAccount:$("#bindAccountInput").val()
      };
        break;
    }
  $.ajax({
  type: 'post',
  url: url,
  data:selfData,
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

$(document).on("click", ".msgMore", function() {
  if ($(".newUserBox").hasClass("active")) {
    $(".newUserBox").removeClass("active");
  } else {
    $(".newUserBox").addClass("active");
  }

});
$(document).on("click", "#userMsgPanel", function() {
  if (userMoneyFirst) {
    if (getCookie("token")) {
      getXUserBonus();
      listMyAccountMapping();
    }
    userMoneyFirst = false;
  } else {
    userMoneyFirst = true;
  }

});


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
            $("#iostBindAccountNameShow .accountName").html(n.account);
            $("#iostBindAccountNameShow .xBlueBtn").html('修改');
            bindIostAccount = n.account;
          }
          if (n.chainType == "EOS") {
            $("#eosBindAccountNameShow .accountName").html(n.account);
            $("#eosBindAccountNameShow .xBlueBtn").html('修改');
            bindEosAccount = n.account;
          }
          if (n.chainType == "COCOS") {
            // $("#eosBindAccountNameShow").html(n.account);
            // cocosAccount = n.account;
          }
        })
        // getMonsterList();
      }
    }
  })
}
function focuusAction() {
  var h = $(window).height();
  $("body,html").css({
    "overflow": "hidden",
    "height": h + "px"
  });
}

function blurAction() {
  $("body,html").css({
    "overflow": "auto",
    "height": "auto"
  });
}
function getXUserBonus() {

  console.log("银行信息")
  return
  $.ajax({
    type: 'get',
    url: '/api/getBankInfo.do',
    headers: {
      'Authorization': "BASIC " + getCookie("token")
    },
    // data: {
    //     'account': getCookie("eosAccount")
    // },
    dataType: 'json',
    success: function(data) {
      if (data.success) {
        var obj = data.object;
        var eos = Number(obj.freeAmountEOS).toFixed(4) + " EOS";
        var xpc = Number(obj.freeAmountXPC).toFixed(4) + " XPC";
        var iostMoney = '';
        var cocosMoney = '';
        if (obj) {
          $("#getXUserEoxMoney").html(eos);
          $("#getXUserXpcMoney").html(xpc);
          $("#getXUserIostMoney").html("0.0000 IOST");
          $("#getXUserCocosMoney").html("0.0000 COCOS");
          $("#getXUserNeoMoney").html("0.0000 GAS");

          $("#maxAmountEOS").html(Number(obj.maxAmountEOS).toFixed(4) + " EOS");
          $("#maxAmountXPC").html(Number(obj.maxAmountXPC).toFixed(4) + " XPC");
          if (obj.playerFundList) {
            var fund = obj.playerFundList;
            for (var i = 0; i < fund.length; i++) {
              if (fund[i].fundType == "IOST") {
                iostMoney = fund[i].quantity;
                $("#getXUserIostMoney").html(fund[i].quantity);
              }
              if (fund[i].fundType == "NEO") {
                var neoMoney = fund[i].quantity.split(" ")[0] + " GAS";
                $("#getXUserNeoMoney").html(neoMoney);
              }
              if (fund[i].fundType == "COCOS") {
                cocosMoney = fund[i].quantity;
                $("#getXUserCocosMoney").html(cocosMoney);
              }

            }
          }
          if (window.location.pathname.indexOf("breed.html") > 0) {
            switch (getCookie("customerType")) {
              case "EOS":
                $("#myBankMoney").html(eos);
                break;
              case "IOST":
                $("#myBankMoney").html(iostMoney);
                break;
              case "COCOS":
                $("#myBankMoney").html(cocosMoney);
                break;
              default:
                $("#myBankMoney").html(eos);
            }
          }
        } else {
          $("#getXUserEoxMoney").html("0.0000 EOS");
          $("#getXUserXpcMoney").html("0.0000 XPC");
          $("#maxAmountEOS").html("0.0000 EOS");
          $("#maxAmountXPC").html("0.0000 XPC");
          if (window.location.pathname.indexOf("breed.html") > 0) {
            switch (getCookie("customerType")) {
              case "EOS":
                $("#myBankMoney").html("0.0000 EOS");
                break;
              case "IOST":
                $("#myBankMoney").html("0.0000 IOST");
                break;
              default:
                $("#myBankMoney").html("0.0000 EOS");
            }
          }
        }


      } else {
        alert(data.message)
      }
    }
  });
}
function getUseInfo() {
  $.ajax({
    type: 'get',
    url: '/api/game/customers.do',
    headers: {
      'Authorization': "BASIC " + getCookie("token")
    },
    dataType: 'json',
    success: function(data) {
      if (data.success) {
        var obj = data.object;
        $("#nameTips").html(obj.chainAccount);
        $(".userNameTag").html(obj.chainAccount);

        setCookie("account",obj.chainAccount);
      }
    }
  });
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


    html += '<div id="bindAccount" style="display: block;">';
    html += '  <div class="alert2">';
    html += '    <div class="Box">';
    html += '      <ul class="flex">';
    html += '        <li class="header active" style="position: relative;">';
    html += '          绑定账号';
    html += '          <img src="imgs/close.svg" style="position: absolute;top:25px;right:10px;width:18px;" onclick="clearBindAccountTimer()">';
    html += '        </li>';
    html += '      </ul>';
    html += '      <div style="min-height: 413px;">';
    html += '        <ul>';
    html += '          <li class="flex">';
    html += '            <div class="inputBox" style="flex:1;">';
    html += '              <input style="padding-left: 12px;" id="smscode" type="text" placeholder="请输入验证码">';
    html += '            </div>';
    html += '            <div class="getCode" id="getCode">获取验证码</div>';
    html += '          </li>';
    html += '          <li class="flex inputBox">';
    html += '            <div class="ico flex"><img src="imgs/password.png" alt=""></div>';
    html += '            <input id="bindAccountInput" type="text" placeholder="请输入账号">';
    html += '          </li>';
    html += '        </ul>';
    html += '        <div class="loginBtn" id="operate" onclick="bindAccountFun()">确定</div>';
    html += '      </div>';
    html += '    </div>';
    html += '  </div>';
    html += '</div>';



    // html += '<div id="bindAccount">';
    // html += '  <div class="alert">';
    // html += '    <div>';
    // html += '      <h4>绑定账号</h4>';
    // html += '      <ul>';
    // html += '        <li class="flex">';
    // html += '          <div>绑定的账号：</div>';
    // html += '          <input type="text" id="bindAccountInput" placeholder="请输入你要绑定的账号" value="'+ value +'" style="flex: 1;">';
    // html += '        </li>';
    // html += '        <p style="font-size: 1.7rem;">你正在绑定 <span id="accountTips">'+ type +'</span> 账号，请绑定正确的账号，绑错账号造成损失无法追回</p>';
    // html += '        <li class="clear">';
    // html += '          <button class="right btn2 ok" onclick="bindAccountFun()">确认</button>';
    // html += '          <button class="right btn2 cancel" onclick="$(\'#bindAccount\').hide()">取消</button>';
    // html += '        </li>';
    // html += '      </ul>';
    // html += '    </div>';
    // html += '  </div>';
    // html += '</div>';




    $('body').append(html);
    $(function(){
      $('#getCode').on('click', getCode);
    })
    
  }else{
    $("#accountTips").html(type);
    $("#bindAccountInput").val(value);
  }
  $("#bindAccount").show();
}

function clearBindAccountTimer(){
    clearTimeout(bindAccountTimer);
    var val = $('#getCode');
    val.css('color', '#fff');
    val.css('background', '#d2372b');
    val.removeAttr('disabled');
    val.text('获取验证码');
    val.on('click', getCode);
    $('#bindAccount').hide();
    $('#smscode').val('');
}
function getCode() {
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
        bindAccountTimer = setTimeout(function() {
            settime(val)
        }, 1000);
    }
}


function IsPC() {
  var userAgentInfo = navigator.userAgent;
  var Agents = ["Android", "iPhone",
    "SymbianOS", "Windows Phone",
    "iPad", "iPod"
  ];
  var flag = true;
  for (var v = 0; v < Agents.length; v++) {
    if (userAgentInfo.indexOf(Agents[v]) > 0) {
      flag = false;
      break;
    }
  }
  return flag;
}

Date.prototype.Format = function(fmt) {
  var o = {
    "M+": this.getMonth() + 1, //月份
    "d+": this.getDate(), //日
    "h+": this.getHours(), //小时
    "m+": this.getMinutes(), //分
    "s+": this.getSeconds(), //秒
    "q+": Math.floor((this.getMonth() + 3) / 3), //季度
    "S": this.getMilliseconds() //毫秒
  };
  if (/(y+)/.test(fmt))
    fmt = fmt.replace(RegExp.$1, (this.getFullYear() + "").substr(4 - RegExp.$1.length));
  for (var k in o)
    if (new RegExp("(" + k + ")").test(fmt))
      fmt = fmt.replace(RegExp.$1, (RegExp.$1.length == 1) ? (o[k]) : (("00" + o[k]).substr(("" + o[k]).length)));
  return fmt;
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

function newUserBoxHide() {
  $('.newUserBox').removeClass('active');
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

function withdrawMoneyShow() {

  if ($('#withdrawMoneyPanelShow').length == 0) {
    var style = 'padding: 5px 10px;color: #82817d;line-height: normal;border-radius: 5px;margin-right: 18px;display: inline-block;border: 1px solid #82817d;cursor: pointer;';
    var html = '';
    var active = 'color: #fff;border: 1px solid #3495f9;background: #3495f9;';
    html += '<div style="display: none;" id="withdrawMoneyPanelShow">';
    html += '  <div class="alert">';
    html += '    <div>';
    html += '      <h4>提现</h4>';
    html += '      <ul>';
    html += '        <li class="flex">';
    html += '          <div>提现类型：</div>';
    html += '          <div style="flex: 1;" id="withdrawMoneyGround">';
    switch (getCookie("customerType")) {
      case "IOST":
        prepareRechargeType = "IOST";
        html += '             <span onclick="withdrawMoneyBtn(2)" style="' + style + ' ' + active + '" data-day="IOST">IOST</span>';
        html += '             <span onclick="withdrawMoneyBtn(1)" style="' + style + '" data-day="XPC">XPC</span>';
        html += '             <span onclick="withdrawMoneyBtn(0)" style="' + style + '" data-day="EOS">EOS</span>';
        html += '             <span onclick="withdrawMoneyBtn(3)" style="' + style + '" data-day="COCOS">COCOS</span>';
        break;
      case "COCOS":
        prepareRechargeType = "COCOS";
        html += '             <span onclick="withdrawMoneyBtn(3)" style="' + style + ' ' + active + '" data-day="COCOS">COCOS</span>';
        html += '             <span onclick="withdrawMoneyBtn(2)" style="' + style + '" data-day="IOST">IOST</span>';
        html += '             <span onclick="withdrawMoneyBtn(1)" style="' + style + '" data-day="XPC">XPC</span>';
        html += '             <span onclick="withdrawMoneyBtn(0)" style="' + style + '" data-day="EOS">EOS</span>';
        break;
      default:
        html += '             <span onclick="withdrawMoneyBtn(1)" style="' + style + ' ' + active + '" data-day="XPC">XPC</span>';
        html += '             <span onclick="withdrawMoneyBtn(0)" style="' + style + '" data-day="EOS">EOS</span>';
        html += '             <span onclick="withdrawMoneyBtn(2)" style="' + style + '" data-day="IOST">IOST</span>';
        html += '             <span onclick="withdrawMoneyBtn(3)" style="' + style + '" data-day="COCOS">COCOS</span>';

    }

    html += '          </div>';
    html += '        </li>';
    html += '        <li class="flex">';
    html += '          <div>提现数量：</div>';
    html += '          <input type="number" id="withdrawMoneyAmount" placeholder="请输入你要提现的数量" onfocus="focuusAction()" onblur="blurAction()" autofocus="autofocus" style="flex: 1;">';
    html += '        </li>';
    // if(getCookie("customerType") == "IOST"){
    //   html += '        <p style="font-size: 1.7rem;" id="withdrawMoneyMsg">IOST起充100.0000 IOST，最多充10000IOST</p>';
    // }else{
    //   html += '        <p style="font-size: 1.7rem;" id="withdrawMoneyMsg">每天前10次充值免CPU，XPC起充100.0000 XPC，最多充10000XPC</p>';

    // }
    html += '        <li class="clear">';
    html += '          <button class="right btn2 ok" onclick="getEosMapBonus2()" set-lan="ok">确认</button>';
    html += '          <button class="right btn2 cancel" onclick="$(\'#withdrawMoneyPanelShow\').hide()" set-lan="cancel">取消</button>';
    html += '        </li>';
    html += '      </ul>';
    html += '    </div>';
    html += '  </div>';
    html += '</div>';



    $('body').append(html);
  }
  $("#withdrawMoneyPanelShow").show();
}


function withdrawMoneyBtn(num) {
  var style = 'padding: 5px 10px;color: #82817d;line-height: normal;border-radius: 5px;margin-right: 18px;display: inline-block;border: 1px solid #82817d;cursor: pointer;';

  var active = 'color: #fff;border: 1px solid #3495f9;background: #3495f9;';
  var html = '';
  var active1 = '',
    active2 = '',
    active3 = '',
    active4 = '';
  if (num == 0) {
    active1 = active;
    prepareRechargeType = 'EOS';
    $("#withdrawMoneyMsg").html('每天前10次充值免CPU，EOS起充1.0000 EOS，最多1000.0000EOS');
  }
  if (num == 1) {
    active2 = active;
    prepareRechargeType = 'XPC';
    $("#withdrawMoneyMsg").html('每天前10次充值免CPU，XPC起充100.0000 XPC，最多充10000XPC');
  }
  if (num == 2) {
    active3 = active;
    prepareRechargeType = 'IOST';
    $("#withdrawMoneyMsg").html('IOST起充100.0000 IOST，最多充10000IOST');
  }
  if (num == 3) {
    active4 = active;
    prepareRechargeType = 'COCOS';
    $("#withdrawMoneyMsg").html('IOST起充100.0000 COCOS，最多充10000COCOS');
  }
  switch (getCookie("customerType")) {
    case "IOST":
      html += '             <span onclick="withdrawMoneyBtn(2)" style="' + style + ' ' + active3 + '" data-day="IOST">IOST</span>';
      html += '             <span onclick="withdrawMoneyBtn(3)" style="' + style + ' ' + active4 + '" data-day="COCOS">COCOS</span>';
      html += '             <span onclick="withdrawMoneyBtn(1)" style="' + style + ' ' + active2 + '" data-day="XPC">XPC</span>';
      html += '             <span onclick="withdrawMoneyBtn(0)" style="' + style + ' ' + active1 + '" data-day="EOS">EOS</span>';
      break;
    case "COCOS":
      html += '             <span onclick="withdrawMoneyBtn(3)" style="' + style + ' ' + active4 + '" data-day="COCOS">COCOS</span>';
      html += '             <span onclick="withdrawMoneyBtn(2)" style="' + style + ' ' + active3 + '" data-day="IOST">IOST</span>';
      html += '             <span onclick="withdrawMoneyBtn(1)" style="' + style + ' ' + active2 + '" data-day="XPC">XPC</span>';
      html += '             <span onclick="withdrawMoneyBtn(0)" style="' + style + ' ' + active1 + '" data-day="EOS">EOS</span>';
      break;
    default:
      html += '             <span onclick="withdrawMoneyBtn(1)" style="' + style + ' ' + active2 + '" data-day="XPC">XPC</span>';
      html += '             <span onclick="withdrawMoneyBtn(0)" style="' + style + ' ' + active1 + '" data-day="EOS">EOS</span>';
      html += '             <span onclick="withdrawMoneyBtn(2)" style="' + style + ' ' + active3 + '" data-day="IOST">IOST</span>';
      html += '             <span onclick="withdrawMoneyBtn(3)" style="' + style + ' ' + active4 + '" data-day="COCOS">COCOS</span>';
  }
  $("#withdrawMoneyGround").html(html);
}
function getEosMapBonus() {
  $.ajax({
    type: 'get',
    url: '/api/withdraw.do',
    headers: {
      'Authorization': "BASIC " + getCookie("token")
    },
    dataType: 'json',
    success: function(data) {
      if (data.success) {
        showMsg("提取成功");
        $('#withdrawMoneyPanelShow').hide();
        // $("#getXUserEoxMoney").html("0.0000 EOS");
        // $("#getXUserXpcMoney").html("0.0000 XPC");
        getXUserBonus();

      } else {
        alert(data.message)
      }
    }
  });
}

function getEosMapBonus2() {
  if ($("#withdrawMoneyAmount").val() == '') {
    showMsg("请输入提现金额");
    return
  }
  $.ajax({
    type: 'post',
    url: '/api/withdraw.do',
    data: {
      type: prepareRechargeType,
      amount: $("#withdrawMoneyAmount").val()
    },
    headers: {
      'Authorization': "BASIC " + getCookie("token")
    },
    dataType: 'json',
    success: function(data) {
      if (data.success) {
        showMsg("提取成功");
        $('#withdrawMoneyPanelShow').hide();
        // $("#getXUserEoxMoney").html("0.0000 EOS");
        // $("#getXUserXpcMoney").html("0.0000 XPC");
        getXUserBonus();

      } else {
        alert(data.message)
      }
    }
  });
}

function exit() {
  switch (getCookie("block")) {
    case "EOS":
    case "BOS":
      if (loot) {
        if (loot.scatter) {
          loot.scatter.forgetIdentity();
        }
      }
      break;
    default:
  }
  setCookie('account', '');
  setCookie("token", '');

  window.location.href = window.location.href;
}



function getBlockName() {
  var blockName = getURLPara("block") || getCookie("block") || 'EOS';
  return blockName;
}
function getScatter() {
  if (window.scatter) {
    loot.scatter = window.scatter;
  }
  return loot.scatter;
}
function checkScatter(fun) {
  var scatter = getScatter();
  if (scatter) {
    if (scatter.identity) {
      // console.log(scatter.identity);
      const user = loot.scatter.identity.accounts.find(account => account.blockchain === 'eos');
      if (user.publicKey) {
        loot.publicKey = user.publicKey
      }
      loot.bomber = user.name;
      // fun(user.name);
      fun(user);
      // console.log("userMsg:",user);
    } else {
      const requiredFields = {
        accounts: [network]
      };
      if (scatter.getIdentity) {
        scatter.getIdentity(requiredFields).then(identity => {
          var user = '';
          if (getCookie("customerType") == 'BOS' || getCookie("blockchain") == 'BOS') {
            user = identity.accounts.find(account => account.blockchain === 'bos');
          } else {
            user = identity.accounts.find(account => account.blockchain === 'eos');
          }
          if (user.publicKey) {
            loot.publicKey = user.publicKey
          }
          if (isMYKEY()) {
            loot.publicKey = identity.publicKey;
          }
          loot.bomber = user.name;
          // fun(user.name);
          fun(user);
          // console.log("userMsg2:",user);
        }).catch(error => {
          eosErrorShow(error);
        });
      } else {
        showMsg("请打开scatter");
      }
    }
  } else {
    noScatterShow();
  }
}


function isMYKEY() {
  return navigator.userAgent.indexOf("MYKEY") > -1;
}

function noScatterShow() {
  alert("没有")
}
function eosErrorShow(error) {
  if (error) {
    if (error.isError) {
      if (error.code == 423) {
        showMsg(error.message);
      } else {
        alert(error.message);
      }
    } else {
      var obj = JSON.stringify(error);
      if (obj.indexOf("{")) {
        obj = JSON.parse(error);
        if (obj.code) {
          if (obj.code == 500 && obj.error.code == 3050003) {
            alert(obj.error.details[0].message);
            // alert(error);
          } else {
            showMsg(obj.error.details[0].message);
            // showMsg(error);
          }
        } else {
          showMsg(error);
        }
      } else {
        showMsg(obj);
      }
      console.log("error:", error);
    }
  }
}

