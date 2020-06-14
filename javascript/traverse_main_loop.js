( function ( traverse, undefined )
{
    let current_state = undefined;

    traverse.pixi_events = 
    {
        stage_clicked = () => 
        { 
            if ( current_state != undefined ) current_state.stage_clicked ();
        };
    };

    traverse.main_loop = function ( traverse_data )
    {
        if ( current_state != undefined )
        {
            current_state.tick ( traverse_data );
        }
    };

    traverse.change_state = function ( new_state, traverse_data )
    {
        if ( current_state != undefined )
        {
            current_state.exit_state ( traverse_data );
        }

        current_state = new_state;

        new_state.enter_state ( traverse_data );
    };

} ( self.traverse = self.traverse || {} ))

