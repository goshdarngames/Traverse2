( function ( traverse, undefined )
{
    traverse.TitleState = function ()
    {
        let start = function ( traverse_data )
        {
            let cp = traverse_data.dom_elements.control_panel;
            
            cp.set_title ( "Main Menu" );

            cp.clear_content ();

            let add_menu_button = ( cp, text ) =>
            {
                let button = document.createElement ( "BUTTON" );
                
                button.innerHTML = text;

                cp.add_content ( button );
            };

            add_menu_button ( cp, "Play" );
            add_menu_button ( cp, "Create" );

            this.tick = () => {};

        };

        this.tick = start;

    };

} ( window.traverse = window.traverse || {} ))
