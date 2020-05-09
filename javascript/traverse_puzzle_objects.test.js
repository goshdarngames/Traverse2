const sum = require('./traverse_puzzle_objects');

test('empty puzzle', () => 
{
    let po = new traverse.PuzzleState ( [] );
    expect( po.object_list ).toEqual ( [] );
});

