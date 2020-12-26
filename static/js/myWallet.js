var bindAccountInput = '';
var iostAccount = '';
var eosAccount = '';
var cocosAccount = '';
var selectBlockchain = '';
$(function() {
  if (getCookie("token")) {

    listMyAccountMapping();
  }
})


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
  iostAccount == '' ? textShow = '绑定' : textShow = '修改';
  eosAccount == '' ? textShow2 = '绑定' : textShow2 = '修改';
  cocosAccount == '' ? textShow3 = '绑定' : textShow3 = '修改';

  // if (getBlockName() != "IOST") {
    html += '<tr> ';
    html += ' <td align="center" style="">' + iostAccount + '</td> ';
    html += ' <td align="center" style="">IOST</td> ';
    html += ' <td align="center"><button class="xBlueBtn" onclick="bindAccountShow(\'IOST\')" style="width:180px;">' + textShow + '</button></td> ';
    html += '</tr>';
  // }
  // if (getBlockName() != "EOS") {
    html += '<tr> ';
    html += ' <td align="center" style="">' + eosAccount + '</td> ';
    html += ' <td align="center" style="">EOS</td> ';
    html += ' <td align="center"><button class="xBlueBtn" onclick="bindAccountShow(\'EOS\')" style="width:180px;">' + textShow2 + '</button></td> ';
    html += '</tr>';

  // }
  // if (getBlockName() != "COCOS") {
    html += '<tr> ';
    html += ' <td align="center" style="">' + cocosAccount + '</td> ';
    html += ' <td align="center" style="">COCOS</td> ';
    html += ' <td align="center"><button class="xBlueBtn" onclick="bindAccountShow(\'COCOS\')" style="width:180px;">' + textShow3 + '</button></td> ';
    html += '</tr>';
  // }



  html += '   </tbody> ';
  html += '</table>';



  $(".BrowseKittyGallery .MyInvitedUser").html(html);

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
            iostAccount = n.account;
          }
          if (n.chainType == "EOS") {
            eosAccount = n.account;
          }
          if (n.chainType == "COCOS") {
            cocosAccount = n.account;
          }
        })
        getMonsterList();
      }
    }
  })
}

function bindAccountShow(type) {

  $("#accountTips").html(type);
  selectBlockchain = type;
  switch (type) {
    case "IOST":
      $("#bindAccountInput").val(iostAccount);
      break;
    case "EOS":
      $("#bindAccountInput").val(eosAccount);
      break;
    case "COCOS":
      $("#bindAccountInput").val(cocosAccount);
      break;
  }
  $("#bindAccount").show();

}

function bindAccountFun() {
  if ($("#bindAccountInput").val() == '') {
    showMsg('请输入要绑定的账号');
    return
  }
  bindAccount();

}



function pubKeySign2(eosName) {
  if (xpet.publicKey) {
    eosSign2(eosName);
  } else {
    const scatter = getScatter();
    const eos = xpet.scatter.eos(network, Eos);
    eos.getAccount(eosName).then(data => {
      const pubKey = data.permissions[0].required_auth.keys[0].key;
      xpet.publicKey = pubKey;
      eosSign2(eosName);
    });
  }

}

function eosSign2(eosName) {

  var pubKey = xpet.publicKey;
  const scatter = getScatter();
  const whatfor = "Login";
  const account = eosName;
  const isHash = false;
  scatter.getArbitrarySignature(pubKey, eosName, whatfor, isHash).then(signature => {

    eosBindIOST(eosName, signature);
  }).catch(error => {
    console.log("error:", error);
    alert(error.message);
  });
}

function eosBindIOST(eosName, sign) {
  var pubKey = xpet.publicKey;
  var url = '/api/xpet/eosBindIOST.do';
  var selfData = {
    eosAccount: eosName,
    pubKey: pubKey,
    sign: sign,
    iostAccount: $("#bindAccountInput").val()
  }

  $.ajax({
    type: 'post',
    url: url,
    data: selfData,
    dataType: 'json',
    success: function(data) {

      if (data.code == 200) {
        showMsg("绑定成功");
        $("#bindAccount").hide();
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



function IOSTBeforeAuth2(name) {
  $.ajax({
    type: 'get',
    url: '/api/IOSTBeforeAuth.do',
    data: {
      account: name
    },
    dataType: 'json',
    success: function(data) {
      if (data.code == 200) {
        var obj = data.object;
        iostSignature2(obj.code);
      } else {
        showMsg(data.message);
      }
    },
    error: function(data) {
      //判断token是否有效
      if (data.status == 401) {
        showMsg(data.message);
      }
    }
  });
}

function iostSignature2(code) {
  IWalletJS.enable().then((account) => {
    if (account) {
      var iost = IWalletJS.newIOST(IOST);
      var tx = iost.callABI(iostContractName, "signature", [code]);
      tx.addApprove('iost', '0.0001');
      iost.signAndSend(tx).on('pending', (pending) => {

        getTxReceipt(pending, function(data) {
          iostBindEOS(account);
        })
      }).on('success', (result) => {
        if (iostSuccessStaus == true) {
          iostBindEOS(account);
          $("#loadingBox").hide();
          iostPendingStaus = false;
        }
        // iostBindEOS(account);
      }).on('failed', (failed) => {
        // // alert("failed:"+JSON.stringify(failed));
        // var obj = JSON.parse(JSON.parse(failed.returns[0]));
        // if(obj.success){
        //   // showMsg("登录成功")
        // }else{
        //   // alert("登录失败："+failed.returns[0]);
        // }
      })
    } else {
      showMsg('not login')
    }
  })
}

function iostBindEOS(account) {
  $.ajax({
    type: 'post',
    url: '/api/iostBindEOS.do',
    data: {
      account: account,
      eosAccount: $("#bindAccountInput").val()
    },
    dataType: 'json',
    success: function(data) {
      if (data.code == 200) {
        showMsg("绑定成功");
        $("#bindAccount").hide();
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


function bindIOSTAccount() {
  $.ajax({
    type: 'post',
    url: '/api/bindIOST.do',
    data: {
      iostAccount: $("#bindAccountInput").val()
    },
    headers: {
      'Authorization': "BASIC " + getCookie("token")
    },
    dataType: 'json',
    success: function(data) {
      if (data.code == 200) {
        showMsg("绑定成功");
        $("#bindAccount").hide();
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

function bindEOSAccount() {
  $.ajax({
    type: 'post',
    url: '/api/bindEOS.do',
    data: {
      eosAccount: $("#bindAccountInput").val()
    },
    headers: {
      'Authorization': "BASIC " + getCookie("token")
    },
    dataType: 'json',
    success: function(data) {
      if (data.code == 200) {
        showMsg("绑定成功");
        $("#bindAccount").hide();
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

function bindCOCOSAccount() {
  $.ajax({
    type: 'post',
    url: '/api/bindCOCOSAccount.do',
    data: {
      cocosAccount: $("#bindAccountInput").val()
    },
    headers: {
      'Authorization': "BASIC " + getCookie("token")
    },
    dataType: 'json',
    success: function(data) {
      if (data.code == 200) {
        showMsg("绑定成功");
        $("#bindAccount").hide();
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

function bindAccount() {
  var url = '';
  var selfData = {};
  switch (selectBlockchain) {
    case "IOST":
      url = '/api/xpet/bindIOST.do';
      selfData = {
        iostAccount: $("#bindAccountInput").val()
      };
      break;
    case "EOS":
      url = '/api/bindEOS.do';
      selfData = {
        eosAccount: $("#bindAccountInput").val()
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
        showMsg("绑定成功");
        $("#bindAccount").hide();
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