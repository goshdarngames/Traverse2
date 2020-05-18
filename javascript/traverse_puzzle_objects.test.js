require('./traverse_puzzle_objects');

test('PuzzleState insert and remove standard', () => 
{
    let ps = new traverse.PuzzleState ();

    let o = new traverse.PuzzleObject ( 
        traverse.PuzzleObjects.Types.Wall, 
        new traverse.PuzzleObjects.Position ( 1, 1 ),
        new traverse.PuzzleObjects.States.Static () 
    );

    let p = new traverse.PuzzleObject ( 
        traverse.PuzzleObjects.Types.Wall, 
        new traverse.PuzzleObjects.Position ( 1, 1 ),
        new traverse.PuzzleObjects.States.Static () 
    );

    let q = new traverse.PuzzleObject ( 
        traverse.PuzzleObjects.Types.Wall, 
        new traverse.PuzzleObjects.Position ( 1, 2 ),
        new traverse.PuzzleObjects.States.Static () 
    );

    ps.add_object ( o );

    expect( ps.get_object_at_pos ( 1, 1 ) ).toBe ( o );

    expect ( () => ps.add_object ( p ) ).toThrow ();

    ps.remove_object ( o );

    expect( ps.get_object_at_pos ( 1, 1 ) ).toBeUndefined ();
    
    ps.add_object ( p );

    expect( ps.get_object_at_pos ( 1, 1 ) ).toBe ( p );

    ps.remove_object ( p );

    expect( ps.get_object_at_pos ( 1, 1 ) ).toBeUndefined ();

    ps.add_object ( o );
    ps.add_object ( q );
});

/*
test('PuzzleState insert unique', () => 
{
    let ps = new traverse.PuzzleState ();

    let o = new traverse.PuzzleObject ( MockUnique, 1, 1 );
    let p = new traverse.PuzzleObject ( MockUnique, 1, 3 );

    ps.add_object ( o );

    expect( ps.get_object_at_pos ( 1, 1 ) ).toBe ( o );

    expect ( ps.get_unique_object ( "mock_unique" )).toBe ( o );

    expect ( () => ps.add_object ( p ) ).toThrow ();

    let u = ps.get_unique_object ( "mock_unique" );

    ps.remove_object ( u );

    expect( ps.get_object_at_pos ( 1, 1 ) ).toBeUndefined ();
    
    expect ( ps.get_unique_object ( "mock_unique" ) ).toBeUndefined ();

    ps.add_object ( p );

    expect( ps.get_object_at_pos ( 1, 3 ) ).toBe ( p );

    expect ( ps.get_unique_object ( "mock_unique" ) ).toBe ( p );
});
*/
