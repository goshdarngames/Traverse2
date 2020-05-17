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
        State : function ()
        {
            this.get_graphics = function ( type, traverse_data )
            {
                //TODO pass state name here?
                return type.get_graphics ();
            };
        };

        Static : function ( x, y )
        {
            this.x = x;
            this.y = y;

        };

        Moving : function ( x, y, dx, dy )
        {
            this.x = x;
            this.y = y;
            this.d.x = d.x;
            this.d.y = d.y;
        };
    };

    /**
     * Instantiated when a puzzle object is needed in game.
     */
    traverse.PuzzleObject = function ( type, state )
    {
        this.type = type;
        this.state = state;
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

            if ( this.get_object_at_pos ( o.x, o.y ) != undefined )
            {
                throw `Object already exists at ${o.x} ${o.y}`
            }

            if ( o.unique )
            {
                if ( unique_objects.has ( o.name ) )
                {
                    throw `Unique object ${o.name} already exists`
                }

                unique_objects.set ( o.name, o );
            }
            
            if ( position_index.get ( o.x ) == undefined )
            {
                position_index.set ( o.x, new Map () );
            }
            
            position_index.get ( o.x ) .set ( o.y, o );

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

            position_index.get ( o.x ) .delete ( o.y );

            if ( position_index.get ( o.x ).size <= 0 )
            {
                position_index.delete ( o.x );
            }

            if ( o.unique )
            {
                unique_objects.delete ( o.name );
            }

        };

    };

    traverse.valid_puzzle_state = function ( s )
    {
        //TODO - check traverse rules prolog
        return false;
    };

} ( window.traverse = window.traverse || {} ))

