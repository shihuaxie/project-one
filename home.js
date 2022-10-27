window.addEventListener("load", function () {
    //1.获取元素
    const arrow_l = document.querySelector(".arrow-l");
    const arrow_r = document.querySelector(".arrow-r");
    const focus = document.querySelector(".focus");
    const focusWidth = focus.offsetWidth;
    //2.绑定事件 鼠标经过focus大盒子时 左右箭头显示，离开时则隐藏
    focus.addEventListener("mouseenter", function () {
        arrow_l.style.display = "block";
        arrow_r.style.display = "block";
        //鼠标经过大盒子 停止定时器
        clearInterval(timer);
        timer = null;  //清除定时器
    });
    //离开时则隐藏
    focus.addEventListener("mouseleave", function () {
        arrow_l.style.display = "none";
        arrow_r.style.display = "none";
        //离开时则开启定时器
        timer = setInterval(function(){
            //自动播放就相当于点击右侧按钮
            //手动调用右侧点击事件
            arrow_r.click();
        }, 2000)
    });

    // 3. 利用for循环动态生成小圆圈，小圆圈要放入ol里
    const ul = focus?.querySelector("ul");
    const ol = focus.querySelector(".circle");
    //console.log(ul.children.length);
    for (var i =0; i<ul.children.length; i++){
        //创建一个li
        const li = document.createElement("li");
        //记录当前小圆圈的索引号，通过自定义属性来做
        li.setAttribute("index", i);
        //把li插入到ol里面
        ol.appendChild(li);
        //4.小圆圈的排他思想 我们可以直接在生成小圆圈的同时就给他绑定点击事件
        li.addEventListener('click', function (){
            //干掉所有人 把所有li清除current类名
            for(var i =0; i<ol.children.length; i++){
                ol.children[i].className = "";
            }
            //留下我自己 当前的小li设置current类名
            this.className = "current";
            //点击小圆圈 移动图片
            //点击小圆圈 图片向左移动 实质上是装图片的ul在向左移动 ul每次移动的距离就是点击的圆圈索引号乘以每个图片的宽度 注意向左是负数
            //animate(obj(动画对象),target(目标值),callback);
            //当我们点击了某个li 就拿到li的索引号
            const index = this.getAttribute('index');
            //console.log(index)
            //当我们点击了li 就要把li的索引号给num
            num = index;
            //当我们点击了li 就要把li的索引号给circle
            circle = index;
            //console.log(focus.offsetWidth) 图片宽度
            animate(ul,-index * focusWidth);
        })
    }
    //把ol里面的第一个li设置类名为current
    ol.children[0].className='current';
    //6。 克隆第一张图片 放到ul最后面
    const first = ul.children[0].cloneNode(true);
    ul.appendChild(first);
    //7。 点击右侧按钮 图片滚动一张 原理：声明变量nu，每点击按钮一次，num自增1；num值乘以图片宽度就是ul移动距离
    var num =0;
    //circle控制小圆圈的播放
    var circle = 0;
    //flag是节流阀
    var flag = true;
    arrow_r.addEventListener('click', function (){
        if(flag){
            flag = false; //关闭节流阀
            //图片无缝滚动：把第一个li复制一份 放到ul最后面
            //当图片滚到克隆的最后一张图时，让ul快速的 不做动画的跳到最左侧：left:0;
            //同时 num 赋值 0， 图片就可以中心滚动
            if(num === ul.children.length - 1){
                ul.style.left = 0;
                num = 0;
            }
            num++;
            animate(ul,-num * focusWidth, function(){
                flag = true;    //打开节流阀
            });
            //点击右侧按钮 小圆圈一跟随一起变化
            circle++;
            //如果circle==4 说明走到最后我们克隆的这张照片了 我们就复原
            if(circle === ol.children.length){
                circle = 0;
            }
            //调用函数
            circleChange();
        }
    })
    //左侧按钮
    arrow_l.addEventListener('click', function (){
       if(flag){
           flag = false;
           //当图片滚到克隆的最后一张图时，让ul快速的 不做动画的跳到最左侧：left:0;
           //同时 num 赋值 0， 图片就可以中心滚动
           if(num === 0){
               num = ul.children.length - 1;
               ul.style.left = -num * focusWidth + 'px';
           }
           num--;
           animate(ul,-num * focusWidth, function (){
               flag = true;
           });
           //点击右侧按钮 小圆圈一跟随一起变化
           circle--;
           //如果circle<0 说明第一张图片 则小圆圈要改为第四个小圆圈（3）
           // if(circle < 0){
           //     circle = ol.children.length - 1;
           // }
           circle = circle < 0? circle = ol.children.length - 1 : circle;
           circleChange();
       }
    })
    //把小圆圈样式变化封装起来
    function circleChange(){
        //先清除其余小圆圈current类名
        for(var i = 0; i < ol.children.length; i++){
            ol.children[i].className='';
        }
        //留下当前的小圆圈的current类名
        ol.children[circle].className = 'current';
    }
    //自动播放轮播图
    var timer = setInterval(function(){
        //自动播放就相当于点击右侧按钮
        //手动调用右侧点击事件
        arrow_r.click();
    }, 2000);
});
