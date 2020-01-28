var review = review || {};
review = (() => {
    const WHEN_ERR = '호출하는 리뷰 js를 찾을 수 없습니다 .'
    let context, js;
    let mainVuejs, detail, writejs, search, updatejs;
    let reviewmainvue, detailvue;
    let init = () => {
        context = $.ctx()
        js = $.js()

        reviewmainvue = js + '/review/vue/main_vue.js'
        detailvue = js + '/review/vue/detail_vue.js'
        mainVuejs = js + '/vue/mainVue.js'
        detail = js + '/review/vue/detail_vue.js'
        search = js + '/review/vue/search_vue.js'
        writejs = js + '/review/reviewjs/write.js'
        updatejs = js + '/review/reviewjs/update.js'

    }
    let onCreate = () => {
        init();
        $.when(
            $.getScript(mainVuejs),
            $.getScript(detail),
            $.getScript(detailvue),
            $.getScript(writejs),
            $.getScript(updatejs),
            $.getScript(search),
            $.getScript(reviewmainvue)

        ).done(() => {
            setContentView()


            movewrite()
            movesearch()
            make()
            crw()





        }).fail(() => {
            alert(WHEN_ERR)
        })
    }
    let setContentView = () => {
        $('#mainbody').empty()
        $(main_vue.review()).appendTo('#mainbody')
        if (sessionStorage.getItem('uid') != null) {
            $(`<div style="padding-bottom: 20px;" >
              <button id = "gowrite" class="button rounded-0 primary-bg text-white w-100 btn_1" >Write</button>
             </div>`).appendTo('#writebtnspace')
        }
        recent_list({ pageNo: 1 })
        scroll()
        $(main_vue.head()).appendTo('head')
    }


    let scroll = () => {
        let count = 1;
        $(window).on('scroll.one', () => {
            if ($(document).height() - $(this).height() - 100 < $(this).scrollTop()) {
                count++;
                recent_list({ pageNo: count })
            }
        })
    }



    let recent_list = x => {

        $.getJSON(context + '/review/list/' + x.pageNo, d => {

            $.each(d.review, (i, j) => {
                $(`<div class="col-md-4 col-sm-6 portfolio-item">
          <a class="portfolio-link" data-toggle="modal" href="#portfolioModal2">
            <div id="id${j.artseq}" class="portfolio-hover">
              <div class="portfolio-hover-content">
                <i class="fas fa-plus fa-3x"></i>
              </div>
            </div>
            <img style="width:100%;"class="img-fluid" src=${j.img} alt="">
          </a>
          <div class="portfolio-caption">
            <h4>${j.title}</h4>
          </div>
        </div>`).appendTo('#reviewbody')
                $('#id' + j.artseq).click(e => {
                    e.preventDefault()
                    $('html').scrollTop(0);
                    $('#reviewbody').empty()
                    $(detail_vue.detail(j)).appendTo('#reviewbody')


                    $(`<p class="item-intro text-muted">작성자 : ${j.uid} 님</p>`).appendTo('#writerid')
                    if (sessionStorage.getItem('uid') != null) {
                        $(`<a id = "commentbtn"href="#" class="genric-btn primary small" style="width:100%">댓글달기</a>`)
                            .appendTo('#commentbtnspace')
                    }

                    if (sessionStorage.getItem('uid') == j.uid) {
                        $(`<button id = "contentupdate" >수정</button><button id = "contentdelete" >삭제</button>`)
                            .appendTo('#reviewbtnspace')
                    }
                    $('#contentupdate').click(e => {
                        e.preventDefault()
                        // update.onCreate({artseq : j.artseq},{title : j.title},{content : j.content},{img : j.img})
                        update.onCreate([{ artseq: j.artseq, title: j.title, content: j.content, img: j.img }])
                    })
                    $('#contentdelete').click(e => {
                        e.preventDefault()
                        deletecontent(j.artseq)
                    })


                    $.getJSON(context + `/review/comment/${j.artseq}`, d => {

                        $.each(d.comment, (i, j) => {
                            console.log('코멘트아이디 '+j.uid)
                            console.log('세션아이디 '+sessionStorage.getItem('uid'))
                            if (d.comment != null) {
                                $(`<div  style=" display: flex; "id="commentspace${j.commentno}"><p>${j.comments}</p></div>`).appendTo('#commentspace')
                                if (sessionStorage.getItem('uid') == j.uid) {
                                    $(`<div id = "commentdelete" style="width:30px;height:15px;margin-left: 10px;" >x</div>`)
                                        .appendTo(`#commentspace${j.commentno}`)
                                }
                            }
                            $('#commentdelete').click(e => {
                                e.preventDefault()
                                $('#reviewbody').html(`<h6>리뷰가 성공적으로 삭제되었습니다</h6>`)
                                $.getJSON(`${context}/review/comment/delete/${j.commentno}/`, d => { })
                            })
                        })
                    })

                    $('#commentbtn').click(e => {
                        e.preventDefault()
                        comment(j.artseq)
                    })

                    $.getJSON(context + `/review/likeimg/${j.artseq}/${sessionStorage.getItem('uid')}`, d => {
                        alert('라이크 ' + d.likecheck)
                        if (d.likecheck == 0) {
                            $('#heart').attr('src', '/web/resources/wegoimg/reviewimg/beforeheart.png')
                        } else if (d.likecheck == null) {
                            $('#heart').attr('src', '/web/resources/wegoimg/reviewimg/beforeheart.png')
                        } else if (d.likecheck == 1) {
                            $('#heart').attr('src', '/web/resources/wegoimg/reviewimg/afterheart.png')
                        }

                    })
                    if (sessionStorage.getItem('uid') != null) {
                        $('#likebtn').on("click", function (e) {
                            $(this).find(">img").attr("src", function (index, attr) {
                                if (attr.match('beforeheart')) {
                                    return attr.replace("beforeheart.png", "afterheart.png")
                                } else {
                                    return attr.replace("afterheart.png", "beforeheart.png")
                                }
                            })
                            like(j.artseq)
                        })
                    }


                    $(window).unbind('scroll.one');
                })

            })

        })


    }
    let deletecontent = x => {
        alert('삭제')
        $('#reviewbody').html(`<h6>성공적으로 삭제되었습니다</h6>`)
        $.getJSON(`${context}/review/delete/${x}/`, d => { })
    }

    let like = x => {
        $.getJSON(`${context}/review/like/${x}/${sessionStorage.getItem('uid')}`, d => {
            $('#likecount').html(`<h6 id ="likecount">${d.count}개</h6>`)
        })
    }


    let comment = x => {
        alert('시퀀스값' + x)
        let json = {
            comments: $('#writecomment').val(),
            artseq: x,
            uid: sessionStorage.getItem('uid')
        }
        $.ajax({
            url: `${context}/review/${x}/comment`,
            type: 'POST',
            data: JSON.stringify(json),
            dataType: 'json',
            contentType: 'application/json',
            success: d => {
                alert('댓글달')
                $('#reviewbody').empty()
                recent_list({ pageNo: 1 })


            },
            error: e => { }
        })
    }



    let movewrite = () => {
        $('#gowrite').click(e => {
            e.preventDefault()
            write.onCreate()

        })
    }

    let movesearch = () => {
        $('#searchbtn').click(e => {
            e.preventDefault()

            $.getJSON(context + '/review/search/' + $('#searchword').val(), d => {
                alert('서치 ' + d.title)
                $('#reviewbody').empty()
                $.each(d, (i, j) => {
                    $(`<div class="col-md-4 col-sm-6 portfolio-item">
                    <a class="portfolio-link" data-toggle="modal" href="#portfolioModal2">
                        <div id="id${i}" class="portfolio-hover">
                        <div class="portfolio-hover-content">
                            <i class="fas fa-plus fa-3x"></i>
                        </div>
                        </div>
                        <img style="width:100%;"class="img-fluid" src=${j.img} alt="">
                    </a>
                    <div class="portfolio-caption">
                        <h4>${j.title}</h4>
                    </div>
                    </div>`).appendTo('#reviewbody')
                    $('#id' + i).click(e => {
                        e.preventDefault()
                        alert('디테일')
                        $('#reviewbody').empty()

                        $(`<div style="display: block; padding-right: 17px; width: 70%; text-align: center; border: solid #d4d4d4;">
                            <h2 class="text-uppercase">${j.title}</h2>
                        <p class="item-intro text-muted">Lorem ipsum dolor sit amet consectetur.</p>
                        <img class="img-fluid d-block mx-auto" src=${j.img} alt="">
                        <p>${j.content}</p>           
                        <div style=" padding-left: 10px;">
                            <input type="text" style="width:100%" />
                            <a href="#" class="genric-btn primary small" style="width:100%">댓글달기</a>
                        </div>
                        <div style="text-align: initial; padding-left: 15px; padding-top: 9px; padding-bottom: 10px;">
                            <li>a;lkdsjflakhgi;law</li>
                            <li>ahgl;aksgk;lsadghlksadghs</li>
                            <li>aldjghlaskdjhgljksadghsadkjgh</li>
                        </div>                
                        </div>`).appendTo('#reviewbody')

                    })
                    $(window).unbind('scroll.one');
                })



            })



        })
    }



    let make = () => {
        $('#create').click(() => {
            $.getJSON(context + '/review/create/table', d => {
                alert("성공!!" + d.msg)
            })
        })
        $('#createlike').click(() => {
            $.getJSON(context + '/review/create/tablelike', d => {
                alert("성공!!" + d.msg)
            })
        })
        $('#createcomment').click(() => {
            $.getJSON(context + '/review/create/tablecomment', d => {
                alert("성공!!" + d.msg)
            })
        })

    }

    let crw = () => {
        $('#crawling').click(() => {
            $.getJSON(context + '/review/crawler', d => {
                alert("성공!!")
            })
        })
    }


    return { onCreate }

})()