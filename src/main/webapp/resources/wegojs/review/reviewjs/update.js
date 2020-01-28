var update = update || {}
update = (() => {
	let context, js;
	let init = () => {
		context = $.ctx()
		js = $.js()

	}
	let onCreate = x => {
		console.log(x)
		alert('온' + x[1])
		init();
		$.when(

		).done(() => {
			setContentView(x)

		}).fail(() => {

		})
	}
	let setContentView = x => {
		$('#reviewbody').empty()
		$.each(x, (i, j) => {
			$(`<div style="display: block; padding-top:20px; padding-right: 17px; width: 70%; text-align: center; border: solid #d4d4d4;">
              	 제목: <input id = "updatetitle"type="text" style= "width: 70%;"></input>
                  
              <div id ="imgspace" style= "height: 100px;"><img class="img-fluid d-block mx-auto" src=${j.img} alt=""></div>
			  
			<div> 내용:<textarea id = "updatecontent"  style= "width: 70%;"  cols="20" rows="10"></textarea> </div>
			  <button id="updatebtn" class="btn btn-primary" data-dismiss="modal" type="button"> 수정 </button>
              </div>`).appendTo('#reviewbody')
		})
		update(x)
	}

	let update = x => {
		alert(x.title)
		let artseq 
		$.each(x, (i, j) => {
			$('#updatetitle').val(j.title)
			$('#updatecontent').val(j.content)
			artseq = j.artseq
		})
		$('#updatebtn').click(e => {
			e.preventDefault()
			let json = {
				artseq: artseq,
				title: $('#updatetitle').val(),			
				content:$('#updatecontent').val(),	
			}
			$.ajax({
				url: `${context}/review/update/${artseq}`,
				type: 'POST',
				data: JSON.stringify(json),
				dataType: 'json',
				contentType: 'application/json',
				success: d => {
					alert('수정')
					$('#reviewbody').html(`<h6>성공적으로 수정되었습니다</h6>`)
				},
				error: e => {alert('실패 ') }
			})

		})

	}








	return { onCreate }

})();