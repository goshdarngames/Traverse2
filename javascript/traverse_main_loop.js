( function ( traverse, undefined )
{
    let current_state = undefined;

    traverse.main_loop = function ( traverse_data )
    {
        current_state.tick ( traverse_data );
    };

    traverse.change_state = function ( new_state )
    {
        current_state = new_state;
    };

} ( window.traverse = window.traverse || {} ))

