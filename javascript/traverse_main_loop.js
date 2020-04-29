( function ( traverse, undefined )
{
    traverse.mainLoop = function ( traverse_data )
    {
        if ( traverse_data.game_state == undefined )
        {
            traverse_data.game_state = new traverse.LoadState ();
        }

        traverse_data.game_state.tick ( traverse_data );
    };

    /*
    let start_state = function ( traverse_data )
    {
        traverse_data.wall_graphics = new traverse_data.pixi.Graphics ();

        traverse_data.wall_graphics.beginFill(0xFFFF00);

        traverse_data.wall_graphics.lineStyle( 5, 0xFF0000);

        traverse_data.wall_graphics.drawRect (0,0, 300,200 );

        traverse_data.pixi_app.stage.addChild ( traverse_data.wall_graphics );
    };
    */

    //TODO - Add a function to create wall graphics from prolog rules
} ( window.traverse = window.traverse || {} ))

