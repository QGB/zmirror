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

gdraw={
#  re.compile(r'<div class="header navbar navbar-inverse">[\W\w]*<div class="wrap1">'	,flags=re.IGNORECASE ):'./static/head.html',
 re.compile(r'<div class="header navbar navbar-inverse">[\W\w]*<div class="wrap1">'	,flags=re.IGNORECASE ):F.read('./static/head.html'),
}

gdurl={

}
gsLogin=F.read('./static/login.html')


def custom_response_text_rewriter(raw_text, content_mime, remote_url):
    # F.dill_dump((raw_text, content_mime, remote_url),file=U.stime()+'  '+T.fileName(remote_url) )
    raw_text = raw_text.replace('https://files.yqt365.com//logo/20170803092821201.jpg', '/mfyq_logo')
    if 'nav pull-right' in raw_text:
        for k,v in gdraw.items():
            # raw_text=T.regexReplace(raw_text,k,F.read(v))
            raw_text=T.regexReplace(raw_text,k,v)

        # 
    if remote_url.startswith('http://0731.mfyq.com.cn/log'):
        # if len(raw_text)>12345:
        if '/dwr/interface/LoginDwr.js?v=' in raw_text:
            raw_text=F.read('./static/login.html')#gsLogin
    return raw_text