( function ( traverse, undefined )
{
    traverse.CreateState = function ( traverse_data )
    {
        this.create_data = {};

        this.create_data.tick = start_tick;

        this.tick = function ( traverse_data )
        {
            this.create_data.tick ( this.create_data, traverse_data );
        };


    };

    let start_tick = function ( create_data, traverse_data )
    {
        init_dom ( create_data, traverse_data );

        create_data.tick = () => {};
    };

    let init_dom = function ( play_data, traverse_data )
    {
        let cp = traverse_data.dom_elements.control_panel;

        cp.set_title ( "Create" );

        cp.clear_content ();
    };


} ( window.traverse = window.traverse || {} ))

