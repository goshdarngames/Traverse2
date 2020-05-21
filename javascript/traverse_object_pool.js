//Create objects once and re-use many times

( function ( traverse, undefined )
{
    traverse.ObjectPool = function ( make_item, initial_capacity )
    {
        let pool = [];

        for ( let i = 0; i < initial_capacity; i++ )
        {
            pool.push ( make_item () );
        }

        this.pop = function ()
        {
            if ( pool.length > 0 )
            {
                return pool.pop ();
            }
            else
            {
                return make_item ();
            }
        }

        this.push = function ( o )
        {
            pool.push ( o );
        }
    };
} ( window.traverse = window.traverse || {} ))
