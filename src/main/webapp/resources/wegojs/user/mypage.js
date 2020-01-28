"use strict"
var mypage = mypage || {}
mypage = (() => {
	const WHEN_ERR = '호출하는 mypage 페이지가 없음'
	let context, js;
	let mainVuejs, mypagevuejs, mainHomejs, routerjs, userupdatevue,detailvue;

	let init = () => {
		context = $.ctx()
		js = $.js()
		mypagevuejs = js + '/uservue/mypage_vue.js'
		userupdatevue = js + '/uservue/userupdate.js'
		detailvue = js + '/review/vue/detail_vue.js'

	}
	let onCreate = () => {
		init()
		$.when(

			$.getScript(mypagevuejs),
			$.getScript(userupdatevue),
			$.getScript(detailvue),

		).done(() => {
			setContentView()
			godelete()
			gochange()
			golist()

		}).fail(() => {
			alert(WHEN_ERR)
		})
	}
	let setContentView = () => {
		gomypage()
	}
	let godelete = () => {
		$('#delete_btn').click(() => {

			deleteinfo.onCreate()
		})
	}
	let gochange = () => {
		$('#change_btn').click(() => {
			let x = {
				uid: sessionStorage.getItem('uid'),
				pwd: sessionStorage.getItem('pwd'),
				uname: sessionStorage.getItem('uname'),
				nickname: sessionStorage.getItem('nickname'),
				birth: sessionStorage.getItem('birth'),
				tel: sessionStorage.getItem('tel'),
				pettype: sessionStorage.getItem('pettype')
			}
			alert('여기')
			alert(x.pwd)
			$(`#mainbody`).html(userupdate.update_body(x))
			$('#userupdatebtn').click(e => {
				e.preventDefault()
				let json = {
					uid: sessionStorage.getItem('uid'),
					pwd: sessionStorage.getItem('pwd'),
					uname: $('#unameupdate').val(),
					nickname: $('#nicknameupdate').val(),
					birth: $('#birthupdate').val(),
					tel: $('#userPhoneupdate').val(),
					pettype: $('#pettypeupdate').val()

				}
				$.ajax({
					url: `${context}/user/update`,
					type: 'POST',
					data: JSON.stringify(json),
					dataType: 'json',
					contentType: 'application/json',
					success: d => {
						alert('update')
						$(`#mainbody`).html(mypage_vue.mypage_body(d.user))


					},
					error: e => { }
				})
			})
		})
	}
	let golist = () => {
		$('#listhost_btn').click(() => {
			$('#mainbody').empty()
			$(`<div style="padding-bottom: 30px;">
			<div style="width:60%;    margin: auto;">
						<div class="my-3 p-3 bg-white rounded box-shadow" >
					<h3 class="border-bottom border-gray pb-2 mb-0">Recent updates</h3>
					<div class="media text-muted pt-2">
					<div id="mytitlespace" style="width:100%;"  >

					</div>       
					</div>
					</div>
					</div>
				</div>`).appendTo('#mainbody')
			$.getJSON(context + '/user/list/' +sessionStorage.getItem('uid'), d => {
				
				$.each(d.list, (i, j) => {
					$(`<div id = "id${i}" style="width: 95%;margin: auto;border: solid lightgray 1px;padding-left: 10px;padding-top: 10px;padding-bottom: 10px;">
					<strong class="d-block text-gray-dark">제목 : ${j.title}</strong>			
					<p >${j.content}</p></div>`)
					.appendTo('#mytitlespace')
					 $(`#id${i}`).click(e => {
						  e.preventDefault()
						    $('#mainbody').empty()
						   $(detail_vue.detail(j)).appendTo('#mainbody')
						   .css({margin:'auto'},{'margin-bottom': '30px'})
							 $(`<button id = "contentupdate" >수정</button><button id = "contentdelete" >삭제</button>`)
                            .appendTo('#reviewbtnspace')
                    
					 })

				})
			})



		})
	}
	let gomypage = () => {
		let x = {
			uid: sessionStorage.getItem('uid'),
			uname: sessionStorage.getItem('uname'),
			nickname: sessionStorage.getItem('nickname'),
			birth: sessionStorage.getItem('birth'),
			tel: sessionStorage.getItem('tel'),
			pettype: sessionStorage.getItem('pettype')
		}
		alert(x.uid + x.uname + x.tel)
		$(`#mainbody`).html(mypage_vue.mypage_body(x))

	}




	return { onCreate }
})()