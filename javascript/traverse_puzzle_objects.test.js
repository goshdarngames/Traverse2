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
    
    let pos = new traverse.PuzzleObjects.Position ( 1, 1 );

    ps.add_object ( o );

    expect( ps.get_object_at_pos ( pos ) ).toBe ( o );

    expect ( () => ps.add_object ( p ) ).toThrow ();

    ps.remove_object ( o );

    expect( ps.get_object_at_pos ( pos ) ).toBeUndefined ();
    
    ps.add_object ( p );

    expect( ps.get_object_at_pos ( pos ) ).toBe ( p );

    ps.remove_object ( p );

    expect( ps.get_object_at_pos ( pos ) ).toBeUndefined ();

    ps.add_object ( o );
    ps.add_object ( q );
});

test('PuzzleState insert unique', () => 
{
    let ps = new traverse.PuzzleState ();

    let o = new traverse.PuzzleObject ( 
        traverse.PuzzleObjects.Types.Boo, 
        new traverse.PuzzleObjects.Position ( 1, 1 ),
        new traverse.PuzzleObjects.States.Static () 
    );

    let p = new traverse.PuzzleObject ( 
        traverse.PuzzleObjects.Types.Boo, 
        new traverse.PuzzleObjects.Position ( 1, 3 ),
        new traverse.PuzzleObjects.States.Static () 
    );

    let pos_1 = new traverse.PuzzleObjects.Position ( 1, 1 );
    let pos_2 = new traverse.PuzzleObjects.Position ( 1, 3 );

    ps.add_object ( o );

    expect( ps.get_object_at_pos ( pos_1 ) ).toBe ( o );

    expect ( ps.get_unique_object ( "boo" )).toBe ( o );

    expect ( () => ps.add_object ( p ) ).toThrow ();

    let u = ps.get_unique_object ( "boo" );

    ps.remove_object ( u );

    expect( ps.get_object_at_pos ( pos_1 ) ).toBeUndefined ();
    
    expect ( ps.get_unique_object ( "boo" ) ).toBeUndefined ();

    ps.add_object ( p );

    expect( ps.get_object_at_pos ( pos_2 ) ).toBe ( p );

    expect ( ps.get_unique_object ( "boo" ) ).toBe ( p );
});

test ( "PuzzleState to prolog", () =>
{
    let o_js = new traverse.PuzzleObject ( 
        traverse.PuzzleObjects.Types.Boo, 
        new traverse.PuzzleObjects.Position ( 1, 1 ),
        new traverse.PuzzleObjects.States.Static () 
    );

    let o_pl = "[boo,[1,1],[static]]";

    expect ( o_js.get_prolog () ).toEqual ( o_pl );

});
