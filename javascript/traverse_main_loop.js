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

} ( window.traverse = window.traverse || {} ))

