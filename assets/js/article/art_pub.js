$(function(){
    let layer = layui.layer
    let form = layui.form
    initEditor()
    //初始化富文本编辑器
    //获取文章分类列表
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


    // 1. 初始化图片裁剪器
    var $image = $('#image')
     
    // 2. 裁剪选项
    var options = {
      aspectRatio: 400 / 280,
      preview: '.img-preview'
    }
    
    // 3. 初始化裁剪区域
    $image.cropper(options)

    //点击选择封面按钮 打开选择文件选择框
    $('#btnFile').on('click', function(){
        $('#coverFile').click()
    })

    //监听选择文件框的事件
    $('#coverFile').on('change', function(e){
        let files = e.target.files;
         
        if(files.length === 0){
            return
        }

        let imgUrl = URL.createObjectURL(files[0])

        $image
            .cropper('destroy')
            .attr('src', imgUrl)
            .cropper(options)
    })

    let artState = '已发布';

    //监听存为草稿的点击事件
    $('#save2').on('click', function(){
        artState = '草稿'
    })

    //监听表单的提交事件
    $('#form-data').on('submit', function(e){
        e.preventDefault()
        let fd = new FormData($(this)[0])

        fd.append('state', artState)

        
        $image
            .cropper('getCroppedCanvas', { // 创建一个 Canvas 画布
                width: 400,
                height: 280
            })
            .toBlob(function(blob) {       // 将 Canvas 画布上的内容，转化为文件对象
                // 得到文件对象后，进行后续的操作

                fd.append('cover_img', blob)

                //调用发布文章方法
                sendArt(fd)


            })
    })

    // 定义发布文章的方法
    function sendArt(fd){
        $.ajax({
            type: "POST",
            url: '/my/article/add',
            data: fd,
            contentType: false,
            processData: false,
            success: function(res){
                console.log(res)
                if(res.status !== 0){
                    return layer.msg(res.message)
                }else{
                    layer.msg(res.message)
                    location.href = '/article/art_list.html'
                }
            }
        })
    }

})



