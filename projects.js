function loadCharts(){

      // Load the Visualization API and the piechart package.
      google.load('visualization', '1.0', {'packages':['corechart']});

      // Set a callback to run when the Google Visualization API is loaded.
      google.setOnLoadCallback(function drawAll(){
			drawChart('languages.json');
			drawChart2('repositories.json');
			drawCommitHistoryPerRepository('stackedhistory.json');
		});

      // Callback that creates and populates a data table,
      // instantiates the pie chart, passes in the data and
      // draws it.
      function drawChart(url) {
			request_json(url, function(langs){
					// Create the data table.
					var data = new google.visualization.DataTable();
					data.addColumn('string', 'Language');
					data.addColumn('number', 'Size of Codebase');
					data.addRows(langs);

					// Set chart options
					var options = {'title':'Size of Codebase per Language',
									  'width':800,
									  'height':300,
								'halign' : 'center'};

					// Instantiate and draw our chart, passing in some options.
					var chart = new google.visualization.PieChart(document.getElementById('chart_div'));
					chart.draw(data, options);
			});		
      }

      // Callback that creates and populates a data table,
      // instantiates the pie chart, passes in the data and
      // draws it.
      function drawChart2(url) {
			request_json(url, function(langs){
					// Create the data table.
					var data = new google.visualization.DataTable();
					data.addColumn('string', 'Repository');
					data.addColumn('number', 'Size of Repository');
					data.addRows(langs);

					// Set chart options
					var options = {'title':'Size of Codebase per Repository',
									  'width':800,
									  'height':300,
								'halign' : 'center'};

					// Instantiate and draw our chart, passing in some options.
					var chart = new google.visualization.PieChart(document.getElementById('chart2_div'));
					chart.draw(data, options);
			});		
      }
	  
		function drawCommitHistoryPerRepository(url) {
			request_json(url , function(stacked){
				  // Some raw data (not necessarily accurate)
				  var countries = stacked.projects;
				  var months = stacked.months;
				  var productionByCountry = stacked.data;

				  // Create and populate the data table.
				  var data = new google.visualization.DataTable();
				  data.addColumn('string', 'Month');
				  for (var i = 0; i < countries.length; ++i) {
					data.addColumn('number', countries[i]);
				  }
				  data.addRows(months.length);
				  for (var i = 0; i < months.length; ++i) {
					data.setCell(i, 0, months[i]);
				  }
				  for (var i = 0; i < countries.length; ++i) {
					var country = productionByCountry[i];
					for (var month = 0; month < months.length; ++month) {
					  data.setCell(month, i + 1, country[month]);
					}
				  }
				  // Create and draw the visualization.
				  var ac = new google.visualization.BarChart(document.getElementById('chart3_div'));
				  ac.draw(data, {
					title : 'Monthly Commit Activity per Repository',
					isStacked: true,
					width: 800,
					height: 400,
					vAxis: {title: "Commits"},
					hAxis: {title: "Month"}
				  });				
			});
		}
}

window.onload = function(){
	loadCharts();
}
