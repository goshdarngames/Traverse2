( function ( traverse, undefined )
{
    traverse.TitleState = function ( traverse_data )
    {

        this.tick = function ( traverse_data )
        {
        };

        let start = function ()
        {
            init_control_panel ();
        };

        let init_control_panel = function ()
        {
            traverse.set_control_panel_title ( "Main Menu" );

            traverse.clear_control_panel_content ();
        };

        start ();

    };

} ( window.traverse = window.traverse || {} ))
