@extends('layouts.sub1')

@section('content')

<h1>All Projects</h1>

<!-- <p>{{ link_to_route('projects.create', 'Add new project') }}</p> -->

@if ($projects->count())
	<table class="table table-striped table-bordered">
		<thead>
			<tr>
				<th>Logo</th>
				<th>Name</th>
				<th>Tagline</th>
				<th>Type</th>
				<th>Location</th>
				<!-- <th>Link</th> -->
				<th>Views</th>
				<th>Votes</th>
				<th>Creator</th>
			</tr>
		</thead>

		<tbody>
			@foreach ($projects as $project)
				<tr>
					<td>{{{ $project->logo }}}</td>
					<td><a href="{{ URL::to('projects/'.$project->id) }}">{{{ $project->name }}}</a></td>
					<td>{{{ $project->elevator }}}</td>
					<td>{{{ $project->type }}}</td>
					<td>{{{ $project->location }}}</td>
					<!-- <td>{{{ $project->link }}}</td> -->
					<td>{{{ $project->views }}}</td>
					<td>{{{ $project->votes }}}</td>
					<td>{{{ $project->creator }}}</td>
				</tr>
			@endforeach
		</tbody>
	</table>
@else
	There are no projects
@endif

@stop