require('./traverse_object_pool');

test('create PoolItem', () => 
{
    let TestObject = function () {};

    let pi = new traverse.PoolItem ( () => new TestObject (), 10 );

    let initial_objects = new Set ();

    for ( let i = 0; i < 10; i++ )
    {
        let o = pi.pop ();

        expect ( o ).toBeInstanceOf ( TestObject );

        initial_objects.add ( o );
    }

    //set membership asserts all objects are different
    expect ( initial_objects.size ).toBe ( 10 );

    let extra = pi.pop ();

    expect ( extra ).toBeInstanceOf ( TestObject );

    expect ( initial_objects.has ( extra ) ).toBeFalsy ();
     
    pi.push ( extra );

    initial_objects.forEach ( ( o ) => pi.push ( o ) );

    let secondary_objects = new Set ();

    for ( let i = 0; i < 12; i++ )
    {
        let o = pi.pop ();

        expect ( o ).toBeInstanceOf ( TestObject );

        secondary_objects.add ( o );
    }

    expect ( secondary_objects.size ).toBe ( 12 );

    expect ( secondary_objects.has ( extra ) ).toBeTruthy ();

    initial_objects.forEach ( 
        ( o ) => expect ( secondary_objects.has ( o ) ).toBeTruthy () );

});

