( function ( traverse, undefined )
{
    /**
     * Stores a set of template constructors that are passed to the
     * PuzzleObject constructor in order to define its behaviour.
     */
    traverse.PuzzleObjects = 
    {
        Wall : function ()
        {
            this.name = "wall";

            this.unique = false;

            this.get_graphics = function ( traverse_data )
            {
                return new traverse.puzzle_object_graphics.WallGraphics ();
            };
        },

        Bogey : function ()
        {
            this.name = "bogey";

            this.unique = true;

            this.get_graphics = function ( traverse_data )
            {
                return new traverse.puzzle_object_graphics.BogeyGraphics ();
            };
        },

        Boo : function ()
        {
            this.name = "boo";

            this.unique = true;

            this.get_graphics = function ( traverse_data )
            {
                return new traverse.puzzle_object_graphics.BooGraphics ();
            };

        },

    };

    /**
     * Instantiated when a puzzle object is needed in game.
     */
    traverse.PuzzleObject = function ( template, x, y )
    {
        template.call ( this );
        this.x = x;
        this.y = y;

        //TODO - replace x/y with state - e.g. state: staic(x,y)
        //                                     state: moving ( x, y, dx, dy )
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

