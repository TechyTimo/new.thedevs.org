<div class="_header">
    <div class="_top-left _in-block">
        <span class="_logo">
            <a href="{{ URL::to('/') }}" class="_aqua-hover-text">C<span class="small">ODER</span>H<span class="small">UNT</span></a>
        </span>
        <span class="_tagline">Find Good Coders Locally!</span>
        
    </div>

    <ul class="_top-right _nav">
            <li>@include('partials.links')</li>
        @if (Sentry::check())
            <?php $id = Sentry::getUser()->id; ?>
            <li {{ ( Request::is('devs/'.$id) ? 'class="active"' : '') }}>
                <a class="_blade _aqua-hover" href="{{ URL::to('devs/'.$id.'') }}">
                My Profile</a>
            </li>
        @else
            <li class="hide">
                <a class="_blade _aqua-hover _demo" href="{{ URL::to('howitworks') }}" type="button">
                Demo</a>
            </li>
            

            <li {{ (Request::is('auth/signup') ? 'class="active"' : '') }}>
                <a class="_blade _aqua-hover _get-sign-up" href="{{ URL::to('auth/signup') }}">Join</a>
            </li>
            <li><a class="_blade _aqua-hover _get-sign-in" href="{{ URL::to('auth/signin') }}">
                Log In</a>
            </li>

            <li>
                <a class="_blade _aqua-hover _step1" href="#" type="button">
                Create!</a>
            </li>
            
        @endif
    </ul>
        
    <div class="_layer _bottom5">

        <input class="_search form-control ui-autocomplete-input" name="term" type="text" autocomplete="off" placeholder="Search  'PHP', 'JavaScript', 'Java', 'Android', 'Ruby' etc near you...">
        <div class="_search-icon"></div>

    </div>

</div>