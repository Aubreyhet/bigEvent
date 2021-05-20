
//请求拦截器
$.ajaxPrefilter(function(options){
    options.url = 'http://api-breakingnews-web.itheima.net'+options.url;
    if(options.url.indexOf('/my/') !== -1){
        options.headers = {
            Authorization: window.localStorage.getItem('token') || ''
        }
        
    }
    //全局挂载complete函数 
    options.complete = function(res) { 
            console.log(res)
            if(res.responseJSON.status === 1 && res.responseJSON.message === "身份认证失败！"){
                localStorage.removeItem('token');
                location.href = './login.html'
            }
        }
})