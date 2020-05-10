//Create objects once and re-use many times

//TODO - Object Pool
//TODO - Pool Item
//TODO - Pool User
( function ( traverse, undefined )
{
    traverse.PoolItem = function ( constructor, initial_capacity )
    {
        this.pool = [];

        for ( let i = 0; i < 10; i++ )
        {
            this.pool.push ( constructor () );
        }
    };
} ( window.traverse = window.traverse || {} ))
