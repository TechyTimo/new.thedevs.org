<!DOCTYPE html>
<!--[if lt IE 7]>      <html class="no-js lt-ie9 lt-ie8 lt-ie7"> <![endif]-->
<!--[if IE 7]>         <html class="no-js lt-ie9 lt-ie8"> <![endif]-->
<!--[if IE 8]>         <html class="no-js lt-ie9"> <![endif]-->
<!--[if gt IE 8]><!--> <html class="no-js"> <!--<![endif]-->
<head>
    <meta charset="utf-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge,chrome=1">
    <title>
        @section('title')
        CoderHunt
        @show
    </title>
    <meta name="description" content="">
    <meta name="viewport" content="width=device-width">

    <!-- CSS -->
<!--     <link rel="stylesheet" href="{{ asset('css/main.css')}} "> -->
    <link rel="stylesheet" href="{{ asset('css/bootstrap.min.css')}} ">
    <link rel="stylesheet" href="{{ asset('css/general.css')}} ">
    <!-- <link rel="stylesheet" href="{{ asset('css/jquery.ui.css') }}"> -->

    <!-- page-specific css-->
    @yield('css')

    <!-- modernizr JS -->
    <script src="{{ asset('js/modernizr-2.6.2.min.js') }}"></script>

    <div id="fb-root"></div>
    <script type="text/javascript">
        // (function(d, s, id) {
        //   var js, fjs = d.getElementsByTagName(s)[0];
        //   if (d.getElementById(id)) return;
        //   js = d.createElement(s); js.id = id;
        //   js.src = "//connect.facebook.net/en_US/all.js#xfbml=1&appId=320691077999812";
        //   fjs.parentNode.insertBefore(js, fjs);
        // }(document, 'script', 'facebook-jssdk'));
    </script>

    <!-- Images -->
    <link rel="apple-touch-icon-precomposed" sizes="144x144" href="{{ asset('images/apple-touch-icon-144-precomposed.png') }}">
    <link rel="apple-touch-icon-precomposed" sizes="114x114" href="{{ asset('images/apple-touch-icon-114-precomposed.png') }}">
    <link rel="apple-touch-icon-precomposed" sizes="72x72" href="{{ asset('images/apple-touch-icon-72-precomposed.png') }}">
    <link rel="apple-touch-icon-precomposed" href="{{ asset('images/apple-touch-icon-57-precomposed.png') }}">

    <!-- ICO -->
    <link rel="shortcut icon" href="favicon.ico">

    <script>
    	// (function(){
        // var uv=document.createElement('script');
        // uv.type='text/javascript';
        // uv.async=true;
        // uv.src='//widget.uservoice.com/DaBJd20KGXiNvgpEJT8A.js';
        // var s=document.getElementsByTagName('script')[0];s.parentNode.insertBefore(uv,s)})()
    </script>

</head>
<body>
    <!--[if lt IE 7]>
        <p class="chromeframe">You are using an <strong>outdated</strong> browser. Please <a href="http://browsehappy.com/">upgrade your browser</a> or <a href="http://www.google.com/chromeframe/?redirect=true">activate Google Chrome Frame</a> to improve your experience.</p>
    <![endif]-->

    <!-- Container -->
    <div class="middles container">
    	@if (Session::has('message'))
    		<div class="flash alert">
    			<p>{{ Session::get('message') }}</p>
    		</div>
    	@endif

        <!-- Content -->
        <div class="content">
            @yield('main')
        </div>
        <!-- ./ content -->

        <!-- Notifications -->
        @include('partials.notifications')
        <!-- ./ notifications -->

        <div class="fb-like" id="fblike" data-href="http://thedevs.org" data-send="false" 
        data-width="450" data-show-faces="false"></div>

    </div>
    <!-- ./ container -->
    <img class="preload" alt="Loading..."  src="{{ asset('images/loadingbar.gif') }}">
    <!-- <img class="saveloader" alt="Loading..."  src="{{ asset('images/loading-bar.gif') }}"> -->

 </body>


    <!-- jQuery -->
	<script src="js/jquery.min.js"></script>
	<script src="{{ asset('js/jquery-ui-1.10.3.custom.min.js') }}"></script>

	<script src="{{ asset('js/plugins.js') }}"></script>
	<script src="{{ asset('js/bootstrap.min.js') }}"></script>
	<script src="{{ asset('js/underscore.js') }}"></script>
	<script src="{{ asset('js/backbone.js') }}"></script>

	@yield('js') <!-- page-specific javascript-->
    @include('partials.ga')

</html>
