require('./traverse_puzzle_objects');

let MockOb = function ()
{
    this.name = "mock";
    this.unique = false;
}

let MockUnique = function ()
{
    this.name = "mock_unique";
    this.unique = true;
}

test('PuzzleState insert and remove standard', () => 
{
    let ps = new traverse.PuzzleState ();

    let o = new traverse.PuzzleObject ( MockOb, 1, 1 );
    let p = new traverse.PuzzleObject ( MockOb, 1, 1 );
    let q = new traverse.PuzzleObject ( MockOb, 1, 2 );

    ps.add_object ( o );

    expect( ps.get_object_at_pos ( 1, 1 ) ).toBe ( o );

    expect ( () => ps.add_object ( p ) ).toThrow ();

    ps.remove_object_at_pos ( 1, 1 );

    expect( ps.get_object_at_pos ( 1, 1 ) ).toBeUndefined ();
    
    ps.add_object ( p );

    expect( ps.get_object_at_pos ( 1, 1 ) ).toBe ( p );

    ps.remove_object ( p );

    expect( ps.get_object_at_pos ( 1, 1 ) ).toBeUndefined ();

    ps.add_object ( o );
    ps.add_object ( q );
});

test('PuzzleState insert unique', () => 
{
    let ps = new traverse.PuzzleState ();

    let o = new traverse.PuzzleObject ( MockUnique, 1, 1 );
    let p = new traverse.PuzzleObject ( MockUnique, 1, 3 );

    ps.add_object ( o );

    expect( ps.get_object_at_pos ( 1, 1 ) ).toBe ( o );

    expect ( ps.get_unique_object ( "mock_unique" )).toBe ( o );

    expect ( () => ps.add_object ( p ) ).toThrow ();

    ps.remove_unique_object ( "mock_unique" );

    expect( ps.get_object_at_pos ( 1, 1 ) ).toBeUndefined ();
    
    expect ( ps.get_unique_object ( "mock_unique" ) ).toBeUndefined ();

    ps.add_object ( p );

    expect( ps.get_object_at_pos ( 1, 3 ) ).toBe ( p );

    expect ( ps.get_unique_object ( "mock_unique" ) ).toBe ( p );
});

