
"use strict"
var logout = logout ||{}
logout=(()=>{
	const WHEN_ERR = '호출하는 login 페이지가 없음'
	let context, js;
	let mainHomejs,loginjs

    let init = () => {
        context = $.ctx()
		js = $.js()
		mainHomejs= js+'/cmm/mainHome.js'
		loginjs = js + '/user/login.js'
	
	}
	let onCreate=()=>{
		init()
		$.when(
			 $.getScript(loginjs),

		).done(()=>{
			setContentView()
			
		}).fail(()=>{
			alert(WHEN_ERR)
		})
	}
	let setContentView=()=>{
			logout()
		
	}
	let logout=()=>{
	sessionStorage.setItem('uname', null);
	sessionStorage.setItem('nickname', null);
	sessionStorage.setItem('uid', null);
	sessionStorage.setItem('pwd', null);
	sessionStorage.setItem('tel', null);
	sessionStorage.setItem('birth',null);
	sessionStorage.setItem('pettype', null);
	$('#btnspace').html('<a id="login_btn" href="#"  class="btn_1 d-none d-lg-block" style="border-radius:3px;">Login</a>')
	.click(e=>{
            e.preventDefault
              login.onCreate()
        })

	}
	
	return{onCreate}
})()