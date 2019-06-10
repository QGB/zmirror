import re,sys
my_host_port=10000
if sys.platform=='win32':
    'qgb.U' in sys.modules or sys.path.append('E:/QGB/babun/cygwin/bin')
    my_host_port+=1
if sys.platform=='linux':
    'qgb.U' in sys.modules or sys.path.append('/home/qgb')
	
from qgb import U,T,F,N
from flask import request
from zmirror.zmirror import app
from zmirror import zmirror
zmirror.U=U
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


# @app.after_request
# def zmirror_after_request(response):
#     # 移除 connection_pool 中的锁
#     if zmirror.enable_connection_keep_alive:
#         zmirror.connection_pool.release_lock()
#
#     if request.method=='POST':
#         U.log( U.pformat( zmirror.parse.dump() )  )
#       #  U.ipyEmbed()()
#     return response

# @app.before_request #这个只对  zmirror 自带reg页面有效？
# def before_request():
#     '''
#     '''
#
#     if request.method=='POST':
#         parse=zmirror.parse
#         if parse.request_data and py.istr(parse.request_data):
#             parse.request_data=parse.request_data.replace('migang888','wxsbaaaaaaa')
#             U.log(['=====',parse.request_data])
#         U.log( U.pformat( parse.dump() )  )
