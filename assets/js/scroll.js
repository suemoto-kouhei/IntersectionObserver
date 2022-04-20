class ScrollObserver {
    constructor(els,cb,options) {
        this.els = document.querySelectorAll(els);
        const defaultOptions = {
            root: null,
            rootMargin: "0px",
            threshold: 0,
            once: true,//trueなら一度表示されたら解除 falseにしたら文字列を分解したものをさらに分解してしまう
        };
        this.cb = cb;
        this.options = Object.assign(defaultOptions, options);
        this.once = this.options.once;
        this._init();
    }
    _init(){
        const callback = function (entries, observer) {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    // const ta = new TextAnimation(entry.target);
                    // ta.animate();
                    this.cb(entry.target,true)//第一引数は監視しているDOM 第二引数は交差しているかをtrue,falseで判断
                    if(this.once){//trueならobserver.unobserveを実行
                        observer.unobserve(entry.target);
                    }
                } else {
                    this.cb(entry.target,false)//第一引数は監視しているDOM 第二引数は交差しているかをtrue,falseで判断
                }
            });
        };
        this.io = new IntersectionObserver(callback.bind(this), this.options);//constructorのthis.optiosを参照 IntersectionObserverはwindowのプロパティのクラス callbackを呼ぶ時はwindowになるのでdindを使うことでScrollObserverのthis.cbになる
        this.io.poll_INTERVAL = 100;//IntersectionObserverが使えない時の為の記述。scroll-polyfill.jsと合わせて使う  100ミリ秒ごとのスクロールの値監視
        this.els.forEach(el => this.io.observe(el));//elsをループで処理 監視対象 複数設定できる this.elsでconstructorのthis.elsを取得
    }
    destroy() {
        this.io.disconnect();
    }
}