/**
 * prolog_testing_utils.js
 * 
 * Helpful functions when testing prolog / js scripts using jest
 */

let pl = require ( "tau-prolog" );
let loader = require( "tau-prolog/modules/lists" )( pl );

let fs = require("fs").promises;

//Wrapping the prolog answer in a promise allows jest to wait on the
//asynchronous code from the prolog system
let answer_promise = ( session ) => new Promise ( resolve =>
{
    session.answer ( ( a ) => resolve ( a ) );
});
exports.answer_promise = answer_promise;

let read_pl_data = async function ()
{
    let pl_data = await fs.readFile (  
        "./prolog/traverse_rules.pl", "utf8" );

    return pl_data;
}
exports.read_pl_data = read_pl_data;

let get_prolog_session = async function ()
{
    let session = pl.create ();

    let pl_data = await read_pl_data ();

    session.consult ( pl_data );

    return session;
};
exports.get_prolog_session = get_prolog_session;

