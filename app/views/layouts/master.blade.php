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
    <meta name="description" content="CoderHunt helps you find the best coders locally.">
    <meta name="viewport" content="width=device-width">
    <meta property="og:image" 
    content="{{ isset($og_image) ? $og_image : asset('images/devs/favicon-7.png') }}" />

    <!-- CSS -->
    {{ HTML::style('css/bootstrap.min.css')}}
    {{ HTML::style('css/bootstrap-fileupload.css')}}
    {{ HTML::style('jqueryui/css/jquery-ui-1.10.3.custom.min.css') }}
    {{ HTML::style('css/jquery-ui-timepicker-addon.css') }}
    {{ HTML::style('font-awesome/css/font-awesome.css') }}

    <!-- Leaflet CSS -->
    {{ HTML::style('leaflet/leaflet.css') }}
    {{ HTML::style('leaflet_label/leaflet.label.css') }}
    {{ HTML::style('leaflet_mc/default.css') }}
    {{ HTML::style('leaflet_mc/mc.css') }}
    {{ HTML::style('leaflet_lc/locate.css') }}
    {{ HTML::style('leaflet_lc/locate.0.5.css') }}
    {{ HTML::style('leaflet_lc/locate.ie.css') }}

    <!-- Joyride JS CSS-->
    {{ HTML::style('joyridejs/joyride-2.1.css') }}

    <!-- Custom CSS for all pages -->
    {{ HTML::style('css/general.css')}}

    <!-- Custom CSS for specific pages-->
    @yield('css')

    <!-- modernizr JS -->
    {{ HTML::script('js/modernizr-2.6.2.min.js') }}

    <!-- Images -->
    <link rel="apple-touch-icon-precomposed" sizes="144x144" href="{{ asset('images/apple-touch-icon-144-precomposed.png') }}">
    <link rel="apple-touch-icon-precomposed" sizes="114x114" href="{{ asset('images/apple-touch-icon-114-precomposed.png') }}">
    <link rel="apple-touch-icon-precomposed" sizes="72x72" href="{{ asset('images/apple-touch-icon-72-precomposed.png') }}">
    <link rel="apple-touch-icon-precomposed" href="{{ asset('images/apple-touch-icon-57-precomposed.png') }}">

    <!-- ICO -->
    <link rel="shortcut icon" href="{{ asset('images/devs/favicon-7.png') }}">

    @include('partials.matrix')

</head>
<body>
    <!--[if IE]>
         <h4>Please download <a href="http://www.google.com/chrome/‎">Chrome</a>, <a href="http://www.mozilla.org/firefox/">Firefox</a> or <a href="http://www.apple.com/safari/‎">Safari</a> browser to get the best of this site. </h4>
    <![endif]-->
    
    <img class="social-logo hidden" 
    src="{{ isset($og_image) ? $og_image : asset('images/devs/devs.png') }}">
    
    <!-- Wrapper -->
    <div class="_wrapper">
        
        <div class="_middle">

            @include('partials.header')

            @if (Session::has('message'))
                <div class="flash alert">
                    <p>{{ Session::get('message') }}</p>
                </div>
            @endif

            <!-- Notifications -->
            @include('partials.notifications')
            <!-- ./ notifications -->
            
            <!-- Content -->
            @yield('content')
            <!-- ./ content -->


            <div class="fb-like" id="fblike" data-href="http://thedevs.org" data-send="false" 
            data-width="450" data-show-faces="false"></div>

            @include('partials.footer')
            
        </div>
        <!-- ./ middle stuff -->


        @include('partials.modals')
        <img class="preload hidden" alt="Loading..."  src="{{ asset('images/loadingbar.gif') }}">
        <!-- <img class="saveloader" alt="Loading..."  src="{{ asset('images/loading-bar.gif') }}"> -->
    </div>
     <!-- Joyride js Demo Order -->
    <ol id="demo" style="display:none" data-joyride> 
    
      <!-- This tip will be display as a modal -->
      <li><h3>Welcome to CoderHunt</h3></li>
      <li data-class="devs" data-options="tipLocation:right"><h3>
        Awesome and Proffessional Dev Profiles from all over the world...</h3></li>
      <li data-class="projects" data-options="tipLocation:right"><h3>
        List your Projects beautifully under your Profile...</h3></li>
      <li data-class="stories" data-options="tipLocation:right"><h3>
        Tell us Interesting Stories about your Journey in Tech...</h3></li>
      <li data-class="orgs" data-options="tipLocation:right"><h3>
        Do you know a Tech Organisation that is not in the map? Pin It!</h3></li>
      <li data-class="eventts" data-options="tipLocation:right" data-button="OK"><h3>
        Give us 411 about some interesting Tech Events around you!</h3></li>
        
      <li data-button="X"><h3>Join and Create with us Today :)</h3></li>

    </ol>
    
    <!-- Contact Us Sidebar -->
    <div class="slide-out-div">
        <a class="handle" href="http://link-for-non-js-users.html">Content</a>
        <h3>Contact me</h3>
        <p><a href="https://twitter.com/intent/tweet?&screen_name=techytimo&hashtags=thedevsorg" target="_blank">
        @techytimo</a></p>
        <p>techytimo@gmail.com</p>
        <p>+254711451409</p>
    </div>

</body>


    <!-- jQuery -->
    {{ HTML::script('js/jquery.min.js') }}
    {{ HTML::script('jqueryui/js/jquery-ui-1.10.3.custom.min.js') }}
    {{ HTML::script('js/jquery-ui-timepicker-addon.js') }}
    {{ HTML::script('js/jquery-ui-sliderAccess.js') }}
    {{ HTML::script('js/jquery.pulse.min.js') }}
    {{ HTML::script('js/jquery.nicescroll.js') }}

    <!-- Libs -->
    {{ HTML::script('js/plugins.js') }}
    {{ HTML::script('js/bootstrap.min.js') }}
    {{ HTML::script('js/bootstrap-confirmation.js') }}
    {{ HTML::script('js/bootstrap-fileupload.js') }}
    {{--! HTML::script('js/underscore.js') --}}
    {{--! HTML::script('js/backbone.js') --}}

    <!-- Joyride JS-->
    {{ HTML::script('joyridejs/jquery.joyride-2.1.js') }}

    <!-- Masonry JS-->
    {{ HTML::script('js/masonry.pkgd.min.js') }}
    {{ HTML::script('js/imagesloaded.pkgd.js') }}

    <!-- Leaflet JS -->
    {{ HTML::script('leaflet/leaflet.js') }}
    {{ HTML::script('leaflet_label/leaflet.label.js') }}
    {{ HTML::script('leaflet_mc/mc.js') }}
    {{ HTML::script('leaflet_mc/mc-src.js') }}
    {{ HTML::script('leaflet_lc/locate.js') }}

    <!-- tinymce rich editor -->
    {{ HTML::script('tinymce/tinymce.min.js') }}

    <!-- Sidebar JS-->
    {{ HTML::script('js/jquery.tabSlideOut.v1.3.js') }}

    <!-- AddThis Smart Layers -->
    {{ HTML::script('//s7.addthis.com/js/300/addthis_widget.js#pubid=ra-508c2c5f4cc3850d') }}

    <!-- Inlining JS for all pages -->
    <script type="text/javascript">
        <?php if(Sentry::check()): ?>
        var user_id = "{{ Sentry::getUser()->id }}"
        <?php endif; ?>
        
        @include('partials.alljs') 
    </script>
    <!-- Inlining page-specific JS -->
    @yield('js') 
    @include('partials.ga')
        
</html>
