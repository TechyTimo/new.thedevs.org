@extends('layouts.scaffold')

@section('main')

<h1>Edit Org</h1>
{{ Form::model($org, array('method' => 'PATCH', 'route' => array('orgs.update', $org->id))) }}
	<ul>
        <li>
            {{ Form::label('name', 'Name:') }}
            {{ Form::text('name') }}
        </li>

        <li>
            {{ Form::label('logo', 'Logo:') }}
            {{ Form::text('logo') }}
        </li>

        <li>
            {{ Form::label('video', 'Video:') }}
            {{ Form::text('video') }}
        </li>

        <li>
            {{ Form::label('creator', 'Creator:') }}
            {{ Form::input('number', 'creator') }}
        </li>

        <li>
            {{ Form::label('elevator', 'Tagline:') }}
            {{ Form::text('elevator') }}
        </li>

        <li>
            {{ Form::label('description', 'Description:') }}
            {{ Form::textarea('description') }}
        </li>

        <li>
            {{ Form::label('type', 'Type:') }}
            {{ Form::text('type') }}
        </li>

        <li>
            {{ Form::label('contacts', 'Contacts:') }}
            {{ Form::textarea('contacts') }}
        </li>

        <li>
            {{ Form::label('location', 'Location:') }}
            {{ Form::text('location') }}
        </li>

        <li>
            {{ Form::label('notes', 'Notes:') }}
            {{ Form::textarea('notes') }}
        </li>

        <li>
            {{ Form::label('public', 'Public:') }}
            {{ Form::text('public') }}
        </li>

		<li>
			{{ Form::submit('Update', array('class' => 'btn btn-info')) }}
			{{ link_to_route('orgs.show', 'Cancel', $org->id, array('class' => 'btn')) }}
		</li>
	</ul>
{{ Form::close() }}

@if ($errors->any())
	<ul>
		{{ implode('', $errors->all('<li class="error">:message</li>')) }}
	</ul>
@endif

@stop