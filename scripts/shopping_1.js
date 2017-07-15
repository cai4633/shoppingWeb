(function($) {
    $(function() {
            var $slideUl = $(".slide_wrap_images"),
                $slideLi = $slideUl.find("li"),
                $slideImg = $slideLi.find("img"),
                len = $slideLi.length,
                $slideCheckboxli = $(".slide_wrap_checkbox li"),
                left = $slideLi.width(),
                timer1, timer2;
            adjustWidthAndLeft();

            //浏览器大小变化时如果left>790改变li元素定位的left值；
            window.onresize = function() {
                    adjustWidthAndLeft();
                    $slideUl.stop(true);
                    clearTimeout(timer1);
                    clearTimeout(timer2);
                    $slideUl.animate({ "left": 0 }, 1000, function() {
                        $slideCheckboxli.removeClass("checked");
                        $slideCheckboxli[0].classList.add("checked");
                        timer1 = setTimeout(function() {
                            autoSlide();
                        }, 3000); //延时触发
                    })

                } //onresize;

            // 通过li的width来改变图片的宽度和li的left值；
            function adjustWidthAndLeft() {
                left = $slideLi.width();
                for (var i = 0; i < len; i++) {
                    $slideLi[i].style.left = left * i + "px";
                    $slideImg.width(left);

                }
            }

            //通过checkbox的选中项来改变ul的left值；
            function checkToSlide() {
                var index = $slideCheckboxli.filter("[class=checked]").attr("idx");
                $slideUl.animate({ "left": left * (1 - index) }, 600, function() {
                    timer2 = setTimeout(function() {
                        autoSlide();
                    }, 10000);

                });
            }

            // 抽象出commonAnimate函数；
            function commonAnimate(step, speed, index, fn) {
                $slideUl.animate({ "left": step }, speed, function() {
                    $slideCheckboxli.removeClass("checked");
                    $slideCheckboxli[index].classList.add("checked");
                    timer1 = setTimeout(function() { fn(); }, 3000);
                })
            }

            // 自动滑动；
            function autoSlide() {
                if (!$slideUl.is(":animated")) {
                    clearTimeout(timer2);
                    clearTimeout(timer1);
                    var totalLeft = parseFloat($slideUl.css("left")),
                        index = Math.ceil(Math.abs(totalLeft / left));
                    $slideCheckboxli.removeClass("checked");
                    $slideCheckboxli[index].classList.add("checked");
                    if (totalLeft < left * (-3))
                        commonAnimate(0, 600, 0, autoSlide);
                    else
                        commonAnimate("-=" + left, 600, index + 1, autoSlide);
                }
            };

            $slideCheckboxli.click(function(e) {
                e.preventDefault();
                $slideUl.stop(true);
                clearTimeout(timer1);
                clearTimeout(timer2);
                $slideCheckboxli.removeClass("checked");
                $(this).addClass("checked");
                checkToSlide();
                return false;
            });

            autoSlide();


        }) //$(document).ready();

})(jQuery);
