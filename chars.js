// List of ASOIAF characters and their IDs
var asoiaf_chars = [
	["Jon Arryn", "jonarryn"],
	["Petyr Baelish", "littlefinger"],
	["Joffrey Baratheon", "joffrey"],
	["Myrcella Baratheon", "myrcella"],
	["Renly Baratheon", "renly"],
	["Robert Baratheon", "robertbaratheon"],
	["Stannis Baratheon", "stannis"],
	["Tommen Baratheon", "tommen"],
	["Bronn", "bronn"],
	["Brotherhood Without Banners", "brotherhood"],
	["Gregor Clegane", "gregor"],
	["Direwolves", "direwolves"],
	["Dragons", "dragons"],
	["Drogo", "drogo"],
	["Mirri Maz Duur", "mirri"],
	["Faith Militant", "faithmilitant"],
	["Gendry", "gendry"],
	["Gilly", "gilly"],
	["Asha Greyjoy", "asha"],
	["Theon Greyjoy", "theon"],
	["High Sparrow", "highsparrow"],
	["Iron Bank of Braavos", "ironbank"],
	["Kettleblacks", "kettleblacks"],
	["Cersei Lannister", "cersei"],
	["Jaime Lannister", "jaime"],
	["Tyrion Lannister", "tyrion"],
	["Tywin Lannister", "tywin"],
	["Quentyn Martell", "quentyn"],
	["Melisandre", "melisandre"],
	["Jorah Mormont", "jorah"],
	["Daario Naharis", "daario"],
	["Ilyn Payne", "ilyn"],
	["Mance Rayder's son", "mancesson", "Aemon_Steelsong"],
	["Barristan Selmy", "barristan"],
	["Jon Snow", "jon"],
	["Catelyn Stark", "catelyn"],
	["Eddard Stark", "eddard"],
	["Robb Stark", "robb"],
	["Sansa Stark", "sansa"],
	["Aegon I Targaryen", "aegon1"],
	["Aegon VI Targaryen", "aegon6"],
	["Baelor I Targaryen", "baelor"],
	["Daenerys Targaryen", "daenerys"],
	["Viserys Targaryen", "viserys"],
	["Samwell Tarly", "sam"],
	["Brienne of Tarth", "brienne"],
	["Loras Tyrell", "loras"],
	["Margaery Tyrell", "margaery"],
	["Margaery's cousins", "margaeryscousins"],
	["Olenna Tyrell", "olenna"],
	["Undying Ones", "undying"],
	["Varys", "varys"]
];

// List of TAK characters, their IDs, and their neighbors' IDs
var tak_chars = [
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
	["Gaucher de Chatillon", "gaucher", "Gaucher_V_de_Chatillon"],
	["Guccio Baglioni", "guccio"],
	["Isabella of France", "isabella"],
	["Jean I of France", "jean1"],
	["Jeanne of Burgundy", "jeanneofburgundy", "Joan_II,_Countess_of_Burgundy"],
	["Pope John XXII", "john22"],
	["Knights Templar", "templars"],
	["Lormet", "lormet"],
	["Louis IX of France", "louis9"],
	["Louis X of France", "louis10"],
	["Louis X's illegitimate daughter", "louisdaughter"], // TODO: what's her name?
	["Mahaut of Artois", "mahaut"],
	["Marguerite of Burgundy", "marguerite", "Margaret_of_Burgundy,_Queen_of_France"],
	["Marie de Cressay", "marie"],
	["Marie of Hungary", "marieofhungary", "Mary_of_Hungary,_Queen_of_Naples"],
	["Roger Mortimer", "mortimer", "Roger_Mortimer,_1st_Earl_of_March"],
	["Guillaume de Nogaret", "nogaret"],
	["Enguerrand de Marigny", "marigny"],
	["Philip IV of France", "philip4"],
	["Philip IV's hounds", "hounds"],
	["Philippa of Hainaut", "philippa"],
	["Philippe V of France", "philippe5"],
	["Cola di Rienzi", "rienzi"],
	["Robert of Artois", "robertofartois", "Robert_III_of_Artois"],
	["Spinello Tolomei", "tolomei"],
	["Charles of Valois", "valois"],
	["William I of England", "william"]
];


/*
 * Define "vertex" object corresponding to each character
 *
 * Each vertex has the following fields:
 * - name: the character's full name
 * - id: character's unique ID string
 * - series: either "tak" or "asoiaf"
 * - index: the vertex's index in its respective list
 */
var vertexList = [];

/* Define "edge" object corresponding to each connection between a TAK character and an ASOIAF character
 *
 * Each edge has the following fields:
 * - l: the ID of the TAK character (left part of graph)
 * - r: the ID of the ASOIAF character (right part of graph)
 */
var edgeList = [];

var l = asoiaf_chars;
while(true) {

	for(var i = 0; i < l.length; i++) {

		var char_ID = l[i][1],
			full_name = l[i][0],
			series = (l == asoiaf_chars ? "asoiaf" : "tak");

		var vertex = {
			name: full_name,
			id: char_ID,
			series: series,
			index: i
		};

		if(l[i].length >= 3)
			vertex.wiki_handle = l[i][2];
			
		vertexList.push(vertex);

		// Delete everything but the character ID from the original list
		l[i] = char_ID;
	}

	// Update l to next list
	if(l == asoiaf_chars)
		l = tak_chars;
	else
		break;
}
