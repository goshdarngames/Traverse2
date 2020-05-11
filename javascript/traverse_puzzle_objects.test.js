require('./traverse_puzzle_objects');

test('PuzzleState insert', () => 
{
    let ps = new traverse.PuzzleState ();

    let o = new traverse.PuzzleObject ( "o", 1, 1 );
    let p = new traverse.PuzzleObject ( "p", 1, 1 );

    ps.add_object ( o );

    expect( ps.get_object_at_pos ( 1, 1 ) ).toBe ( o );

    expect ( () => ps.add_object ( p ) ).toThrow ();

});

