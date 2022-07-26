function animate(obj,target,callback) { 
    clearInterval(obj.timer);
    obj.timer=setInterval(function() {
        if (obj.offsetLeft==target) {
            clearInterval(obj.timer);
            callback && callback();
        }
        obj.style.left=target+'px';
    },15) 
}


