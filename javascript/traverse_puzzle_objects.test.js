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

    let p_js = new traverse.PuzzleObject ( 
        traverse.PuzzleObjects.Types.Bogey, 
        new traverse.PuzzleObjects.Position ( 1, 2 ),
        new traverse.PuzzleObjects.States.Static () 
    );

    let q_js = new traverse.PuzzleObject ( 
        traverse.PuzzleObjects.Types.Wall, 
        new traverse.PuzzleObjects.Position ( 1, 3 ),
        new traverse.PuzzleObjects.States.Static () 
    );

    let o_pl = "[boo,[1,1],[static]]";
    let p_pl = "[bogey,[1,2],[static]]";
    let q_pl = "[wall,[1,3],[static]]";

    expect ( o_js.get_prolog () ).toEqual ( o_pl );
    expect ( p_js.get_prolog () ).toEqual ( p_pl );
    expect ( q_js.get_prolog () ).toEqual ( q_pl );

    let ps = new traverse.PuzzleState ();

    ps.add_object ( o_js );
    ps.add_object ( p_js );
    ps.add_object ( q_js );

    let ps_pl = `[${o_pl},${p_pl},${q_pl}]`

    expect ( ps.get_prolog () ).toEqual ( ps_pl );
});

test ( "Prolog to PuzzleState", () =>
{
    //prolog puzzle state as expected when converted to JS
    let pl_array = [
        ["boo",[1,1],["static"]],
        ["bogey",[1,2],["static"]],
        ["wall",[1,3],["static"]],
    ];

    //Non-empty should throw

    let non_empty_ps = new traverse.PuzzleState ();

    let o = new traverse.PuzzleObject ( 
        traverse.PuzzleObjects.Types.Boo, 
        new traverse.PuzzleObjects.Position ( 1, 1 ),
        new traverse.PuzzleObjects.States.Static () 
    );

    non_empty_ps.add_object ( o ); 

    expect ( non_empty_ps.load_prolog ( pl_array ) ).toThrow ();

    //try a typical simple case

    let ps = new traverse.PuzzleState ();

    ps.load_prolog ( pl_array );

    let boo = ps.get_unique_object ( "boo" );

    expect ( boo ).toBeDefined ();

    expect ( boo.position.x ).toEqual ( 1 );
    expect ( boo.position.y ).toEqual ( 1 );

    expect ( boo.state ).toBeInstanceOf ( 
        traverse.PuzzleObjects.States.Static );

    let bogey = ps.get_unique_object ( "bogey" );

    expect ( bogey ).toBeDefined ();

    expect ( bogey.position.x ).toEqual ( 1 );
    expect ( bogey.position.y ).toEqual ( 2 );

    expect ( bogey.state ).toBeInstanceOf ( 
        traverse.PuzzleObjects.States.Static );

    let wall_pos = new traverse.PuzzleObjects.Position ( 1, 3 );
    let wall = ps.get_object_at_pos( wall_pos );

    expect ( wall ).toBeDefined ();

    expect ( wall.position.x ).toEqual ( 1 );
    expect ( wall.position.y ).toEqual ( 3 );

    expect ( wall.state ).toBeInstanceOf ( 
        traverse.PuzzleObjects.States.Static );

});
