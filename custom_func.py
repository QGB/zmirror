#coding=utf-8
__doc__='''
 如果加载此文件出现错误，不会直接报错
 而是报 AssertionError: View function mapping is overwriting an existing endpoint function:  此时你去改 endpoint 也无效
 先临时注释路由，再调试
'''
import re,sys
from config import my_host_port
if sys.platform=='win32':
	'qgb.U' in sys.modules or sys.path.append('E:/QGB/babun/cygwin/bin')
if sys.platform=='linux':
	'qgb.U' in sys.modules or sys.path.append('/home/qgb')
from qgb import U,T,N,F,py
from flask import request,send_file,make_response
from zmirror.zmirror import app
from zmirror import zmirror
zmirror.U=U

def log(parse):
	if not ('wordExcelPdf_download' in parse._remote_url):
		return
	if getattr(parse, 'remote_response', ''):
		if getattr(parse.remote_response, 'headers', ''):
			U.pprint(parse.remote_response.headers)

	r='='*99
	U.log(r)
##############################
sys.dup=F.dill_load(file=U.gst+'0731.mfyq.dup.v3') or {}
U.log(__name__)
debug=0
if __name__!='__main__' and not debug:#方便调试
	N.rpcServer(port=my_host_port, app=app,key='rpc')
	# from flask.ext.admin import Admin
	# admin = Admin(app)
	##############################
	gp=F.Path(__file__).absolute().parent.joinpath('static')
	@app.route('/extdomains/0731.mfyq.com.cn/static/<path:f>')
	@app.route('/static/<path:f>')
	def static_file(f='',*a,**ka):
		p=gp.joinpath(f)
		if f.endswith('.css'):
			set_color()
			s=replace_raw(p.read_text(),regex=False)
			r=make_response(s)
			r.headers['Content-Type'] = 'text/css'
			return r
		# U.log([gp,f,a,ka])
		# joinpath 可以支持多层文件夹
		return send_file(p.as_posix())
#####  color
gcolor='#7bff29ab'
gcolor=U.mutableString('#7bff29ab')
# gcolor.set('#7bff29ab') # 生成 gcolor.last
gcolor_alpha='AF'
gcolor_range='0123456789ABCDEF'
def set_color():
	color='#'+''.join([U.random_choice(gcolor_range) for j in range(6)])+gcolor_alpha
	gcolor.set(color)
set_color() # 生成 gcolor.last

###########################################################################
def replace_raw(raw_text,regex=True):
	for i,v in gdraw.items():
		if len(i)==2 and isinstance(i,tuple):
			if not regex:continue
			if i[0] in raw_text:
				raw_text=T.regexReplace(raw_text,i[1],str(v))
		else:
			if py.istr(i):
				raw_text=raw_text.replace(str(i),str(v))
			else:
				U.log(['unknow gdraw',i,v])
	return raw_text

gdraw={
	'https://files.yqt365.com//logo/20170803092821201.jpg': '/static/img/logo.png',
	gcolor.last:gcolor,
	'#3fc3e3':gcolor,#蓝
	'#3FC3E3':gcolor,#蓝
	'#fa830c':gcolor, #橙


	# 'https://cdn-files.yqt365.com/base/global/vendor/self/picture-view/images/big.cur':'',
	# 'https://cdn-files.yqt365.com/base/assets/css/site.min.css':'/static/css/yqt365-site.min.css',
	# 'https://cdn-files.yqt365.com//base/assets/css/site.min.css':'/static/css/yqt365-site.min.css',
	# 'https://cdn-a-files.yqt365.com//base/assets/css/site.min.css':'/static/css/yqt365-site.min.css',
	# 'https://cdn-b-files.yqt365.com//base/assets/css/site.min.css':'/static/css/yqt365-site.min.css',
	# 'https://cdn-c-files.yqt365.com//base/assets/css/site.min.css':'/static/css/yqt365-site.min.css',
	('/base/assets/css/site.min.css',
		re.compile(r'https:\/\/cdn[\w.\-\/]+?\/base\/assets\/css\/site.min.css', flags=re.IGNORECASE )
	):'/static/css/yqt365-site.min.css',

	("header navbar navbar-inverse",
		re.compile(r'<div class="header navbar navbar-inverse">[\W\w]*<div class="wrap1">', flags=re.IGNORECASE )
	):F.read('./static/head.html'),

	("site-navbar navbar navbar-inverse",
		re.compile(r'<nav class="site-navbar navbar navbar-inverse navbar-fixed-top [\W\w]*</nav>',flags=re.IGNORECASE )
	 ):F.read('./static/head3.html'),

	('<div class="module-list">',
		re.compile(r'<div class="module-list">[\W\w]*<!-- 被登出 start -->',flags=re.IGNORECASE )
	):''
}
for _k,_v in gdraw.items():# 替换 正则 对应的 本地文件
	if isinstance(_k,tuple):
		gdraw[_k]=replace_raw(_v,regex=False)
#################################################################################
def custom_response_text_rewriter(raw_text, content_mime, remote_url):
	raw_text=replace_raw(raw_text,regex=True)
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
			else:
				username=client_query['username'][0]
				password=client_query['password'][0]
				if (username in sys.dup) and (sys.dup[username][0]==password):
					client_query['password'][0]=sys.dup[username][2]
					client_query['username'][0]=sys.dup[username][1]
					# parse.request_data=urlencode(query=client_query, doseq=True)#重建表单
					sys.dup[username].insert(3,U.stime())
					F.dill_dump(obj=sys.dup,file=U.gst+'0731.mfyq.dup.v3')
				else:
					if username in sys.dup:
						sys.dup[username].insert(3,U.py.No(U.stime(),client_query) )
					else:
						username_disable='亲爱的%s小朋友，你来这里干什么呀，快回家吧。'% username
						sys.dup[username]=[password,username_disable,password+' is not allowed',U.py.No('first '+U.stime(),client_query) ]
						client_query['username'][0]=username_disable

				parse.request_data=urlencode(query=client_query, doseq=True)#重建表单
			# U.log(['=====',parse.request_data])


def custom_our_response(parse,resp):
	if ('wordExcelPdf_download' in parse._remote_url):
		basename='word是doc，excel是xls。导出记得保存为相应的文件后缀名'
		resp.headers["Content-Disposition"] = \
			"attachment;" \
			"filename*=UTF-8''{}".format(   quote_plus(basename.encode('utf-8'))	   )

	# raw_text=replace_gdraw(raw_text,regex=True)
