function Std_PriceCalculate() {
    var e = document.getElementById("start_yr").value,
        n = document.getElementById("end_yr").value,
        t = Number(n) - Number(e),
        o = (1200) * t * .7 / .8,
        d = (1200 - 10 * (t - 1)) * t * .7 / .8,
        // o = (1200 - 10 * (t - 1)) * t * .7 / .8,
        // d = (1200 - 10 * (t - 1)) * t * .7,
        i = o - d,
        a = d / t,
        s = o / 7.75,
        r = d / 7.75,
        l = s - r,
        c = r / t;
    e < 1979 | e > 2022 | n < 1980 | n > 2023 ? (document.getElementById("no_year").innerHTML = "-", document.getElementById("original_price_std").innerHTML = "-", document.getElementById("discount_price_std").innerHTML = "-", document.getElementById("discount_diff_std").innerHTML = "-", document.getElementById("avg_price_std").innerHTML = "-", document.getElementById("original_price_std_usd").innerHTML = "-", document.getElementById("discount_price_std_usd").innerHTML = "-", document.getElementById("discount_diff_std_usd").innerHTML = "-", document.getElementById("avg_price_std_usd").innerHTML = "-") : (document.getElementById("no_year").innerHTML = t, document.getElementById("original_price_std").innerHTML = o.toFixed(1), document.getElementById("discount_price_std").innerHTML = "HKD " + d.toFixed(0), document.getElementById("discount_diff_std").innerHTML = "- " + i.toFixed(1), document.getElementById("avg_price_std").innerHTML = a.toFixed(0), document.getElementById("original_price_std_usd").innerHTML = s.toFixed(1), document.getElementById("discount_price_std_usd").innerHTML = "USD " + r.toFixed(0), document.getElementById("discount_diff_std_usd").innerHTML = "- " + l.toFixed(1), document.getElementById("avg_price_std_usd").innerHTML = c.toFixed(0))
}

function Pro_PriceCalculate() {
    var e = document.getElementById("start_yr").value,
        n = document.getElementById("end_yr").value,
        t = Number(n) - Number(e),
        o = (1200) * t / .8,
        d = (1200 - 10 * (t - 1)) * t / .8,
        // o = (1200 - 10 * (t - 1)) * t / .8,
        // d = (1200 - 10 * (t - 1)) * t,
        i = o - d,
        a = d / t,
        s = o / 7.75,
        r = d / 7.75,
        l = s - r,
        c = r / t;
    e < 1979 | e > 2022 | n < 1980 | n > 2023 ? (document.getElementById("no_year").innerHTML = "-", document.getElementById("original_price_pro").innerHTML = "-", document.getElementById("discount_price_pro").innerHTML = "-", document.getElementById("discount_diff_pro").innerHTML = "-", document.getElementById("avg_price_pro").innerHTML = "-", document.getElementById("original_price_pro_usd").innerHTML = "-", document.getElementById("discount_price_pro_usd").innerHTML = "-", document.getElementById("discount_diff_pro_usd").innerHTML = "-", document.getElementById("avg_price_pro_usd").innerHTML = "-") : (document.getElementById("no_year").innerHTML = t, document.getElementById("original_price_pro").innerHTML = o.toFixed(1), document.getElementById("discount_price_pro").innerHTML = "HKD" + d.toFixed(0), document.getElementById("discount_diff_pro").innerHTML = i.toFixed(1), document.getElementById("avg_price_pro").innerHTML = a.toFixed(0), document.getElementById("original_price_pro_usd").innerHTML = s.toFixed(1), document.getElementById("discount_price_pro_usd").innerHTML = "USD " + r.toFixed(0), document.getElementById("discount_diff_pro_usd").innerHTML = "- " + l.toFixed(1), document.getElementById("avg_price_pro_usd").innerHTML = c.toFixed(0))
}

function pop_up_screen() { alert("即將推出 敬請期待！") }

function pop_up_screen_en() { alert("Coming Soon! Please stay tuned for the release.") }
AOS.init({ duration: 800, easing: "slide" }),
    function(e) {
        "use strict";
        e(window).stellar({ responsive: !0, parallaxBackgrounds: !0, parallaxElements: !0, horizontalScrolling: !1, hideDistantElements: !1, scrollProperty: "scroll" });
        e(".js-fullheight").css("height", e(window).height()), e(window).resize(function() { e(".js-fullheight").css("height", e(window).height()) });
        setTimeout(function() { e("#ftco-loader").length > 0 && e("#ftco-loader").removeClass("show") }, 1), e.Scrollax(), e("nav .dropdown").hover(function() {
            var n = e(this);
            n.addClass("show"), n.find("> a").attr("aria-expanded", !0), n.find(".dropdown-menu").addClass("show")
        }, function() {
            var n = e(this);
            n.removeClass("show"), n.find("> a").attr("aria-expanded", !1), n.find(".dropdown-menu").removeClass("show")
        }), e("#dropdown04").on("show.bs.dropdown", function() { console.log("show") });
        e(window).scroll(function() {
            var n = e(this).scrollTop(),
                t = e(".ftco_navbar"),
                o = e(".js-scroll-wrap");
            n > 150 && (t.hasClass("scrolled") || t.addClass("scrolled")), n < 150 && t.hasClass("scrolled") && t.removeClass("scrolled sleep"), n > 350 && (t.hasClass("awake") || t.addClass("awake"), o.length > 0 && o.addClass("sleep")), n < 350 && (t.hasClass("awake") && (t.removeClass("awake"), t.addClass("sleep")), o.length > 0 && o.removeClass("sleep"))
        });
        e("#section-counter, .hero-wrap, .ftco-counter").waypoint(function(n) {
            if ("down" === n && !e(this.element).hasClass("ftco-animated")) {
                var t = e.animateNumber.numberStepFactories.separator(",");
                e(".number").each(function() {
                    var n = e(this),
                        o = n.data("number");
                    console.log(o), n.animateNumber({ number: o, numberStep: t }, 7e3)
                })
            }
        }, { offset: "95%" });
        e(".ftco-animate").waypoint(function(n) {
            "down" !== n || e(this.element).hasClass("ftco-animated") || (e(this.element).addClass("item-animate"), setTimeout(function() {
                e("body .ftco-animate.item-animate").each(function(n) {
                    var t = e(this);
                    setTimeout(function() { var e = t.data("animate-effect"); "fadeIn" === e ? t.addClass("fadeIn ftco-animated") : "fadeInLeft" === e ? t.addClass("fadeInLeft ftco-animated") : "fadeInRight" === e ? t.addClass("fadeInRight ftco-animated") : t.addClass("fadeInUp ftco-animated"), t.removeClass("item-animate") }, 50 * n, "easeInOutExpo")
                })
            }, 100))
        }, { offset: "95%" });
        e(".smoothscroll[href^='#'], #ftco-nav ul li a[href^='#']").on("click", function(n) {
            n.preventDefault();
            var t = this.hash,
                o = e(".navbar-toggler");
            e("html, body").animate({ scrollTop: e(t).offset().top }, 700, "easeInOutExpo", function() { window.location.hash = t }), o.is(":visible") && o.click()
        }), e("body").on("activate.bs.scrollspy", function() { console.log("nice") }), e(".image-popup").magnificPopup({ type: "image", closeOnContentClick: !0, closeBtnInside: !1, fixedContentPos: !0, mainClass: "mfp-no-margins mfp-with-zoom", gallery: { enabled: !0, navigateByImgClick: !0, preload: [0, 1] }, image: { verticalFit: !0 }, zoom: { enabled: !0, duration: 300 } }), e(".popup-youtube, .popup-vimeo, .popup-gmaps").magnificPopup({ disableOn: 700, type: "iframe", mainClass: "mfp-fade", removalDelay: 160, preloader: !1, fixedContentPos: !1 }), setInterval(function() {
            ! function() {
                var n = new Date("21 May 2019 9:56:00 GMT+01:00");
                n = Date.parse(n) / 1e3;
                var t = new Date,
                    o = n - (t = Date.parse(t) / 1e3),
                    d = Math.floor(o / 86400),
                    i = Math.floor((o - 86400 * d) / 3600),
                    a = Math.floor((o - 86400 * d - 3600 * i) / 60),
                    s = Math.floor(o - 86400 * d - 3600 * i - 60 * a);
                i < "10" && (i = "0" + i), a < "10" && (a = "0" + a), s < "10" && (s = "0" + s), e("#days").html(d + "<span>Days</span>"), e("#hours").html(i + "<span>Hours</span>"), e("#minutes").html(a + "<span>Minutes</span>"), e("#seconds").html(s + "<span>Seconds</span>")
            }()
        }, 1e3)
    }(jQuery);