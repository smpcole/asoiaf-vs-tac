// List of ASOIAF characters and their IDs
var asoiaf_chars = [
					["Cersei Lannister", "cl"],
					["Sansa Stark", "ss"]
					];

// List of TAC characters, their IDs, and their neighbors' IDs
var tac_chars = [
				 ["Clemence of Hungary", "ch", "ss"],
				 ["Marguerite of Burgundy", "mb", "ss", "cl"]
				 ];


////////////////////////////////////

// Parse the lits of characters into a more useful format
var all_chars = {};

var edges = [];

for(i = 0; i < asoiaf_chars.length; i++) {
	
	var char_ID = asoiaf_chars[i][1];
	var full_name = asoiaf_chars[i][0];

	var newChar = {
		name: full_name
	};

	all_chars[char_ID] = newChar;

	// Delete everything but the character ID from the original list
	asoiaf_chars[i] = char_ID;

}

for(i = 0; i < tac_chars.length; i++) {
	
	var char_ID = tac_chars[i][1];
	var full_name = tac_chars[i][0];

	var newChar = {
		name: full_name
	};

	for(j = 2; j < tac_chars[i].length; j++) {
		var nbr_ID = tac_chars[i][j];
		edges.push({l: char_ID, r: nbr_ID});
	}

	all_chars[char_ID] = newChar;

	// Delete everything but the character ID from the original list
	tac_chars[i] = char_ID;

}