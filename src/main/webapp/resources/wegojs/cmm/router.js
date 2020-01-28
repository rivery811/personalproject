"use strict";
function Session(x) {
	sessionStorage.setItem('ctx', x);
	sessionStorage.setItem('js', x + '/resources/wegojs');
	sessionStorage.setItem('css', x + '/resource/wegocss');
	sessionStorage.setItem('img', x + '/resources/wegoimg');
	return {
		ctx: () => { return sessionStorage.getItem('ctx'); },
		js: () => { return sessionStorage.getItem('js'); },
		css: () => { return sessionStorage.getItem('css'); },
		img: () => { return sessionStorage.getItem('img'); }
	}
}
function User(s){
	sessionStorage.setItem('uname', s.uname);
	sessionStorage.setItem('nickname', s.nickname);
	sessionStorage.setItem('uid', s.uid);
	sessionStorage.setItem('pwd', s.pwd);
	sessionStorage.setItem('tel', s.tel);
	sessionStorage.setItem('birth', s.birth);
	sessionStorage.setItem('pettype', s.pettype);
   return{
		uname : () =>{return sessionStorage.getItem('uname');},
		uid : () =>{return sessionStorage.getItem('uid');},
		pwd : () =>{return sessionStorage.getItem('pwd');},
		nickname : () =>{return sessionStorage.getItem('nickname');},
		tel : () =>{return sessionStorage.getItem('tel');},
		birth : () =>{return sessionStorage.getItem('birth');},
      pettype : () =>{return sessionStorage.getItem('pettype');}
   }
}

