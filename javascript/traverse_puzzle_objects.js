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

            get_graphics : function ( type, traverse_data )
            {
                return traverse_data.wall_graphics_pool.pop ();
            },
        },

        Bogey : 
        {
            name : "bogey",

            unique : true,

            get_graphics : function ( type, traverse_data )
            {
                return traverse_data.bogey_graphics_pool.pop ();
            },
        },

        Boo : 
        {
            name : "boo",

            unique : true,

            get_graphics : function ( type, traverse_data )
            {
                return traverse_data.boo_graphics_pool.pop ();
            },
        },

    };

    traverse.PuzzleObjects.States = 
    {
        Static : function ()
        {
            this.get_prolog = function ()
            {
                return "[static]"
            };
        },

        //Moving towards dest
        Moving : function ( dest )
        {
            this.dest = dest;

            this.get_prolog = function ()
            {
                return `[moving,${this.dest.get_prolog()}]`;
            };
        },

        //leaving the screen
        Exit : function ( d )
        {
            this.direction = d;
        }
    };

    traverse.PuzzleObjects.Position = function ( x, y )
    {
        this.x = x;
        this.y = y;

        this.get_prolog = function ()
        {
            return `[${this.x},${this.y}]`;
        };
    };

    traverse.PuzzleObjects.Direction = 
    {
        Up : 
        {
            get_prolog : function ()
            {
                return "up";
            },
        },

        Down : 
        {
            get_prolog : function ()
            {
                return "down";
            },
        },

        Left : 
        {
            get_prolog : function ()
            {
                return "left";
            },
        },

        Right : 
        {
            get_prolog : function ()
            {
                return "right";
            },
        },

    };

    traverse.PuzzleObjects.Input = function ( ob, dir )
    {
        this.ob = ob;
        this.dir = dir;

        this.get_prolog = function ()
        {
            return `[${this.ob.get_prolog()}, ${this.dir.get_prolog()}]`;
        };
    };

    /**
     * Instantiated when a puzzle object is needed in game.
     */
    traverse.PuzzleObject = function ( type, position, state )
    {
        this.type = type;
        this.state = state;
        this.position = position;

        this.get_graphics = function ( traverse_data )
        {
            return this.type.get_graphics ( this.state, traverse_data );
        };

        this.get_prolog = function ()
        {
            let type_p = this.type.name;
            let state_p = this.state.get_prolog();
            let pos_p = this.position.get_prolog();

            return `[${type_p},${pos_p},${state_p}]`
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

            if ( this.get_object_at_pos ( o.position ) )
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

        /**
         * Takes a position object and searches the puzzle state for
         * an object at that postion.
         */
        this.get_object_at_pos = function ( pos )
        {
            if ( position_index.get ( pos.x ) != undefined )
            {
                return position_index.get ( pos.x ).get ( pos.y );
            }
        };

        /**
         * Access unique objects (e.g. boo / bogey ) by name.
         */
        this.get_unique_object = function ( name )
        {
            return unique_objects.get ( name );
        };

        /**
         * Removes a puzzle object from the state.  Note the object is
         * addressed by reference rather than an equality check.
         */
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

        /**
         * Calls get_prolog () on all objects in the puzzle state and
         * returns a string prolog array of the puzzle state.
         */
        this.get_prolog = function ()
        {
            let objects_pl = [...objects].map ( o => o.get_prolog () );

            return `[${objects_pl.join()}]`
        };

        /**
         * When called on an empty puzzle state object this will add
         * the objects defined in the prolog array.
         */
        this.load_prolog = function ( pl_array )
        {
        };

    };

    traverse.valid_puzzle_state = function ( s )
    {
        //TODO - check traverse rules prolog
        return false;
    };

} ( self.traverse = self.traverse || {} ))

