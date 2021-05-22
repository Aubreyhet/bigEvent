$(function(){

    //调用获取用户信息的方法
    getUserInfo()

    //导入ui模块
    let layer = layui.layer;

    //
    $('#logout').on('click',function(){
        layer.confirm('确定退出吗?', {icon: 3, title:'提示'}, function(index){
            //点击确定删除token 路由到登录界面
            localStorage.removeItem('token');
            location.href = './login.html'
            layer.close(index);
          });
    })
})


//定义获取用户信息方法
function getUserInfo(){
    $.ajax({
        type: "GET",
        url: "/my/userinfo",
        headers:{
            Authorization: window.localStorage.getItem('token') || ''
        },
        success: function (res) {
            //调用渲染用户名和用户头像方法
            if(res.status === 0){
                renderUser(res.data)
            }
        } 
    });
}


//定义渲染用户信息的方法
function renderUser(user){
    //用户名渲染
    let name = user.nickname || user.username
    $('#wellcome').html(name);
    //用户头像渲染
    if(user.user_pic){
        $('.layui-nav-img').attr('src', user.user_pic).show();
        $('.text-pic').hide()
    }else{
        $('.layui-nav-img').hide()
        $('.text-pic').html(name[0].toUpperCase()).show()
    }
}
