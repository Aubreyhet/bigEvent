$(function(){
    //给去注册绑定点击事件
    $('#link_reg').on('click',function(){
        $('.login-box').hide()
        $('.reg-box').show()
        $('#login_box').find('input').val('')
    })
    //给去登录绑定点击事件
    $('#link_login').on('click',function(){
        $('.login-box').show()
        $('.reg-box').hide()
        $('#reg_box').find('input').val('')
    })

    //自定义校验规则
    let form = layui.form;
    let layer = layui.layer;

    form.verify({
        pwd:[
            /^[\S]{6,12}$/,
            '密码必须6到12位，且不能出现空格'
        ],
        rpwd:function(value){
            if($('.reg-box [name=password]').val() !== value){
                return '两次密码不一致'
            } 
        }
    })

    //监听form点击注册事件
    $('#reg_box').on('submit',function(e){
        e.preventDefault();
        let data = {
            username: $('#reg_box [name=username]').val(),
            password: $('#reg_box [name=password]').val()
        }
        $.ajax({
            type: "POST",
            url: "/api/reguser",
            data: data,
            success: function (res) {
                if(res.status !==0){
                   return layer.msg(res.message)
                }else{
                    layer.msg('注册成功请登录');
                    $('#reg_box').find('input').val(''),
                    $('#link_login').click()
                }
            }
        });
    })

    //监听登录的事件
    $('#login_box').on('submit', function(e){
        e.preventDefault()
        let data = {
            username: $('#login_box [name=username]').val(),
            password: $('#login_box [name=password]').val()
        }
        $.ajax({
            type: 'POST',
            url: '/api/login',
            data: data,
            success: function(res){
                if(res.status != 0){
                    return layer.msg(res.message)
                }else{
                    layer.msg(res.message)
                    $('#login_box').find('input').val(''),
                    window.localStorage.setItem('token', res.token)
                    location.href = '/index.html'
                }
            }
        })
    })
})