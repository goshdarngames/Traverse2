/**
 * prolog_puzzle_problem.test.js
 *
 * Tests the functions used to check the puzzle state between prolog
 * and javascript.
 */

let pl_utils = require ( "./prolog_testing_utils" );

require ( "../javascript/traverse_puzzle_objects" );
require ( "../prolog/traverse_prolog" );

test ( "Prolog objects defined", async () =>
{
    let session = await pl_utils.get_prolog_session ();

    let answer = undefined;

    session.query ( "object(bad_object)." );
    answer = await pl_utils.answer_promise ( session );

    expect ( answer ).toBeFalsy ();

    for ( const query of [ "boo", "bogey", "wall" ] )
    {
        session.query ( `(${query}).` );
        answer = await pl_utils.answer_promise ( session );

        expect ( answer ).toBeDefined ();
    }

    

});

test ( "Prolog puzzle_problem", async () =>
{
    let session = await pl_utils.get_prolog_session ();

    let ps = new traverse.PuzzleState ();

    let a = await traverse_pl
        .verify_puzzle_state ( ps.get_prolog (), session );

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
    
    a = await traverse_pl
        .verify_puzzle_state ( ps.get_prolog (), session );

    expect ( a ).toEqual ( "Boo Missing" );

    ps.remove_object ( bogey );
    ps.add_object ( boo );
    
    a = await traverse_pl
        .verify_puzzle_state ( ps.get_prolog (), session );

    expect ( a ).toEqual ( "Bogey Missing" );

    ps.add_object ( bogey );
    
    a = await traverse_pl
        .verify_puzzle_state ( ps.get_prolog (), session );

    //TODO - Should say puzzle can't be solved
    expect ( a ).toEqual ( "None" );

});

test ( "Prolog puzzle_problem both ghosts moving", async () =>
{
    let session = await pl_utils.get_prolog_session ();

    let ps = new traverse.PuzzleState ();

    let dest = new traverse.PuzzleObjects.Position ( 1, 8 );

    let boo = new traverse.PuzzleObject ( 
        traverse.PuzzleObjects.Types.Boo,
        new traverse.PuzzleObjects.Position ( 1, 1 ),
        new traverse.PuzzleObjects.States.Moving  ( dest )  );

    let bogey = new traverse.PuzzleObject ( 
        traverse.PuzzleObjects.Types.Bogey,
        new traverse.PuzzleObjects.Position ( 1, 2 ),
        new traverse.PuzzleObjects.States.Moving  ( dest )  );

    ps.add_object ( bogey );
    ps.add_object ( boo );

    let a = await traverse_pl
        .verify_puzzle_state ( ps.get_prolog (), session );

    expect ( a ).toEqual ( "Both ghosts moving." );
});

test ( "Prolog puzzle_problem position out of bounds", async () =>
{
    let session = await pl_utils.get_prolog_session ();

    let ps = new traverse.PuzzleState ();

    let dest = new traverse.PuzzleObjects.Position ( 1, 8 );

    let boo = new traverse.PuzzleObject ( 
        traverse.PuzzleObjects.Types.Boo,
        new traverse.PuzzleObjects.Position ( 1, 1 ),
        new traverse.PuzzleObjects.States.Static ()  );

    let bogey = new traverse.PuzzleObject ( 
        traverse.PuzzleObjects.Types.Bogey,
        new traverse.PuzzleObjects.Position ( -1, 2 ),
        new traverse.PuzzleObjects.States.Static ()  );

    ps.add_object ( bogey );
    ps.add_object ( boo );

    let a = await traverse_pl
        .verify_puzzle_state ( ps.get_prolog (), session );

    expect ( a ).toEqual ( "Bad puzzle object" );
});

test ( "Prolog puzzle_problem move dest out of bounds", async () =>
{
    let session = await pl_utils.get_prolog_session ();

    let ps = new traverse.PuzzleState ();

    let dest = new traverse.PuzzleObjects.Position ( -1, 8 );

    let boo = new traverse.PuzzleObject ( 
        traverse.PuzzleObjects.Types.Boo,
        new traverse.PuzzleObjects.Position ( 1, 1 ),
        new traverse.PuzzleObjects.States.Static ()  );

    let bogey = new traverse.PuzzleObject ( 
        traverse.PuzzleObjects.Types.Bogey,
        new traverse.PuzzleObjects.Position ( 1, 2 ),
        new traverse.PuzzleObjects.States.Moving ( dest )  );

    ps.add_object ( bogey );
    ps.add_object ( boo );

    let a = await traverse_pl
        .verify_puzzle_state ( ps.get_prolog (), session );

    expect ( a ).toEqual ( "Bad puzzle object" );
});
