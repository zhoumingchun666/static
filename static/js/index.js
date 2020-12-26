
$(function() {
  var src = 'https://mhxpet.xlootcn.com';
  var ver = new Date().getTime();

  if (/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)) {
    window.location = src;
  } else {

    var iframeWidth = $("body").height()/532*300;
    var html = '',blockTag = '';
    var block = getURLPara("block") || getCookie("block") || '';
    if(block != ''){
      blockTag = '&block='+block;
    }
    if(getCookie("token")){
      src = src + '?ver='+ ver +'&type=PC'+ blockTag +'&token=' + getCookie("token");
    }else{
      src = src + '?ver='+ ver +'&type=PC'+ blockTag;
    }

    html += '<iframe id="iframe" src="'+ src +'" style="width:'+ iframeWidth +'px;height:100%;"></iframe>';

    // html += '<div class="wrap">';
    // html += '  <div class="page00">';
    // html += '    <iframe src="'+ src +'" style="width:'+ iframeWidth +'px"></iframe>';
    // html += '  </div>';
    // html += '</div>';
    $(".contentBox").html(html);

    setInterval(function() {
      $("#time").html(new Date().Format("yyyy-MM-dd hh:mm:ss"))
    }, 1000)
  }

})