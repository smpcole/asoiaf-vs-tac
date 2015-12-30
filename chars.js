// List of ASOIAF characters and their IDs
var asoiaf_chars = [
					["Cersei Lannister", "cersei"],
					["Sansa Stark", "sansa"]
					];

// List of TAC characters, their IDs, and their neighbors' IDs
var tac_chars = [
				 ["Clemence of Hungary", "clemence", "sansa"],
				 ["Marguerite of Burgundy", "marguerite", "sansa", "cersei"]
				 ];


////////////////////////////////////

/*
 * Define "vertex" object corresponding to each character
 *
 * Each vertex has the following fields:
 * - name: the character's full name
 * - id: character's unique ID string
 * - series: either "tac" or "asoiaf"
 * - index: the vertex's index in its respective list
 */
var vertexList = [];

/* Define "edge" object corresponding to each connection between a TAC character and an ASOIAF character
 *
 * Each edge has the following fields:
 * - l: the ID of the TAC character (left part of graph)
 * - r: the ID of the ASOIAF character (right part of graph)
 */
var edgeList = [];

var l = asoiaf_chars;
while(true) {

	for(var i = 0; i < l.length; i++) {

		var char_ID = l[i][1],
			full_name = l[i][0],
			series = (l == asoiaf_chars ? "asoiaf" : "tac");

		var vertex = {
			name: full_name,
			id: char_ID,
			series: series,
			index: i
		};

		vertexList.push(vertex);

		// Delete everything but the character ID from the original list
		l[i] = char_ID;
	}

	// Update l to next list
	if(l == asoiaf_chars)
		l = tac_chars;
	else
		break;
}
