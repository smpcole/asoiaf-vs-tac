var LABEL_WIDTH = 200,
	GRAPH_WIDTH = 400, // Horizontal distance between centers of vertices on opposite sides
	VTX_DIST = 40, // Distance between centers of two consecutive vertices
	VTX_RAD = 4,
	LABEL_OFFSET = 10, // Distance between label and center of vertex
	MARGIN = {top: 75, bottom: 75, left: 0, right: 0};

// Overall width of the graphics
var WIDTH = GRAPH_WIDTH + 2 * (LABEL_WIDTH + LABEL_OFFSET);

// Overall height of the graphics
var HEIGHT = MARGIN.top + MARGIN.bottom + VTX_DIST * (Math.max(tac_chars.length, asoiaf_chars.length) - 1);

// x-coordinates of vertices in left and right parts of the graph
var LEFT_X = MARGIN.left + LABEL_WIDTH + LABEL_OFFSET,
	RIGHT_X = LEFT_X + GRAPH_WIDTH;

var canvas = d3.select("#canvas");

canvas.attr("width", WIDTH)
	.attr("height", HEIGHT);

var sidePanel = d3.select("#side-panel")
	.style("height", HEIGHT + "px");

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

// Draw vertices
var vertices = canvas.selectAll(".vertex") // Should be empty
	.data(vertices)
  .enter().append("g")
	.classed("vertex", true)
	.classed("tac", function(v) {return v.series == "tac";})
	.classed("asoiaf", function(v) {return v.series == "asoiaf";})
	.on("click", vertexClicked)
	.attr("id", function(v) {return v.id;})
	.attr("transform", function(v) {
			var pos = vertexPos(v);
			return "translate(" + pos.x + "," + pos.y + ")";
		});
  
vertices.append("circle")
	.attr("r", VTX_RAD);

vertices.append("text")
	.text(function(v) {return v.name;})
	.attr("x", function(v) {return v.series == "tac" ? -LABEL_OFFSET : LABEL_OFFSET;})
	.attr("y", 4);

// Draw edges
var edges = canvas.selectAll(".edge") // Should be empty
	.data(edges)
  .enter().append("line")
	.attr("x1", LEFT_X)
	.attr("y1", function(e) {return vertexPos(e.l).y;})
	.attr("x2", RIGHT_X)
	.attr("y2", function(e) {return vertexPos(e.r).y;})
	.on("click", edgeClicked)
	.classed("edge", true);

////////////////// Helper functions //////////////////

// Return absolute coordinates of center of vertex
// Accepts either a vertex object or an ID string
function vertexPos(v) {

	// If v is an ID string, use it to retrieve vertex
	if(v.name == undefined)
		v = canvas.select("#" + v).datum();

	var pos = {
		x: (v.series == "tac" ? LEFT_X : RIGHT_X), 
		y: MARGIN.top + v.index * VTX_DIST
	};
	return pos;
}

// Callback for when a vertex is clicked
function vertexClicked(v) {

	// Hide all edges first
	edges.classed("active", false);

	// Select current vertex & deselect all others
	vertices.classed("selected", function(w) {return w.id == v.id;});

	// Show edges incident to the clicked vertex
	edges.classed("active", function(e) {
			return e.l == v.id || e.r == v.id;
		})
		.classed("selected", false);

	// Clear the side panel
	sidePanel.select("#instructions").remove();
	sidePanel.selectAll("div").html("");

	showInfo(v, sidePanel.select("#selected-char"));
}

// Fill selection with info from vertex v
function showInfo(v, selection) {
	selection.html("")
	  .append("img")
		.attr("src", "pics/" + v.id + ".jpg");
	selection.append("h2")
		.html(v.name);
	d3.text("blurbs/" + v.id, function(error, blurb) {
		if(error == null)
			selection.append("p").html(blurb);
		else
			console.log(error);
	});
}

function edgeClicked(e) {
	
	// Deselect other edges and select this one
	edges.classed("selected", function(f) {
			return f.l == e.l && f.r == e.r;
		});

	// Get the endpoint of e that is NOT the selected vertex
	var otherV = (canvas.select(".vertex.selected").classed("tac") ? e.r : e.l); // ID
	otherV = canvas.select("#" + otherV).datum(); // Vertex object

	showInfo(otherV, sidePanel.select("#connected-char"));

	// Show connections between characters in a bulleted list
	var connections = d3.select("#connections").html("");
	connections.append("h2")
		.html("Connections");
	var ul = connections.append("ul");
	d3.text("blurbs/" + e.l + "-" + e.r, function(error, blurb) {
			if(error == null) {
				blurb = blurb.split("\n"); // Each newline marks a new bullet
				for(var i = 0; i < blurb.length; i++) {
					blurb[i] = blurb[i].trim();
					if(blurb[i].length == 0) // Skip empty lines
						continue;
					ul.append("li").html(blurb[i]);
				}
			}
			else
				console.log(error);
		});

}
