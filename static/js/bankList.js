var selfTag = '';
$(function() {
  var num = Number(getURLPara("page")) || 0;
  listKingdomTaxlog(num);
})

function selectTag(tag) {
  $("#moneySendShow").hide();
  selfTag = tag;
  listPlayerFundLog(0);
}

function listKingdomTaxlog(page) {
  $("#moneySendShow").hide();
  $(".BrowseKittyGallery .TabNav-tab").removeClass("TabNav-tab--active");
  $(".BrowseKittyGallery .TabNav-tab").eq(0).addClass("TabNav-tab--active");

  var loadHtml = '<div class="flex"><div style="padding:30px;background: rgba(0,0,0,0.7);color:#fff;text-align: center;border-radius: 10px;"><img src="imgs/loading.gif" alt=""><br><div>加载中...</div></div></div>'
  $(".BrowseKittyGallery .MyInvitedUser").html(loadHtml);


  $.ajax({

    type: 'get',
    url: '/api/listKingdomTaxlog.do',
    data: {
      page: page,
      size: 10
    },
    headers: {
      'Authorization': "BASIC " + getCookie("token")
    },
    dataType: 'json',
    success: function(data) {
      if (data.success) {
        var obj = data.object.content;
        var html = '',
          html2 = '';
        if (obj == '') {
          $(".BrowseKittyGallery .MyInvitedUser").html('<div class="flex" style="padding:10px;">没有相关记录</div>');
          $(".KittiesGalleryPagination .Pagination").html(html2);
          return
        } else {
          html += '<table border="1" style=""> ';
          html += '   <tbody>';
          html += '    <tr> ';
          html += '     <td align="center">EOS</td>';
          html += '     <td align="center">XPC</td>';
          html += '     <td align="center" style="">类型</td> ';
          html += '     <td align="center" style="">备注</td> ';
          html += '     <td align="center" style="">时间</td> ';
          html += '    </tr>';
          $.each(obj, function(i, n) {


            html += '<tr> ';
            html += ' <td align="center" style="">' + Number(n.amountEOS).toFixed(4) + '</td> ';


            html += ' <td align="center">' + Number(n.amountXPC).toFixed(4) + '</td> ';
            html += ' <td align="center" style="">' + getTaxType(n.taxType) + '</td> ';
            html += ' <td align="center" style="">' + n.memo + '</td> ';
            html += ' <td align="center" style="">' + new Date(n.createDate).Format("yyyy/MM/dd hh:mm:ss") + '</td> ';

            html += '</tr>';


          })

          html += '   </tbody> ';
          html += '</table>';
        }


        $(".BrowseKittyGallery .MyInvitedUser").html(html);

        html2 += '<div class="Pagination-pages">';
        var num = 10,
          startIndex, endIndex, total;
        total = data.object.totalPages;
        if (total < num) {
          num = total;
        }
        if (page > 5) {
          if (total <= page + 5) {
            startIndex = page - (num - (total - page));
            endIndex = startIndex + 10;
          } else {
            startIndex = page - 5;
            endIndex = page + 5;
          }
        } else {
          startIndex = 0;
          endIndex = num;
        }
        for (var i = startIndex; i < endIndex; i++) {
          if (i == page) {
            html2 += '<button class="Pagination-page Pagination-page--active" onclick="listKingdomTaxlog(' + i + ')">' + (i + 1) + '</button>';
          } else {
            html2 += '<button class="Pagination-page" onclick="listKingdomTaxlog(' + i + ')">' + (i + 1) + '</button>';
          }
        }
        html2 += '</div>';
        html2 += '<div>';
        if (page == 0) {
          html2 += '  <button class="Pagination-button Pagination-button--disabled">';
        } else {
          html2 += '  <button class="Pagination-button" onclick="listKingdomTaxlog(' + (page - 1) + ')">';
        }
        html2 += '      上一页';
        html2 += '  </button>';

        if (page == data.object.totalPages - 1 || data.object.totalPages == 0) {
          html2 += '  <button class="Pagination-button Pagination-button--disabled">';
        } else {
          html2 += '  <button class="Pagination-button" onclick="listKingdomTaxlog(' + (page + 1) + ')">';
        }
        html2 += '      下一页';
        html2 += '  </button>';
        html2 += '</div>'
        $(".KittiesGalleryPagination .Pagination").html(html2);



      } else {
        alert(data.message)
      }
    }
  });
}


function listMyEOSMoneySend(page) {
  $("#moneySendShow").show();
  $(".MyEOSMoneySend").removeClass("active");
  $(".MyEOSMoneySend").eq(0).addClass("active");

  $(".BrowseKittyGallery .TabNav-tab").removeClass("TabNav-tab--active");
  $(".BrowseKittyGallery .TabNav-tab").eq(4).addClass("TabNav-tab--active");

  var loadHtml = '<div class="flex"><div style="padding:30px;background: rgba(0,0,0,0.7);color:#fff;text-align: center;border-radius: 10px;"><img src="imgs/loading.gif" alt=""><br><div>加载中...</div></div></div>'
  $(".BrowseKittyGallery .MyInvitedUser").html(loadHtml);


  $.ajax({

    type: 'get',
    url: '/api/listMyEOSMoneySend.do',
    data: {
      page: page,
      size: 10
    },
    headers: {
      'Authorization': "BASIC " + getCookie("token")
    },
    dataType: 'json',
    success: function(data) {
      if (data.success) {
        var obj = data.object.content;
        var html = '',
          html2 = '';
        if (obj == '') {
          $(".BrowseKittyGallery .MyInvitedUser").html('<div class="flex" style="padding:10px;">没有相关记录</div>');
          $(".KittiesGalleryPagination .Pagination").html(html2);
          return
        } else {
          html += '<table border="1" style=""> ';
          html += '   <tbody>';
          html += '    <tr> ';
          html += '     <td align="center">金额</td>';
          html += '     <td align="center" style="">状态</td> ';
          html += '     <td align="center" style="max-width:200px;text-overflow:ellipsis;overflow:hidden;">tx_hash</td> ';
          html += '     <td align="center" style="">时间</td> ';
          html += '    </tr>';
          $.each(obj, function(i, n) {

            var string = '正在发送，请稍候';
            if (n.syncStat == "SYNCED") {
              if (n.txId) {
                string = '<span style="color:#3495f9;">' + n.txId + '</span>';
              } else {
                string = '<span style="color:#f63312;">发送失败，等待手工复核</span>';
              }
            }
            html += '<tr> ';
            html += ' <td align="center" style="">' + n.amount + '</td> ';
            html += ' <td align="center" style="">' + n.syncStat + '</td> ';
            // html += ' <td align="center" style="">'+ getTaxType(n.syncStat) +'</td> ';
            html += ' <td align="center" style="max-width:200px;text-overflow:ellipsis;overflow:hidden;">' + string + '</td> ';
            html += ' <td align="center" style="">' + new Date(n.createDate).Format("yyyy/MM/dd hh:mm:ss") + '</td> ';

            html += '</tr>';


          })

          html += '   </tbody> ';
          html += '</table>';
        }


        $(".BrowseKittyGallery .MyInvitedUser").html(html);

        html2 += '<div class="Pagination-pages">';
        var num = 10,
          startIndex, endIndex, total;
        total = data.object.totalPages;
        if (total < num) {
          num = total;
        }
        if (page > 5) {
          if (total <= page + 5) {
            startIndex = page - (num - (total - page));
            if (page < num) {
              endIndex = startIndex + num;
            } else {
              endIndex = startIndex + 10;
            }
          } else {
            startIndex = page - 5;
            endIndex = page + 5;
          }
        } else {
          startIndex = 0;
          endIndex = num;
        }
        for (var i = startIndex; i < endIndex; i++) {
          if (i == page) {
            html2 += '<button class="Pagination-page Pagination-page--active" onclick="listMyEOSMoneySend(' + i + ')">' + (i + 1) + '</button>';
          } else {
            html2 += '<button class="Pagination-page" onclick="listMyEOSMoneySend(' + i + ')">' + (i + 1) + '</button>';
          }
        }
        html2 += '</div>';
        html2 += '<div>';
        if (page == 0) {
          html2 += '  <button class="Pagination-button Pagination-button--disabled">';
        } else {
          html2 += '  <button class="Pagination-button" onclick="listMyEOSMoneySend(' + (page - 1) + ')">';
        }
        html2 += '      上一页';
        html2 += '  </button>';

        if (page == data.object.totalPages - 1 || data.object.totalPages == 0) {
          html2 += '  <button class="Pagination-button Pagination-button--disabled">';
        } else {
          html2 += '  <button class="Pagination-button" onclick="listMyEOSMoneySend(' + (page + 1) + ')">';
        }
        html2 += '      下一页';
        html2 += '  </button>';
        html2 += '</div>'
        $(".KittiesGalleryPagination .Pagination").html(html2);



      } else {
        alert(data.message)
      }
    }
  });
}

function listMyIOSTMoneySender(page) {
  $("#moneySendShow").show();
  $(".MyEOSMoneySend").removeClass("active");
  $(".MyEOSMoneySend").eq(1).addClass("active");

  $(".BrowseKittyGallery .TabNav-tab").removeClass("TabNav-tab--active");
  $(".BrowseKittyGallery .TabNav-tab").eq(4).addClass("TabNav-tab--active");

  var loadHtml = '<div class="flex"><div style="padding:30px;background: rgba(0,0,0,0.7);color:#fff;text-align: center;border-radius: 10px;"><img src="imgs/loading.gif" alt=""><br><div>加载中...</div></div></div>'
  $(".BrowseKittyGallery .MyInvitedUser").html(loadHtml);


  $.ajax({

    type: 'get',
    url: '/api/listMyIOSTMoneySender.do',
    data: {
      page: page,
      size: 10
    },
    headers: {
      'Authorization': "BASIC " + getCookie("token")
    },
    dataType: 'json',
    success: function(data) {
      if (data.success) {
        var obj = data.object.content;
        var html = '',
          html2 = '';
        if (obj == '') {
          $(".BrowseKittyGallery .MyInvitedUser").html('<div class="flex" style="padding:10px;">没有相关记录</div>');
          $(".KittiesGalleryPagination .Pagination").html(html2);
          return
        } else {
          html += '<table border="1" style=""> ';
          html += '   <tbody>';
          html += '    <tr> ';
          html += '     <td align="center">金额</td>';
          html += '     <td align="center" style="">状态</td> ';
          html += '     <td align="center" style="max-width:200px;text-overflow:ellipsis;overflow:hidden;">tx_hash</td> ';
          html += '     <td align="center" style="">时间</td> ';
          html += '    </tr>';
          $.each(obj, function(i, n) {

            var string = '正在发送，请稍候';
            if (n.syncStat == "SYNCED") {
              if (n.txId) {
                string = '<span style="color:#3495f9;">' + n.txId + '</span>';
              } else {
                string = '<span style="color:#f63312;">发送失败，等待手工复核</span>';
              }
            }
            html += '<tr> ';
            html += ' <td align="center" style="">' + n.quantity + '</td> ';
            html += ' <td align="center" style="">' + n.syncStat + '</td> ';
            // html += ' <td align="center" style="">'+ getTaxType(n.syncStat) +'</td> ';
            html += ' <td align="center" style="max-width:200px;text-overflow:ellipsis;overflow:hidden;">' + string + '</td> ';
            html += ' <td align="center" style="">' + new Date(n.lastModifyDate).Format("yyyy/MM/dd hh:mm:ss") + '</td> ';

            html += '</tr>';


          })

          html += '   </tbody> ';
          html += '</table>';
        }


        $(".BrowseKittyGallery .MyInvitedUser").html(html);

        html2 += '<div class="Pagination-pages">';
        var num = 10,
          startIndex, endIndex, total;
        total = data.object.totalPages;
        if (total < num) {
          num = total;
        }
        if (page > 5) {
          if (total <= page + 5) {
            startIndex = page - (num - (total - page));
            if (page < num) {
              endIndex = startIndex + num;
            } else {
              endIndex = startIndex + 10;
            }
          } else {
            startIndex = page - 5;
            endIndex = page + 5;
          }
        } else {
          startIndex = 0;
          endIndex = num;
        }
        for (var i = startIndex; i < endIndex; i++) {
          if (i == page) {
            html2 += '<button class="Pagination-page Pagination-page--active" onclick="listMyIOSTMoneySender(' + i + ')">' + (i + 1) + '</button>';
          } else {
            html2 += '<button class="Pagination-page" onclick="listMyIOSTMoneySender(' + i + ')">' + (i + 1) + '</button>';
          }
        }
        html2 += '</div>';
        html2 += '<div>';
        if (page == 0) {
          html2 += '  <button class="Pagination-button Pagination-button--disabled">';
        } else {
          html2 += '  <button class="Pagination-button" onclick="listMyIOSTMoneySender(' + (page - 1) + ')">';
        }
        html2 += '      上一页';
        html2 += '  </button>';

        if (page == data.object.totalPages - 1 || data.object.totalPages == 0) {
          html2 += '  <button class="Pagination-button Pagination-button--disabled">';
        } else {
          html2 += '  <button class="Pagination-button" onclick="listMyIOSTMoneySender(' + (page + 1) + ')">';
        }
        html2 += '      下一页';
        html2 += '  </button>';
        html2 += '</div>'
        $(".KittiesGalleryPagination .Pagination").html(html2);



      } else {
        alert(data.message)
      }
    }
  });
}


function listPlayerFundLog(page) {
  var index = 0;
  var fundType = "";
  switch (selfTag) {
    case "IOST":
      fundType = "IOST";
      index = 1;
      break;
    case "COCOS":
      fundType = "COCOS";
      index = 2;
      break;
    default:
      fundType = "CARD_WEIGHT";
      index = 3;
  }

  $("#moneySendShow").hide();
  $(".BrowseKittyGallery .TabNav-tab").removeClass("TabNav-tab--active");
  $(".BrowseKittyGallery .TabNav-tab").eq(index).addClass("TabNav-tab--active");
  var loadHtml = '<div class="flex"><div style="padding:30px;background: rgba(0,0,0,0.7);color:#fff;text-align: center;border-radius: 10px;"><img src="imgs/loading.gif" alt=""><br><div>加载中...</div></div></div>'
  $(".BrowseKittyGallery .MyInvitedUser").html(loadHtml);
  $(".KittiesGalleryPagination .Pagination").html('');
  $.ajax({
    type: 'get',
    url: '/api/listPlayerFundLog.do',
    data: {
      fundType: fundType,
      page: page,
      size: 10
    },
    headers: {
      'Authorization': "BASIC " + getCookie("token")
    },
    dataType: 'json',
    success: function(data) {
      if (data.success) {
        var obj = data.object.content;
        var html = '',
          html2 = '';
        if (obj == '') {
          $(".BrowseKittyGallery .MyInvitedUser").html('<div class="flex" style="padding:10px;">没有相关记录</div>');
          $(".KittiesGalleryPagination .Pagination").html(html2);
          return
        } else {
          html += '<table border="1" style=""> ';
          html += '   <tbody>';
          html += '    <tr> ';
          html += '     <td align="center">目前余额</td> ';
          html += '     <td align="center">之前余额</td> ';
          html += '     <td align="center">收入</td> ';
          html += '     <td align="center">支出</td> ';
          // html += '     <td align="center">类型</td> ';
          html += '     <td align="center">时间</td> ';
          html += '    </tr>';
          $.each(obj, function(i, n) {

            html += '<tr> ';
            html += ' <td align="center" style="">' + n.afterChange + '</td> ';
            html += ' <td align="center" style="">' + n.beforeChange + '</td> ';
            html += ' <td align="center" style="">' + Number(n.income).toFixed(4) + '</td> ';
            html += ' <td align="center" style="">' + Number(n.outcome).toFixed(4) + '</td> ';
            // html += ' <td align="center" style="">'+ n.fundType +'</td> ';
            html += ' <td align="center" style="">' + new Date(n.createDate).Format("yyyy/MM/dd hh:mm:ss") + '</td> ';
            html += '</tr>';
          })
          html += '   </tbody> ';
          html += '</table>';
        }
        $(".BrowseKittyGallery .MyInvitedUser").html(html);
        html2 += '<div class="Pagination-pages">';
        var num = 10,
          startIndex, endIndex, total;
        total = data.object.totalPages;
        if (total < num) {
          num = total;
        }
        if (page > 5) {
          if (total <= page + 5) {
            startIndex = page - (num - (total - page));
            endIndex = startIndex + 10;
          } else {
            startIndex = page - 5;
            endIndex = page + 5;
          }
        } else {
          startIndex = 0;
          endIndex = num;
        }
        for (var i = startIndex; i < endIndex; i++) {
          if (i == page) {
            html2 += '<button class="Pagination-page Pagination-page--active" onclick="listPlayerFundLog(' + i + ')">' + (i + 1) + '</button>';
          } else {
            html2 += '<button class="Pagination-page" onclick="listPlayerFundLog(' + i + ')">' + (i + 1) + '</button>';
          }
        }
        html2 += '</div>';
        html2 += '<div>';
        if (page == 0) {
          html2 += '  <button class="Pagination-button Pagination-button--disabled">';
        } else {
          html2 += '  <button class="Pagination-button" onclick="listPlayerFundLog(' + (page - 1) + ')">';
        }
        html2 += '      上一页';
        html2 += '  </button>';

        if (page == data.object.totalPages - 1 || data.object.totalPages == 0) {
          html2 += '  <button class="Pagination-button Pagination-button--disabled">';
        } else {
          html2 += '  <button class="Pagination-button" onclick="listPlayerFundLog(' + (page + 1) + ')">';
        }
        html2 += '      下一页';
        html2 += '  </button>';
        html2 += '</div>'
        $(".KittiesGalleryPagination .Pagination").html(html2);
      } else {
        alert(data.message)
      }
    }
  });
}



function getTaxType(name) {
  switch (name) {

    case "XPC_MINING":
      return "挖矿";
      break;
    case "XPC_AUCTION":
    case "XPC_AUCTION_EOS":
    case "XPET_AUCTION_BID":
      return "竞拍";
      break;
    case "XPC_HEROLIST":
      return "英雄榜";
      break;
    case "XPET_HATCH":
      return "孵化";
      break;
    case "XPET_CAREHATCH":
      return "精细孵化";
      break;
    case "XPET_ITEM_EXCHANGE":
      return "道具交易";
      break;
    case "XPET_RENT":
      return "租宠";
      break;
    case "EOS_CANDY":
    case "XPC_CANDY":
      return "糖果";
      break;



    case "XPC_GIFT":
      return "赠送";
      break;
    case "XPET_AGENT_DIV":
    case "XPET_INCOME":
      return "XPET收入";
      break;
    case "XPC_RECHARGE":
    case "LOOT_RECHARGE":
    case "EOS_RECHARGE":
      return "充值";
      break;
    case "XPC_CONSUME":
    case "EOS_CONSUME":
      return "消费";
      break;
    case "XPC_EXCHNAGE":
      return "兑换";
      break;
    default:
      return "未知类型";
  }
}