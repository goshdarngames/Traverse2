/**
 * prolog_puzzle_problem.test.js
 *
 * Tests the functions used to generate future puzzle states based on the
 * available inputs to players.
 */

let pl_utils = require ( "./prolog_testing_utils" );

require ( "../javascript/traverse_puzzle_objects" );
require ( "../prolog/traverse_prolog" );

test ( "Empty test", async () =>
{
    let session = await pl_utils.get_prolog_session ();

    let ps0 = new traverse.PuzzleState ();

    let boo0 = new traverse.PuzzleObject ( 
        traverse.PuzzleObjects.Types.Boo,
        new traverse.PuzzleObjects.Position ( 1, 1 ),
        new traverse.PuzzleObjects.States.Static ()  );

    let wall0 = new traverse.PuzzleObject ( 
        traverse.PuzzleObjects.Types.Wall,
        new traverse.PuzzleObjects.Position ( 1, 5 ),
        new traverse.PuzzleObjects.States.Static ()  );

    let bogey0 = new traverse.PuzzleObject ( 
        traverse.PuzzleObjects.Types.Bogey,
        new traverse.PuzzleObjects.Position ( 4, 1 ),
        new traverse.PuzzleObjects.States.Static ()  );


    let ps1 = new traverse.PuzzleState ();

    let boo1 = new traverse.PuzzleObject ( 
        traverse.PuzzleObjects.Types.Boo,
        new traverse.PuzzleObjects.Position ( 1, 4 ),
        new traverse.PuzzleObjects.States.Static ()  );

    let wall1 = new traverse.PuzzleObject ( 
        traverse.PuzzleObjects.Types.Wall,
        new traverse.PuzzleObjects.Position ( 1, 5 ),
        new traverse.PuzzleObjects.States.Static ()  );

    let bogey1 = new traverse.PuzzleObject ( 
        traverse.PuzzleObjects.Types.Bogey,
        new traverse.PuzzleObjects.Position ( 4, 1 ),
        new traverse.PuzzleObjects.States.Static ()  );


    let input = new traverse.PuzzleObjects.Input ( 
        boo0, 
        traverse.PuzzleObjects.Direction.Up );


    //TODO check prolog if p0 input p1 is valid

});
