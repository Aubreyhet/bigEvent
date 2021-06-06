$(function(){
    let layer = layui.layer
    let form = layui.form;

    //初始化文章类别方法
    function initArtCateList(){
        $.ajax({
            type: "GET",
            url: "/my/article/cates",
            success: function (res) {
                if(res.status !== 0){
                    layer.msg('获取文章类别失败')
                }else{
                    // layer.msg(res.message)
                    let arr =[]
                    res.data.forEach(element => {
                        let ele = `
                                <tr>
                                    <td>${element.name}</td>
                                    <td>${element.alias}</td>
                                    <td>
                                    <button id='art-edit' data-id=${element.id} type="button" class="layui-btn layui-btn-xs">编辑</button>
                                    <button data-id=${element.id} type="button" class="layui-btn layui-btn-danger layui-btn-xs btn-delete">删除</button>
                                    </td>
                                </tr>
                                `
                        arr.push(ele)
                    });
                    $('tbody').empty().html(arr)
                }
            }
        });
    }
    initArtCateList()

    //注册点击添加类别方法
    let addIndex = null;
    $('#addListBtn').on('click', function(){
        addIndex = layer.open({
            type: 1,
            area: ['500px', '250px'],
            title: '添加文章分类',
            content: $('#dialogAdd').html()
        })
    })

    //监听添加表单的提交事件 
    $('body').on('submit', '#form-add', function(e){
        e.preventDefault()
        $.ajax({
            type: 'POST',
            url: '/my/article/addcates',
            data: $(this).serialize(),
            success: function(res){
                if(res.status !== 0){
                    layer.msg(res.message)
                }else{
                    layer.close(addIndex)
                    initArtCateList()
                    layer.msg(res.message)
                }
            }
        })
    })

    //使用代理模式给编辑按钮添加点击事件
    let editIndex = null;
    $('body').on('click', '#art-edit', function(){
        editIndex = layer.open({
            type: 1,
            area: ['500px', '250px'],
            title: '修改文章分类',
            content: $('#dialogEdit').html()
        });


        //为弹出框获取数据 根据id获取对应数据 填充进去
        let id = $(this).attr('data-id')
        $.ajax({
            type: 'GET',
            url: '/my/article/cates/' + id,
            success: function(res){
                if(res.status !== 0){
                    layer.msg(res.message)
                }else{
                    form.val('form-edit', res.data)
                }
            }
        })

    })

    //给修改分类按钮注册点击事件
    $('body').on('submit', '#form-edit', function(e){
        e.preventDefault()
        $.ajax({
            type: 'POST',
            url: '/my/article/updatecate',
            data: $(this).serialize(),
            success: function(res){
                if(res.status !== 0){
                    layer.msg(res.message)
                }else{
                    layer.close(editIndex)
                    initArtCateList()
                    layer.msg(res.message)
                }
            }
        })
    })

    //给删除按钮添加点击事件
    $('body').on('click', '.btn-delete', function(){
        let id = $(this).attr('data-id')
        layer.confirm('确定删除？', {icon: 3, title:'提示'}, function(index){
            $.ajax({
                type: 'GET',
                url: '/my/article/deletecate/' + id,
                success: function(res){
                    if(res.status !== 0){
                        layer.msg(res.message)
                    }else{
                        layer.msg(res.message)
                        layer.close(index);
                        initArtCateList()
                    }
                }
            })   
        })
    });
})




