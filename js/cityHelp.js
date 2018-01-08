function titleTit() {
    var sub = document.querySelector(".sub");
    var fiveLi = document.querySelector(".five");
    var fiveSpan = document.querySelector(".five span");
    fiveLi.onmouseenter = function () {
        sub.style.display = "block";
        sub.style.borderColor = "lightgray";
        fiveSpan.style.backgroundPosition = "64px -80px"
    }
    fiveLi.onmouseleave = function () {
        sub.style.display = "none";
        fiveSpan.style.backgroundPosition = "93% -40px"
    };
}

titleTit();

$(function () {
    lunTop();
    banner();
    gotoTop();
    paging();//插入数据
    // inDian();
});

// 轮播图上的内容
function lunTop() {
    $(".content-list1:eq(0)").mouseenter(function () {
        $(".small").css("display", "block");
        $(".content-list1:eq(0) .list-li>span").css("display", "block")
    }).mouseleave(function () {
        $(".small").css("display", "none");
        $(".list-li>span").css("display", "none")
    })
    $(".content-list1:eq(1)").mouseenter(function () {
        $(".small-two").css("display", "block");
        $(".content-list1:eq(1) .list-li>span").css("display", "block")
    }).mouseleave(function () {
        $(".small-two").css("display", "none");
        $(".list-li>span").css("display", "none")
    })
    $(".content-list1:eq(2)").mouseenter(function () {
        $(".content-list1:eq(2) .small-two").css("display", "block");
        $(".content-list1:eq(2) .list-li>span").css("display", "block")
    }).mouseleave(function () {
        $(".content-list1:eq(2) .small-two").css("display", "none");
        $(".list-li>span").css("display", "none")
    })
    $(".content-list1:eq(3)").mouseenter(function () {
        $(".content-list1:eq(3) .small-two").css("display", "block");
        $(".content-list1:eq(3) .list-li>span").css("display", "block")
    }).mouseleave(function () {
        $(".content-list1:eq(3) .small-two").css("display", "none");
        $(".list-li>span").css("display", "none")
    })
}

//banner轮播图
function banner() {

    var len;
    /*加载数据*/
    $.get("imgs.json", function (data) {
        len = data.length;
        for (let i = 0; i < data.length; i++) {
            /*创建img*/
            $("<img>").attr("src", data[i]).appendTo($(".banner > div:nth-child(1)"));
            $("<li>").appendTo($(".banner > ul"))
        }
        autoPlay();
        init();
    });

    function init() {
        $(".banner").hover(function () {
            /*清除自动播放*/
            clearInterval(id);
        }, function () {
            autoPlay();
        })

        $(".banner .indicator li").mouseenter(function () {
            $(this).css("backgroundColor", "black")
                .siblings().css("backgroundColor", "#f7f7f7");
            from = to;
            to = $(".banner .indicator li").index(this);
            play(from, to);
        })
    }

    var from = -1;
    var to = 0;
    var id;

    function autoPlay() {
        id = setInterval(function () {
            from = to;
            to++;
            to = to == len ? 0 : to;
            play(from, to);  // 从下标为from的图片切换到下巴为to的图片
        }, 2000)
    }

    function play(from, to) {
        /*让下标为form的慢慢的消失, to的慢慢的出现*/
        $(".banner .banner-imgs img:eq(" + from + ")").animate({
            opacity: 0
        }, 300);
        $(".banner .banner-imgs img:eq(" + to + ")").animate({
            opacity: 1
        }, 300);
        /*改变指示器的颜色*/
        changeIndicator(to)
    }

    function changeIndicator(to) {
        $(".indicator li:eq(" + to + ")").css("backgroundColor", "black")
            .siblings().css("backgroundColor", "#f7f7f7")
    }

}


//返回顶部的效果
function gotoTop() {
    $(window).scroll(function () {//监听scroll事件，当滚动条滚动的时候触发
        var s = $(window).scrollTop();//获取当前窗口的垂直位置
        if (s > 0) {
            $(".goTo").css("display", "block")
        }
        if (s == 0) {
            $(".goTo").css("display", "none")
        }
    });
    $(".goTo").click(function () {
        $('body,html').animate({scrollTop: 0}, 300) //点击回到顶部的动画效果
    })

}


//插入数据
function paging() {
    let baseUrl = "http://tcb2018.applinzi.com/?pn=";
    let currentPage = 1; //表示当前的页面
    let currentData;//存储当前页面显示的数据
    let sortType = 1;//默认当前为默认排序，2为成交量，3为人气排名
    getData(currentPage);
    init();
    /*通过ajax 从网络获取数据*/

    //pageNum:表示传入的pn的值
    function getData(pageNum) {
        $.get(baseUrl + pageNum, function (data) {
            currentData = data; //当前的数据为获取到的数据
            analyseData(); //解析数据 ，更新DOM
        })
    }

    /*根据当前获取到的数据，把它添加到页面中*/
    function analyseData() {
        //首先清除上一页显示的内容
        $(".shop-list > div:visible").remove();

        var shopList = currentData.shop_data;
        /*对网络传来的数据做一个排序*/
        if (sortType == 2){ //此时为 成交量排名
           shopList.sort((a, b) => b.count - a.count);
        }else if(sortType == 3){ //此时为 人气排名
            shopList.sort((a,b)=>b.shop_visit - a.shop_visit)
        }

            shopList.forEach((obj) => {
                $(".shop-list-item:eq(0)").clone(true).css("display", "block").appendTo($(".shop-list"))
                    .find("img").attr("src", obj.shop_ico).next().find(".shopa").html(obj.shop_name)
                    .parent().next().html("主营：" + obj.main)
                    .next().html("地址：" + obj.addr_detail)
                    .parent().next().find(".visit").html("人气：" + obj.shop_visit)

            });

        //进入店铺效果
        function inDian() {
            $(".shop-list-item:eq(1)").mouseenter(function () {
                $(".shop-list-item:eq(1) .indian").css("display", "block")
            }).mouseleave(function () {
                $(".shop-list-item:eq(1) .indian").css("display", "none")
            })
            $(".shop-list-item:eq(2)").mouseenter(function () {
                $(".shop-list-item:eq(2) .indian").css("display", "block")
            }).mouseleave(function () {
                $(".shop-list-item:eq(2) .indian").css("display", "none")
            })
            $(".shop-list-item:eq(3)").mouseenter(function () {
                $(".shop-list-item:eq(3) .indian").css("display", "block")
            }).mouseleave(function () {
                $(".shop-list-item:eq(3) .indian").css("display", "none")
            })
            $(".shop-list-item:eq(4)").mouseenter(function () {
                $(".shop-list-item:eq(4) .indian").css("display", "block")
            }).mouseleave(function () {
                $(".shop-list-item:eq(4) .indian").css("display", "none")
            })
            $(".shop-list-item:eq(5)").mouseenter(function () {
                $(".shop-list-item:eq(5) .indian").css("display", "block")
            }).mouseleave(function () {
                $(".shop-list-item:eq(5) .indian").css("display", "none")
            })


//默认排序点击事件
            $(".main-top-sort>div:nth-child(1) a").click(function () {
                $(this).css("backgroundColor", "white").css("color", "#118855")
                    .siblings().css("backgroundColor", "#f7f7f7").css("color", "#666")
            })

        }
        inDian()
    }


    /*初始化函数: 负责给分页按钮的一些处理*/
    function init() {
        $(".pages > a").click(function () {

            /*1. 先需要加载第几页.确定 currentPage*/
            var text = $(this).html().trim();
            if (text == "首页") {
                currentPage = 1;
            } else if (text == "《 上一页") {
                currentPage--;
            } else if (text == "下一页 》") {
                currentPage++;
            } else if (text == "尾页") {
                currentPage = 99;
            } else {
                currentPage = +text;
            }
            /*2. 重新加载数据*/
            getData(currentPage);

            /*3. 处理分页按钮的样式*/
            if (currentPage >= 2) { // 大于等于2显示上一页
                $(".pages > a:eq(1)").css("display", "block");
            } else {
                $(".pages > a:eq(1)").css("display", "none");
            }
            if (currentPage >= 6) { // 大于等于6显示首页
                $(".pages > a:eq(0)").css("display", "block");
            } else {
                $(".pages > a:eq(0)").css("display", "none");
            }
            if (currentPage >= 11) { // 大于等11显示尾页
                $(".pages > a:last").css("display", "block");
            } else {
                $(".pages > a:last").css("display", "none");
            }
            if (currentPage >= 94) {  // 大于等于 94 隐藏尾页
                $(".pages > a:last").css("display", "none");
            } else {
                $(".pages > a:last").css("display", "block");
            }
            if (currentPage == 99) {  // 当时99的时候,隐藏下一页
                $(".pages > a:eq(12)").css("display", "none");
            } else {
                $(".pages > a:eq(12)").css("display", "block");
            }

            /*4. 处理页码的显示*/
            if (currentPage >= 6) {
                $(".pages > .index").each(function (i, ele) {
                    $(ele).html(currentPage - 4 + i);
                })
            } else {
                $(".pages > .index").each(function (i, ele) {
                    $(ele).html(1 + i);
                })
            }

            if (currentPage >= 94) {
                $(".pages > .index").each(function (i, ele) {
                    $(ele).html(90 + i);
                })
            }
            /*5. 处理页码的背景色*/
            $(".pages > .index").each(function (i, ele) {
                var text = $(ele).html().trim();
                if (text == currentPage) {
                    $(ele).css("backgroundColor", "#FC6621");
                } else {
                    $(ele).css("backgroundColor", "#ffffff");
                }
            });

            /*默认排序，成交量排序，人气排序*/
            $(".sort>a:eq(0)").click(()=>{sortType=1;analyseData()})
            $(".sort>a:eq(1)").click(()=>{sortType=2;analyseData()})
            $(".sort>a:eq(2)").click(()=>{sortType=3;analyseData()})

        })
    }

}




