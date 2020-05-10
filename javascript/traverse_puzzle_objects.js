( function ( traverse, undefined )
{
    traverse.PuzzleObject = function ( type, x, y )
    {
        this.type = type;
        this.x = x;
        this.y = y;
    };

    traverse.PuzzleState = function ( object_list )
    {
        this.object_list = object_list;

        this.position_index = {};

        object_list.forEach ( ( o ) =>
        {
            if ( this.position_index [ o.x ] == undefined )
            {
                this.position_index [ o.x ] = {};
            }

            this.position_index [ o.x ] [ o.y ] = o.type;
        });

        this.get_object_type_at = function ( x, y )
        {
            if ( this.position_index [ x ] != undefined )
            {
                return this.position_index [ x ][ y ];
            }
        };
    };

    traverse.valid_puzzle_state = function ( s )
    {
        //TODO - check traverse rules prolog
        return false;
    };

} ( window.traverse = window.traverse || {} ))

