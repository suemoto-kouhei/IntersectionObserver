document.addEventListener('DOMContentLoaded',() => {
    const cb = function (el,isIntersecting) {//第一引数に交差中のDOM,第二引数にtrueかfalse
        if(isIntersecting){//trueなら対象の要素が画面の中に表示されている状態
            el.classList.add('inview');
        }
    }

    const so = new ScrollObserver('.cover-slide',cb);//第三引数に{once:false}を使うことでobserver.unobserveの設定を一度切りの表示にするかどうかをtrue,falseで切り替える 今回は削除
});