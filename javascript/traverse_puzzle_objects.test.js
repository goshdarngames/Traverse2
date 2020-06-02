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

test ( "Puzzle object from prolog", () =>
{
    let o_0 = new traverse.PuzzleObject ( 
        traverse.PuzzleObjects.Types.Boo, 
        new traverse.PuzzleObjects.Position ( 1, 1 ),
        new traverse.PuzzleObjects.States.Static () 
    );

    let o_pl = ["boo",[1,1],["static"]];

    let o_1 = traverse.PuzzleObjects.object_from_prolog ( o_pl );


    let p_0 = new traverse.PuzzleObject ( 
        traverse.PuzzleObjects.Types.Bogey, 
        new traverse.PuzzleObjects.Position ( 1, 2 ),
        new traverse.PuzzleObjects.States.Moving (
            new traverse.PuzzleObjects.Position ( 8, 2 )
        ) 
    );

    let p_pl = ["bogey",[1,2],["moving", [8,2] ] ];

    let p_1 = traverse.PuzzleObjects.object_from_prolog ( p_pl );


    let q_0 = new traverse.PuzzleObject ( 
        traverse.PuzzleObjects.Types.Wall, 
        new traverse.PuzzleObjects.Position ( 1, 3 ),
        new traverse.PuzzleObjects.States.Static () 
    );

    let q_pl = ["wall",[1,3],["static"]];

    let q_1 = traverse.PuzzleObjects.object_from_prolog ( q_pl );

    expect ( o_0.equals ( o_1 ) ).toBeTruthy ();
    expect ( p_0.equals ( p_1 ) ).toBeTruthy ();
    expect ( q_0.equals ( q_1 ) ).toBeTruthy ();

});

test ( "Prolog to PuzzleState", () =>
{
    //prolog puzzle state as expected when converted to JS
    let pl_array = [
        ["boo",[1,1],["static"]],
        ["bogey",[1,2],["static"]],
        ["wall",[1,3],["static"]],
    ];

    //try a typical simple case

    let ps = traverse.PuzzleObjects.puzzle_state_from_prolog ( pl_array );

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


test('PuzzleState get_objects', () => 
{
    let ps_0 = new traverse.PuzzleState ();

    let o_0 = new traverse.PuzzleObject ( 
        traverse.PuzzleObjects.Types.Wall, 
        new traverse.PuzzleObjects.Position ( 1, 1 ),
        new traverse.PuzzleObjects.States.Static () 
    );

    let p_0 = new traverse.PuzzleObject ( 
        traverse.PuzzleObjects.Types.Wall, 
        new traverse.PuzzleObjects.Position ( 2, 1 ),
        new traverse.PuzzleObjects.States.Static () 
    );

    let q_0 = new traverse.PuzzleObject ( 
        traverse.PuzzleObjects.Types.Wall, 
        new traverse.PuzzleObjects.Position ( 1, 2 ),
        new traverse.PuzzleObjects.States.Static () 
    );

    ps_0.add_object ( o_0 );
    ps_0.add_object ( p_0 );
    ps_0.add_object ( q_0 );

    let objects = ps_0.get_objects ();

    expect ( objects.size ).toEqual ( 3 );

    expect ( objects.has ( o_0 ) ).toBeTruthy ();
    expect ( objects.has ( p_0 ) ).toBeTruthy ();
    expect ( objects.has ( q_0 ) ).toBeTruthy ();

});
    
test('PuzzleState equality', () => 
{
    let ps_0 = new traverse.PuzzleState ();

    let o_0 = new traverse.PuzzleObject ( 
        traverse.PuzzleObjects.Types.Wall, 
        new traverse.PuzzleObjects.Position ( 1, 1 ),
        new traverse.PuzzleObjects.States.Static () 
    );

    let p_0 = new traverse.PuzzleObject ( 
        traverse.PuzzleObjects.Types.Wall, 
        new traverse.PuzzleObjects.Position ( 2, 1 ),
        new traverse.PuzzleObjects.States.Static () 
    );

    let q_0 = new traverse.PuzzleObject ( 
        traverse.PuzzleObjects.Types.Wall, 
        new traverse.PuzzleObjects.Position ( 1, 2 ),
        new traverse.PuzzleObjects.States.Static () 
    );

    ps_0.add_object ( o_0 );
    ps_0.add_object ( p_0 );
    ps_0.add_object ( q_0 );
    
    let ps_1 = new traverse.PuzzleState ();

    let o_1 = new traverse.PuzzleObject ( 
        traverse.PuzzleObjects.Types.Wall, 
        new traverse.PuzzleObjects.Position ( 1, 1 ),
        new traverse.PuzzleObjects.States.Static () 
    );

    let p_1 = new traverse.PuzzleObject ( 
        traverse.PuzzleObjects.Types.Wall, 
        new traverse.PuzzleObjects.Position ( 2, 1 ),
        new traverse.PuzzleObjects.States.Static () 
    );

    let q_1 = new traverse.PuzzleObject ( 
        traverse.PuzzleObjects.Types.Wall, 
        new traverse.PuzzleObjects.Position ( 1, 2 ),
        new traverse.PuzzleObjects.States.Static () 
    );

    expect ( o_0.equals ( o_1 ) ).toBeTruthy ();
    expect ( p_0.equals ( p_1 ) ).toBeTruthy ();
    expect ( q_0.equals ( q_1 ) ).toBeTruthy ();

    expect ( ps_0.equals ( ps_1 ) ).toBeFalsy ();

    ps_1.add_object ( o_1 );
    expect ( ps_0.equals ( ps_1 ) ).toBeFalsy ();

    ps_1.add_object ( p_1 );
    expect ( ps_0.equals ( ps_1 ) ).toBeFalsy ();

    ps_1.add_object ( q_1 );
    expect ( ps_0.equals ( ps_1 ) ).toBeTruthy ();
    
});
