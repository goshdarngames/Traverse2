( function ( traverse, undefined )
{
    traverse.puzzle_object_graphics = {};

    traverse.puzzle_object_graphics.WallGraphics = function ()
    {
        let enable_fun = ( graphics_data, traverse_data ) => 
        {
            graphics_data.sprite = traverse_data.wall_sprite_pool.pop ();

            traverse_data.pixi_app.stage.addChild ( graphics_data.sprite );
        }; 

        let disable_fun = () => {}; 

        let move_fun = move_sprite;

        traverse.PuzzleObjectGraphics.call ( this,
                    enable_fun, disable_fun, move_fun );
    };

    traverse.puzzle_object_graphics.BogeyGraphics = function ()
    {
        let enable_fun = ( graphics_data, traverse_data ) => 
        {
            graphics_data.sprite = traverse_data.bogey_sprite_pool.pop ();

            traverse_data.pixi_app.stage.addChild ( graphics_data.sprite );
        }; 

        let disable_fun = () => {}; 

        let move_fun = move_sprite;

        traverse.PuzzleObjectGraphics.call ( this,
                    enable_fun, disable_fun, move_fun );
    };

    traverse.puzzle_object_graphics.BooGraphics = function ()
    {
        let enable_fun = ( graphics_data, traverse_data ) => 
        {
            graphics_data.sprite = traverse_data.boo_sprite_pool.pop ();

            traverse_data.pixi_app.stage.addChild ( graphics_data.sprite );
        }; 

        let disable_fun = () => {}; 

        let move_fun = move_sprite;

        traverse.PuzzleObjectGraphics.call ( this,
                    enable_fun, disable_fun, move_fun );
    };


    /**
     * These objects are to be associated with a puzzle object in order
     * to draw it on screen.
     *
     * TODO - Add support for animation ticks and state-based systems
     */
    traverse.PuzzleObjectGraphics = 
        function ( enable_fun, disable_fun, move_fun )
    {
        this.enabled = false;

        this.data = {};

        this.enable = function ( screen_x, screen_y, traverse_data )
        {
            if ( this.enabled )
            {
                throw "Already enabled.";
            }

            enable_fun ( this.data, traverse_data );

            this.enabled = true;

            this.move ( screen_x, screen_y, traverse_data );
        };

        this.disable = function ( traverse_data )
        {
            if ( !this.enabled )
            {
                throw "Not enabled.";
            }

            disable_fun ( this.data, traverse_data );

        };

        this.move = function ( screen_x, screen_y, traverse_data )
        {
            if ( !this.enabled )
            {
                throw "Not enabled.";
            }

            move_fun ( this.data, screen_x, screen_y, traverse_data );

        };
    };

    //utility functions used in multiple objects

    let move_sprite = ( data, x, y, traverse_data ) =>
    {
        data.sprite.position.x = x;
        data.sprite.position.y = y;
    };


} ( window.traverse = window.traverse || {} ))
