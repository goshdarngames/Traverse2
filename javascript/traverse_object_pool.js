//Create objects once and re-use many times

//TODO - Object Pool
//TODO - Pool Item
//TODO - Pool User
( function ( traverse, undefined )
{
    traverse.PoolItem = function ( constructor, initial_capacity )
    {
        this.pool = [ 10,10,10,10,10,10,10,10,10,10 ];
    };
} ( window.traverse = window.traverse || {} ))
