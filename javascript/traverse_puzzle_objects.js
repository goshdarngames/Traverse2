( function ( traverse, undefined )
{
    traverse.PuzzleObjects = 
    {
        wall :
        {
            name : "wall",

            get_graphics : function ( traverse_data )
            {
                enable_fun = ( x, y ) => 
                {
                    let data = {};

                    data.sprite = traverse_data.wall_sprite_pool.pop ();

                    traverse_data.pixi_app.stage.addChild ( data.sprite );

                    return data;
                }; 

                disable_fun = () => {}; 

                move_fun = ( data, x, y ) => 
                {
                    data.sprite.position.x = x;
                    data.sprite.position.y = y;
                };

                let g = new PuzzleObjectGraphics ( 
                    enable_fun, disable_fun, move_fun );

                return g;
            },
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

    /**
     * These objects are to be associated with a puzzle object in order
     * to draw it on screen.
     */
    let PuzzleObjectGraphics = function ( enable_fun, disable_fun, move_fun )
    {
        this.enabled = false;

        this.data = undefined;

        this.enable = function ( screen_x, screen_y )
        {
            if ( this.enabled )
            {
                throw "Already enabled.";
            }

            this.data = enable_fun ();

            this.enabled = true;

            this.move ( screen_x, screen_y );
        };

        this.disable = function ()
        {
            if ( !this.enabled )
            {
                throw "Not enabled.";
            }

            disable_fun ( this.data );

        };

        this.move = function ( screen_x, screen_y )
        {
            if ( !this.enabled )
            {
                throw "Not enabled.";
            }

            move_fun ( this.data, screen_x, screen_y );

        };
    };

    /**
     * Puzzle object that is not moving.
     */
    traverse.StaticPuzzleObject = function ( puzzle_ob, x, y )
    {
        this.puzzle_ob = puzzle_ob;
        this.x = x;
        this.y = y;
    };

    traverse.PuzzleState = function ()
    {
        let position_index = new Map ();

        //TODO - add moving object set

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

} ( window.traverse = window.traverse || {} ))

