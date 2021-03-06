@extends('layouts.scaffold')

{{-- Page title --}}
@section('title')
User Management ::
@parent
@stop

{{-- Page content --}}
@section('main')
<div class="page-header">
	<h3>
		User Management

		<div class="pull-right">
			<a href="{{ route('create/user') }}" class="btn btn-sm btn-info"><i class="icon-plus-sign icon-white"></i> Create</a>
		</div>
	</h3>
</div>

<a class="btn btn-medium" href="{{ URL::to('admin/users?withTrashed=true') }}">Include Deleted Users</a>
<a class="btn btn-medium" href="{{ URL::to('admin/users?onlyTrashed=true') }}">Include Only Deleted Users</a>

{{ $users->links() }}

<table class="table table-bordered table-striped admin">
	<thead>
		<tr>
			<th class="span1">id</th>
			<th class="span2">first_name</th>
			<th class="span2">last_name</th>
			<th class="span3">email</th>
			<th class="span2">activated</th>
			<th class="span2">created_at</th>
			<th class="span2">actions</th>
		</tr>
	</thead>
	<tbody>
		@foreach ($users as $user)
		<tr>
			<td>{{ $user->id }}</td>
			<td>{{ $user->first_name }}</td>
			<td>{{ $user->last_name }}</td>
			<td>{{ $user->email }}</td>
			<td>{{ $user->isActivated() ? 'yes' : 'no' }}</td>
			<td>{{ $user->created_at->diffForHumans() }}</td>
			<td>
				<a href="{{ route('update/user', $user->id) }}" class="btn btn-sm btn-info">edit</a>

				@if ( ! is_null($user->deleted_at))
				<a href="{{ route('restore/user', $user->id) }}" class="btn btn-sm btn-warning">restore</a>
				@else
				@if (Sentry::getId() !== $user->id)
				<a href="{{ route('delete/user', $user->id) }}" class="btn btn-sm btn-danger">delete</a>
				@else
				<span class="btn btn-sm btn-danger disabled">delete</span>
				@endif
				@endif
			</td>
		</tr>
		@endforeach
	</tbody>
</table>

{{ $users->links() }}
@stop
