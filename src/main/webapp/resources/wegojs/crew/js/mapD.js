"use strict"
var mapD = mapD || {}
mapD=(()=>{
	  const WHEN_ERR = '찾는 mapDjs를 호출할수 없습니니다.'
    let context, js;
    let mapDVuejs;
    let init = () => {
        context = $.ctx()
        js = $.js()
        mapDVuejs = js + '/crew/vue/mapDVue.js'
    }
	 let onCreate=arr=>{
          init()
	$.when(
				$.getScript(mapDVuejs),
			).done(()=>{
				setContentView()
				mapFun(arr)
			}).fail(()=>{
				alert(WHEN_ERR)
			})
     }
     let setContentView=()=>{
         	$('#mainbody').html(mapDVue.mapDVue_body())
			$('html').scrollTop(0)
     }
    let mapFun=arr=>{
            $.ajax({
                url: context + "/maps/place",
                type: 'POST',
                data: JSON.stringify({ 'placeList': arr }),
                dataType: 'json',
                contentType: 'application/json',
                success: d => {
                    let list = d.list
                    let splitXY = ''
                    let contents = ''
                    let latitude = ''
                    let x = ''
                    let y = ''
                    let positions = []
                    let mapContainer = document.getElementById('map'), 
                        mapOption = {
                            center: new kakao.maps.LatLng(37.5048086, 127.050147), 
                            level: 7 
                        };
                    let map = new kakao.maps.Map(mapContainer, mapOption); 
                    $.each(list, (i, j) => {
                        contents = j.place
                        latitude = j.latitude
                        splitXY = latitude.split("/")
                        x = splitXY[0]
                        y = splitXY[1]
                        positions.push({
                            content: '<div>' + contents + '</div>',
                            latlng: new kakao.maps.LatLng(y, x)
                        })
                    })
                    positions.push({
                        content: '<div>' + '현재나의 위치' + '</div>',
                        latlng: new kakao.maps.LatLng(37.5048086, 127.050147)
                    })

                    for (let i = 0; i < positions.length; i++) {
                        let marker = new kakao.maps.Marker({
                            map: map, 
                            position: positions[i].latlng, 
                        });
                   
                        let infowindow = new kakao.maps.InfoWindow({
                            content: positions[i].content 
                        });

                        kakao.maps.event.addListener(marker, 'mouseover', makeOverListener(map, marker, infowindow));
                        kakao.maps.event.addListener(marker, 'mouseout', makeOutListener(infowindow));
                    }

                    function makeOverListener(map, marker, infowindow) {
                        return function () {
                            infowindow.open(map, marker);
                        };
                    }

                    function makeOutListener(infowindow) {
                        return function () {
                            infowindow.close();
                        };
                    }
                },
                error: e => {
                    alert('실패')
                }
            })
    }

	return{onCreate}
})();