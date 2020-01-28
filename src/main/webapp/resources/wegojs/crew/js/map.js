"use strict"
var map = map || {}
map = (() => {
    const WHEN_ERR = '찾는 mapjs를 호출할수 없스니다.'
    let context, js;
    let mapVuejs;
    let init = () => {
        context = $.ctx()
        js = $.js()
        mapVuejs = js + '/crew/vue/mapVue.js'
    }
    let onCreate = () => {
        init()
        	$.when(
				$.getScript(mapVuejs),
			).done(()=>{
				setContentView()
				 mapVuefun()
                mapsDBinsert()
                heartFun()
                createTour()
                insertTour()
                goMapD()
                tourList()
			}).fail(()=>{
				alert(WHEN_ERR)
			})
    }
    let setContentView=()=>{
        $('#mainbody').html(mapVue.mapVue_body())
    }
    let heartFun=()=>{
		$('#heart1').on("click",function(){
			
			let $this = $(this);
			$this.find(">img").attr("src", function(index, attr) {
				if(attr.match=='beforeheart'){
					return attr.replace("beforeheart.png","afterheart.png")
				}else {
					return attr.replace("afterheart.png", "beforeheart.png")
				}
			})
		})
		}
	let createTour=()=>{
		$('#createtourizm').click(()=>{
			$.getJSON(context+'/tourizm/create/table',d=>{
				
			})
		})
	}
	let insertTour=()=>{
		$('#dummy').click(()=>{
			$.getJSON(context+'/tourizm/insert/dummy',d=>{
				
			})
		})
	}
	let goMapD = () => {
		$('#mapD_btn').click(() => {
				 let arr = []
				let places = []
			     $('input[name="place"]:checked').each(function (i) {
                places.push($(this).val());
            });
            $.each(places, (i, j) => {
                arr.push({ place: j })
            })
			mapD.onCreate(arr)
		})
	}
	let tourList=()=>{
		
		$.getJSON(context+'/tourizm/list',d=>{
			
			let asd = d.list
			$.each(asd,(i,j)=>{
				$('<div class = "cl5" style = "margin-top: 2%;'+
					'                              margin-left: 1%;'+
					'                              box-sizing: border-box;'+
					'                          border: 1px solid black;'+
					'                          width : 32%;'+
					'                          height : 25.8%;'+
					'                          float:left;">'+
					'                        <div class = "climg1" style = "width: 100%;'+
					'                                    height : 60%;'+
					'                                    position: relative;">'+
					'                                    <img style="position : absolute;'+
					'										top: 2px;'+
					'										width: 95%; '+
					'										height: 100%; '+
					'										display: block; '+
					'										transform: translate(-50%, 0);" '+
					'										src = "'+j.IMG+'">'+
					'                                    </div>'+
					'                                    <div  style = "margin-top:3px; margin-left:3px;"><input type="checkbox" name="place" value="'+j.PLACE+'"></div>'+
					'                        <div class = "tx1" style = "position: relative; margin-left:3px;">'+j.PLACE+' '+
					'                              <div class="heart"  style="position: absolute;'+
					'                                                	right : 1px;'+
					'                                                	top : 0px;'+
					'                                                	width : 40px;'+
					'                                                	height : 80px;">'+
					'                                    <button id = "heart1" style ="height:45px; width:45px; background : none; border: none; float : right;">'+
					'                                    <img src = "/web/resources/wegoimg/tourlistimg/beforeheart.png"/></button>'+
					'                              </div>'+
					'                        </div>'+
					'                  </div>').appendTo('#tourizmbody')
			})
		})
	}
    let mapVuefun = () => {
        let mapContainer = document.getElementById('map'), 
            mapOption = {
                center: new kakao.maps.LatLng(37.5048086, 127.050147), 
                level: 3
            };

        let map = new kakao.maps.Map(mapContainer, mapOption);

        let markerPosition = new kakao.maps.LatLng(37.5048086, 127.050147);

        let marker = new kakao.maps.Marker({
            position: markerPosition
        });

        marker.setMap(map);

        let iwContent = '<div style="padding:5px;">현재 나의 위치<br></div>',
            iwPosition = new kakao.maps.LatLng(37.5048086, 127.050147); 

        let infowindow = new kakao.maps.InfoWindow({
            position: iwPosition,
            content: iwContent
        });
        infowindow.open(map, marker);
    }
  
    let mapsDBinsert = () => {
        $('#mapdb').click(e => {
            e.preventDefault
            $.getJSON(context + '/maps/map/create/', d => {
                alert("성공!!" + d.msg)

                $.getJSON(context + '/maps/insert/mapDB', d => {
                    alert("성공!!" + d.msg)
                })
            })
        })
    }
    return { onCreate }

})();