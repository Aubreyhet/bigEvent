
//请求拦截器
$.ajaxPrefilter(function(options){
    options.url = 'http://127.0.0.1:3001'+options.url;
    if(options.url.indexOf('/my/') !== -1){
        options.headers = {
            Authorization: window.localStorage.getItem('token') || ''
        }
        
    }
    //全局挂载complete函数 
    options.complete = function(res) {
            if(res.responseJSON.status === 1 && res.responseJSON.message === "身份认证失败！"){
                localStorage.removeItem('token');
                location.href = './login.html'
            }
        }
})