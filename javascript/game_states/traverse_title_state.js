( function ( traverse, undefined )
{
    traverse.TitleState = function ()
    {
        let start = function ( traverse_data )
        {
            let cp = traverse_data.dom_elements.control_panel;
            
            cp.set_title ( "Main Menu" );

            cp.clear_content ();

            let div = document.createElement ( "DIV" );

            div.classList.add ( "flex_column" );
            div.classList.add ( "flex_centered" );
            div.classList.add ( "content_pane" );

            cp.add_content ( div );

            let add_menu_button = ( div, text ) =>
            {
                let button = document.createElement ( "BUTTON" );
                
                button.innerHTML = text;

                button.classList.add ( "column_button" );

                div.appendChild ( button );
            };

            add_menu_button ( div, "Play" );
            add_menu_button ( div, "Create" );

            this.tick = () => {};

        };

        this.tick = start;

    };

} ( window.traverse = window.traverse || {} ))
