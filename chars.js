// List of ASOIAF characters and their IDs
var asoiaf_chars = [
					["Jon Arryn", "jonarryn"],
					["Petyr Baelish", "littlefinger"],
					["Joffrey Baratheon", "joffrey"],
					["Myrcella Baratheon", "myrcella"],
					["Robert Baratheon", "robertbaratheon"],
					["Stannis Baratheon", "stannis"],
					["Renly Baratheon", "renly"],
					["Tommen Baratheon", "tommen"],
					["Bronn", "bronn"],
					["Brotherhood Without Banners", "brotherhood"],
					["Gregor Clegane", "gregor"],
					["Direwolves", "direwolves"],
					["Dragons", "dragons"],
					["Drogo", "drogo"],
					["Mirri Maz Duur", "mirri"],
					["Gendry", "gendry"],
					["Grey Worm", "greyworm"],
					["Asha Greyjoy", "asha"],
					["Theon Greyjoy", "theon"],
					["High Sparrow", "highsparrow"],
					["Kettleblacks", "kettleblacks"],
					["Cersei Lannister", "cersei"],
					["Jaime Lannister", "jaime"],
					["Tyrion Lannister", "tyrion"],
					["Tywin Lannister", "tywin"],
					["Melisandre", "melisandre"],
					["Barristan Selmy", "barristan"],
					["Shae", "shae"],
					["Catelyn Stark", "catelyn"],
					["Eddard Stark", "eddard"],
					["Robb Stark", "robb"],
					["Sansa Stark", "sansa"],
					["Aegon I Targaryen", "aegon1"],
					["Aegon VI Targaryen", "aegon6"],
					["Aerys II Targaryen", "aerys2"],
					["Baelor I Targaryen", "baelor"],
					["Daenerys Targaryen", "daenerys"],
					["Viserys Targaryen", "viserys"],
					["Brienne of Tarth", "brienne"],
					["Loras Tyrell", "loras"],
					["Margaery Tyrell", "margaery"],
					["Margaery's cousins", "margaeryscousins"],
					["Olenna Tyrell", "olenna"],
					["Undying Ones", "undying"],
					["Varys", "varys"]
					];

// List of TAC characters, their IDs, and their neighbors' IDs
var tac_chars = [
				 ["Allies", "allies"],
				 ["Brothers d'Aunay", "aunays"],
				 ["Beatrice d'Hirson", "beatrice"],
				 ["Blanche of Burgundy", "blanche"],
				 ["Hugues de Bouville", "bouville"],
				 ["Charles IV of France", "charles4"],
				 ["Clemence of Hungary", "clemence"],
				 ["Hugh Despenser the Younger", "despenser"],
				 ["Edward II of England", "edward2"],
				 ["Edward III of England", "edward3"],
				 ["Gaucher V de Chatillon", "gaucher"],
				 ["Guccio Baglioni", "guccio"],
				 ["Isabella of France", "isabella"],
				 ["Jean I of France", "jean1"],
				 ["Jeanne of Burgundy", "jeanneofburgundy"],
				 ["Pope John XXII", "john22"],
				 ["The Knights Templar", "templars"],
				 ["Lormet", "lormet"],
				 ["Louis IX of France", "louis9"],
				 ["Louis X of France", "louis10"],
				 ["Louis X's illegitimate daughter", "louisdaughter"], // TODO: what's her name?
				 ["Mahaut of Artois", "mahaut"],
				 ["Marguerite of Burgundy", "marguerite"],
				 ["Marie de Cressay", "marie"],
				 ["Marie of Hungary", "marieofhungary"],
				 ["Roger Mortimer", "mortimer"],
				 ["Guillaume de Nogaret", "nogaret"],
				 ["Enguerrand de Marigny", "marigny"],
				 ["Philip IV of France", "philip4"],
				 ["Philip IV's hounds", "hounds"],
				 ["Philippa of Hainaut", "philippa"],
				 ["Philippe V of France", "philippe5"],
				 ["Cola di Rienzi", "rienzi"],
				 ["Robert III of Artois", "robertofartois"],
				 ["Spinello Tolomei", "tolomei"],
				 ["Charles of Valois", "valois"],
				 ["William I of England", "william"]
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
