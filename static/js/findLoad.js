/**
 * lb
 * 
 * 功能块
 * 
 */
var flgCount=2;
function changeComblineFlag(v,obj){
	$("#comblineflg").val(v);
	$("#clickComblineflg").val(v);
    $("#combline_flg>li").removeClass("click");
	$(obj).addClass("click");
}

var count=2;
//字体大小设置
function changeFontSize(v,id){
	$("#fontSizeType").val(v);
	$("#clickFontSizeType").val(v);
	for ( var i = 1; i <= count; i++) {
		if (i != id) {
			$("#font_size_" + i).css( {
				"color" : "#666",
				"backgroundColor" : "#FFFFFF"
			});
		} else {
			$("#font_size_" + i).css( {
				"color" : "#fff",
				"backgroundColor" : "#FF8500"
			});
		}
	}
	//$("#fontSize").val(v);
	changeFontSizeType(v, 1);
}
//监测条件隐藏与显示
function switchToolbar(ev,id){
	var flgLen=2;
	for(var i=1;i<=flgLen;i++){
		if (i != id) {
			document.getElementById("switchToolbar_" + i).className = "";
		} else {
			document.getElementById("switchToolbar_" + i).className = "click";
		}
	}
	document.getElementById("toolbarSwitch").value = ev;
	if(id == 2){
		$(".open1").hide();
		$(".fold1").show();
		$("#con_set").hide();
	}else{
		$(".open1").show();
		$(".fold1").hide();
		$("#con_set").show();
	}
}
//信息列表页切换
var listLen=3;
function changeList(v,obj){
	$("#newlstSelect").val(v);
	$("#clickNewlstSelect").val(v);
	$("#info_list>li").removeClass("click");
	$(obj).addClass("click");
	if (v==3)
	{
		 $("#attributeA_2").addClass("disabled-click");
		 $("#attributeA_3").addClass("disabled-click");
		 $("#combline_flg_1").addClass("disabled-click");
		 $("#dateTimeA_4").addClass("disabled-click");
		 $("#dateTimeA_1").addClass("disabled-click");
		 $("#dateTimeA_5").addClass("disabled-click");
		 //$("#loading_2").addClass("disabled-click");
		// $("#loading_1").addClass("disabled-click");
		// $("#loading_3").addClass("disabled-click");
		// $("#loading_4").addClass("disabled-click");
		 //$("#isReadAllBtn").addClass("disabled-click");
		 //$("#collectionMaterial").addClass("disabled-click");
		 //$("#addMaterial").addClass("disabled-click");
		 $("#tab_2").addClass("disabled-click");
		 $("#tab_7").addClass("disabled-click");
		// $("#isDisplayfenfa").addClass("disabled-click");
		 //$("#sensitiveSubject").addClass("disabled-click");
		 //$("#notSensitiveSubject").addClass("disabled-click");
		 $("#is_search_read_status_1").addClass("disabled-click");
		 $("#is_search_read_status_2").addClass("disabled-click");

		//属性默认为全部
		$("#otherAttribute").val(0);
		$("#clickOtherAttribute").val(0);
		$("#attributeA_2").removeClass("click");
		$("#attributeA_3").removeClass("click");
		$("#attributeA_1").addClass("click");

		// 不合并
		$("#comblineflg").val(2);
		$("#clickComblineflg").val(2);
		$("#combline_flg_1").removeClass("click");
		$("#combline_flg_2").addClass("click");

 		if ($("#paixu").val()==4||$("#paixu").val()==1||$("#paixu").val()==5)
		{
			$("#paixu").val(2)
			$("#clickPaixu").val(2);
		
			if($("#dateTimeA_1").hasClass("click") || $("#dateTimeA_4").hasClass("click") || $("#dateTimeA_5").hasClass("click")){
				$("#dateTimeA_1").removeClass("click");
				$("#dateTimeA_4").removeClass("click");
				$("#dateTimeA_5").removeClass("click");
				$("#dateTimeA_2").addClass("click");
			}
		}
 		//getSelectPaixu(1);
 		//$("#word-change-paixu").html("相似度");
		$("#word-change-sensitive").html("敏感");
		
        $("#fa-line-down-sensitive").hide();
        $("li[id^=involve_way_]").addClass("disabled-click");
	}
	else{

		 $("#attributeA_2").removeClass("disabled-click");
		 $("#attributeA_3").removeClass("disabled-click");
		 $("#combline_flg_1").removeClass("disabled-click");
		 $("#dateTimeA_4").removeClass("disabled-click");
		 $("#dateTimeA_1").removeClass("disabled-click");
		 $("#dateTimeA_5").removeClass("disabled-click");
		 $("#tab_2").removeClass("disabled-click");
		 $("#tab_7").removeClass("disabled-click");
		// $("#addMaterial").removeClass("disabled-click");
		 //$("#loading_2").removeClass("disabled-click");
		// $("#loading_1").removeClass("disabled-click");
		// $("#loading_3").removeClass("disabled-click");
		// $("#loading_4").removeClass("disabled-click");
		// $("#isReadAllBtn").removeClass("disabled-click");
		// $("#collectionMaterial").removeClass("disabled-click");
		// $("#isDisplayfenfa").removeClass("disabled-click");
		// $("#sensitiveSubject").removeClass("disabled-click");
		// $("#notSensitiveSubject").removeClass("disabled-click");
		 
		 
	     $("#fa-line-down-sensitive").show();
	     $("li[id^=involve_way_]").removeClass("disabled-click");
	}
}


//跳转到偏好设置页面
function goSystemSet(){
	addTab('默认监测条件','searchset.action');
}
//跳转到来源网站分类设置
function goCptWebSite(){
	addTab('来源网站设置','websiteTypeList.action');
}
// 排序
var paixuLen = 5;
function parXuCommon(v,obj) {
	$("#paixu").val(v);
	$("#clickPaixu").val(v);
	$("#dateTime>li").removeClass("click");
	$(obj).addClass("click");
}
function piPeiTypeCommon(id) {
	for ( var i = 1; i <= 2; i++) {
		if (i != id) {
			$("#pipeiTypeA_" + i).css( {
				"color" : "#666",
				"backgroundColor" : "#FFFFFF"
			});
		} else {
			$("#pipeiTypeA_" + i).css( {
				"color" : "#FFFFFF",
				"backgroundColor" : "#2a8bdb"
			});
		}
	}
	changePipeiType(id);
}




// 来源网站
function cptWebSiteCommon(v,obj) {
	var cptWebSiteLen = $("#cptWebSiteLen").val();
	$("#duplicateShow").val(v);
	$("#clickDuplicateShow").val(v);
	$("#cptWebSite>li").removeClass("click");
	$(obj).addClass("click");
}

//选择省份
function changeProvinces(){
	$("#keyword-province>li").removeClass("click");
	var province = $("#selectProvince").val();
	$("#keywordProvince").val(province);
	if(province==""){
		province = "all";
	}
	$("#clickKeywordProvince").val(province);
	$("#select2-selectProvince-container").css("color","#ff8500");
}
function  switchProvince(){
	changeProvinces();
}

function changekeywordProvince(v,obj){
	$("#keywordProvince").val(v);
	$("#clickKeywordProvince").val(v);
	$("#keyword-province>li").removeClass("click");
	$(obj).addClass("click");
	//$("#selectProvince").find("option").removeAttr("selected");//根据值去除选中状态  
	//$("#selectProvince option[id='1']").attr("selected","selected");//根据值让option选中
	//$("#select2-selectProvince-container").html("全部");
	$("#select2-selectProvince-container").removeAttr("style");
}
// 跟帖
var genTieLen = 2;
function genTieCommon(id, isShow) {
	for ( var i = 1; i <= genTieLen; i++) {
		if (i != id) {
			$("#genTieA_" + i).css( {
				"color" : "#666",
				"backgroundColor" : "#FFFFFF"
			});
		} else {
			$("#genTieA_" + i).css( {
				"color" : "#FFFFFF",
				"backgroundColor" : "#2a8bdb"
			});
		}
	}
	ifrmview.changeGengtie(isShow);
}
//是否搜索根微博
function isSearchRootWb(data,obj){
	$("#isOnlySearchRootWb").val(data);
	$("#isClickOnlySearchRootWb").val(data);
	$("#rootWeiboShow>li").removeClass("click");
	$(obj).addClass("click");
}

//改变涉及方式
function changeInvolveWay(data,obj){
	$("#involveWay").val(data);
	$("#clickInvolveWay").val(data);
	$("#involve-Way>li").removeClass("click");
	$(obj).addClass("click");
}
//改变匹配方式
function changeMatchingMode(data,obj){
	$("#matchingMode").val(data);
	$("#clickMatchingMode").val(data);
	$("#matching_mode>li").removeClass("click");
	$(obj).addClass("click");
}

//修改微博内容类型
function changeWeiboType(data,obj){
	$("#weiboType").val(data);
	$("#clickWeiboType").val(data);
	$("#weibo_type>li").removeClass("click");
	$(obj).addClass("click");
}
//筛选已读未读状态
function isSearchIsReadStatus(data,id){
	$("#isSearchReadStatus").val(data);
	$("#isClickSearchReadStatus").val(data);
	
	for ( var i = 0; i <= 2; i++) {
		if (i != id) {
			document.getElementById("is_search_read_status_" + i).className = "";
		} else {
			document.getElementById("is_search_read_status_" + i).className = "click";
		}
	}
	subForm();
}

// 批量操作 id,类型(-1表示不弹出遮罩),位置(0表示导航,1表示内容)
function operateACommon(id, type, postion, account) {
	if (id == 4) {// 非负面
		if (postion == 0) {// 导航
			ifrmview.TagNews(4, 0, account);
		} else {// 内容
			ifrmview.TagNewsSingle(4, 0, account);
		}
	} else if (id == 5) {// 短信
		ifrmview.showSmsSendFrame(postion);
	}
}

function aMouseImg(id, imgSrc) {
	// $("#"+id).attr({"src":imgSrc});
}
// 属性
var attributeALen = 3;
function attributeACommon(v,obj) {
	$("#otherAttribute").val(v);
	$("#clickOtherAttribute").val(v);
	$("#attribute>li").removeClass("click");
    $(obj).addClass("click");
}

 Date.prototype.format = function(format) {
	var o = {
		"M+" : this.getMonth() + 1,
		"d+" : this.getDate(),
		"h+" : this.getHours(),
		"m+" : this.getMinutes(),
		"s+" : this.getSeconds(),
		"q+" : Math.floor((this.getMonth() + 3) / 3),
		"S" : this.getMilliseconds()
	}
	if (/(y+)/.test(format)) {
		format = format.replace(RegExp.$1, (this.getFullYear() + "")
				.substr(4 - RegExp.$1.length));
	}
	for ( var k in o) {
		if (new RegExp("(" + k + ")").test(format)) {
			format = format.replace(RegExp.$1, RegExp.$1.length == 1 ? o[k]
					: ("00" + o[k]).substr(("" + o[k]).length));
		}
	}
	return format;
}
function getToDay() {
	var now = new Date();
	var nowYear = now.getFullYear();
	var nowMonth = (now.getMonth() + 1);
	var nowDate = now.getDate();
	if (nowMonth < 10) {
		nowMonth = "0" + nowMonth;
	}
	if (nowDate < 10) {
		nowDate = "0" + nowDate;
	}
	return nowYear + "-" + nowMonth + "-" + nowDate + " 00:00:00";
}

//op 0 - 图表 , 1 - 搜索
var lenA = 7;
function selectTimeSubmit(ev,id,obj) {	
	$("#selectTime>li").removeClass("click");
	$(obj).addClass("click");
	// $("#chartSelectTime>li").removeClass("click");
	// $("#filterTime_"+id).addClass("click");
	
	// if(id==6){
	// 	$("#word-change-sensitive").html("敏感");
	// 	$("#fa-line-down-sensitive").hide();
	// 	$("#dropdown-custom-sensitive").hide();
	// }else{
	// 	$("#fa-line-down-sensitive").show();
	// 	$("#dropdown-custom-sensitive").removeAttr("style");
	// }
	
	isNeedChartList = true;
	var start_time = $("#starttime").val();
	var end_time = $("#endtime").val();
	$("#dataParam").val(id);
	$("#defaultLen").val(ev);
	$("#clickDefaultLen").val(ev);
	if ('other' == ev) {
		$("#other_time").show();
		$("#is_display_other_time").show();
		if(!start_time && typeof(start_time)!="undefined" && start_time!=0){
			$("#starttime").val(start_time);
		}else{
			$("#showStarttime").val($("#starttime").val());
		}
		if(!end_time && typeof(end_time)!="undefined" && end_time!=0){
			$("#endtime").val(end_time);
		}else{
			$("#showEndtime").val($("#endtime").val());
		}
	} else {
		$("#other_time").hide();
		$("#selectOtherTime").val(0);
		var now = new Date().getTime();
		var end = 0;
		var isHourSeach = false;
		if ('24h' == ev || 'today' == ev) {// 24小时 或者今天
			if ('today' == ev) {// 今天
				end = getToDay();
			} else {
				end = now - 1 * 24 * 3600 * 1000;
			}
			isHourSeach = true;
			$("#isHourSeach").val(true);
		} else {
			$("#isHourSeach").val(false);
			if ('week' == ev) {// 1周
				end = now - 6 * 24 * 3600 * 1000;
			} else if ('7days' == ev) {// 10天
				end = now - 6 * 24 * 3600 * 1000;
			} else if ('10days' == ev) {// 半月
				end = now - 9 * 24 * 3600 * 1000;
			} else if ('month' == ev) {// 1月
				end = now - 29 * 24 * 3600 * 1000;
			} else if ('year' == ev) {// 年
				end = now - 364 * 24 * 3600 * 1000;
			}else if('2days' == ev){
				end = now - 1 * 24 * 3600 * 1000;
			}else if('3days' == ev){
				end = now - 2 * 24 * 3600 * 1000;
			}
		}
		//if (ev == 'today') {
		//	$("#starttime").val(end);
		//} else {
		//	$("#starttime").val(new Date(end).format("yyyy-MM-dd hh:mm:ss"));
		//}
		//$("#endtime").val(new Date(now).format("yyyy-MM-dd hh:mm:ss"));
		
		$("#starttime").val(new Date(end).format("yyyy-MM-dd 00:00:00"));
		$("#endtime").val(new Date(now).format("yyyy-MM-dd 23:59:59"));
		if (ev == 'today') {
			$("#starttime").val(end);
		} else if(ev=='24h'){
			$("#starttime").val(new Date(end).format("yyyy-MM-dd hh:mm:ss"));
			$("#endtime").val(new Date(now).format("yyyy-MM-dd hh:mm:ss"));
		}
		if (end >= now) {
			alert("开始时间不能大于或等于结束时间");
			return;
		}
	}
	
	if(id==6){
		$("#word-change-sensitive").html("敏感");
		$("#fa-line-down-sensitive").hide();
		$("#dropdown-custom-sensitive").hide();
	}else{
		$("#fa-line-down-sensitive").show();
		$("#dropdown-custom-sensitive").removeAttr("style");
	}
	
	
}

// 设置页面中默认搜索时间
function setStartAndEndTime() {
	var date = new Date($("#starttime").val().replace(/-/g, "/")).getTime();
	var enddate = new Date($("#endtime").val().replace(/-/g, "/")).getTime();
	$("#showStarttime").val(new Date(date).format("yyyy-MM-dd hh:mm:ss"));
	//$("#showEndtime").val(new Date(new Date().getTime()).format("yyyy-MM-dd"));
	$("#showEndtime").val(new Date(enddate).format("yyyy-MM-dd hh:mm:ss"));
}


function selectTimeOver() {
	$("#other_time").show();
}

function selectTimeOut() {
	$("#other_time").hide();
}

//点7天10天会有个遮罩，查询时会block一下，全文搜索还没改掉这个的话，需要none一下，监测没有。

function hidemaskForPrevent1(){
	document.getElementById("mfp").style.display="none";
}

function hidemaskForPrevent(){
	//document.getElementById("mfp").style.display="none";
}


function showSubForm(type,account) {
	if($("#showStarttime").val()=="undefined" || $("#showStarttime").val()==null || $("#showStarttime").val()==""){
		alert("请输入搜索开始时间");
		return false;
	}
	if($("#showEndtime").val()=="undefined" || $("#showEndtime").val()==null || $("#showEndtime").val()==""){
		alert("请输入搜索结束时间");
		return false;
	}
	$("#selectOtherTime").val(1);
	$("#starttime").val($("#showStarttime").val());
	$("#endtime").val($("#showEndtime").val());
	$("#showChartStarttime").val($("#showStarttime").val());
	$("#showChartEndtime").val($("#showEndtime").val());
	 //时间戳
	var end_stamp = Date.parse(new Date($("#showEndtime").val().replace(/-/g, "/")));
	var start_stamp  = Date.parse(new Date($("#showStarttime").val().replace(/-/g, "/")));
	if(start_stamp > end_stamp ){
		alert("开始时间不能大于结束时间");
		return false;	
	}
	//检查是否超过三十天
	
	if(!timeCheck(account)){
		return;
	}
	$("#dataParam").val(7);
	$("#defaultLen").val('other');
	if(type != 1){
		subForm();
	}
	return true;
}

function timeCheck(account){
	var start_stamp = Date.parse(new Date($("#showStarttime").val().replace(/-/g, "/")));
	var end_stamp = Date.parse(new Date($("#showEndtime").val().replace(/-/g, "/")));
	var phaseDifferenceDay = end_stamp-start_stamp;
	var searchDays = Math.floor(phaseDifferenceDay/(24*3600*1000));
	if(searchDays>100 & account !=1){
		layerOpen1('自定义时间',"监测时间跨度暂不支持超过100天，请重新选择！");
		return false;
	}
	var endTime = new Date();
	
	var subtraction=endTime-start_stamp;
	var days = Math.floor(subtraction/(24*3600*1000));
	if(searchDays>=35){
		$("#dateTimeA_4").addClass("disabled-click");
		//$("#combline_flg_2").addClass("disabled-click");
		$("#combline_flg_1").addClass("disabled-click");
		$("#combline_flg_1").removeClass("click");
		$("#combline_flg_2").addClass("click");
		//设为不合并
		$("#comblineflg").val(2);
		$("#clickComblineflg").val(2);
	}
	else{
		$("#dateTimeA_4").removeClass("disabled-click");
		$("#combline_flg_2").removeClass("disabled-click");
		$("#combline_flg_1").removeClass("disabled-click");
	}
	return true;
}


