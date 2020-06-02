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

            this.equals = function ( other )
            {
                return this.__proto__ === other.__proto__;
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

            this.equals = function ( other )
            {
                return this.__proto__ === other.__proto__ 
                       && this.dest.equals ( other.dest );
            };
        },

        //leaving the screen
        Exit : function ( d )
        {
            this.direction = d;

            this.equals = function ( other )
            {
                return this.__proto__ === other.__proto__ && 
                       this.direction === other.direction;
            };
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

        this.equals = function ( other )
        {
            return this.x == other.x && this.y == other.y;
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

        this.equals = function ( other )
        {
            let type_eq = this.type === other.type;
            let pos_eq = this.position.equals ( other.position );
            let state_eq = this.state.equals ( other.state );
            
            return type_eq && pos_eq && state_eq;
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

        this.get_objects = function () 
        {
            return objects;
        };

        /**
         * Returns true if this puzzle state is equivalent to ps.
         */
        this.equals = function ( ps )
        {
            let other_objects = ps.get_objects ();

            if ( other_objects.size != objects.size )
            {
                return false;
            }

            [ ...objects ].forEach ( o => 
            {
                let other =  ps.get_object_at_pos ( o.position );

                if ( !o.equals ( other ) )
                {
                    return false;
                }
            });

            return true;
        };

        /**
         * Calls get_prolog () on all objects in the puzzle state and
         * returns a string prolog array of the puzzle state.
         *
         * Note:  the string representation is most suitable for 
         *        querying the prolog system
         */
        this.get_prolog = function ()
        {
            let objects_pl = [...objects].map ( o => o.get_prolog () );

            return `[${objects_pl.join()}]`
        };

    };

    /**
     * Returns a Puzzle Object constructed from a javascript array as
     * expected from the prolog system.
     */
    traverse.PuzzleObjects.object_from_prolog = function ( pl_arr )
    {
        let make_type = ( str ) =>
        {
            switch ( str )
            {
                case "boo"   : return traverse.PuzzleObjects.Types.Boo;
                case "bogey" : return traverse.PuzzleObjects.Types.Bogey;
                case "wall"  : return traverse.PuzzleObjects.Types.Wall;
            }
        };

        let make_pos = ( pos_arr ) =>
        {
            return new traverse.PuzzleObjects.Position ( pos_arr [ 0 ],
                                                         pos_arr [ 1 ] );
        };

        let make_state = ( state_arr ) =>
        {
            switch ( state_arr [ 0 ] )
            {
                case "static" : 
                {
                    return new traverse.PuzzleObjects.States.Static ();
                }
                case "moving" :
                {
                    return new traverse.PuzzleObjects.States
                        .Moving ( make_pos ( state_arr [ 1 ] ) );
                }
            }
        };

        let po = new traverse.PuzzleObject (
            make_type  ( pl_arr [ 0 ] ),
            make_pos   ( pl_arr [ 1 ] ),
            make_state ( pl_arr [ 2 ] )   
        );

        return po;

    };

    /**
     * Returns a Puzzle State constructed from a javascript array as
     * expected from the prolog system.
     */
    traverse.PuzzleObjects.puzzle_state_from_prolog = function ( pl_arr )
    {
        let ps = new traverse.PuzzleState ();

        let objects = pl_arr.map ( 
            pl => traverse.PuzzleObjects.object_from_prolog ( pl ) );

        objects.forEach ( o => ps.add_object ( o ) );

        return ps;
    };

} ( self.traverse = self.traverse || {} ))

