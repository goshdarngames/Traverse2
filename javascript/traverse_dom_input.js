//Handles inputs from buttons / forums from the html document

( function ( traverse, undefined )
{
    /**
     * Finds the dom elements that are expected to be on the html page
     * when init is called
     */
    traverse.get_dom_elements = function () 
    {
        e = {};
        
        let cp_root = document.getElementById ( "control_panel_container" );

        let cp_title = document.getElementById ( "cp_title" );

        let cp_content = document.getElementById ( "control_panel_content" );

        let cp_footer = document.getElementById ( "control_panel_footer" );

        e.control_panel = new ControlPanel ( cp_root, cp_title, 
                                             cp_content, cp_footer );

        return e;
    };

    traverse.create_menu_button = function ( text, click_cb )
    {
        let button = document.createElement ( "BUTTON" );
        
        button.innerHTML = text;

        button.classList.add ( "column_button" );

        button.onclick = click_cb;

        return button;
    };

    /**
     * ob_name - used for png and passed to callback
     */
    traverse.create_object_button = function ( ob, callback )
    {
        let button = document.createElement ( "INPUT" );

        button.type = "image";
        
        button.alt = ob.name;

        button.classList.add ( "create_object_button" );

        button.src = `assets/${ob.name}.png`;

        button.onclick = () => { callback ( ob.name ) };

        return button;
    }
    
    traverse.create_direction_controls = function ()
    {
        let controls = {};

        let create_menu_button = ( grid_div, dir, controls ) =>
        {
            let button = document.createElement ( "BUTTON" );
            
            button.innerHTML = dir;

            button.classList.add ( dir );

            grid_div.appendChild ( button );

            controls [ dir ] = button;

            switch ( dir )
            {
                case 'u' : button.innerHTML = "&#x1F881"; break;
                case 'd' : button.innerHTML = "&#x1F883;"; break;
                case 'l' : button.innerHTML = "&#x1F880"; break;
                case 'r' : button.innerHTML = "&#x1F882"; break;
            }
        };

        let grid_div = document.createElement ( "DIV" );

        grid_div.classList.add ( "direction_panel" );

        [ 'u', 'd', 'l', 'r' ].forEach ( 
            ( d ) => create_menu_button ( grid_div, d, controls ) );


        controls.container = grid_div;


        return controls;

    };

    traverse.create_flex_column_div = function ()
    {
        let col = document.createElement ( "DIV" );

        col.classList.add ( "flex_column" );
        col.classList.add ( "flex_centered" );
        col.classList.add ( "content_pane" );

        return col;
    };

    let ControlPanel = function ( root, title, content, footer )
    {
        this.root = root;

        this.title = title;

        this.content = content;

        this.footer = footer;

        this.set_title = function ( text )
        {
            this.title.textContent = text;
        };

        this.clear_content = function ()
        {
            while ( this.content.hasChildNodes () )
            {
                this.content.removeChild ( this.content.lastChild );
            }
        };

        this.add_content = function ( item )
        {
            this.content.appendChild ( item );
        };
    };

} ( window.traverse = window.traverse || {} ))
