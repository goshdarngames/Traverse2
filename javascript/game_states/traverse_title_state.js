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

            let button_cb = function ( next_scene )
            {
                //traverse.change_state ( next_scene );
                
                console.log ( next_scene );
            };

            traverse.add_menu_button ( 
                div, "Play", () => button_cb ( "Play_B" ) );

            traverse.add_menu_button ( 
                div, "Create", () => button_cb ( "Create_B" ) );

            this.tick = () => {};

        };

        this.tick = start;

    };

} ( window.traverse = window.traverse || {} ))
