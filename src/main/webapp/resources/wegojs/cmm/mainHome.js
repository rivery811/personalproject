"use strict";
var mainHome = mainHome || {};
mainHome = (() => {
    const WHEN_ERR = '호출하는 mainHome js를 찾을 수 없습니다 .'
    let context, js;
    let routerjs,mainVuejs; //메인
    let crewjs,introjs,mapjs; //crew
    let reviewjs; // review
    let loginjs,mypagejs,userjoinjs,logoutjs;


    let init = () => {
        context = $.ctx()
        js = $.js()
        routerjs = js + '/cmm/router.js'
      	mainVuejs = js +'/vue/mainVue.js'
        crewjs = js +'/crew/js/crew.js'
        introjs=js+'/crew/js/intro.js'
        mapjs =js+'/crew/js/map.js'
        reviewjs = js +'/review/reviewjs/review.js'
        loginjs = js + '/user/login.js'
        logoutjs = js + '/user/logout.js'
        mypagejs = js + '/user/mypage.js'
        userjoinjs = js + '/user/userjoin.js'

    }
    let onCreate = () => {
        init()
        $.when(
            $.getScript(mainVuejs),
            $.getScript(routerjs),
            $.getScript(crewjs),
            $.getScript(introjs),
            $.getScript(mapjs),
            $.getScript(reviewjs),
            $.getScript(loginjs),
            $.getScript(logoutjs),
            $.getScript(mypagejs),

        ).done(() => {
            setContentView()
            btnVowel()
            
            
        }).fail(() => {
            alert(WHEN_ERR)
        })
    }
    let setContentView = () => {
        let x = {css:$.css(),img:$.img()}
        $('body').html(mainVue.main_navi(x))
             .append(mainVue.main_body(x))
             .append(mainVue.main_footer(x)) 
        if(sessionStorage.getItem('uid')!= null){
            $('<a id="logout_btn" href="#"  class="btn_1 d-none d-lg-block" style=" border-radius:3px;">Logout</a>')
				.appendTo('#btnspace')
        }else if(sessionStorage.getItem('uid')== null){       
			$('#btnspace').html('<a id="login_btn" href="#"  class="btn_1 d-none d-lg-block" style=" border-radius:3px;">Login</a>')
        }
           
    }

    let btnVowel =()=>{
            $('#introduce').click(e=>{
                e.preventDefault()
                intro.onCreate()
                $('html').scrollTop(0);
            })
              
        $('#crewid').click(e=>{
            e.preventDefault()
            crew.onCreate()
               $('html').scrollTop(0);
        })
        
        $('#tourismgo').click(e=>{
            e.preventDefault()
            map.onCreate()
               $('html').scrollTop(0);
        })
        $('#reviewgo').click(e=>{
            e.preventDefault()
            review.onCreate()
               $('html').scrollTop(0);
        })
        $('#mypage_btn').click(e=>{
            e.preventDefault()
             mypage.onCreate()
              $('html').scrollTop(0);
        })
        $('#login_btn').click(e=>{
            e.preventDefault
              login.onCreate()
              $('html').scrollTop(0);
        })
        $('#logout_btn').click(e=>{
            e.preventDefault
              logout.onCreate()
              $('html').scrollTop(0);
        })
        $('#join_btn').click(e=>{
            e.preventDefault
             userjoin.onCreate()
              $('html').scrollTop(0);
        })

    }


    return { onCreate }

})();