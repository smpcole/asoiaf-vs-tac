var LABEL_WIDTH = 200,
	GRAPH_WIDTH = 400, // Horizontal distance between centers of vertices on opposite sides
	VTX_RAD = 4,
	VTX_DIST = 40, // Distance between centers of two consecutive vertices
	LABEL_OFFSET = 10, // Distance between label and center of vertex
	BLURB_WIDTH = 150,
	BLURB_HEIGHT = 100,
	MARGIN = {top: BLURB_HEIGHT / 2, bottom: BLURB_HEIGHT / 2, left: 0, right: 0};

// Overall width of the graphics
var WIDTH = GRAPH_WIDTH + 2 * (LABEL_WIDTH + LABEL_OFFSET);

// Overall height of the graphics
var HEIGHT = MARGIN.top + MARGIN.bottom + VTX_DIST * (Math.max(tac_chars.length, asoiaf_chars.length));

// x-coordinates of vertices in left and right parts of the graph
var LEFT_X = MARGIN.left + LABEL_WIDTH + LABEL_OFFSET,
	RIGHT_X = LEFT_X + GRAPH_WIDTH;

var canvas = d3.select("#canvas");

canvas.attr("width", WIDTH)
	.attr("height", HEIGHT);

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
	.attr("cx", 0)
	.attr("cy", 0)
	.attr("r", VTX_RAD);

vertices.append("text")
	.text(function(v) {return v.name;})
	.attr("x", function(v) {return v.series == "tac" ? -LABEL_OFFSET : LABEL_OFFSET;})
	.attr("y", VTX_RAD);

// Draw edges
var edges = canvas.selectAll(".edge") // Should be empty
	.data(edges)
  .enter().append("line")
	.attr("x1", LEFT_X)
	.attr("y1", function(e) {return vertexPos(e.l).y;})
	.attr("x2", RIGHT_X)
	.attr("y2", function(e) {return vertexPos(e.r).y;})
	.classed("edge", true)
	.on("mouseover", showBlurb);

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

	// Also hide any visible blurb
	hideBlurb();

	// Select current vertex & deselect all others
	vertices.classed("selected", function(w) {return w.id == v.id;});

	// Show edges incident to the clicked vertex
	edges.classed("active", function(e) {
			return e.l == v.id || e.r == v.id;
		})
		.classed("selected", false);
}

function hideBlurb() {
	console.log("hideBlurb");
	canvas.selectAll(".blurb")
		.remove();
}

function showBlurb(e, i) {
	hideBlurb();
	console.log("showBlurb");

	// Deselect other edges and select this one
	edges.classed("selected", function(f) {
			return f.l == e.l && f.r == e.r;
		});
	
	// Top left of rectangle
	var x = (LEFT_X + RIGHT_X - BLURB_WIDTH) / 2,
		y = (vertexPos(e.l).y + vertexPos(e.r).y - BLURB_HEIGHT) / 2;

	var blurb = blurbs[e.l][e.r];
	if(blurbs == undefined)
		blurbs = "TODO: write something to go here";

	canvas.append("foreignObject")
		.classed("blurb", true)
		.attr("x", x)
		.attr("y", y)
		.attr("width", BLURB_WIDTH)
		.attr("height", BLURB_HEIGHT)
	  .append("xhtml:div")
		.html(blurb);

}
