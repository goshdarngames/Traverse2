( function ( traverse, undefined )
{
    traverse.PuzzleObject = function ( type, x, y )
    {
        this.type = type;
        this.x = x;
        this.y = y;
    };

    traverse.PuzzleState = function ()
    {
        let position_index = {};

        this.add_object = function ( o )
        {
            if ( this.get_object_at_pos ( o.x, o.y ) != undefined )
            {
                throw `Object already exists at ${o.x} ${o.y}`
            }

            if ( position_index [ o.x ] == undefined )
            {
                position_index [ o.x ] = {};
            }
            
            position_index [ o.x ] [ o.y ] = o;
            
        };

        this.remove_object_at_pos = function ( x, y )
        {
            if ( this.get_object_at_pos ( x, y ) == undefined )
            {
                throw `Nothing exists at ${x} ${y}`
            }

            delete ( position_index [ x ] [ y ] );

            if ( Object.keys ( position_index [ x ] ).length <= 0 )
            {
                delete ( position_index [ x ] );
            }

        };

        this.get_object_at_pos = function ( x, y )
        {
            if ( position_index [ x ] != undefined )
            {
                return position_index [ x ][ y ];
            }
        };
    };

    traverse.valid_puzzle_state = function ( s )
    {
        //TODO - check traverse rules prolog
        return false;
    };

} ( window.traverse = window.traverse || {} ))

