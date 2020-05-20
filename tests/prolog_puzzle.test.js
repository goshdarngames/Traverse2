/**
 * prolog_puzzle.test.js
 *
 * Tests the functions used to check the puzzle state between prolog
 * and javascript.
 */

let pl = require ( "tau-prolog" );

let fs = require("fs").promises;

require ( "../javascript/traverse_puzzle_objects" );
require ( "../javascript/traverse_prolog" );

//Wrapping the prolog answer in a promise allows jest to wait on the
//asynchronous code from the prolog system
let answer_promise = ( session ) => new Promise ( resolve =>
{
    session.answer ( ( a ) => resolve ( a ) );
});

let read_pl_data = async function ()
{
    let pl_data = await fs.readFile (  
        "./prolog/traverse_rules.pl", "utf8" );

    return pl_data;
}

let get_traverse_data = async function ()
{
    let session = pl.create ();

    let pl_data = await read_pl_data ();

    session.consult ( pl_data );

    let traverse_data = 
    {
        assets :
        {
            rules_pl : session,
        },
    };

    return traverse_data;
};

test ( "Prolog objects defined", async () =>
{
    expect ( pl ).toBeDefined ();
    
    expect ( traverse ).toBeDefined ();

    let traverse_data = await get_traverse_data ();

    let session = traverse_data.assets.rules_pl;

    let answer = undefined;

    session.query ( "object(bad_object)." );
    answer = await answer_promise ( session );

    expect ( answer ).toBeFalsy ();

    for ( const query of [ "boo", "bogey", "wall" ] )
    {
        session.query ( `(${query}).` );
        answer = await answer_promise ( session );

        expect ( answer ).toBeDefined ();
    }

    

});

test ( "Prolog puzzle_problem", async () =>
{
    let traverse_data = await get_traverse_data ();
    let ps = new traverse.PuzzleState ();

    let a = await traverse.prolog_verify_puzzle_state ( ps, traverse_data );

    expect ( a ).toEqual ( "Prolog said no." );
});
