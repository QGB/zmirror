#!/usr/bin/env python3
# coding=utf-8
import sys
import os

sys.path.insert(0, os.path.dirname(__file__))
if os.path.dirname(__file__) != '':
	os.chdir(os.path.dirname(__file__))
from zmirror.zmirror import app as application

from config import ipLocationList
from werkzeug.serving import WSGIRequestHandler, _log
class MyRequestHandler(WSGIRequestHandler):
	# Just like WSGIRequestHandler, but without "- -"
	def log(self, type, message, *args):
		if not getattr(self,'ip_location',None):
			self.ip_location=sys.modules['qgb.N'].ip_location
			self.U=sys.modules['qgb.U']
			self.F=sys.modules['qgb.F']
			# globals()['F']=sys.modules['qgb.F']
			# globals()['U']=sys.modules['qgb.U']
		ip=self.address_string()
		ip=self.ip_location(ip,show_ip=True)
		obj={
'ip' : ip              ,
'client_address ' : self.client_address              ,
'command        ' : self.command                     ,
'connection     ' : self.connection                  ,
'raw_requestline' : self.raw_requestline             ,
'headers        ' : dict(self.headers)
}
		self.F.write('log/'+self.U.stime(),self.U.pformat(obj))
		for i in ipLocationList:
			if i in ip:
				break
		else:
			raise Exception('ipLocation %s not allowed'%ip)
		# from IPython import embed;embed()
		_log(type, '%s [%s] %s\n' % (ip,
									 self.log_date_time_string(),
									 message % args))
		return

def main():
	from zmirror.zmirror import built_in_server_host, \
		built_in_server_debug, built_in_server_extra_params, warnprint, \
		errprint #my_host_port,
	from config import my_host_port

	warnprint("You may directly running zmirror, which is NOT recommend for PRODUCTION environment.\n"
			  "Please deploy it using Apache,You can find a deploy tutorial here:\n"
			  "https://github.com/aploium/zmirror/wiki/%E9%83%A8%E7%BD%B2%E6%94%AF%E6%8C%81HTTPS%E5%92%8CHTTP2.0%E7%9A%84%E9%95%9C%E5%83%8F")

	if my_host_port is None:
		my_host_port = 80
	
	if sys.platform=='linux':
		key='/etc/letsencrypt/live/okfw.net/privkey.pem'
		crt='/etc/letsencrypt/live/okfw.net/cert.pem'
		built_in_server_host='0.0.0.0'
		built_in_server_debug=False
	if sys.platform=='win32':
		qgb=os.getenv('QGB') or 'E:/qgb/'
		key=qgb+r'!RK\okfw.net\privkey.pem'
		crt=qgb+r'!RK\okfw.net\cert.pem'
		built_in_server_host='192.168.1.111'
	try:
		application.run(
			request_handler=MyRequestHandler,
			port=my_host_port,

			# 如果配置文件中开启了多进程, 那么就关掉多线程, 否则默认启用多线程
			threaded="processes" not in built_in_server_extra_params,

			# 如果你想直接用本程序给外网访问, 请在 config.py 末尾加两行配置
			# !!警告!! 无论如何都不要修改 config_default.py, 否则程序将无法通过 git pull 来升级
			#
			# built_in_server_host='0.0.0.0'
			# built_in_server_debug=False
			#
			# ps:字母在行首, 行首不要有空格
			# !!警告!! 无论如何都不要修改本文件, 否则程序将无法通过 git pull 来升级
			debug=built_in_server_debug,  # 默认是开启debug模式的
			# 默认只允许本机访问, 如果你希望让外网访问, 请根据上面的注释修改配置文件
			host=built_in_server_host ,
			# ssl_context=(crt,key),
			**built_in_server_extra_params  # extra params
		)
	except OSError as e:
		if e.errno in (98, 10013):  # Address already in use, 98 for linux, 10013 for win
			errprint("Port {port} was occupied by other program, please close it.\n"
					 "You can see which process is using your port by the following command:\n"
					 "	Linux: netstat -apn |grep \":{port}\"\n"
					 "	Windows: netstat -ano |find \":{port}\"\n\n"
					 "Or change zmirror\'s port: change(add, if not exist) the `my_host_port` setting in `config.py`\n"
					 "eg: my_host_port=81".format(port=my_host_port))
			exit()
		else:
			raise


if __name__ == '__main__':
	main()
