/**
 * puzzle_representations.test.js
 *
 * Test converting the puzzle state back and forth between JS, prolog
 * and URL-String representations.
 */

let pl_utils = require ( "./prolog_testing_utils" );

require ( "../javascript/traverse_puzzle_objects" );
require ( "../prolog/traverse_prolog" );

test ( "Convert ps to prolog and check equals", () =>
{
    let o_0 = new traverse.PuzzleObject ( 
        traverse.PuzzleObjects.Types.Boo, 
        new traverse.PuzzleObjects.Position ( 1, 1 ),
        new traverse.PuzzleObjects.States.Static () 
    );

    let p_0 = new traverse.PuzzleObject ( 
        traverse.PuzzleObjects.Types.Bogey, 
        new traverse.PuzzleObjects.Position ( 1, 2 ),
        new traverse.PuzzleObjects.States.Static () 
    );

    let q_0 = new traverse.PuzzleObject ( 
        traverse.PuzzleObjects.Types.Wall, 
        new traverse.PuzzleObjects.Position ( 1, 3 ),
        new traverse.PuzzleObjects.States.Static () 
    );

    let ps_0 = new traverse.PuzzleState ();

    ps_0.add_object ( o_0 );
    ps_0.add_object ( p_0 );
    ps_0.add_object ( q_0 );

    //TODO Convert state to prolog array using aysnc prolog system methods
    /**
     * This mehtod of converting prolog to ps is not suitable here
    let ps_0_pl = ps_0.get_prolog ();

    let ps_1 = new traverse.PuzzleState ();

    ps_1.load_prolog ( ps_0_pl );

    expect ( ps_0.equals ( ps_1 ) ).toBeTruthy ();
    expect ( ps_1.equals ( ps_0 ) ).toBeTruthy ();
    */


});


