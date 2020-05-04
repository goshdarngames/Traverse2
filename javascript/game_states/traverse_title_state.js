( function ( traverse, undefined )
{
    traverse.TitleState = function ()
    {
        let start = function ( traverse_data )
        {
            let cp = traverse_data.dom_elements.control_panel;
            
            cp.set_title ( "Main Menu" );

            cp.clear_content ();

            let play_button = document.createElement ( "BUTTON" );
            play_button.innerHTML = "Play";

            cp.add_content ( play_button );

            this.tick = () => {};

        };

        this.tick = start;

    };

} ( window.traverse = window.traverse || {} ))
