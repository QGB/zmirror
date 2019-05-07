# coding=utf-8
import sys

# ############## Local Domain Settings ##############
my_host_name = 'mf.yq10000.cn'  #'okfw.net'
my_host_scheme = 'http://'
my_host_port = 10000  # None????????, ??????????, ?? 81
# built_in_server_extra_params={}	

if sys.platform=='win32':my_host_port+=1


# ############## Target Domain Settings ##############
target_domain =  '0731.mfyq.com.cn'
target_scheme = 'http://'
# target_domain =  'www.yqt365.com'  #'0731.mfyq.com.cn'
# target_scheme = 'https://'


external_domains = [
   "0731.mfyq.com.cn",
]

# ????????HTTPS
# force_https_domains = 'ALL'

# ????????
enable_automatic_domains_whitelist = True
domains_whitelist_auto_add_glob_list = ()

# ############## Proxy Settings ##############
# ?????????????, ????????http??
is_use_proxy = False
# ??????SOCKS??, ?? http://docs.python-requests.org/en/latest/user/advanced/#proxies
requests_proxies = dict(
    http='http://127.0.0.1:8123',
    https='https://127.0.0.1:8123',
)


developer_temporary_disable_ssrf_prevention = True

# # human_ip_verification_enabled = True
# # must_verify_cookies = True
# # human_ip_verification_questions = (
# # ('请输入密码：', 'RunK#2018', '区分大小写'),
# # )
# # human_ip_verification_identity_record = ()


custom_text_rewriter_enable=True

# custom_inject_content = {
    # "head_first": [
        # {
            # "content": r"""<script>
# setTimeout(function(){
	
# ds=document.querySelectorAll ('img[src*="files.yqt365.com//logo/"]')
# for(i of ds){
	# i.setAttribute('src','https://okfw.net/mfyq_logo')
	# console.log(i)
# }

# },999)
# alert(document.body)

# </script>""",
            # "url_regex": r"^0731.mfyq.com.cn",
        # },
    # ]
# }