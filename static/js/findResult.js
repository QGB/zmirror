/**
 * lb
 * 
 * 批量操作
 * 
 */
function GetRandom(n){
	GetRandomn=Math.floor(Math.random()*n+1);
	return GetRandomn;
}
function setSelectIdVal(ev) {
	$("#selectedId").val(ev);
}
//关闭登录遮罩层
function closeDiv() {
	$("#BgDiv").css("display", "none");
	$("#DialogDiv").css("display", "none");
	$("#DialogDivzt").css("display", "none");
	$("#DialogDivwb").css("display", "none");
	$("#listInfo").css("display", "none");
	$(".zhezhao").css("display", "none");
	$("#DialogDivff").css("display", "none");
	$("body").css("overflow","auto");
	
}
function aMouseImg(id,imgSrc){
	//$("#"+id).attr({"src":imgSrc});
}

function getTimeDomain(defaultLen){
	var timeDomain = 24;
	if(defaultLen=='today'){
 		timeDomain = 1;
 	}else if(defaultLen=='24h'){
 		timeDomain = 24;
 	}else if(defaultLen=='2days'){
 		timeDomain = 2;
 	}else if(defaultLen=='3days'){
 		timeDomain = 3;
 	}else if(defaultLen=='week'){
 		timeDomain = 7;
 	}else if(defaultLen=='10days'){
 		timeDomain = 10;
 	}else if(defaultLen=='other'){
 		timeDomain = -1;
 	}
	return timeDomain;
}
//B类分发
function fenfa(id,init){
	parent.parent.isLoginFrm(function(){
	var keywordId= document.getElementById("kw.id").value;
	
	if(id!=0){
		var repeatNum = document.getElementById("repeatNum_"+id).value;
		if(keywordId!=null && keywordId!=""){
			$("#send_ff_frame").attr("src","fenfa_news.action?fenfaId="+id+"_"+repeatNum+"&init="+init+"&kw.id="+keywordId);
		}else{
			$("#send_ff_frame").attr("src","fenfa_news.action?fenfaId="+id+"_"+repeatNum+"&init="+init);
		}
			
	}else{
		var elements = document.getElementsByTagName("input");
		var checkedIds = "";
		for ( var i = 0; i < elements.length; i++) {
			var e = elements[i];
			if (e.id == "menuCheckId") {
				if (e.checked == true) {						
						checkedIds = checkedIds + e.value+"_"+$("#repeatNum_"+e.value).val() + ",";
					
				}
			}
		}
		if(checkedIds=="" || checkedIds==null){
			layerOpen1("分发","请选择需要分发的信息!");
			return;
		}
		
		if(keywordId!=null && keywordId!=""){
			
			$("#send_ff_frame").attr("src","fenfa_news.action?fenfaId="+checkedIds+"&init="+init+"&kw.id="+keywordId);
		}else{
			$("#send_ff_frame").attr("src","fenfa_news.action?fenfaId="+checkedIds+"&init="+init);
		}
		   
	
	}
//顶部
var h = 30 + "px";
var dh = $("#DialogDivff").outerHeight();
var th = $(window).height();
	$("#DialogDivff").css({
		position:"fixed",
		display:"block",
		top:h
	});
	});
}

/**
 * 分发信息到上海洛安
 * @param id
 */
function fenfaLuoan(id){
	parent.parent.isLoginFrm(function(){
		 $.ajax({
             url:'messageToLuoAn.action',
             type:'POST',
             data:{"con.id":id
                 },
             async:true,
             success:function(data){
            	 if(data!=null){
 					if(data.result==1){
 						layerOpen1("信息推送","推送成功");
 					}else if(data.result==2){
 						layerOpen1("信息推送","您已经上报过该信息已经上报过该信息");
 					}else if(data.result==3){
 						layerOpen1("信息推送","该信息已达到上限3条");
 					}else if(data.result==4){
 						layerOpen1("信息推送","认证信息失效,请您重新登录");
 					}else{
 						layerOpen1("信息推送","推送失败");
 					}
 				}else{
 					layerOpen1("信息推送","推送失败");
 				}
             }
         });
		

	});
}

function getCheckIDs() {
	var elements = document.getElementsByName("menuCheckId");
	var checkedIds = "";
	for ( var i = 0; i < elements.length; i++) {
		var e = elements[i];
		 
		if (e.checked == true) {
				// checkedMenu = checkedMenu + 1;
				checkedIds = checkedIds + e.value + ",";
		}
		 
	}
	return checkedIds;
}

function getCheckIDsNum() {
	var elements = document.getElementsByTagName("input");
	var checkedMenu = 0;
	for ( var i = 0; i < elements.length; i++) {
		var e = elements[i];
		if (e.id == "menuCheckId") {
			if (e.checked == true) {
				checkedMenu = checkedMenu + 1;
			}
		}
	}
	return checkedMenu;
}

function checkAllMenuIE(el_name, parent) {
	var elements = document.getElementsByTagName("input");
	var parentChecked = parent.checked;
	for ( var i = 0; i < elements.length; i++) {
		var e = elements[i];
		if (e.id == el_name) {
			e.checked = parentChecked;
		}
	}
}

var importType = 0;
var importToName = "";
var onclickFlag = 0;

function importNews(type,folderId,name) {	
	parent.isLoginFrm(function(){
	var checkedMenu = 0 ;
	var repeatNum="";
	var elements = document.getElementsByName("menuCheckId");
	var checkedMenu = getCheckIDsNum();
	var checked = getCheckIDs();
	var checkedIds="";
	var repeatNums = "";
	var importToName = "";
	var originType = "";
	$("input[name='menuCheckId']").each(function(){
		var val=$(this).prop("checked");
		var id=$(this).val();
		
		if(val==true){
			 
			checkedIds= checkedIds+id+",";
			 
			 var rNum = $("#repeatNum_"+id).val();
			 if (rNum=="0")
			 {

				rNum = 1;
			 }
			repeatNums += rNum+",";
			
			var customFlag = $("#flag_"+id).val();
			if(customFlag == '4'){
				originType += 4+",";
			}else{
				originType += 3+",";
			}
		}
	}); 
	if(type == 1){
		importToName = "收藏夹";
	}else{
		importToName = "素材库";
	}
	if (checkedMenu=="0"){
		layerOpen1("素材操作","请选择需要加入到" + importToName + "的新闻!");
		return false;
	}
	var urls = "";
	var sucaifolderId = folderId;
	if(name !=""){
		if(name == "默认素材库"){
			folderId = 0;
		}
	}
	urls = "insertBriefSource.action";
	layer.open({
        type: 0,
        title: "素材操作",
        btn: ['确定','取消'],
        skin: "modal-layer-style",
        area: ['300px'],
         shadeClose: true, //点击遮罩关闭
         content: "您已选择" + checkedMenu + "个新闻,确认要加入到"+importToName+"吗？",
         closeBtn: 0,
         btnAlign: 'c',
         yes: function(){
        	 $.ajax({
        		url:urls,
     			type:'POST',
     			data:{
     				'checkedSolrIds':checkedIds,
     				'repeatNums':repeatNums,
     				'folderId':folderId,
     				'originType':originType,
     				'sucaiType':type,
     				'sucaiFolderId':sucaifolderId,
     				'ckFlag':2
     			},
     			success:function(data) {
     				if(data == 1){
     					layerOpen1("素材操作","单份简报最多支持添加5000条素材~");
     				}else{
     					var codeT=data.split(",")[0];
     					var successTotalCount=data.split(",")[1];
     					var washTotalCount=data.split(",")[2];
     					if(null!=codeT && codeT==2001){
     						if(washTotalCount == 0){
     							if(type == 1){
     								layerOpen1("素材操作","已成功收藏"+successTotalCount+"条素材");
     							}else{
     								layerOpen1("素材操作","已成功添加"+successTotalCount+"条素材");
     							}
     						}else{
     							layerOpen1("素材操作","已成功添加"+successTotalCount+"条素材，去重"+washTotalCount+"条素材" );
     						}
     						/*if(folderId == 0){
     						}else{
     							layerOpen1("素材操作","添加成功");
     						}*/
     					}else{
     						layerOpen1("素材操作",data);
     					}
     				}
     			}
     		}); 
        	 
        }
     });
	
	 
	}); 
}


function importNewsSingle(type,folderId,name) {
	parent.isLoginFrm(function(){
	var checkedId = document.getElementById("selectedId").value;
	var repeatNum = document.getElementById("repeatNum_"+checkedId).value+",";
	var urls = "";
	var originType = 0;
	var sucaifolderId = folderId;
	if(name !=""){
		if(name == "默认素材库"){
			folderId = 0;
		}
	}
	originType = document.getElementById("flag_"+checkedId).value+",";
	urls = "insertBriefSource.action";
	$.ajax({
		url:	urls,
		type:	"POST",
		data:{
			"checkedSolrIds":checkedId+",",
			"repeatNums":repeatNum,
			"folderId":folderId,
			"originType":originType,
			'sucaiType':type,
			'sucaiFolderId':sucaifolderId,
			"ckFlag":2
			
		},
		success:function(data) {
			if(data==1){
				layerOpen1("单份简报最多支持添加5000条素材~");
			}else{
				var codeT=data.split(",")[0];
				var successTotalCount=data.split(",")[1];
				var washTotalCount=data.split(",")[2];
				if(null!=codeT && codeT==2001){
					if(washTotalCount == 0){
						if(type == 1){
							layerOpen1("素材操作","已成功收藏"+successTotalCount+"条素材");
						}else{
							layerOpen1("素材操作","已成功添加"+successTotalCount+"条素材");
						}
					}else{
						layerOpen1("素材操作","已成功添加"+successTotalCount+"条素材，去重"+washTotalCount+"条素材" );
					}
				}else{
					layerOpen1("素材操作",data);
				}
			}
			
			
			
		}
	});
	
	});
	}

function lastPage(){
  $("#isCountOriginType").val(1);
  var lastPageNumber =	$("#lastPageNumber").html();
  var number = parseInt(lastPageNumber);
  if(lastPageNumber != 1){
	  $("#cpage").val(number-1);
	  subForm();
  }
}
function nextPage(){
	  $("#isCountOriginType").val(1);
	  var lastPageNumber =	$("#lastPageNumber").html();
	  var nextPageNumber =	$("#nextPageNumber").html();
	  var number = parseInt(lastPageNumber);
	  var count = parseInt(nextPageNumber);
	  if(nextPageNumber != lastPageNumber && count != 1){
		  $("#cpage").val(number+1);
		  subForm();
	  }
}
function goDeleteRubbishNewsBatch(account){
		var checkedIds="";
		 
		checkedIds = getCheckIDs();
		if(checkedIds==null || checkedIds=="" || checkedIds=="," ){
			layerOpen1('删除信息','请选择需要删除的信息？');
				return;
			}
		layerOpen2('删除信息','确定要删除信息吗？',NewsDelCallBack,checkedIds);
				
}


function goDeleteRubbishNewsSingle(type){
		var checkedIds = document.getElementById("selectedId").value+",";
		if(checkedIds==null || checkedIds=="" || checkedIds==","){
			layerOpen1('删除信息','请选择需要删除的信息？');
			return;
		}
		if(type == 0){
			layerOpen2('删除信息','确定要删除信息吗？',NewsDelCallBack,checkedIds);
		}else{
			NewsDelCallBack(checkedIds);
		}
}

function NewsDelCallBack(checkedIds){
	parent.isLoginFrm(function(){
   var keywordId = document.getElementById("kw.id").value;
   var isPersonalSolr = $("#isPersonalSolr").val();
	$("input[name=menuCheckId]").each(function(){
		if(checkedIds.indexOf($(this).val())>=0) {
			//$(this).parent('td').parent('tr').remove();
			$("#listNews_"+$(this).val()).remove();
		}
     });
	layer.closeAll('dialog');
	
		$.ajax({
			url: 'deleteIcontent.action',
			type: 'POST',
			data:{
				'checkedIds':checkedIds,
				'isPersonalSolr':isPersonalSolr,
				'keywordId':keywordId
			},
			async: false,
			success:function(data) {
				if(data!=null&&data!=""){
					var code = data.code;
					var msg = data.msg;
					if(code==2001){
						
					}else{
						//layerOpen1('删除信息',msg);
						//getStatList();//删除完成后需要更新一下来源类型条数
						
					}
					
				}else{
					layerOpen1('删除信息','删除失败，请稍后再试！');
				}
			 
				 	
					//getStatList();//删除完成后需要更新一下来源类型条数
			 
	 
			}
		}); 
	});
  
}
//选择需要推送的类型  1：邮件  2：短信  3：微信   列表   暂时不用先保留着
/*function keywordSendMessageOld(id,type,title){
	parent.isLoginFrm(function(){
	 var checkedIds = "";
		if(id==0){
			checkedIds = getCheckIDs();
			if(checkedIds==null || checkedIds=="" || checkedIds=="," ){
				layerOpen1('信息推送','请选择需要推送的消息');
					return false;
				}
		}else{
			checkedIds = id+",";
		}	
		var webpageUrl = $("#webpageUrl_"+id).val();
		$('#pop_send_method').modal('show');
	    $("#pop_send_method").html('<div class="spinner" style="display: block;"><div class="bounce1"></div></div><br> <div align=center style="font-size:12px;color:#999999;">系统拼命搜索中，请等待结果加载完成后做下次查询～</div>');
		 $.ajax({
				type:  'post',
				url: 'keywordSendMessage.action',
				data: {
					'checkedIds':checkedIds,
					'type':type,
					'sendTitle':title,
					'sendUrl':webpageUrl
					},
				cache:false,
				success:function(data, textStatus){
					if(textStatus == 'success') {
						if(data&&$.trim(data)!=""){
							$("#pop_send_method").html(data);

						}
							 
					}
					
				}
			});	 
	});
}*/
//选择需要推送的类型  1：邮件  2：短信  3：微信  
function keywordSendMessage(id,type,title){
	parent.isLoginFrm(function(){
	 var checkedIds = "";
	 var keywordName = $("#keywordName").val();
		if(id==0){
			checkedIds = getCheckIDs();
			if(checkedIds==null || checkedIds=="" || checkedIds=="," ){
				layerOpen1('信息推送','请选择需要推送的消息');
					return false;
				}
		}else{
			checkedIds = id+",";
		}	
		var webpageUrl = $("#webpageUrl_"+id).val();
		$.ajax({
				type:  'post',
				url: njxBasePath + '/keywordSendMessage.action',
				data: {
					'checkedIds':checkedIds,
					'type':type,
					'sendTitle':title,
					'sendUrl':webpageUrl,
					'keywordName':keywordName
					},
				cache:false,
				success:function(data, textStatus){
					if(textStatus == 'success') {
						if(data&&$.trim(data)!=""){
							$("#import-form-list").removeClass("fadeOut").addClass("fadeIn").css({display:"block"});
							$("#import-form-list-mask").fadeIn(); 
							$("#import-form-list").html(data);
                           //alert(4555)
						}
							 
					}
					
				}
			});	 
	});
}
//内容
function keywordContentSendMessage(id,type,title){
	parent.isLoginFrm(function(){
	 var checkedIds = "";
		if(id==0){
			checkedIds = getCheckIDs();
			if(checkedIds==null || checkedIds=="" || checkedIds=="," ){
				layerOpen1('信息推送','请选择需要推送的消息');
					return false;
				}
		}else{
			checkedIds = id+",";
		}	
		var webpageUrl = $("#webpageUrl_"+id).val();
		$('#pop_content_send_method').modal('show');
	    $("#pop_content_send_method").html('<div class="spinner" style="display: block;"><div class="bounce1"></div></div><br> <div align=center style="font-size:12px;color:#999999;">系统拼命搜索中，请等待结果加载完成后做下次查询～</div>');
		 $.ajax({
				type:  'post',
				url: 'keywordContentSendMessage.action',
				data: {
					'checkedIds':checkedIds,
					'type':type,
					'con.title':title,
					'con.webpageUrl':webpageUrl,
					'con.id':id
					},
				cache:false,
				success:function(data, textStatus){
					if(textStatus == 'success') {
						if(data&&$.trim(data)!=""){
							$("#pop_content_send_method").html(data);

						}
							 
					}
					
				}
			});	
	});	 
}

function goFlagBatch(type){
	var isPersonalSolr = $("#isPersonalSolr").val();
	//alert(type)
	var checkedIds="";
	var checkedMenu = 0 ;
	var flagTypes = "";
	var elements = document.getElementsByName("menuCheckId");
	for (var i=0;i<elements.length;i++)    {
			var e = elements[i];
			if (e.checked==true){ 
				checkedMenu = checkedMenu + 1;
				checkedIds += e.value+",";
				
				flagTypes +=type+",";
			}
	}
	//alert(checkedIds)
	if(checkedIds=="" || checkedIds==null || checkedIds=="," ||checkedMenu=="0"){
		layerOpen1('舆情监测','请选择需要标注属性的信息！');
		return;
	}else{
	
     if(type==1){
    	 $("#notSensitiveSubject").attr("data-original-title","标非敏");
    	 $("#notSensitiveSubject").attr("onclick","goFlagBatch(2)");
    	 $("#notSensitiveSubject").find('i[class=fa-unsensitive]').removeClass("fa-unsensitive").addClass("fa-sensitive").css({color:'red'});
    	 $("#sensitiveSubject").attr("onclick","goFlagBatch(2)");
    	 $("#sensitiveSubject").find('i[class=fa-unsensitive]').removeClass("fa-unsensitive").addClass("fa-sensitive").css({color:'red'});
     }else if(type==2){
    	 $("#notSensitiveSubject").attr("data-original-title","标敏");
    	 $("#notSensitiveSubject").attr("onclick","goFlagBatch(1)");
    	 $("#notSensitiveSubject").find('i[class=fa-sensitive]').removeClass("fa-sensitive").addClass("fa-unsensitive").css({color:'#333'});
    	 $("#sensitiveSubject").attr("onclick","goFlagBatch(1)");
    	 $("#sensitiveSubject").find('i[class=fa-sensitive]').removeClass("fa-sensitive").addClass("fa-unsensitive").css({color:'#333'});
     
     }
     
     $("input[name=menuCheckId]").each(function(){
    	 //console.log($(this).val())
		  if(checkedIds.indexOf($(this).val())>=0){
			  if(type==1){
				  $("#listTag_"+$(this).val()).find('span[class=fm_tag]').removeClass("fm_tag").addClass("mg_tag");
				  $("#listTag_"+$(this).val()).find('span[class=mg_tag]').html("敏");
				  $("#buttonTag_"+$(this).val()).find('button[id=tagFontmg]').attr("data-original-title","标非敏");
				  $("#buttonTag_"+$(this).val()).find('button[id=tagFontmg]').attr("onclick","goFlagSingle(2)");
				  $("#buttonTag_"+$(this).val()).find('i[class=fa-unsensitive]').removeClass("fa-unsensitive").addClass("fa-sensitive").css({color:'red'});
				  $("#flag_"+$(this).val()).val(1);
			  }else if(type==2){
				  console.log(222)
					  $("#listTag_"+$(this).val()).find('span[class=mg_tag]').removeClass("mg_tag").addClass("fm_tag");
					  $("#listTag_"+$(this).val()).find('span[class=fm_tag]').html("");
					  $("#buttonTag_"+$(this).val()).find('button[id=tagFontmg]').attr("data-original-title","标敏");
					  $("#buttonTag_"+$(this).val()).find('button[id=tagFontmg]').attr("onclick","goFlagSingle(1)");
					  $("#buttonTag_"+$(this).val()).find('i[class=fa-sensitive]').removeClass("fa-sensitive").addClass("fa-unsensitive").css({color: '#333'});
					  $("#flag_"+$(this).val()).val(2);
		        }
			
		}
	});
     var keywordId = document.getElementById("kw.id").value;
	 var params = {"checkedIds":checkedIds,'flagTypes':type,
			 'isPersonalSolr':isPersonalSolr,'keywordId':keywordId};
	 chatAjaxPost(params,"flagContentProperty.action",BatchFlagCallBack,0); 
	}
}
function goFlagSingle(type){
	var selectedId = document.getElementById("selectedId").value;	
	var checkedIds = selectedId+",";	
	var isPersonalSolr = $("#isPersonalSolr").val();
	 $("input[name=menuCheckId]").each(function(){
		  if(checkedIds.indexOf($(this).val())>=0){
			  if(type==1){
				 // $("#listTag_"+$(this).val()).find('span[class=fm_tag]').removeClass("fm_tag").addClass("mg_tag");
				 // $("#listTag_"+$(this).val()).find('span[class=mg_tag]').html("敏");
				  $("#listTag_"+$(this).val()).find('span[id=tagFontmg]').html("敏感<span class=\"fa-triangle-down\"></span>");
				  $("#listTag_"+$(this).val()).find('span[id=tagFontmg]').attr("onclick","goFlagSingle(2)");
				  $("#listTag_"+$(this).val()).find('span[id=tagFontmg]').removeClass("mark-sensitive-status-close").addClass("mark-sensitive-status-open");
				  $("#flag_"+$(this).val()).val(1);
			  }else if(type==2){
					 // $("#listTag_"+$(this).val()).find('span[class=mg_tag]').removeClass("mg_tag").addClass("fm_tag");
					 // $("#listTag_"+$(this).val()).find('span[class=fm_tag]').html("");
					  $("#listTag_"+$(this).val()).find('span[id=tagFontmg]').html("非敏感<span class=\"fa-triangle-down\"></span>");
					  $("#listTag_"+$(this).val()).find('span[id=tagFontmg]').attr("onclick","goFlagSingle(1)");
					  $("#listTag_"+$(this).val()).find('span[id=tagFontmg]').removeClass("mark-sensitive-status-open").addClass("mark-sensitive-status-close");
					  $("#flag_"+$(this).val()).val(4);
		        }
			
		}
	});
	 if(type==3){
			type = 1;
		}else if(type==4){ 
			type = 2;
		}
	 var flagTypes = type +",";
	 var keywordId = document.getElementById("kw.id").value;
	 
	 var repeatNum = document.getElementById("repeatNum_"+selectedId).value;//相同文章数
	 var titleHs = document.getElementById("titleHs_"+selectedId).value;//标题哈希
	    var startTime = document.getElementById("starttime").value ;
		var endTime = document.getElementById("endtime").value ;
		var otherAttribute = document.getElementById("otherAttribute").value;//其他属性
		var newlstSelect=document.getElementById("newlstSelect").value;
		var secondSearchWord =document.getElementById("secondSearchWord2").value;
		var isOnlySearchRootWb = $("#isOnlySearchRootWb").val();
	    var defaultLen = $("#defaultLen").val();
		var filterOrigina = $("#filterOrigina").val();
		var comblineflg = $("#comblineflg").val();
		var duplicateShow = $("#duplicateShow").val();
		
		var isJinzhun= $("#isJinzhun").val();
		var timeDomain = 24;
	 	if(defaultLen=='today'){
	 		timeDomain = 1;
	 	}else if(defaultLen=='24h'){
	 		timeDomain = 24;
	 	}else if(defaultLen=='2days'){
	 		timeDomain = 2;
	 	}else if(defaultLen=='3days'){
	 		timeDomain = 3;
	 	}else if(defaultLen=='week'){
	 		timeDomain = 7;
	 	}else if(defaultLen=='10days'){
	 		timeDomain = 10;
	 	}else if(defaultLen=='other'){
	 		timeDomain = -1;
	 	}
	 	var filterSensitiveWordsFrom = $("#filterSensitiveWordsFrom").val(); 
	 	var involveWay = $("#involveWay").val();
	 	var matchingMode = $("#matchingMode").val();
	 	//省份
		var province = $("#keywordProvince").val();
		var otherAttribute = $("#otherAttribute").val();
		var options = "1";
		if(otherAttribute==4){//非敏感
			options = 3;
		}else if(otherAttribute==3){//敏感
			options = 2;
		}
		
		var params = {"checkedIds":checkedIds,'flagTypes':type,"repeatNum":repeatNum,
				 "isPersonalSolr":isPersonalSolr,'keywordId':keywordId,
				'view.keywordId':keywordId,'view.timeDomain':timeDomain,'view.startTime':startTime,
				'view.endTime':endTime,"view.titleHs":titleHs,
				'view.select':newlstSelect,'view.duplicateShow':duplicateShow,
				'view.options':options,'view.involveWay':involveWay,"view.filterOrigina":filterOrigina,
				'view.comblineflg':comblineflg,'view.isRoot':isOnlySearchRootWb,"view.provinces":province,
				"view.filterSensitiveWordsFrom":filterSensitiveWordsFrom
				};
		
	 chatAjaxPost(params,"flagContentProperty.action",SingleFlagCallBack,0); 
}





function SingleIsRead(checkedIds){
	 parent.isLoginFrm(function() {
		 console.log(checkedIds);
		 var isPersonalSolr = $("#isPersonalSolr").val();
		var	pageSize = document.getElementById("pageSize").value;
		 var keywordId = document.getElementById("kw.id").value;
	if(pageSize>0){
		var type = 0;
		if(checkedIds=="isReadAll"){
			checkedIds = "";
			 $("input[name=menuCheckId]").each(function(){
				 checkedIds = getCheckIDs();
			});
			 console.log(checkedIds);
			 if(checkedIds!=null&&checkedIds!=""){
				 checkedIds = checkedIds.substring(0,checkedIds.length-1);
			 }else{
				 layerOpen1('批量标已读','请选择需要标已读的信息');
				 return;
			 }
			 type = 1;
		}
		if(type==1){
			if($("#checkIdAll").prop("checked")){
				 document.getElementById('isReadAllBtn').innerHTML ='<i class="fa-read-over" style="color:#fff;font-size:19px;font-weight:400;"></i>';
				 $("#isReadAllBtn").attr({"disabled":"disabled","data-original-title":"已读"});
				 $("#isReadAllBtn").removeClass("btn mini").addClass("btn mini tooltips");
				 $("#isReadAllBtn").css({"background-color":"#ff8500"});
				 document.getElementById('isReadAllBtns').innerHTML ='<i class="fa-read-over" style="color:#fff;font-size:19px;font-weight:400;"></i>';
				 $("#isReadAllBtns").attr({"disabled":"disabled","data-original-title":"已读"});
				 $("#isReadAllBtns").removeClass("btn mini").addClass("btn mini tooltips");
				 $("#isReadAllBtns").css({"background-color":"#ff8500"});
			}
		}	
		$.ajax({
			type:"post",
			url:'singleRead.action',
			data:{
				'checkedIds':checkedIds,
			},			
			success:function(data){
			   console.log("SingleIsRead data ="+data);
			   if(data == 1){
				   //checkedIds = checkedIds+",";
				   var arr = checkedIds.split(",");
				   for(var i=0;i<arr.length;i++){
					   document.getElementById('btRead_'+arr[i]).innerHTML ='<i class="fa-read-over" style="color:#fff;font-size:19px;font-weight:400;"></i>';
					   $("#btRead_"+arr[i]).attr({"disabled":"disabled","data-original-title":"已读"});
					   $("#btRead_"+arr[i]).removeClass("btn mini tooltips tooltipsR").addClass("btn mini tooltips");
					   $("#btRead_"+arr[i]).css({"background-color":"#ff8500"});
				   }
			   }else if(data == 2){
				  // layerOpen1('舆情监测','您的账号请求太过频繁，目前已被系统关闭，部分功能无法正常使用，请联系运营人员处理。');
			   }else{
				 //  layerOpen1('舆情监测','标注已读失败，请稍后再试！');
			   }
			}
		});
		}else{
			//layerOpen1('舆情监测','没有可以标读的信息');
			return;
		}
		});
}


function SingleIsReadCommon(checkedIds){
	 parent.isLoginFrm(function() {		
		 var keywordId = document.getElementById("kw.id").value;
		 var isPersonalSolr = $("#isPersonalSolr").val();
		$.ajax({
			type:"post",
			url:'singleRead.action',
			data:{
				'checkedIds':checkedIds,
				'isPersonalSolr':isPersonalSolr,
				'keywordId':keywordId
			},			
			success:function(data){
			   console.log("SingleIsRead data ="+data);
			   if(data == 1){
				  
			   }else if(data == 2){
			   }else{
			   }
			}
		});
		
		});
}

function BatchFlagCallBack(result){
    if(result!=null){
    	var code = result.code;
    	var msg = result.msg;
    	var checkedIds = result.checkedIds;
    	var flagType = result.flagType;
    	if(code=="2001"){
    		
    	}else {
    		//layerOpen1('舆情监测',"批量标注失败，请尝试单条标注");
    	}
    	
	}else{
		//layerOpen1('舆情监测','系统开小差了，请稍后再试！');
	}
}
function SingleFlagCallBack(result){
    if(result!=null){
    	var code = result.code;
    	var msg = result.msg;
    	var checkedIds = result.checkedIds;
    	var flagType = result.flagType;
    	var titleHs = result.titleHs;
    	if(code=="2001"){
    		
    	}else {
    		//layerOpen1('舆情监测',msg);
    		$("input[name=menuCheckId]").each(function(){
  			  if(checkedIds.indexOf($(this).val())>=0){
  				  if(flagType==2){
  					  $("#listTag_"+$(this).val()).find('span[class=fm_tag]').removeClass("fm_tag").addClass("mg_tag");
  					  $("#listTag_"+$(this).val()).find('span[class=mg_tag]').html("敏");
  					  $("#buttonTag_"+$(this).val()).find('button[id=tagFontmg]').attr("data-original-title","标非敏");
  					  $("#buttonTag_"+$(this).val()).find('button[id=tagFontmg]').attr("onclick","goFlagSingle(2)");
  					  $("#buttonTag_"+$(this).val()).find('i[class=fa-unsensitive]').removeClass("fa-unsensitive").addClass("fa-sensitive").css({color:'red'});
  					  $("#flag_"+$(this).val()).val(1);
  					  }else if(flagType==1){
  						  $("#listTag_"+$(this).val()).find('span[class=mg_tag]').removeClass("mg_tag").addClass("fm_tag");
  						  $("#listTag_"+$(this).val()).find('span[class=fm_tag]').html("");
  						  $("#buttonTag_"+$(this).val()).find('button[id=tagFontmg]').attr("data-original-title","标敏");
  						  $("#buttonTag_"+$(this).val()).find('button[id=tagFontmg]').attr("onclick","goFlagSingle(1)");
  						  $("#buttonTag_"+$(this).val()).find('i[class=fa-sensitive]').removeClass("fa-sensitive").addClass("fa-unsensitive").css({color: '#333'});
  						  $("#flag_"+$(this).val()).val(2);
  					}
  				
  			}
  		});
    	}
    	
	}else{
		//layerOpen1('舆情监测','系统开小差了，请稍后再试！');
	}
}

//发送短信
function showSmsSendFrame(postion) {
		var checkedIds = "";
		if (postion == 1) {// 内容
			checkedIds = $("#selectedId").val() + ",";
		} else { // 导航
			checkedIds = getCheckIDs();		
		}
		if (checkedIds == "") {
			layerOpen1('舆情监测','请选择要发送短信的内容!');
			return ;
		} else {               
			showSmsSendNewsFrame(checkedIds);
		}
}
function shareToQQ(url, head){
	var sharePageLogo = $("#sharePageLogo").val();
	if(sharePageLogo==null || sharePageLogo==""){
	//	sharePageLogo = njxImgSrc +"/images/imagesvr2/sharePageLogo.png";
	}
	//console.log(sharePageLogo)
	head = head.replace(/<.*?>/ig,"");
    var title = head;
    var qqUrl = "http://connect.qq.com/widget/shareqq/index.html?";
    qqUrl += "url=" + url;
    title = encodeURIComponent(title);
    qqUrl += "&desc=" + title+"&pics="+sharePageLogo;
    window.open (qqUrl, "newwindow", "height=600, width=800, top=100, left=150, toolbar=no, menubar=no, scrollbars=no, resizable=yes,location=no, status=no");
}

function shareToWeiXin(url){
	$("#qrcode").empty();
	$("#qrcode").qrcode({ 
	    render: "canvas",
	    width: 200, //宽度 
	    height:200, //高度 
	    text: url //任意内容 
	});    
	$("#WeixinDiv").fadeIn(300);

}
	function showSmsSendNewsFrame(checkedIds){
		showSmsSend(checkedIds);
	}
	function showSmsSend(ids){
		
		var iframeDoc = document.getElementById('send_sms_frame').contentWindow.document;
	    iframeDoc.write("<div id=\"loader_container\"><div id=\"loader\" style=\"width: 100%; height: 68px\">  <div align=\"center\"><img src=\"images/loading_b.gif\"><br> <div align=center style='font-size:12pt;color:#999999;'>页面加载中...</div></div></div>	</div>");
	    
		$("#send_sms_frame").attr("src","pre_send_sms.action?checkedIds="+ids);
		//$("#BgDiv").css({display:"block", height:$(document).height()});
		var yscroll = document.documentElement.scrollTop;
		$("#DialogDiv").css("display", "block");
		//document.documentElement.scrollTop = 0;
		//document.body.scrollTop =0;
	}

	
	function showMailSendFrame(postion) {
			var checkedIds = "";
			if (postion == 1) {// 内容
				checkedIds = $("#selectedId").val() + ",";
			} else { // 导航
				checkedIds = getCheckIDs();
			}
			if (checkedIds == "") {
				alert("请选择要发送邮件的内容!");
				return ;
			} else {
				showMailSendNewsFrame(checkedIds);
			}
	}
	function showMailSendNewsFrame(checkedIds){
		showMailSend(checkedIds);
	}
   function showMailSend(ids){
	   var webpageUrl = "";
	   if(document.getElementById("webpageUrl_"+ids.substring(0,ids.length-1))){
		   webpageUrl = document.getElementById("webpageUrl_"+ids.substring(0,ids.length-1)).value;
	   }                                             
		var iframeDoc = document.getElementById('send_sms_frame').contentWindow.document;
	    iframeDoc.write("<div id=\"loader_container\"><div id=\"loader\" style=\"width: 100%; height: 68px\">  <div align=\"center\"><img src=\"images/loading_b.gif\"><br> <div align=center style='font-size:12pt;color:#999999;'>页面加载中...</div></div></div>	</div>");
	    
		$("#send_sms_frame").attr("src","pre_send_mail.action?checkedIds="+ids+"&webpageUrl="+webpageUrl);
		//$("#BgDiv").css({display:"block", height:$(document).height()});
		var yscroll = document.documentElement.scrollTop;
		$("#DialogDiv").css("display", "block");
		//document.documentElement.scrollTop = 0;
		//document.body.scrollTop =0;
	}

// 回调JS
function NewsCallBack(result) {
	if (null != result && result == 5) {
		alert("已成功加入简报素材!");
		onclickFlag = 0;
	}
	if (null != result && result == 2) {
		alert("已成功加入收藏夹!");
		onclickFlag = 0;
	}
	if (null != result && result == 3) {
		alert("已成功标签为负面!");
	}
	if (null != result && result == 4) {
		alert("已成功标签为非负面!");
	}
}

/**
 * lb
 * 
 * 其他操作
 * 
 */
//相同合并、不合并
function changeComblineFlg(v,init){
	if(init == 1){
		
			 subForm();
	}
}
//二次搜索
function secondSearch(){
	var secondSearchWord = $("#secondSearchWord").val();
	if(secondSearchWord==''||secondSearchWord=='在结果中搜索，支持单个词组'){
			alert("请输入搜索关键字");
		return;
	}else{
		secondSearchWord =  secondSearchWord.replace(/\%/g, "{#!!#}");
		$("#secondSearchWord1").val(secondSearchWord);
		$("#secondSearchWord2").val(secondSearchWord);
	}
	
	subForm();
}
//字体设置 1- 默认小字体 14px，2-大字体 16px
var font_size=14;
function changeFontSizeType(fontType,init){
	var fontType=$("#fontSizeType").val();
	//默认12px
	if(fontType=="2"){
		//大字号
		font_size=16;
	
	}else if(fontType=="1"){
		font_size=14;
	}
	//改变分页信息字体
	$(".odd gradeX").css("font-size",font_size+"px");
	$("a").css("font-size",font_size+"px");
	//改变列表信息字体
	$(".hidden-480").css("font-size",font_size+"px");
	$(".td_l_t_r_b").css("font-size",font_size+"px");
	$(".tagFont").css("font-size",font_size+"px");
	$(".author").css("font-size",font_size+"px");
	$(".portfolio-text-info align_l").css("font-size",font_size+"px");
	$(".td_l_b").css("font-size",font_size+"px");
	$(".td_l_r_b").css("font-size",font_size+"px");
	$(".summaryDiv").css("font-size",font_size+"px");
	if(fontType=="2"){
		$(".summaryDiv").css("font-size",(font_size-1)+"px");
	}
}
//模糊信息列表与精确信息列表切换
function changeNewlstSelect(v){
		 subForm();
}
// 排序 1 - 相关性 2 - 降序 ; 3 - 升序
function changeSort(dateType, init) {
	document.getElementById("paixu").value = dateType; // 隐藏域中记录当前值
	if (init == 1) {
			 subForm();
	}
}

function changeOrigina(dateType, init,obj) {
	$("#cpage").val(1);//修改条件重置页码
	document.getElementById("filterOrigina").value = dateType;
	var divNa = document.getElementById("na" + dateType);
	document.getElementById("clickFilterOrigina").value = dateType;
	if(init != 2){
		if (divNa) {
			divNa.className = "nas";
		}
	}else{
		$("#sourceType>li").removeClass("click");
		$(obj).addClass("click");
	}
	if (init == 1) {
		subForm();
	}
}
function changeHot(dateType, init) {
	document.getElementById("customHot").value = dateType;
	var dateId = document.getElementById("customHots");
	dateId.innerHTML = document.getElementById("customHots" + dateType).innerHTML;
	if (dateType > 0) {
		document.getElementById("nav4_0").style.display = "";
	} else {
		document.getElementById("nav4_0").style.display = "none";
	}

	if (init == 1) {
		subForm();
	}
}

function changeOrder(dateType, init) {
	document.getElementById("orderby").value = dateType;
	var dateId = document.getElementById("orderbys");
	dateId.innerHTML = document.getElementById("orderbys" + dateType).innerHTML;
	if (dateType > 0) {
		document.getElementById("nav5_0").style.display = "";
	} else {
		document.getElementById("nav5_0").style.display = "none";
	}
	if (init == 1) {
		subForm();
	}
}
function changeShow(init) {
	var show = document.getElementById("pinglunShow").value;
	var dateId = document.getElementById("pinglunshows");
	if (show == 1) {
		dateId.innerHTML = "隐藏评论";
		document.getElementById("pinglunShow").value = 0;
	} else {
		dateId.innerHTML = "显示评论";
		document.getElementById("pinglunShow").value = 1;
	}
	if (init == 1) {
		subForm();
	}
}

function zhaiyaoChangeShow(init) {
	var show = document.getElementById("zhaiyaoShow").value;
	var dateId = document.getElementById("zhaiyaoShows");
	if (show == 1) {
		dateId.innerHTML = "隐藏摘要";
		document.getElementById("zhaiyaoShow").value = 0;
	} else if (show == 0) {
		dateId.innerHTML = "显示摘要";
		document.getElementById("zhaiyaoShow").value = 1;
	}
	if (init == 1) {
		subForm();
	}
}

function changeDate(dateType, init) {
	document.getElementById("filterDate").value = dateType;
	var dateId = document.getElementById("dates");
	if (init == 1) {
		subForm();
	}
}

function duplicateChangeShow(init) {
	var show = document.getElementById("duplicateShow").value;
	var stext = document.getElementById("duplicateShowsText");
	if (show == 1) {
		stext.innerHTML = "不显示重复项";
		document.getElementById("duplicateShow").value = 0;
	} else if (show == 0) {
		stext.innerHTML = "显示重复项";
		document.getElementById("duplicateShow").value = 1;
	}
	if (init == 1) {
		subForm();
	}
}

// 属性 0 - 全部 1 - 疑似负面 2 - 负面
function changeDuplicate(dateType, init) {
	
	if (init == 1) {
			 subForm();
	}
}
//时间选择
function changeTimeSubmit() {

	
		 subForm();
	
}

// 跟帖 0 - 不显示 1 - 显示
function changeGengtie(show) {
	if (show == 0) {
		document.getElementById("pinglunShow").value = 1; // 不显示跟帖
		document.getElementById("pxgt").value = 0;
		document.getElementById("clickPxgt").value = 0;
	} else {
		document.getElementById("pxgt").value = 1;
		document.getElementById("clickPxgt").value = 1;
		document.getElementById("pinglunShow").value = 2;
	}
	subForm();
}

function ExportNewsExcel(url,account){
	parent.isLoginFrm(function(){
	var number = 0;
	var data = 5000;
	if(account == "dcgzys"){
		number = 1;
		data = 20000;
	}
	var checkedMenu = getCheckIDsNum();
	var checkedIds = getCheckIDs();
	var el = document.getElementById("searchKeyword");
	if(el){
		var keyword = el.value;
		keyword = keyword.replace(/\%/g, "{#!!#}");
		el.value = keyword;
	}
	var secondSearchWord = document.getElementById("secondSearchWord2").value;
	if(secondSearchWord!=null && secondSearchWord!="在结果中搜索，支持单个词组" &&secondSearchWord!=""&&secondSearchWord!=","){
		secondSearchWord = secondSearchWord.replace(/\%/g, "{#!!#}");
	}else{
		secondSearchWord = "";
	}
	if (checkedMenu < 1) {
		layerOpen1("导出操作","请选择需要导出的新闻!");
		return ;
	}
	
	var starttime =  $("#starttime").val();
	var endtime =  $("#endtime").val();
	var dataParam = $("#dataParam").val();
	var defaultLen = $("#defaultLen").val();
	var  newlstSelect = $("#newlstSelect").val();
	if(defaultLen=='today'){
		dataParam=1;
	}else if(defaultLen=='24h'){
		dataParam=2;
	}else if (defaultLen=='2days'){
		dataParam=3;
	}else if(defaultLen=='3days'){
		dataParam=4;
	}else if(defaultLen=='week'){
		dataParam=5;
	}else if(defaultLen=='10days'){
		dataParam=6;
    }else if(defaultLen=='other'){
    	dataParam=7;
    }
	var clickPaixu = $("#clickPaixu").val();
	var paixu = $("#paixu").val();
	var clickOtherAttribute = $("#clickOtherAttribute").val();
	var	clickNewlstSelect =$("#clickNewlstSelect").val();
	var clickComblineflg =$("#clickComblineflg").val();
	var clickZhaiyaoShow =$("#clickZhaiyaoShow").val();
	var clickFilterOrigina = $("#clickFilterOrigina").val();
	var clickDuplicateShow = $("#clickDuplicateShow").val();
	var duplicateShow = $("#duplicateShow").val();
	var comblineflg =$("#comblineflg").val();
	var	newlstSelect =$("#newlstSelect").val();
	var otherAttribute = $("#otherAttribute").val();
	var zhaiyaoShow =$("#zhaiyaoShow").val();
	var filterOrigina = $("#filterOrigina").val();
	var keywordFilterRuleId = $("#keywordFilterRuleId").val();
	var isOnlySearchRootWb = $("#isOnlySearchRootWb").val();
	var isSearchReadStatus = $("#isSearchReadStatus").val();
	var isClickSearchReadStatus = $("#isClickSearchReadStatus").val();
	var keywordId = document.getElementById("kw.id").value;
	var searchFrom = document.getElementById("searchFrom").value;
	 //匹配方式
    var matchingMode = $("#matchingMode").val();
	var clickMatchingMode = $("#clickMatchingMode").val();
	var province = $("#clickKeywordProvince").val();
	if(province == null || province ==""){
		province = $("#keywordProvince").val();
	}
    province = encodeURIComponent(province);
	var params = {
			'kw.id': keywordId,
			'defaultLen':defaultLen,
			'dataParam':dataParam,
			'clickDuplicateShow':clickDuplicateShow,
			'paixu':paixu,
			'clickPaixu':clickPaixu,
			'starttime':starttime,
			'endtime':endtime,
			'clickOtherAttribute':clickOtherAttribute,
			'clickNewlstSelect':clickNewlstSelect,
			'clickComblineflg':clickComblineflg,
			'clickFilterOrigina':clickFilterOrigina,
			'duplicateShow':duplicateShow,
			'comblineflg':comblineflg,
			'newlstSelect':newlstSelect,
			'otherAttribute':otherAttribute,
			'filterOrigina':filterOrigina,
			'secondSearchWord':secondSearchWord,
			'keywordFilterRuleId':keywordFilterRuleId,
			'isSearchReadStatus':isSearchReadStatus,
			'isClickSearchReadStatus':isClickSearchReadStatus,
			'isClickOnlySearchRootWb' : isOnlySearchRootWb,
			'searchFrom':searchFrom,
			'matchingMode':matchingMode,
			'clickMatchingMode':clickMatchingMode,
			'clickKeywordProvince':province
	};
	//console.log(params)
		if($("#checkIdAll").prop("checked")){
			layer.open({
		        type: 0,
		        title: "导出操作",
		        btn: ['确定','取消'],
		        skin: "modal-layer-style",
		        area: ['300px'],
		         shadeClose: true, //点击遮罩关闭
		         content: "确定导出以下新闻吗？(限制" + data + "条内容，预计导出时间为10分钟)",
		         closeBtn: 0,
		         btnAlign: 'c',
		         yes: function(){
		        	 layer.closeAll('dialog');
						//$(".zhezhao").css("display", "block");
						$("#loading_1").attr("disabled", true);//按钮禁止点击
						var loading = document.getElementById('loading_1');
					//	loading.innerHTML = '<img src=\"images/newLoading.png\" class=\"new-loading\" width=\"12px\">';
						$("#loading_1").removeAttr("data-original-title"); 
						var ajaxUrl = "exportExcel.action?excelType=2";
						if(number == 1){
							ajaxUrl = "dispatchExportExcel.action?excelType=2";
						}
						$.ajax({
							//url:'dispatchExportExcel.action?excelType=2',
							url:ajaxUrl,
							type:'POST',
							data: params,
							success:function(data) {
								if(number == 0){
									var fileName = data[0];
									var savePath = data[1];
									console.log(savePath);
									document.frmPopWin.action="newExportExcel.action?execlName="+fileName+"&fileUrl="+savePath;
									document.frmPopWin.target="";
									document.frmPopWin.submit();
									document.frmPopWin.action= url;
									$("#checkedIdsXls").val("");
									$("#loading_1").attr("disabled", false);
									$("#loading_1").attr("data-original-title","导出");
									document.getElementById('loading_1').innerHTML ='<i class="fa-import_all"></i>';
									$("#checkedIdsXls").val("");
								}else if(number == 1){
									if(data != ""){
										console.log(data);
										queryFilePathStatus(data);
									}else{
										layerOpen1("导出操作","服务器异常，请稍后尝试！");
										$("#loading_1").attr("disabled", false);
										$("#loading_1").attr("data-original-title","导出");
										document.getElementById('loading_1').innerHTML ='<i class="fa-import_all"></i>';
										$("#checkedIdsXls").val("");
									}
								}
							}
						});
						
		        }
		     });
			
		}else{
			layer.open({
		        type: 0,
		        title: "导出操作",
		        btn: ['确定','取消'],
		        skin: "modal-layer-style",
		        area: ['300px'],
		         shadeClose: true, //点击遮罩关闭
		         content: "您已选择" + checkedMenu + "条信息，确认导出?（预计导出时间为10分钟）)",
		         closeBtn: 0,
		         btnAlign: 'c',
		         yes: function(){
		        	    layer.closeAll('dialog');
						//$(".zhezhao").css("display", "block");
						$("#loading_1").attr("disabled", true);//按钮禁止点击
						var loading = document.getElementById('loading_1');
					//	loading.innerHTML = '<img src=\"images/newLoading.png\" class=\"new-loading\" width=\"12px\">';
						$("#loading_1").removeAttr("data-original-title");
						$("#checkedIdsXls").val(checkedIds);
						params.checkedIds = checkedIds;
						//alert(checkedIds)
						$.ajax({
							url:'exportExcel.action?excelType=1',
							type:'POST',
							data:params,
							success:function(data) {
							 /*if(data!=null&&data!=""){
								 var savePath = data;
						         location.href = savePath;
							 }else{
								 alert("服务器异常，请稍后再试"); 
							 }
								$("#checkedIdsXls").val("");
								//$(".zhezhao").css("display", "none");
								$("#loading_1").attr("disabled", false);
								$("#loading_1").attr("data-original-title","导出");
								document.getElementById('loading_1').innerHTML ='<i class="fa-import_all"></i>';
								$("#checkedIdsXls").val("");*/
								var fileName = data[0];
								var savePath = data[1];
								console.log(savePath);
								document.frmPopWin.action="newExportExcel.action?execlName="+fileName+"&fileUrl="+savePath;
								document.frmPopWin.target="";
								document.frmPopWin.submit();
								document.frmPopWin.action= url;
								$("#checkedIdsXls").val("");
								//$(".zhezhao").css("display", "none");
								$("#loading_1").attr("disabled", false);
								$("#loading_1").attr("data-original-title","导出");
								document.getElementById('loading_1').innerHTML ='<i class="fa-import_all"></i>';
								$("#checkedIdsXls").val("");
							}
						});
					}
		     });
		}
	});
}
function queryFilePathStatus(msg){
	parent.isLoginFrm(function(){
	$.ajax({
		url:njxBasePath+'/ajaxQueryFilePathStatus.action',
		type:'POST',
		data:{"analysisTaskTicket":msg},
		cache:false,
		success:function(data) {
			var status = data[0];
			console.log(status);
			var filePath = data[1];
			console.log(filePath);
			var analysisTaskTicket = data[2];
			var schedule = data[3];
			console.log(schedule);
			if(status == -1 || status == 0){
				alert("服务器异常，请稍后尝试！");
				$("#loading_1").attr("disabled", false);
				$("#loading_1").attr("data-original-title","导出");
				document.getElementById('loading_1').innerHTML ='<i class="fa-import_all"></i>';
				$("#checkedIdsXls").val("");
			}else{
				if(status != 5){
					setTimeout('queryFilePathStatus("'+analysisTaskTicket+'")',30000);
				}else{
					location.href = filePath;
					$("#loading_1").attr("disabled", false);
					$("#loading_1").attr("data-original-title","导出");
					document.getElementById('loading_1').innerHTML ='<i class="fa-import_all"></i>';
					$("#checkedIdsXls").val("");
				}
			}
			
		}
	});
	});
}

function ExportShouyeExcel(){
	var checkedMenu = getCheckIDsNum();
	var checkedIds = getCheckIDs();
    var kwId = document.getElementById("kw.id").value;
	if (checkedMenu < 1) {
		layerOpen1('素材操作','请选择需要导出的新闻!');		
		return ;
	}
	$.ajax({
		url:'exportExcel.action?excelType=1',
		type:'POST',
		data:{
			'checkedIds':checkedIds,
			'kw.id':kwId,
		},
		success:function(data) {
			var fileName = data[0];
			var savePath = data[1];
			console.log(fileName+";"+savePath);
			document.frmPopWin.action="newExportExcel.action?execlName="+fileName+"&fileUrl="+savePath;
			document.frmPopWin.target="";
			document.frmPopWin.submit();
		}
	});
}

//来源类型--全选操作
function isCheckAllOrignal(parents){
	  if($(parents).hasClass("click")){
		  layerOpen1('舆情监测','至少选择一项监测来源！');
	  }else{
		  $("#na1").addClass('click');
		  $("input[name=dataOrignalTypes]").each(function(){
			  $(this).parent().removeClass('click')
	  	  });
	  }
	  getOriginaData();
}
function isCheckOrignal(parents){
	  if($(parents).hasClass("click")){
		  var count = 0;
		  $("input[name=dataOrignalTypes]").each(function(){
			  if($(this).parent().hasClass('click')){
				  count++; 
			  }
	  	  });
		  if(count<=1){
			  layerOpen1('舆情监测','至少选择一项监测来源！');
		  }else{
			  $(parents).removeClass('click');
		  }
	  }else{
		  $(parents).addClass('click');
	  }
	  $("#na1").removeClass('click');
	  getOriginaData();
}

//来源类型数据获取
function getOriginaData(){
	var orignalTypes = "1";//来源类型
	 if(!$("#na1").hasClass("click")){
		 orignalTypes = "";
		 $("input[name=dataOrignalTypes]").each(function(){
				if($(this).parent().hasClass("click")){
					orignalTypes += $(this).val()+",";
				}
		 });
		 orignalTypes = orignalTypes.substring(0,orignalTypes.length-1);
	 }
	 document.getElementById("filterOrigina").value = orignalTypes;
	 document.getElementById("clickFilterOrigina").value = orignalTypes;
}

//敏感显示
function changeFilterSensitiveWords(v,obj){
	$("#clickFilterSensitiveWordsFrom").val(v);
	$("#filterSensitiveWordsFrom").val(v);
	//$("#filterSensitiveWords>span").removeClass("click");
	//$(obj).addClass("click");
	
}
function gosensitiveSet(){
	window.open("index.action?toAction=sensitiveSet.action?setType=3","_blank");

}
//批量添加新闻到信息分发库
function batchAddworkflow(){
	parent.isLoginFrm(function(){
		var checkedIds = "";
		var checkedMenu = getCheckIDsNum();
		checkedIds = getCheckIDs();
		if(checkedIds==null || checkedIds=="" || checkedIds=="," ){
			layerOpen1('添加到信息发布库','请选择需要加入的新闻');
			return;
		}
		layer.open({
	        type: 0,
	        title: "加入信息库操作",
	        btn: ['确定','取消'],
	        skin: "modal-layer-style",
	        area: ['300px'],
	         shadeClose: true, //点击遮罩关闭
	         content: "您已选择" + checkedMenu + "条信息，确认加入到信息发布库吗?)",
	         closeBtn: 0,
	         btnAlign: 'c',
	         yes: function(){
	        	 layer.closeAll('dialog');
	        	 $.ajax({
	        			url:'addWorkflow.action?checkedIds='+checkedIds,
	        			type:'post',
	        			success:function(data){
	        				var codeT=data.split(",")[0];
	     					var successTotalCount=data.split(",")[1];
	     					var washTotalCount=data.split(",")[2];
	     					if(null!=codeT && codeT==2001){
	     						if(washTotalCount == 0){
	     							layerOpen7('添加到信息发布库',"已成功添加"+successTotalCount+"条新闻，您可前往“工作台”进行信息的编辑、审核和下发",gotoWorkflow,"");
	     						}else{
	     							layerOpen7('添加到信息发布库',"已成功添加"+successTotalCount+"条新闻，去重"+washTotalCount+"条新闻，您可前往“工作台”进行信息的编辑、审核和下发",gotoWorkflow,"");
	     						}
	     					}else{
	     						layerOpen1('添加到信息发布库',"添加失败！");
	     					}
	        			}
	        		});	
			}
	     });
		 
	});
}

//新闻添加到工作台
function newsAddToStaging(webpageUrl,title,author,captureWebsiteName,forwarderContent,published,content,id){
	if(title == "转发微博" || title=="轉發微博"){
		title = forwarderContent;
	}
	title = title.replace(/<[^>]+>/g,"");
	if(forwarderContent != null && forwarderContent != ""){
		content =content + forwarderContent;
	}
	content = content.replace(/<[^>]+>/g,"");
	$.ajax({
		url:'addToWorkingTable.action',
		type:'post',
		data:{
			'wk.newsWebsiteUrl':webpageUrl,
			'wk.title':title,
			'wk.author':author,
			'wk.newsFrom':captureWebsiteName,
			'wk.publishTime':published,
			'wk.content':content,
			'wk.indexId':id
		},
		success:function(data){
			if(data == 1){
				layerOpen7('添加到信息发布库','添加成功！您可前往“工作台”进行信息的编辑、审核和下发',gotoWorkflow,"");
			}else if(data == 2){
				layerOpen1('添加到信息发布库','该条信息已存在，请勿重复添加！');
			}else{
				layerOpen1('添加到信息发布库','添加失败！');
			}
		}
	});
}
function gotoWorkflow(){
	parent.parent.isLoginFrm(function(){
		$("#nav_workbench", parent.document).addClass("active");	
		$("#nav_yqjc", parent.document).removeClass("active");
	})
	self.location.href= "workflow.action";
}