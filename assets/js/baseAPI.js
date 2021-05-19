
//请求拦截器
$.ajaxPrefilter(function(options){
    options.url = 'http://api-breakingnews-web.itheima.net'+options.url
})