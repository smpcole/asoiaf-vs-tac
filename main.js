var LABEL_WIDTH = 200,
	GRAPH_WIDTH = 400, // Horizontal distance between centers of vertices on opposite sides
	VTX_RAD = 4,
	VTX_DIST = 40, // Distance between centers of two consecutive vertices
	LABEL_OFFSET = 10, // Distance between label and center of vertex
	MARGIN = {top: VTX_RAD, bottom: VTX_RAD, left: 0, right: 0};

// Overall width of the graphics
var WIDTH = GRAPH_WIDTH + 2 * (LABEL_WIDTH + LABEL_OFFSET);

// Overall height of the graphics
var HEIGHT = 2 * VTX_RAD + MARGIN.top + MARGIN.bottom + VTX_DIST * (Math.max(tac_chars.length, asoiaf_chars.length));

// x-coordinates of vertices in left and right parts of the graph
var LEFT_X = MARGIN.left + LABEL_WIDTH + LABEL_OFFSET,
	RIGHT_X = LEFT_X + GRAPH_WIDTH;

var svg = d3.select("svg");

svg.attr("width", WIDTH)
	.attr("height", HEIGHT);

// Will hold the ID of the currently selected character
var selected_ID = null;

// Hide all edges incident to currently selected vertex
function deselect() {
	if(selected_ID !== null) {
		svg.selectAll("[data-l=" + selected_ID + "], [data-r=" + selected_ID + "]")
			.attr("visibility", "hidden");
	    selected_ID = null;
	}
}

//////////// Draw the vertices

// TAC vertices
var tac_vertex = svg.selectAll("dummy")
	.data(tac_chars)
  .enter().append("g")
	.attr("transform", function(char_ID, i) {

			// Store each vertex's vertical position
			char_dict[char_ID].y = VTX_RAD + MARGIN.top + i * VTX_DIST;
			// Translate to vertical position of the vertex's center
			return "translate(" + MARGIN.left + "," + char_dict[char_ID].y + ")";
		});

tac_vertex.append("circle")
	.attr("cx", LABEL_WIDTH + LABEL_OFFSET)
	.attr("cy", 0)
	.attr("r", VTX_RAD);

// Label each vertex with the character's full name
tac_vertex.append("text")
	.text(function(d) {return char_dict[d].name;})
	.attr("text-anchor", "end")
	.attr("x", LABEL_WIDTH)
	.attr("y", VTX_RAD);

tac_vertex.on("click", vertexClicked);
	
// ASOIAF vertices
var asoiaf_vertex = svg.selectAll("dummy") // So that we get an empty selection
	.data(asoiaf_chars)
  .enter().append("g")
	.attr("transform", function(char_ID, i) {
			char_dict[char_ID].y = VTX_RAD + MARGIN.top + i * VTX_DIST;
			return "translate(" + RIGHT_X + "," + char_dict[char_ID].y + ")";
		});

asoiaf_vertex.append("circle")
	.attr("cx", 0)
	.attr("cy", 0)
	.attr("r", VTX_RAD);

asoiaf_vertex.on("click", vertexClicked);

// Callback for when a vertex is clicked
function vertexClicked(char_ID, i) {
	deselect();
	svg.selectAll("[data-l=" + char_ID + "], [data-r=" + char_ID + "]")
		.attr("visibility", "visible");
	selected_ID = char_ID;
}

// Labels
asoiaf_vertex.append("text")
	.text(function(char_ID) {return char_dict[char_ID].name;})
	.attr("text-anchor", "start")
	.attr("x", LABEL_OFFSET)
	.attr("y", VTX_RAD);

// Draw edges
svg.selectAll("dummy")
	.data(edges)
  .enter().append("line")
	.attr("x1", LEFT_X)
	.attr("y1", function(e) {return char_dict[e.l].y;})
	.attr("x2", RIGHT_X)
	.attr("y2", function(e) {return char_dict[e.r].y;})
	.attr("data-l", function(e) {return e.l;}) // Store char IDs of left and right endpoints so that we can easily select all edges with a given endpoint
	.attr("data-r", function(e) {return e.r;})
	.attr("visibility", "hidden")
	.style({stroke: "black", "stroke-width": "2px"});
