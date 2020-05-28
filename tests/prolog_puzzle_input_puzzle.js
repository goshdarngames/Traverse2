/**
 * prolog_puzzle_problem.test.js
 *
 * Tests the functions used to generate future puzzle states based on the
 * available inputs to players.
 */

let pl = require ( "tau-prolog" );
let loader = require( "tau-prolog/modules/lists" )( pl );

let fs = require("fs").promises;

require ( "../javascript/traverse_puzzle_objects" );
require ( "../prolog/traverse_prolog" );

