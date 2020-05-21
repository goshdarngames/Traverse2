/**
 * prolog_puzzle.test.js
 *
 * Tests the functions used to check the puzzle state between prolog
 * and javascript.
 */

let pl = require ( "tau-prolog" );
require( "tau-prolog/modules/lists" )( pl );

let fs = require("fs").promises;

require ( "../javascript/traverse_puzzle_objects" );
require ( "../prolog/traverse_prolog" );

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

let get_prolog_session = async function ()
{
    let session = pl.create ();

    let pl_data = await read_pl_data ();

    session.consult ( pl_data );

    return session;
};

test ( "Prolog objects defined", async () =>
{
    expect ( pl ).toBeDefined ();
    
    expect ( traverse ).toBeDefined ();

    let session = await get_prolog_session ();

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
    let session = await get_prolog_session ();

    let ps = new traverse.PuzzleState ();

    let a = await traverse_pl.prolog_verify_puzzle_state ( ps, session );

    expect ( a ).toEqual ( "No objects" );

    let boo = new traverse.PuzzleObject ( 
        traverse.PuzzleObjects.Types.Boo,
        new traverse.PuzzleObjects.Position ( 1, 1 ),
        new traverse.PuzzleObjects.States.Static ()  );

    let bogey = new traverse.PuzzleObject ( 
        traverse.PuzzleObjects.Types.Bogey,
        new traverse.PuzzleObjects.Position ( 1, 2 ),
        new traverse.PuzzleObjects.States.Static ()  );

    ps.add_object ( bogey );
    
    a = await traverse_pl.prolog_verify_puzzle_state ( ps, session );

    expect ( a ).toEqual ( "Boo Missing" );

    ps.remove_object ( bogey );
    ps.add_object ( boo );
    
    a = await traverse_pl.prolog_verify_puzzle_state ( ps, session );

    expect ( a ).toEqual ( "Bogey Missing" );

    ps.add_object ( bogey );
    
    a = await traverse_pl.prolog_verify_puzzle_state ( ps, session );

    //TODO - Should say puzzle can't be solved
    expect ( a ).toEqual ( "None" );

});
