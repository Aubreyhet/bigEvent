$(function(){
    let form = layui.form
    let layer = layui.layer


    form.verify({
        nickname: function(value){
            if(value.length > 6){
                return "昵称长度必须在1～6个字符之间！"
            }
        }
    })

    //调用获取用户信息方法
    initUserInfo()


    //获取用户信息方法
    function initUserInfo(){
        $.ajax({
            type: "GET",
            url: "/my/userinfo",
            success: function (res) {
                if(res.status === 0){
                    layer.msg(res.message)
                    form.val('userInfo', res.data)
                }else{
                    layer.msg(res.message)
                }
            }
        });
    }


    //监听重置按钮的点击事件
    $('#reset').on('click',function(e){
        //阻止默认行为
        e.preventDefault()
        initUserInfo()
    })

    //监听表单提交事件
    $('.layui-form').on('submit', function(e){
        //阻止默认行为
        e.preventDefault();
        $.ajax({
            type: "POST",
            url: "/my/userinfo",
            data: $(this).serialize(),
            success: function (res) {
                if(res.status === 0){
                    layer.msg(res.message)
                    window.parent.getUserInfo()
                }else{
                    layer.msg(res.message)
                }
            }
        })
    })
})