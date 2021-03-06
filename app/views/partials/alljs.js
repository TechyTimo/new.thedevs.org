
  loggedIn = function(){
    if(sentry_check == '1'){
      return true;
    }
    else{
      return false;
    }
  }

  $.fn.serializeObject = function() //for forms
  {
      var o = {};
      var a = this.serializeArray();
      $.each(a, function() {
          if (o[this.name] !== undefined) {
              if (!o[this.name].push) {
                  o[this.name] = [o[this.name]];
              }
              o[this.name].push(this.value || '');
          } else {
              o[this.name] = this.value || '';
          }
      });
      return o;
  };

  isMain = function(){
    if($.inArray(_path, ['.', 'devs', 'orgs', 'eventts', 'projects', 'stories']) > -1){
      return true
    }
    return false
  }

  clickLogger = function(){
    $(document).bind('click', function(e) {
      // console.log(this.className + ' clicked')
      // console.log(this)
      // console.log($(this))
      // console.log(e)
      // console.log(e.target)
      console.log('Clicked: '+e.target.tagName +'#' + e.target.id + ' .' + e.target.className)

    })
  }
    
  gitData = function(contribs){  // https://gist.github.com/remy/4654404
    var messages = [],
        total = 0, 
        d_active = 0, 
        top_day = 0, 
        streak = 0, 
        top_streak = 0, 
        inwe = false, 
        w_streak = 0,
        w_row = 0, 
        w_total = 0;
    contribs.forEach(function (c) {
      total+=c[1]; 
      if (c[1] !== 0) { //if there is a contribution on the day
        d_active++;
        streak ++;
        if (c[1] > top_day) top_day = c[1]; //breaking previous day_count record
      }else{
        if(streak > top_streak) top_streak = streak;
        streak = 0;
      }
      var d = new Date(c[0]).getDay(); 
      if (d === 6 || d === 7) {
        inwe = true;
        if (c[1] !== 0) {
          w_total++; 
          w_streak++;
          if (w_streak > w_row) w_row = w_streak;
        } else {
          w_streak = 0;
        }
      } else {
        inwe = false;
      }
    });

    // if (w_row > 2) console.log('Take a break. Have a kitkat')
    messages.push(total+' Commits. ')
    messages.push('Active Days: '+d_active+ '/365. ')
    messages.push('Longest Streak: '+top_streak+ ' days.')
    messages.push('Peak: '+ top_day + ' Commits/Day.')
    messages.push('Weekends: '+w_total + '/52.')
    messages.push('Weekends in a row: ' + w_row) 
    return messages
  }


    //   function random_hover_color() {
  //       var letters = '0123456789ABCDEF'.split('');
  //       var color = '#';
  //       for (var i = 0; i < 6; i++ ) {
  //           color += letters[Math.round(Math.random() * 15)];
  //       }
  //       // var colors_array = ['#ff0000', '#00ff00', '#0000ff'];
  //       // var color = colors_array[Math.floor(Math.random() * colors.length)];
  //       $(this).on('hover', function(){
  //         $(this).css('color', color);
  //       })
  //   }
  // $('._pink2aqua').random_hover_color();


  _alert = function(msg){
      $('._alert').remove()
      _blinker1 = _blinker.clone();
      _blinker1.appendTo('._alerts')
      _blinker1.append(msg)

      $('._alert._data').css('display', 'inline-block')
      $('._alert._bg-pink').css('display', 'block')
      $('._dismiss').click(function(){
        $('._alert').remove()
      })

      $('html,body').animate({
       scrollTop: $("#_alert").position().top -5
      }, 500);

      $('._alert').pulse(
        {
          backgroundColor : '#55ffAA',
          color           : '#333'
        },
        {
          returnDelay : 200,
          interval    : 500,
          pulses      : 5
        }
      );

      setTimeout(function(){
        _height = parseInt($('._alert').css('height'))
        $('._alert._bg-pink').css('margin-top', -_height+'px')
      }, 1000)
      
      setTimeout(function(){
        // $('._alert').fadeOut(1000)
      }, 20000)
  }

  loadMap = function(_div, _path){
    // console.log('Loading map for: ' + _path)
    myIcon = L.icon({ // needs to be initialized globally so that it can be referred
      iconUrl: pin_pink,
      iconSize: [20, 20],
      iconAnchor: [10, 10],
      labelAnchor: [6, 0] // as I want the label to appear 2px past the icon (10 + 2 - 6)
    });
    map = L.map(_div, { // needs to be initialized globally so that it can be referred
      scrollWheelZoom: false,
      zoomControl: true,
      attributionControl: false,
      }).setView([51.505, -0.09], 5); 

    L.tileLayer(
    // 'http://{s}.tile.cloudmade.com/5e9427487a6142f7934b07d07a967ba3/997/256/{z}/{x}/{y}.png', {
    // 'http://{s}.tile.cloudmade.com/5E9427487A6142F7934B07D07A967BA3/997/256/{z}/{x}/{y}.png', {
    // 'http://a.tiles.mapbox.com/v3/techytimo.ic27c2cm/{z}/{x}/{y}.png', {
    'http://{s}.tile.osm.org/{z}/{x}/{y}.png', {
        // attribution: '',
        maxZoom: 18,
        // noWrap: true,
        opacity: 0.5
      }).addTo(map);
    marker_cluster = new L.MarkerClusterGroup();
    lc = L.control.locate().addTo(map);
    // fetchMapData()
  }


  fetchMapData = function(){
    $.get('/'+_path+'/api/', function(ddd){ //create markers for all
    _record = ddd
      if(_record ==''){
         console.log('No _record here yet... '+ _record)
      }
      else{
        afterFetch(_record)
      }

    }).fail(function() {
      console.log('check your db bro...');
    })
  }

  domFetch = function(){
    _record = $.parseJSON($('.dd').html())
    afterFetch(_record)
  }

  afterFetch = function(_r){
    if(_r[0]){ //_r is an array of more than one json object
      // console.log('_r is an array');
      // console.log(_r);
      $.each(_r, function(key, record){
        _record = record //keeping things straight for the label
        mapRecord(record)
      })

    }
    else{
      // console.log('single _r');
      // console.log(_r);
      mapRecord(_r)
    }
  }


  mapRecord = function(_record){
    coords = _record.map;
    // console.log(_record);
    mlat = parseFloat(coords.substr(0, coords.indexOf(', ')))
    mlng = parseFloat(coords.substr(coords.indexOf(', ')+2, coords.length))
    if(_record.map == ''){
      // console.log('Map not set for '+ _record.model + _record.id)
      mlat = lat
      mlng = lng
    }
    else{
      _recordName = _record.name
      marker = L.marker([mlat, mlng], {
            icon: myIcon
            })
      var popup = L.popup()
          .setContent('<a href="/'+_record.model_path+'/'+_record.id+'">'+_recordName+'</a>')
          .openOn(marker);
      marker.bindPopup(popup)

      // marker.addTo(map);
      marker_cluster.addLayer(marker);
    }
    markersgroup.push([mlat, mlng]) //just to define where map will land
    // console.log(mlat);
    // console.log(mlng);
    setTimeout(function(){
      afterMapping()
    }, 1000)

  }

  _locate = function(){
     // window.location.pathname == '/' ? lc.locate() : true 
    // try{
      window.location.pathname == '/' ? lc.locate() : true //locate only at home
    // }
    // catch(err){
    //   if (err.code==1){
    //     console.log("User denied geolocation.");
    //   }
    //   else if(err.code==2)
    //   {
    //     console.log("Position unavailable.");
    //   }
    //   else if(err.code==3)
    //   {
    //     console.log("Timeout expired.");
    //   }
    //   else
    //   {
    //     console.log("ERROR:"+ err.message);
    //   }
    // }
  } 
  
  window.alert = function() { //preventing (geolocation) alerts
                   // run some code when the alert pops up
      // console.log('alerting about geolocation?');
      // window.alert.apply(window,arguments);
                   // run some code after the alert
      // console.log('done alerting');
      _alert('TheDevs.Org needs location. Check your location settings.');
        // On Chrome > Settings > Content settings > Location > Manage exceptions
  };

  afterMapping = function(){
    b = L.latLngBounds(markersgroup)
    lat = b.getCenter().lat
    lng = b.getCenter().lng

    if(markersgroup.length == 1) {
      map.setZoom(5)
      map.panTo([lat, lng])
      map.panBy([-100, 0]);
    }
    else{
      _locate()
      bindLabel(marker, _record)
      map.fitBounds(markersgroup)
    }
    map.addLayer(marker_cluster);

    // map.on('moveend', function(){
    //   b = map.getBounds()
    //   getNewMarkers(b)
    // });
  }

  bindLabel = function(marker, _record){
    marker.bindLabel('<a href="/'+_record.model_path+'/'+_record.id+'"> Latest '+_record.model+'</a>', { 
      //label markers
      noHide: true,
      direction: 'auto'
    })
  }

  prefillForm = function(){
    $(".createTemplate form :input").not( "input[name=_token], input[type=submit]" ).each(function(){
      this.value = LS.post[this.name]
    })
  }

  richEditor = function(){
    tinymce.init({
      selector: "textarea.rich",
      height : '200px',
      width : '100%',
      content_css : "/css/content.css",
      // theme: 'advanced',

      theme_advanced_font_sizes: "10px,12px,13px,14px,16px,18px,20px",
      font_size_style_values: "10px, 12px,13px,14px,16px,18px,20px",
      
      // ===========================================
      // INCLUDE THE PLUGIN
      // ===========================================
      
      plugins: [
        "advlist autolink lists link image charmap print preview anchor",
        "searchreplace wordcount visualblocks code fullscreen",
        "insertdatetime media table contextmenu paste jbimages"
      ],
      
      // ===========================================
      // PUT PLUGIN'S BUTTON on the toolbar
      // ===========================================
      
      toolbar: "insertfile undo redo | fontselect | fontsizeselect | alignleft aligncenter alignright alignjustify | bullist numlist outdent indent | link image jbimages emoticons preview",

      
      // ===========================================
      // SET RELATIVE_URLS to FALSE (This is required for images to display properly)
      // ===========================================
      
      relative_urls: false
      
    });
     // TinyMCE
     //datepicker
    $('#start_time, #end_time').datetimepicker({
      dateFormat: 'dd M yy',
      timeFormat: 'hh:mm tt z',
      addSliderAccess: true,
      sliderAccessArgs: { touchonly: false }
    });

    $(document).on('focusin', function(e) { //fixing focus on tinymce popup input 
      if ($(e.target).closest(".mce-window").length) {
          e.stopImmediatePropagation();
      }
    });
  }

  fetchPostForm = function(){
    //fetches and writes create form
    $.get( '/'+model+'/createpop', function(createForm) {
      // console.log(createForm);
      $('.createTemplate').html(createForm)

      $('img.preload').hide()
      // richEditor()
      setTimeout(function(){ richEditor() }, 1000);

      titl = $('.createTemplate h2').clone() // moving the title
      $('.createTemplate h2').remove()
      $('._creates .modal-title').html(titl)

      // bttn = $('.createTemplate input[type="submit"]').clone() // moving the submit button
      // $('.createTemplate input[type="submit"]').remove()
      $('._creates .modal-footer').remove() 
  
      if(LS.status == 'posting'){
        // console.log('status == posting');
        prefillForm()
      }
      else{
        // console.log('status != posting');
        LS.status = 'posting'
      }

      LS.lat = lat
      LS.lng = lng
      LS.model = model

      // Autosave to LS every 5 secs
      saving = setInterval(function(){ 
        saveToLS() 
      }, 5000); 

      all_data = {} //clean all_data so as not to post old data but the edited data
      createPostEvent()

      $('._clearLS').on('click', function(){
        // LS.removeItem('thedevsorgpost');
        localStorage.removeItem('thedevsorg');
        $('._alert').remove()
      })

    })
      .fail(function(p) {
        console.log(p);
      })
  }

  saveToLS = function(){
      tinyMCE.triggerSave();
      all_data = $.extend({}, map_data, $('.createTemplate form').serializeObject());
      LS.post = $.extend(LS.post, all_data);
      // localStorage.setItem('thedevsorg', JSON.stringify(LS));
      localStorage.thedevsorg = JSON.stringify(LS);
  }

  createPostEvent = function(){
    $( ".createTemplate input[type='submit']" ).on('click', function(e){
    // $('.createTemplate form').on('submit', function(){
      e.preventDefault()
      $('.createTemplate input[type="submit"]').attr('disabled', 'on') //prevent double-submission!

      saveToLS()//keeps updating all_data and LS.post

      _creator = 'undefined' == typeof all_data['start_time'] ? 'creator' : 'organizer'

      if(loggedIn()){
        // console.log('Already logged in')
        all_data[_creator] = user_id
      }
      else{
        all_data[_creator] = 2
        all_data['status'] = session_id
        all_data['public'] = 'off'
         
        $('.modal').modal('hide')//hide the createpost form
        $('._sign-in-modal').modal('show')
        $('._sign-in-modal .modal-title').html('Log in to complete...')
        $('._sign-up-modal .modal-title').html('Sign Up to complete...')
      }

      postData()
    })
  }
  postData = function(){
    // var Posting = Backbone.Model.extend({
    //   url: model
    // });
    
    // posting = new Posting(all_data);
    // posting.save()

    // console.log('posting all_data to ' + model)
    // console.log(JSON.stringify(all_data));
    $('img.preload').show()

    // $.ajax({
    //   url:model,
    //   type:'POST',
    //   dataType:"json",
    //   data: all_data,
    //   success:function(dd){ 
    //      clearInterval(saving)
    //      localStorage.removeItem('thedevsorg');
    //   }
    //   , error:function(dd){ 
    //     console.log('failed to post')
    //   }
    //   , done:function(dd){
    //     console.log(dd.statusText)
    //   }

    // });
    var postxhr = $.post('/'+model, all_data, function(resp) { //find an easier way to do this!
      console.log('Posted temporarily.');
      // console.log(resp);
      $('img.preload').hide()
      clearInterval(saving)
      localStorage.removeItem('thedevsorg');
      LS.status = 'posted'
      LS.id = resp
      if(loggedIn()){
        window.location.pathname = model+'/'+LS.id
      }
    })
      .fail(function(resp) {
        console.log('Error: ' + JSON.stringify(resp));
      })
      // .done(function(resp) {
      //   console.log( "Done. "+ressp);
      // });
     
  }

  onMapClick = function(e) {
    $('button._step3').removeAttr('disabled')
    if($('._alert')[0]){
      _alert('Click "Next" to give a few more details....')
    }
    lat = e.latlng.lat
    lng = e.latlng.lng

    // console.log(lat)
    // console.log(lng)

    pin2map(lat, lng)

    //pulling all coordinates into one world
    lng = lng > 180 ? lng%360 : lng
    lng = lng > 180 ? lng-360 : lng
    lng = lng < -180 ? lng%360 : lng
    lng = lng < -180 ? lng+360 : lng

    console.log(lat)
    console.log(lng)

    if($('#single-map input')[0]){
      $('#single-map input')[0].value = lat + ', ' + lng //filling map coords to input box
    }
  }

  pin2map = function(lat, lng){
    // console.log('into pin2map');
    var myIcon = L.icon({
      iconUrl: pin_green,
      iconSize: [20, 20],
      iconAnchor: [10, 10],
      labelAnchor: [6, 0] // as I want the label to appear 2px past the icon (10 + 2 - 6)
    });
    // console.log('mapping lat: ' + lat + ' and lng is: '+ lng);
    marker_new
      .setLatLng({'lat': lat, 'lng': lng})
      .setIcon(myIcon)
      .addTo(map);
    // console.log('marker created: ' + marker_new);

    
    if(!$('#single-map')[0]){ // if not an edit page dont attach the popup
      popup_new = L.popup()
        .setContent('<a href="#" class="_step3">Pinned!</a>')
        .openOn(marker_new)
      $('._addbtn').html('<span class="_blade _aqua2pink _step3">Complete>></span>')
      // $('.leaflet-popup-content').html('<a href="#" class="_step3">Complete>></a>')
      marker_new.bindPopup(popup_new).openPopup()

      markersgroup.push([lat, lng])
      // map.fitBounds(markersgroup)$('#single-map')[0]

      map_data['map'] = lat + ', ' + lng;  //setting map var for both onmapclick and lazy posting
   }
    setTimeout(function(){ _step3() }, 500)
    $('._clearLS').show()

  }

  pinLS = function(){ 
    pin2map(lat, lng)
    map.on('click', onMapClick)

    var x = $('.panel-group label input[value="'+LS.model+'"]').parent()[0]
    x.className = 'cats btn panel _aqua-hover active'
    $('button._step3').removeAttr('disabled')
  }

  getNewMarkers = function(b){
    // setTimeout(function(){
      $.post('/api', b, function(m){
        console.log(m);
      })
    // }, 500);
    
  }

//$(window).load(function(){
window.onload = initStyle;
//window.unload = initStyle;
    
function initStyle() {

  if($('.alert')){
  $('.alert').slideToggle(1000); 
    setTimeout(function(){$('.alert').slideToggle(1000)}, 5000);
  }

  //$("img.preload").fadeOut(500, function() {});
};
//});​

var _path = window.location.pathname;
_path = _path.substr(1, _path.length)
if(_path ==''){_path = '.'}
var _model = _path.substr(0, _path.indexOf('/'))
var _id = _path.substr(_path.indexOf('/')+1, _path.length1)
// console.log(_path);
var _url = window.location.href;
var _host = window.location.host;
var markersgroup = []
var map_data = {}
// var LS = localStorage.getItem('thedevsorg') ? JSON.parse(localStorage.getItem('thedevsorg')) : {}; 
var LS = localStorage.thedevsorg ? JSON.parse(localStorage.thedevsorg) : {}; 
var all_data = LS.post ? LS.post : {}
var saving = 0 //start the saving interval
var lat = ''
var lng = ''
var model = LS.model // is set else undefined
var _record = {}
var marker = {}
var marker_new = L.marker() 
var lc = {} //leaflet locate control

window.setInterval(function(){$('._alert._bg-pink').show().fadeOut(1000)}, 1500);
var _blinker = $('._alert').clone()
$('._alert').remove()
'undefined' != typeof myalert ? _alert(myalert) : true //api to interact with from backend

var ressp = {}

var sentry_check = '{{ Sentry::check() }}'
var pin_pink = '{{ asset("images/mapping/bubble-pink.png") }}'
var pin_green = '{{ asset("images/mapping/left-dex-green.png") }}'
var session_id = "{{ session_id() }}"
var api_url = "{{ URL::to('api/search') }}"


$(document).ready(function(){
  lat = LS.lat
  lng = LS.lng
  richEditor()//for form textareas

  //Masonry Stacks
  var $container = $('.mason-stacks');

  // initialize Masonry after all images have loaded  
  $container.imagesLoaded( function() {
       $container.masonry({
        "columnWidth": 10, 
        "itemSelector": ".item",
        isFitWidth: true
      });
       $('.mason-stacks .item .mask').show();
  });
  $('.mason-stacks .item').on('mouseover', function(){
    $(this).css('background-color','white');
    $(this).css('opacity','1');
  });
  $('.mason-stacks .item').on('mouseout', function(){
    $(this).css('background-color','white');
  });


  

    // $('._blade').pulsate({
    //     color: "#4A8BC2",
    //     repeat: false,
    //     onHover: true
    // });
    
  $('.slide-out-div').tabSlideOut({
      tabHandle: '.handle',                     //class of the element that will become your tab
      pathToTabImage: '/images/devs/contact.png', //path to the image for the tab //Optionally can be set using css
      imageHeight: '130px',                     //height of tab image           //Optionally can be set using css
      imageWidth: '40px',                       //width of tab image            //Optionally can be set using css
      tabLocation: 'right',                     //side of screen where tab lives, top, right, bottom, or left
      speed: 600,                               //speed of animation
      action: 'click',                          //options: 'click' or 'hover', action to trigger animation
      topPos: '200px',                          //position from the top/ use if tabLocation is left or right
      leftPos: '20px',                          //position from left/ use if tabLocation is bottom or top
      fixedPosition: true                      //options: true makes it stick(fixed position) on scroll
  });

  //show 'Contact' sidebar
  $(".slide-out-div").show(); 

  // $(document).joyride()
  $("a._demo").click(function(e){
    e.preventDefault()
    $("#demo").joyride({autoStart: true})
  });

  // clickLogger();

  // mapping for home and index pages
  if($('#thedevsmap')[0] != undefined){
    loadMap('thedevsmap', _path)
    // fetchMapData() //from API
    domFetch() //from DOM
    //these need to be created just once 

    // enable drag and zoom handlers
    map.on('focus', function(){
      map.scrollWheelZoom.enable();
    })
    
  }
  // mapping for single record pages
  if($('#single-map')[0] != undefined){ // load map for single entity show & edit view
    loadMap('single-map', _path)
    // fetchMapData()
    domFetch()

    // enable drag and zoom handlers
    map.on('focus', function(){
      map.scrollWheelZoom.enable();
    })  

    setTimeout(function(){//wait for map to load so you get the _record changed
      if(_path.indexOf('/edit') > -1){ //make edit map pinnable
        map.on('click', onMapClick)
        // console.log(_record);
        if(_record.map == ''){ // _record.map was blank...
          mlat = -1.3 // load pin on around nairobi
          mlng = 36.75+Math.random()*0.1
          pin2map(mlat, mlng) 
          markersgroup.pop() //remove last coords if any
          markersgroup.push([mlat, mlng]) //just to define where map will land
          map.fitBounds(markersgroup) 
        }
      }
    }, 2000); 
  }


  if(LS.status == 'posting' && isMain()){// local storage
    pinLS()
    _name = LS.post.name ? LS.post.name : LS.post.first_name
    $('._addbtn').html('<span class="_blade _aqua2pink _step3">Complete>></span>')
    $('a._step2').attr('class', '_step3')
    _alert('<u class="_step3">Complete creating "'+LS.post.name+'"</u>')
    $('._clearLS').show()
  }
  if(!isMain()){
    $('span.links').show();
  }

  $('._clearLS').on('click', function(){
    localStorage.removeItem('thedevsorg');
    $('._alert').remove()
  })

  _git = []
  if(_model == 'devs'){ // _id is a number
    $.get('/devs/'+parseInt(_id)+'/api/github', function(cyr){
      _git = gitData(JSON.parse(cyr))
      _git.map(function(e){return e[1]})
      $('._git').append('<a href="'+_gitlink+'">Github Year: </a>')
      for(var i=0, len=_git.length; i < len; i++){
        $('._git').append(' <span class="_in-block">' +_git[i]+ '</span>')
      }
    })
  }

  $('._step1').click(function(e){ 
    e.preventDefault()
    // _alert('2. Select the category you want to post....')
    $('._cats').modal('show')
  })

  $('._step2').on('click', function(e){
    'undefined' != typeof map ? e.preventDefault() : console.log('Please create from a different page.')

    $('._pin-map .modal-body').css('height', $(window).height()*0.7+'px')
    $('._pin-map .modal-dialog').css('margin', '0px')
    $('._pin-map h4.modal-title span').text($(".btn-group").find("label.active").text().trim().toLowerCase())
    // $('#map-container').html($('#thedevsmap').clone())

    function showlayer() {
        map.addLayer(marker_cluster)
        $(this).one("click", hidelayer);
        $(this).text("Hide Markers");
    }
    function hidelayer() {
        map.removeLayer(marker_cluster)
        $(this).one("click", showlayer);
        $(this).text("Show Markers");
    }
    $("._hide-markers").one("click", hidelayer);

    
    $('._pin-map').modal('show')
    setTimeout(function(){
      loadMap('pinmap', _path)
      domFetch() // add markers on map
      map.on('click', onMapClick)

      if(lc._circle){
        lat = lc._circle._latlng.lat
        lng = lc._circle._latlng.lng
      }
    }, 1000);
    
  })


   
  $('label.cats').on('click', function(){
    model = $(".btn-group").find("label.active input").prop('value');
    $('button._step2').removeAttr('disabled') //enabled
  })

  _step3 =  function(){
      $('._step3').on('click', function(e){ 
        e.preventDefault()
        $('._pin-map').modal('hide')
        $('.createTemplate').append($('img.preload').show());
        fetchPostForm()
        $('._creates').modal('show')
      })
  }

  // $('._step3').on('click', function(e){ 
  //   e.preventDefault()

  //   $('.createTemplate').append($('img.preload').show());
  //   fetchPostForm()
  //   $('._creates').modal('show')
  // })
    // $('button._step3').click( function(e){ 
    //   e.preventDefault()
    //   console.log('message');
    //   $('._sign-in-modal .modal-title').html('Sign In to Complete...') 
    //   $('._sign-up-modal .modal-title').html('Sign Up to Complete...') 
    // })

    $('._get-sign-in').click(function(e){ 
      e.preventDefault()
      $('._sign-up-modal').modal('hide')
      $('._sign-in-modal').modal('show')
    })

    $('._get-sign-up').click(function(e){ 
      e.preventDefault()
      $('._sign-in-modal').modal('hide')
      $('._sign-up-modal').modal('show')
    })

    $('._sign-up-modal form').on('submit', function(e){
      e.preventDefault()
      $.post($(this).attr('action'), $(this).serializeArray(), function(ddd){
        if(ddd['success']){
          _alert(ddd['success']);
          $('._sign-up-modal').modal('hide')
        }
        else{
          // console.log(JSON.stringify(ddd.errors))
          $('p._pink').remove()
          $.each(ddd['errors'], function(key, value) {
            $('<p class="_pink _top10">'+value+'</p>').insertBefore(
              $('._sign-up-modal form input[name="'+key+'"]'))
          })
        }
      })
    })

    $('._sign-in-modal form').on('submit', function(e){
      e.preventDefault()
      $('._sign-in-modal form input[type="submit"]').attr('disabled', 'on');
      $('img.preload').show()
      $.post($(this).attr('action'), $(this).serializeArray(), function(ddd){
        if(ddd['success']){
          _alert(ddd['success']);
          // console.log(ddd);
          // window.location.pathname = ddd['redirect'] //takes to show view if you are doing insertGetId
          window.location.pathname = (model && LS.id ) ? model+'/'+LS.id : ddd['redirect'];
        }
        else{
          // console.log(JSON.stringify(ddd.errors))
          $('._sign-in-modal form input[type="submit"]').removeAttr('disabled');
          $('p._pink').remove()
          $.each(ddd['errors'], function(key, value) {
            $('<p class="_pink _top10">'+value+'</p>').insertBefore(
              $('._sign-in-modal form input[name="'+key+'"]'))
          })
          $('<p class="_pink _top10">Please check your details...</p>').insertBefore(
              $('._sign-in-modal form input[name="email"]'))
        }
      })
      $('img.preload').hide()
      // modal('show')
    })

  //autocomplete for search 
  $("._search").autocomplete({
      source: function (request, response) {
        $.ajax({
            url: api_url,
            type: "GET",
            cache: false,
            dataType: "json",
            success: function (data) {
              // console.log(JSON.stringify(data))
              var arr = [];
              for(var ary in data){
               // console.log(data[arr]);
               data[ary].location = data[ary].location == '' ? 'unknown location' : data[ary].location
                arr.push({
                  label:data[ary].model + ': "'+ data[ary].name + '" from '+ data[ary].location, 
                  value:data[ary].name, 
                  id:data[ary].id, 
                  class:data[ary].model_path});
              }
              response(arr);
            },
            data: {
                term: request.term
            }
        });
      },
    select: function( event, ui ) {
    window.location.href = "/"+ ui.item.class+"/"+ ui.item.id;
    }
  });

  _holder = 'Search "PHP", "JavaScript", "Java", "Android", "Ruby" etc...';
  $('._search').click(function(){
      // console.log(this.value);
      if (this.value==_holder) this.value=''
  }).blur(function(){
      if (this.value=='') this.value=_holder
  }).val(_holder);

  $('._search').click(function(e){
    e.preventDefault()
    // $('._search').val() == _holder$('._api-search').val('Type here to search...')
  })

  //doublescroll
  if(document.getElementById('doublescroll')){
      function DoubleScroll(element) {
          var scrollbar= document.createElement('div');
          scrollbar.appendChild(document.createElement('div'));
          scrollbar.style.overflow= 'auto';
          scrollbar.style.overflowY= 'hidden';
          scrollbar.firstChild.style.width= element.scrollWidth+'px';
          scrollbar.firstChild.style.paddingTop= '1px';
          scrollbar.firstChild.appendChild(document.createTextNode('\xA0'));
          scrollbar.onscroll= function() {
              element.scrollLeft= scrollbar.scrollLeft;
          };
          element.onscroll= function() {
              scrollbar.scrollLeft= element.scrollLeft;
          };
          element.parentNode.insertBefore(scrollbar, element);
      }

      DoubleScroll(document.getElementById('doublescroll'));

  }
  
  // confirm before deleting
  if($.fn.confirmation != undefined && _path.indexOf('/create') == -1){ //dont confirm deletions on /create paths
    $('.btn-danger, ._del').click(function(e){
      e.preventDefault();
    });
    
    $('.btn-danger, ._del').not('.btn-danger.fileupload-exists').confirmation({
        'href' : './delete',
        'onCancel' : function(){
          $('.popover').fadeOut(200);
        }
    })
  }

  // AddThis Smart Layers BEGIN
  if('undefined' != typeof addthis){
    addthis.layers({
      'theme' : 'transparent',
      'share' : {
        'position' : 'left',
        'services' : 'facebook,twitter,google_plusone_share,linkedin,email,more',

      }, 
      // 'follow' : {
      //   'services' : [
      //     {'service': 'facebook', 'id': 'thedevsorg'},
      //     {'service': 'twitter', 'id': 'thedevsorg'},
      //     {'service': 'google_follow', 'id': '113061438023381974773'}
      //   ]
      // },  
      // 'whatsnext' : {},  
      // 'recommended' : {},
      'responsive' : {
        maxWidth: '550px',
        minWidth: '0px'
      }
      });
  }
  // nice scroll
  $("html").niceScroll({styler:"fb",cursorcolor:"#55ffaa", cursorwidth: '6', cursorborderradius: '10px', background: 'transparent', spacebarenabled:false,  cursorborder: '', zindex: '1000', autohidemode: false});

})

$('.star-cred a').click(function(e){
  e.preventDefault()
  if(loggedIn()){
    star = $(this)
    giving = parseInt($(this).attr('value'))
    obj = {'recipient': star.parent().data('dev'), 'count': giving }
    // console.log(obj);
    $.post('/stars/click', obj, function(rsp){
      if('undefined' != typeof rsp['success']){
        console.log('Successfully rated ' + giving);
        star.attr('class', 'star active')
        star.prevAll().attr('class', 'star active')
        star.nextAll().attr('class', 'star off')
        counter = star.parent().next().find('span')
        count = parseInt(counter.text())
        counter.text(count - rsp['success'] + giving)
      }
      else{
        _alert('Oops! :( Check your connection and try to rate again...');
      }
    })
  }
  else{
    console.log('not logged in ');
    _alert('Kindly log in to be able to rate...');
  }
})


    // var Org = Backbone.Model.extend({
    // defaults:{
    //   name: 'John Doe',
    //   description: 'dev'
    // }
    // , url: '/orgs'
    // });
    // org1 = new Org({
    //   'logo': 'comming soon',
    //   'video': ' this vid',
    //   'creator': 'creator1'
    // });



  // $('.nextbtn').on('click', function(data){
  //   $(this).attr({'data-toggle': "modal", 'data-target': '._cats'})
  // });


  // $('#map').on('click', function(data){

  //   $('.result').html('Click object that your want to add');

  //   console.log(data);
  //   // $.post("/orgs", data);
  //   org1.save();

   
  // })


// var CreateView = Backbone.View.extend({ //extends backbone view, 
//   template: _.template(createForm)

//   // , template: '#createTemplate'


//   , initialize: function(){ // automatically runs when a class is instantiated
    
//     console.log(this.model);
//     this.render();
//   }

//   , render: function(){//takes your template and groups together with the associated data

//     this.$el.html(this.template(this.model.toJSON()))
//     $(document.body).append(this.el);

//   }

// })
// // if(createForm.error) {  // If there is an error, show the error messages
// //     $('.alert-error').text(data.error.text).show();
// // }   
