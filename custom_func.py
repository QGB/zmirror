import re,sys
if sys.platform=='win32':
	'qgb.U' in sys.modules or sys.path.append('E:/QGB/babun/cygwin/bin')
if sys.platform=='linux':
	'qgb.U' in sys.modules or sys.path.append('/home/qgb')
	
from qgb import U,T,F
from zmirror.zmirror import app


@app.route('/mfyq_logo')
def mfyq_logo():
	from flask import send_file
	spLogo='/mifengyuqing/static/logo.png'
	if sys.platform=='win32':spLogo='E:/QGB/!RK'+spLogo
	if sys.platform=='linux':spLogo='/home/qgb'+spLogo
	return send_file(spLogo, mimetype='image/gif')


regex_head = re.compile(r'<ul class="nav pull-right">[\W\w]*</ul>'	,flags=re.IGNORECASE )

def custom_response_text_rewriter(raw_text, content_mime, remote_url):
	raw_text = raw_text.replace(
	'https://files.yqt365.com//logo/20170803092821201.jpg', 'mfyq_logo')
	
	if 'nav pull-right' in raw_text:
		''
		# F.dill_dump((raw_text, content_mime, remote_url),file=U.stime()+'raw_text')
		raw_text=T.regexReplace(raw_text,regex_head,'''<ul class="nav pull-right">
            <div class="yq-summary-title" style="
    float: right;
    background: #557e99;
    padding-top: 5px;
    color: #fff;
    padding-bottom: 5px;
    margin-top: 10px;
    margin-right: 10%;
">
    <div class="span3">
        <i class="fa-yq-summary-title-name" style="
    font-size: 24px;
    margin-right: 5px;
"></i> <span class="yq-summary-title-name" style="
    font-size: 24px;
    font-weight: 600;
    letter-spacing: .1em;
"> 监测概述 </span>
    </div>
    <div class="span9" style="width:510px">
        <span class="yq-summary-title-detail"> <span class="hours-news-24" style="
    font-size: 14px;
    padding-left: 32px;
    position: relative;
    display: block;
    float: left;
    padding-top: 2px;
">
<i class="fa-24-hours-news" style="font-size: 26px;top: 0px;position: absolute;left: 5px;font-weight: 500;"></i>全网新增
<span class="item-number" id="summaryTotal" style="width: 20px;width: 20px;font-size: 16px;font-weight: 600;letter-spacing: .03em;color: red;margin: 0 5px;">0</span>条</span> <span class="sensitive-news" style="
    font-size: 14px;
    padding-left: 32px;
    position: relative;
    display: block;
    float: left;
    left: 45px;
    padding-top: 2px;
"><i class="fa-sensitive-news" style="
    font-size: 26px;
    top: 0px;
    position: absolute;
    left: 5px;
    font-weight: 500;
">
                </i>敏感新增<span class="item-number" id="summaryMgTotal" style="width: 20px;width: 20px;font-size: 16px;font-weight: 600;letter-spacing: .03em;color: red;margin: 0 5px;">0</span>条</span>
            <span class="send-warning" style="
    font-size: 14px;
    padding-left: 32px;
    position: relative;
    display: block;
    float: left;
    left: 90px;
    padding-top: 2px;
"><i class="fa-send-warning" style="
    font-size: 26px;
    top: 0px;
    position: absolute;
    left: 5px;
    font-weight: 500;
"></i>微博新增<span class="item-number" id="summaryWbTotal" style="width: 20px;font-size: 16px;font-weight: 600;letter-spacing: .03em;color: red;margin: 0 5px;">0</span>条</span>
        </span>
    </div>

</div>

            
            


            <!-- BEGIN TOP NAVIGATION MENU -->
            
            <!-- END TOP NAVIGATION MENU -->
        </div>
    </div>
  <script type="text/javascript" src="jquery-3.3.1.min.js"></script> 
    <script type="text/javascript">
        # alert(2333)
        $('#summaryTotal').html(Math.floor(Math.random()*10));
        $('#summaryMgTotal').html(Math.floor(Math.random()*10));
        $('#summaryWbTotal').html(Math.floor(Math.random()*10));
    </script>

</ul>''')


	return raw_text