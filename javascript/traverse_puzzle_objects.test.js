require('./traverse_puzzle_objects');

test('empty puzzle', () => 
{
    let ps = new traverse.PuzzleState ( [] );
    expect( ps.object_list ).toEqual ( [] );
});

test('get_object_at_pos', () => 
{
    let obj_1 = new traverse.PuzzleObject ( "a", 1, 1 );
    let obj_2 = new traverse.PuzzleObject ( "b", 2, 1 );
    let obj_3 = new traverse.PuzzleObject ( "c", 3, 1 );
    let obj_4 = new traverse.PuzzleObject ( "d", 3, 2 );

    let ps = new traverse.PuzzleState ( [ obj_1, obj_2, obj_3, obj_4 ] );

    expect( ps.get_object_at_pos ( 1, 1 ) ).toBe ( obj_1 );
    expect( ps.get_object_at_pos ( 2, 1 ) ).toBe ( obj_2 );
    expect( ps.get_object_at_pos ( 3, 1 ) ).toBe ( obj_3 );
    expect( ps.get_object_at_pos ( 3, 2 ) ).toBe ( obj_4 );

    expect( ps.get_object_at_pos ( 8, 7 ) ).toBeUndefined ();
});

