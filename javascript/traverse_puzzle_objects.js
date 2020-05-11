( function ( traverse, undefined )
{
    traverse.PuzzleObjects = 
    {
        wall :
        {
            name : "wall",
        },

        bogey :
        {
            name : "bogey",
        },

        boo :
        {
            name : "boo",
        },

    };
    traverse.PuzzleObject = function ( type, x, y )
    {
        this.type = type;
        this.x = x;
        this.y = y;
    };

    traverse.PuzzleState = function ()
    {
        let position_index = new Map ();

        this.add_object = function ( o )
        {
            if ( this.get_object_at_pos ( o.x, o.y ) != undefined )
            {
                throw `Object already exists at ${o.x} ${o.y}`
            }

            if ( position_index.get ( o.x ) == undefined )
            {
                position_index.set ( o.x, new Map () );
            }
            
            position_index.get ( o.x ) .set ( o.y, o );
            
        };

        this.remove_object_at_pos = function ( x, y )
        {
            if ( this.get_object_at_pos ( x, y ) == undefined )
            {
                throw `Nothing exists at ${x} ${y}`
            }

            position_index.get ( x ) .delete ( y );

            if ( position_index.get ( x ).size <= 0 )
            {
                position_index.delete ( x );
            }

        };

        this.get_object_at_pos = function ( x, y )
        {
            if ( position_index.get ( x ) != undefined )
            {
                return position_index.get ( x ).get ( y );
            }
        };
    };

    traverse.valid_puzzle_state = function ( s )
    {
        //TODO - check traverse rules prolog
        return false;
    };

    traverse.PuzzleObjectGraphics = function ( puzzle_ob )
    {
        let clean_up = () => {};

        this.enable = function ( traverse_data )
        {
            //todo create sprites and store an arrow function to clean
            //them up.
        };

        this.disable = function ( traverse_data )
        {
            clean_up ();
        };
    };

} ( window.traverse = window.traverse || {} ))

