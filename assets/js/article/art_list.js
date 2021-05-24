$(function(){
    let layer = layui.layer
    let form = layui.form;
    let laypage = layui.laypage;
    let q = {
        pagenum: 1,
        pagesize: 2,
        cate_id: $('[name=cate_id]').val(),
        state: $('[name=state]').val()
    }
    initArtList()
    //文章列表初始化方法
    function initArtList(){
        $.ajax({
            type: "GET",
            url: "/my/article/list",
            data: q,
            success: function (res) {
                if(res.status !== 0){
                    layer.msg('获取文章数据失败')
                }else{
                    layer.msg(res.message)
                    let arr =[]
                    res.data.forEach(element => {
                        let ele = `
                                <tr>
                                    <td>${element.title}</td>
                                    <td>${element.cate_name}</td>
                                    <td>${element.pub_date}</td>
                                    <td>${element.state}</td>
                                    <td>
                                    <button id='art-edit' data-id=${element.Id} type="button" class="layui-btn layui-btn-xs">编辑</button>
                                    <button data-id=${element.Id} type="button" class="layui-btn layui-btn-danger layui-btn-xs btn-delete">删除</button>
                                    </td>
                                </tr>
                                `
                        arr.push(ele)
                    });
                    $('tbody').empty().html(arr)
                    renderPage(res.total)
                }
            }
        });
    }

//获取文章分类的方法
    initArtCate()
    function initArtCate(){
        $.ajax({
            type: "GET",
            url: "/my/article/cates",
            success: function (res) {
                if(res.status !== 0){
                    return layer.msg(res.message)
                }
                let data = res.data
                data.forEach(val => {
                    $('#select').append(`
                    <option value="${val.Id}">${val.name}</option>
                    `)
                })
                form.render()
            }
        });
    }


    //监听筛选按钮事件
    $('#serchForm').on('submit', function(e){
        e.preventDefault()
        q.cate_id = $('[name=cate_id]').val()
        q.state = $('[name=state]').val()
        initArtList()
    })

    //定义渲染分页的方法
    function renderPage(to){
        //在获取页面数据的时候调用该方法渲染分页结构

        laypage.render({
            elem: 'pageBox',
            count: to,
            limit: q.pagesize,
            curr: q.pagenum,
            layout: ['count', 'limit', 'prev', 'page', 'next', 'skip'],
            limits: [2,5,8,10],
            jump: function(obj, first){
                q.pagenum = obj.curr
                q.pagesize = obj.limit
                if(!first){
                    initArtList()
                }
            }
        })
    }


    //注册删除按钮的点击事件 是代理的模式
    $('tbody').on('click', '.btn-delete', function(){
        let id = $(this).attr('data-id')

        layer.confirm('确定删除?', {icon: 3, title:'提示'}, function(index){
           $.ajax({
                type: "GET",
                url: '/my/article/delete/' + id,
                success: function(res){
                    if(res.status !== 0){
                    return layer.msg(res.message)
                    }
                    layer.msg(res.message)
                    initArtList()
                }
            })
            layer.close(index);
        });


        
    })

})


