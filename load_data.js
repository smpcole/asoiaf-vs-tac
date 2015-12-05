/* Helper function for creating point objects
 * 
 * Each point has fields x & y hodling coordinates
 */
function point(x, y) {
	return {x: x, y: y};
}

// Stores all created nodes, indexed by their unique 2-letter keys
var nodes = {};

/* Return a new node object & add it to list of nodes
 *
 * name: character's full name
 * key: character's 2-letter key
 * neighbors: list of connected characters' 2-letter keys
 * pos: object containing fields x & y representing center of node's circle
 */
function newNode(name, key, neighbors, pos) {
	var node = {
		name: name,
		key: key,
		neighbors: neighbors,
		pos: pos
	};
	nodes[key] = node;
	
	// TODO: draw the node

	return node;
}