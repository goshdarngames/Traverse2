require('./traverse_object_pool');

test('create PoolItem', () => 
{
    let TestObject = function () 
    {
        x : 1
    };

    let pi = new traverse.PoolItem ( () => new TestObject (), 10 );

    expect ( pi.pool.length ).toBe ( 10 );

    pi.pool.forEach ( ( i ) => expect ( i ).toBeInstanceOf ( TestObject ) );
});

