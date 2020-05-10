const sum = require('./traverse_puzzle_objects');

test('empty puzzle', () => 
{
    let ps = new traverse.PuzzleState ( [] );
    expect( ps.object_list ).toEqual ( [] );
});

test('one-piece puzzle', () => 
{
    let obj = new traverse.PuzzleObject ( "wall", 1, 1 );

    let ps = new traverse.PuzzleState ( [ obj ] );

    expect( ps.object_list ).toEqual ( [ obj ] );

    expect( ps.position_index [ 1 ][ 1 ] ).toEqual ( "wall" );
});

test('multi-piece puzzle', () => 
{
    let obj_1 = new traverse.PuzzleObject ( "wall", 1, 1 );
    let obj_2 = new traverse.PuzzleObject ( "wall", 2, 1 );
    let obj_3 = new traverse.PuzzleObject ( "wall", 3, 1 );
    let obj_4 = new traverse.PuzzleObject ( "wall", 3, 2 );

    let ps = new traverse.PuzzleState ( [ obj_1, obj_2, obj_3, obj_4 ] );

    expect( ps.object_list ).toEqual ( [ obj_1, obj_2, obj_3, obj_4 ] );

    expect( ps.position_index [ 1 ][ 1 ] ).toEqual ( "wall" );
    expect( ps.position_index [ 2 ][ 1 ] ).toEqual ( "wall" );
    expect( ps.position_index [ 3 ][ 1 ] ).toEqual ( "wall" );
    expect( ps.position_index [ 3 ][ 2 ] ).toEqual ( "wall" );
});

