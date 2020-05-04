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
