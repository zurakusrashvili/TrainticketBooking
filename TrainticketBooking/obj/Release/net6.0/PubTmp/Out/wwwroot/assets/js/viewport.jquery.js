! function(t) {
    "use strict";
    var i = function(i, e) {
        return this.$el = t(i), this.cb = e, this.watch(), this
    };
    i.prototype = {
        isIn: function i() {
            var e = t(window),
                n = this.$el.offset().top,
                s = n + this.$el.outerHeight(),
                r = e.scrollTop(),
                o = r + e.height();
            return s > r && n < o
        },
        watch: function() {
            var i = this,
                e = !1;
            t(window).on("resize scroll", function() {
                i.isIn() && !1 === e && (i.cb.call(i.$el, "entered"), e = !0), !0 !== e || i.isIn() || (i.cb.call(i.$el, "leaved"), e = !1)
            })
        }
    }, t.fn.isInViewport = function(e) {
        return this.each(function() {
            var n = t(this);
            n.data("isInViewport") || n.data("isInViewport", new i(this, e))
        })
    }
}(window.jQuery);