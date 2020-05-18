( function ( traverse, undefined )
{
    /**
     * Stores a set of template constructors that are passed to the
     * PuzzleObject constructor in order to define its behaviour.
     */
    traverse.PuzzleObjects = {};

    traverse.PuzzleObjects.Types = 
    {
        Wall : 
        {
            name : "wall",

            unique : false,

            get_graphics : function ( traverse_data )
            {
                return traverse_data.wall_graphics_pool.pop ();
            },
        },

        Bogey : 
        {
            name : "bogey",

            unique : true,

            get_graphics : function ( traverse_data )
            {
                return traverse_data.bogey_graphics_pool.pop ();
            },
        },

        Boo : 
        {
            name : "boo",

            unique : true,

            get_graphics : function ( traverse_data )
            {
                return traverse_data.bogey_graphics_pool.pop ();
            },
        },

    };

    traverse.PuzzleObjects.States = 
    {
        Static : function ()
        {
        },

        Moving : function ( dx, dy )
        {
            this.dx = dx;
            this.dy = dy;
        },
    };

    traverse.PuzzleObjects.Position = function ( x, y )
    {
        this.x = x;
        this.y = y;
    };

    /**
     * Instantiated when a puzzle object is needed in game.
     */
    traverse.PuzzleObject = function ( type, position, state )
    {
        this.type = type;
        this.state = state;
        this.position = position;

        this.get_graphics = function ( type, traverse_data )
        {
            return this.type.get_graphics ( this.state );
        };
    };

    /**
     * Keeps track of the position of puzzle pieces in a level.
     */
    traverse.PuzzleState = function ()
    {
        //set of all puzzle objects
        let objects = new Set ();

        // { x -> { y -> ob }
        let position_index = new Map ();

        // { name -> o }
        let unique_objects = new Map ();


        //TODO - add moving object set

        this.add_object = function ( o )
        {
            if ( objects.has ( o ) )
            {
                throw "Object already in puzzle state.";
            }

            if ( this.get_object_at_pos ( o.position.x, o.position.y ) )
            {
                throw `Object exists at ${o.position.x} ${o.position.y}`
            }

            if ( o.type.unique )
            {
                if ( unique_objects.has ( o.type.name ) )
                {
                    throw `Unique object ${o.type.name} already exists`
                }

                unique_objects.set ( o.type.name, o );
            }
            
            if ( position_index.get ( o.position.x ) == undefined )
            {
                position_index.set ( o.position.x, new Map () );
            }
            
            position_index.get ( o.position.x ) .set ( o.position.y, o );

            objects.add ( o );
        };

        this.get_object_at_pos = function ( x, y )
        {
            if ( position_index.get ( x ) != undefined )
            {
                return position_index.get ( x ).get ( y );
            }
        };

        this.get_unique_object = function ( name )
        {
            return unique_objects.get ( name );
        };

        this.remove_object = function ( o )
        {
            if ( o == undefined )
            {
                throw "Remove undefined object.";
            }

            if ( !objects.has ( o ) )
            {
                throw "Object not in puzzle state.";
            }

            objects.delete ( o );

            position_index.get ( o.position.x ) .delete ( o.position.y );

            if ( position_index.get ( o.position.x ).size <= 0 )
            {
                position_index.delete ( o.position.x );
            }

            if ( o.type.unique )
            {
                unique_objects.delete ( o.type.name );
            }

        };

    };

    traverse.valid_puzzle_state = function ( s )
    {
        //TODO - check traverse rules prolog
        return false;
    };

} ( window.traverse = window.traverse || {} ))

