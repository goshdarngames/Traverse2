require('./traverse_puzzle_objects');

let MockOb = function ()
{
    this.name = "mock";
    this.unique = false;
}

test('PuzzleState insert and remove standard', () => 
{
    let ps = new traverse.PuzzleState ();

    let o = new traverse.PuzzleObject ( MockOb, 1, 1 );
    let p = new traverse.PuzzleObject ( MockOb, 1, 1 );

    ps.add_object ( o );

    expect( ps.get_object_at_pos ( 1, 1 ) ).toBe ( o );

    expect ( () => ps.add_object ( p ) ).toThrow ();

    ps.remove_object_at_pos ( 1, 1 );

    expect( ps.get_object_at_pos ( 1, 1 ) ).toBeUndefined ();
    
    ps.add_object ( p );

    expect( ps.get_object_at_pos ( 1, 1 ) ).toBe ( p );
});

