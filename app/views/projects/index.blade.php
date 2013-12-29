@extends('layouts.scaffold')

@section('transparent')
	@include('partials.mapnav')
@stop

@section('main')

<h2 class="_inline">Latest Projects...</h2>

<!-- <p class="pull-right _top10">{{ link_to_route('projects.create', 'Add One... :)') }}</p> -->

@if ($projects->count())
	<table class="table table-striped table-bordered _top10">
		<thead>
			<tr>
				<th>Logo</th>
				<th>Name</th>
				<!-- <th>Tagline</th> -->
				<th>Type</th>
				<th>Location</th>
				<!-- <th>Link</th> -->
				<!-- <th>Views</th> -->
				<!-- <th>Votes</th> -->
				<th>Creator</th>
			</tr>
		</thead>

		<tbody>
			@foreach ($projects as $project)
				<tr>
					<td>{{ All::getImageLink($project, '_list-img') }}</td>
					<td>{{ All::getNameLink($project) }}</td>
					<!-- <td>{{{ $project->elevator }}}</td> -->
					<td>{{{ $project->type }}}</td>
					<td>{{{ $project->location }}}</td>
					<!-- <td>{{{ $project->link }}}</td> -->
					<!-- <td>{{{ $project->views }}}</td> -->
					<!-- <td>{{{ $project->votes }}}</td> -->
					<td>{{ All::getCreatorImageLink($project, '_list-img') }}
						<br/>{{ All::getCreatorLink($project) }}</td>
				</tr>
			@endforeach
		</tbody>
	</table>
@else
	There are no projects
@endif

@stop