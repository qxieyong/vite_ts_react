//适配兼容
(function (doc, win) {
    console.log('win.devicePixelRatio', win.devicePixelRatio)
    // const dpr = Math.min(win.devicePixelRatio, 3);
    // const scale = 1 / dpr;
    const resizeEvent = 'orientationchange' in window ? 'orientationchange' : 'resize';   //orientationchange 屏幕方向变化

    const recalCulate = function () {
        const docEle = document.documentElement;
        const w = docEle.clientWidth;
        const num = (w > 1920 ? 1920 : w) / 1920;       // **此时的1920就是你设计稿的尺寸
        let fontSize = num * 100;// * scale;
        fontSize = Math.max(fontSize, 24)
        docEle.style.fontSize = fontSize.toFixed(1) + 'px';
    };
    recalCulate();
    if (!doc.addEventListener) return;
    win.addEventListener(resizeEvent, recalCulate, false);
})(document, window);