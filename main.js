var LABEL_WIDTH = 200,
	GRAPH_WIDTH = 400, // Horizontal distance between centers of vertices on opposite sides
	VTX_RAD = 4,
	VTX_DIST = 40, // Distance between centers of two consecutive vertices
	LABEL_OFFSET = 6; // Distance between label and center of vertex

// Overall width of the graphics
var WIDTH = GRAPH_WIDTH + 2 * (LABEL_WIDTH + LABEL_OFFSET);

// Overall height of the graphics
var HEIGHT = 2 * VTX_RAD + VTX_DIST * (Math.max(tac_chars.length, asoiaf_chars.length));

var svg = d3.select("svg");

svg.attr("width", WIDTH)
	.attr("height", HEIGHT);

var tac_vertex = svg.selectAll("g")
	.data(tac_chars)
  .enter().append("g")
	.attr("transform", function(d, i) {
			// Vertical position of the vertex's center
			return "translate(0," + (VTX_RAD + i * VTX_DIST) + ")";
		});

tac_vertex.append("circle")
	.attr("cx", LABEL_WIDTH + LABEL_OFFSET)
	.attr("cy", 0)
	.attr("r", VTX_RAD);
	
var asoiaf_vertex = svg.selectAll("dummy") // So that we get an empty selection
	.data(asoiaf_chars)
  .enter().append("g")
	.attr("transform", function(d, i) {
			return "translate(" + (LABEL_WIDTH + LABEL_OFFSET + GRAPH_WIDTH) + "," + (VTX_RAD + i * VTX_DIST) + ")";
		});

asoiaf_vertex.append("circle")
	.attr("cx", 0)
	.attr("cy", 0)
	.attr("r", VTX_RAD);