( function ( traverse, undefined )
{
    traverse.mainLoop = function ( traverse_data )
    {
        traverse_data.game_state.tick ( traverse_data );
    };

} ( window.traverse = window.traverse || {} ))

