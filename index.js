
window.addEventListener('load',function() {
    //获取元素
    var arrow_l=this.document.querySelector('.arrow-l');
    var arrow_r=this.document.querySelector('.arrow-r');
    var main=this.document.querySelector('.main');
    var mainWidth=main.offsetWidth;

    //1.鼠标经过显示左右按钮
//浮动后的元素虽然脱离标准流，但是还是属于父级的，所以事件mouseenter经过浮动的元素，
//相当于经过了父级。因为浮动已经脱离了标准流，所以不可以冒泡
    main.addEventListener('mouseenter',function() {
        arrow_l.style.display='block';
        arrow_r.style.display='block';
        clearInterval(timer);  //清除定时器
        timer=null;  //清除变量
    });
    //2.鼠标离开
    main.addEventListener('mouseleave',function() {
        arrow_l.style.display='none';
        arrow_r.style.display='none';
        timer=setInterval(function() {
            arrow_r.click();
        },2000);  
    });

    //3.动态的生成小圆点
    var ul =main.querySelector('ul');
    var ol =main.querySelector('.circle');
    for (var i=0;i<ul.children.length;i++) {
        var li = document.createElement('li');
        li.setAttribute('index',i);
        ol.appendChild(li);
        
        li.addEventListener('click',function() {
            for (var i=0;i<ol.children.length;i++) {
                ol.children[i].style.backgroundColor='#fff';
                console.log('11');
            }
            this.style.backgroundColor='black';
            var index=this.getAttribute('index');
            // var mainWidth=main.offsetWidth;这是局部
            num=index;
            console.log(mainWidth);
            animate(ul,-index*mainWidth);
            
        })
    }
    // ol.children[0].className='current';设置类名操作，类加进去了，但是不生效
    // 所以改成行内样式操作
    ol.children[0].style.backgroundColor='black';
    
    //4.点击右按钮，图片滚动一张
// 要实现无缝滚动，所以第一种要加到ul最后。用克隆好些，避免生成多余的小圆圈
    var first=ul.children[0].cloneNode(true);
    ul.appendChild(first);
    var num=0;
    var circle=0;
    var flag=true;   //节流阀
    arrow_r.addEventListener('click',function() {
        if (flag) {
            flag=false;  //关闭节流阀
            if (num==ul.children.length-1) {
                ul.style.left=0;
                num=0;
            }
            num++;
            animate(ul,-num*mainWidth,function() {
                flag=true;
            });
            circle=num;
            if (num==ul.children.length-1) {
               circle=0;
            }
            for (var i =0;i<ol.children.length;i++) {
                ol.children[i].style.backgroundColor='#fff';
            }
            ol.children[circle].style.backgroundColor='black';
        }
    })
    
    //5.实现左侧按钮的滚动
    arrow_l.addEventListener('click',function() {
        if (flag) {
            flag=false;
            if (num==0) {
                num=ul.children.length-1;
                ul.style.left=-num*mainWidth+'px';
            }
            num--;  //可以从0到负数继续减
            // console.log(num);
            animate(ul,-num*mainWidth,function() {
                flag=true;
            });
            
            circle=num;
            
            for (var i =0;i<ol.children.length;i++) {
                ol.children[i].style.backgroundColor='#fff';
            }
            ol.children[circle].style.backgroundColor='black';
        }
    })

    //6.轮播图自动播放的功能，类似于点击右侧按钮
    //此时我们可以使用手动调用右侧按钮事件，arrow_r.click.类似于点击了按钮
    //鼠标经过main块就停止定时器，离开就自动播放
    var timer=setInterval(function() {
        arrow_r.click();
    },2000);


});