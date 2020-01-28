<%@ page language="java" contentType="text/html; charset=UTF-8"
    pageEncoding="UTF-8"%>
<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
<html>
<head>
<meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
<title>WeGo</title>
<script src="https://ajax.googleapis.com/ajax/libs/jquery/3.3.1/jquery.min.js"></script>
	<script type="text/javascript" src="//dapi.kakao.com/v2/maps/sdk.js?appkey=6e974eed113845f5b8126a673335477a"></script>
    <link rel="stylesheet" href="<%=application.getContextPath()%>/resources/css/bootstrap.min.css">
    <link rel="stylesheet" href="<%=application.getContextPath()%>/resources/css/animate.css">
    <link rel="stylesheet" href="<%=application.getContextPath()%>/resources/css/owl.carousel.min.css">
    <link rel="stylesheet" href="<%=application.getContextPath()%>/resources/css/themify-icons.css">
    <link rel="stylesheet" href="<%=application.getContextPath()%>/resources/css/flaticon.css">
    <link rel="stylesheet" href="<%=application.getContextPath()%>/resources/fontawesome/css/all.min.css">
    <link rel="stylesheet" href="<%=application.getContextPath()%>/resources/css/magnific-popup.css">
    <link rel="stylesheet" href="<%=application.getContextPath()%>/resources/css/gijgo.min.css">
    <link rel="stylesheet" href="<%=application.getContextPath()%>/resources/css/nice-select.css">
    <link rel="stylesheet" href="<%=application.getContextPath()%>/resources/css/slick.css">
    <link rel="stylesheet" href="<%=application.getContextPath()%>/resources/css/style.css">
  <link rel="stylesheet" href="<%=application.getContextPath()%>/resources/wegocss/crewcss/crew.css"> 
<link rel="stylesheet" href="<%=application.getContextPath()%>/resources/wegocss/login.css">
<link rel="stylesheet" href="<%=application.getContextPath()%>/resources/wegocss/changhost.css">
<link rel="stylesheet" href="<%=application.getContextPath()%>/resources/wegocss/createhost.css">
<link rel="stylesheet" href="<%=application.getContextPath()%>/resources/wegocss/tourizmstyle/star.css">
<link rel="stylesheet" href="<%=application.getContextPath()%>/resources/wegocss/tourizmstyle/tourizmimg.css">///
<link rel="stylesheet" href="https://www.w3schools.com/w3css/4/w3.css">
 <link href="<%=application.getContextPath()%>/resources/wegojs/review/css/agency.min.css" rel="stylesheet">
 <link href="<%=application.getContextPath()%>/resources/wegojs/review/vendor/fontawesome-free/css/all.min.css" rel="stylesheet" type="text/css">


 <%--  <link rel="stylesheet" href="<%=application.getContextPath()%>/resources/wegocss/crewcss/intro.css"> --%>
<script src="<%=application.getContextPath()%>/resources/wegojs/app.js"></script>
<script src="<%=application.getContextPath()%>/resources/wegojs/cmm/router.js"></script>
<script src="<%=application.getContextPath()%>/resources/wegojs/cmm/mainHome.js"></script>
<script src="<%=application.getContextPath()%>/resources/wegojs/vue/mainVue.js"></script>
<script src="<%=application.getContextPath()%>/resources/wegojs/vue/mapVue.js"></script>
<script src="<%=application.getContextPath()%>/resources/wegojs/crew/vue/crewVue.js"></script>
<script src="<%=application.getContextPath()%>/resources/wegojs/crew/vue/introVue.js"></script>
<script src="<%=application.getContextPath()%>/resources/wegojs/crew/js/intro.js"></script>
<script src="<%=application.getContextPath()%>/resources/wegojs/crew/js/map.js"></script>
<script src="<%=application.getContextPath()%>/resources/wegojs/crew/js/crew.js"></script>
<script src="<%=application.getContextPath()%>/resources/js/jquery-1.12.1.min.js"></script>
<script src="<%=application.getContextPath()%>/resources/js/popper.min.js"></script>
<script src="<%=application.getContextPath()%>/resources/js/bootstrap.min.js"></script>
<script src="<%=application.getContextPath()%>/resources/js/jquery.magnific-popup.js"></script>
<script src="<%=application.getContextPath()%>/resources/js/owl.carousel.min.js"></script>
<script src="<%=application.getContextPath()%>/resources/js/masonry.pkgd.js"></script>
<script src="<%=application.getContextPath()%>/resources/js/jquery.nice-select.min.js"></script>
<script src="<%=application.getContextPath()%>/resources/js/gijgo.min.js"></script>
<script src="<%=application.getContextPath()%>/resources/js/jquery.ajaxchimp.min.js"></script>
<script src="<%=application.getContextPath()%>/resources/js/jquery.form.js"></script>
<script src="<%=application.getContextPath()%>/resources/js/jquery.validate.min.js"></script>
<script src="<%=application.getContextPath()%>/resources/js/mail-script.js"></script>
<script src="<%=application.getContextPath()%>/resources/js/contact.js"></script>
<script src="<%=application.getContextPath()%>/resources/js/custom.js"></script>



<script src="<%=application.getContextPath()%>/resources/wegojs/review/reviewjs/review.js"></script>
<script src="<%=application.getContextPath()%>/resources/wegojs/review/vue/main_vue.js"></script>
<script src="<%=application.getContextPath()%>/resources/wegojs/review/vue/detail_vue.js"></script>
<script src="<%=application.getContextPath()%>/resources/wegojs/review/vue/write_vue.js"></script>
<script src="<%=application.getContextPath()%>/resources/wegojs/review/vue/search_vue.js"></script>


<script src="<%=application.getContextPath()%>/resources/wegojs/user/login.js"></script>
<script src="<%=application.getContextPath()%>/resources/wegojs/user/logout.js"></script>
<script src="<%=application.getContextPath()%>/resources/wegojs/uservue/login_vue.js"></script>
<script src="<%=application.getContextPath()%>/resources/wegojs/user/mypage.js"></script>
<script src="<%=application.getContextPath()%>/resources/wegojs/uservue/mypage_vue.js"></script>
<script src="<%=application.getContextPath()%>/resources/wegojs/uservue/userupdate.js"></script>


<script src="<%=application.getContextPath()%>/resources/wegojs/uservue/joinchoice_vue.js"></script>
<script src="<%=application.getContextPath()%>/resources/wegojs/user/findinfo.js"></script>
<script src="<%=application.getContextPath()%>/resources/wegojs/uservue/findinfo_vue.js"></script>
<script src="<%=application.getContextPath()%>/resources/wegojs/user/deleteinfo.js"></script>
<script src="<%=application.getContextPath()%>/resources/wegojs/uservue/deleteinfo_vue.js"></script>


<script src="<%=application.getContextPath()%>/resources/wegojs/user/userjoin.js"></script>
<script src="<%=application.getContextPath()%>/resources/wegojs/uservue/userjoin_vue.js"></script>


<script src="https://cdnjs.cloudflare.com/ajax/libs/jquery-modal/0.9.1/jquery.modal.min.js"></script>
<link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/jquery-modal/0.9.1/jquery.modal.min.css" />
<!-- 주소api -->
<script src="https://t1.daumcdn.net/mapjsapi/bundle/postcode/prod/postcode.v2.js"></script>


</head>
<body>
<script>
app.run('<%=application.getContextPath()%>')
</script>
</body>
</html>