$(function(){
    let form = layui.form;
    // let layer = layui.layer;

    //定义密码输入框的校验规则
    form.verify({
        pass: [
            /^[\S]{6,12}$/
            ,'密码必须6到12位，且不能出现空格'
          ] ,
        samePwd: function(val){
            if(val === $('[name=oldPwd]').val()){
                return '新旧密码不能一致！'
            }
        },
        rePwd: function(val){
            if(val !== $('[name=newPwd]').val()){
                return '两次新密吗输入不一致！'
            }
        }
    })


    //监听表单的提交事件
    $('.layui-form').on('submit', function(e){
        e.preventDefault()
        $.ajax({
            type: "POST",
            url: "/my/updatepwd",
            data: $(this).serialize(),
            success: function (res) {
                if(res.status !== 0){
                    layer.msg(res.message)
                }else{
                    layer.msg(res.message)
                    $('#reset').click()
                }
            }
        });
    })
})