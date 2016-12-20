var LABEL_WIDTH = 245,
	VTX_DIST = 40, // Distance between centers of two consecutive vertices
	VTX_RAD = 4,
	LABEL_OFFSET = 10; // Distance between label and center of vertex

// Translate every vertex (hence entire graphic) by this much
var VTX_TRANS = {x: 0, y: 20};

var canvas = d3.select("#canvas");
var sidePanel = d3.select("#side-panel");

// Overall width of canvas
var WIDTH = canvas.style("width");
WIDTH = +(WIDTH.substring(0, WIDTH.length - 2));

// Set height based on the number of vertices
var HEIGHT = VTX_DIST * Math.max(asoiaf_chars.length, tac_chars.length);
canvas.style("height", HEIGHT);

////////////////// Helper functions //////////////////

// Return absolute coordinates of center of vertex
// Accepts either a vertex object or an ID string
function vertexPos(v) {

	// If v is an ID string, use it to retrieve vertex
	if(v.name == undefined)
		v = canvas.select("#" + v).datum();

	var pos = {
		x: (v.series == "tac" ? LABEL_WIDTH : WIDTH - LABEL_WIDTH) + VTX_TRANS.x, 
		y: v.index * VTX_DIST + VTX_TRANS.y
	};
	return pos;
}

// Callback for when a vertex is clicked
function vertexClicked(v) {

	// Hide all edges first
	edges.classed("active", false)
		.html("");

	// Select current vertex & deselect all others
	vertices.classed("selected", function(w) {return w.id == v.id;});

	// Show edges incident to the clicked vertex
	edges.classed("active", function(e) {
			return e.l == v.id || e.r == v.id;
		})
		.classed("selected", false);

	// Set mouseover text to name of connected character
	canvas.selectAll(".edge.active")
	  .append("title")
        .html(function(e) {
			var otherV = (v.series == "tac" ? e.r : e.l); // ID
			console.log(otherV);
			return canvas.select("#" + otherV).datum().name;
		});

	// Clear the side panel
	sidePanel.select("#instructions").remove();
	sidePanel.selectAll("div").html("");

	showInfo(v, sidePanel.select("#selected-char"));
}

// Fill selection with info from vertex v
function showInfo(v, selection) {

	selection.html("");

	// We will add text whether the image loads or not
	function addText() {
		selection.append("h2")
		    .html(v.name);

		// First look for text in blurbs folder; if not found, use wiki
		d3.text("blurbs/" + v.id, function(error, blurb) {
			if(error == null) {
				selection.append("p").text(blurb.trim());
			}
			else {

				// No blurb found; pull text from wiki
				
				/* Assume v.wiki_handle is a correctly encoded URL if defined,
				 * e.g. %20 instead of ' '.
				 */
				var wiki_handle = v.wiki_handle;
				if(wiki_handle == undefined)
					wiki_handle = encodeURI(v.name);

				var domain = null;
				var link_url = "http://";
				if(v.series == "tac") {
					domain = "en%2Ewikipedia%2Eorg%2Fw";
					link_url += "en.wikipedia.org/wiki/";
				}
				else {
					domain = "awoiaf%2Ewesteros%2Eorg";
					link_url += "awoiaf.westeros.org/index.php/";
				}
				link_url += wiki_handle;

				url = "wikis.php?domain=" + domain + "&handle=" + wiki_handle;
				var req = new XMLHttpRequest();
				req.open("GET", url, true);

				req.onload = function() {
					var pages = JSON.parse(this.response).query.pages;
					for(var pageid in pages) {
						selection.append("p").html(pages[pageid].extract);
						break; // Only want one page
					}
					selection.append("a")
						.attr("href", link_url)
					    .html("From " + (v.series == "tac" ? "Wikipedia" : "A Wiki of Ice and Fire"));
				};
				
				req.onerror = function() {
					console.log("Error opening " + url);
				};

				req.send();
			}
		});

	};

	// Check for image file first
	var img_url = "pics/" + v.id + ".jpg";
	var img_req = new XMLHttpRequest();
	img_req.open("HEAD", img_url, true);
	img_req.onload = function() {
        if(this.status == 200 || this.status == 0) // File exists; add the image
		    selection.append("img")
		        .attr("src", img_url);
		addText();
	};
	img_req.onerror = addText;

	img_req.send();
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

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////


// Draw vertices
var vertices = canvas.selectAll(".vertex") // Should be empty
	.data(vertexList)
  .enter().append("g")
	.classed("vertex", true)
	.classed("tac", function(v) {return v.series == "tac";})
	.classed("asoiaf", function(v) {return v.series == "asoiaf";})
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

console.log(vertices);
console.log(canvas.style("height"));

// Draw edges

var edges = canvas.selectAll(".edge"); // Should be empty

// Get edge list from the server
var req = new XMLHttpRequest();
req.open("GET", "edges.php", true);
req.onload = function() {
	if(this.status == 200 || this.status == 0) {
		edgeList = JSON.parse(this.response);
		edges = edges.data(edgeList)
		  .enter().append("line")
			.attr("x1", vertexPos("clemence").x) // Use any TAC character
			.attr("y1", function(e) {return vertexPos(e.l).y;})
			.attr("x2", vertexPos("sansa").x) // Use any ASOIAF character
			.attr("y2", function(e) {return vertexPos(e.r).y;})
			.on("click", edgeClicked)
			.classed("edge", true);

		vertices.on("click", vertexClicked);
	}
};
req.send();
