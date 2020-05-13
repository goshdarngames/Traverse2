( function ( traverse, undefined )
{
    traverse.CreateState = function ( traverse_data )
    {
        this.traverse_data = traverse_data;

        this.create_data = {};

        this.create_data.state = new StartState ();

        this.tick = function ( traverse_data )
        {
            this.create_data.state.create_event
                .tick ( this.create_data, traverse_data );
        };

        this.stage_clicked = function ( e )
        {
            this.create_data.state.create_event
                .stage_clicked ( e, this.create_data, this.traverse_data );
        };

        this.enter_state = function ( traverse_data )
        {
            traverse_data.pixi_app.renderer.plugins.interaction
                .on ( 'pointerdown', 
                    ( e ) => 
                    { 
                        this.stage_clicked ( e ); 
                    });
        };

        this.exit_state = function ( traverse_data )
        {
        };
    };

    /**
     * Each state is expected to store a reference to this component.
     *
     * When an event is fired the appropriate method will be called in this
     * object.  
     *
     * States can override the events with their own arrow functions.
     */
    let CreateEvent = function ()
    {
        this.enter = ( create_data, traverse_data ) => {};

        this.tick = ( create_data, traverse_data ) => {};

        this.stage_clicked = ( e, create_data, traverse_data ) => {};

        this.sprite_clicked = ( create_data, traverse_data ) => {};

        this.build_obj_button_clicked = 
            ( template, create_data, traverse_data ) => {};
    };


    /************************************************************************
     * Start State
     * - Initialize data and DOM interface
     ***********************************************************************/

    let StartState = function ()
    {
        this.create_event = new CreateEvent ();

        this.create_event.tick = ( create_data, traverse_data ) =>
        {

            create_data.puzzle_state = new traverse.PuzzleState ();

            create_data.build_objects = 
                new Set ( [ traverse.PuzzleObjects.Wall,
                            traverse.PuzzleObjects.Bogey,
                            traverse.PuzzleObjects.Boo ] );

            init_dom ( create_data, traverse_data );

            //associate puzzle objects with their graphics systems
            create_data.puzzle_object_graphics = new Map ();

            create_data.state = new WaitState ();
        }
    };

    let init_dom = function ( create_data, traverse_data )
    {
        let cp = traverse_data.dom_elements.control_panel;

        cp.set_title ( "Create" );

        cp.clear_content ();

        let root_div = traverse.create_flex_column_div ();
        
        cp.add_content ( root_div );

        let build_div = document.createElement ( "DIV" );

        build_div.classList.add ( "flex_row" );
        build_div.classList.add ( "flex_centered" );

        root_div.appendChild ( build_div );


        create_data.build_objects.forEach ( ( template ) =>
        {
            let button = traverse.create_object_button ( template,
            () => 
            { 
                create_data.state.create_event
                    .build_obj_button_clicked ( 
                        template, create_data, traverse_data );

            } );

            build_div.appendChild ( button );

        });

        let test_button = 
            traverse.create_menu_button ( "Test", ()=>{} );

        root_div.appendChild ( test_button );

        let share_button = 
            traverse.create_menu_button ( "Share", ()=>{} );

        root_div.appendChild ( share_button );

    };

    /************************************************************************
     * Wait State
     * - No build object selected
     ***********************************************************************/

    let WaitState = function ()
    {
        this.create_event = new CreateEvent ();

        this.create_event.build_obj_button_clicked =
            ( template, create_data, traverse_data ) =>
        {
            create_data.state = new ObjectSelectedState ( template );
        };
    };

    /************************************************************************
     * Object Selected State
     * -An object has been selected in the control panel. waiting for
     *  input on the stage
     ***********************************************************************/

    let ObjectSelectedState = function ( template )
    {
        this.template = template;

        this.create_event = new CreateEvent ();

        this.create_event.stage_clicked = 
            ( e, create_data, traverse_data ) =>
        {
            let grid_x = 
                traverse_data.scale_screen_pos ( e.data.global.x );
            let grid_y = 
                traverse_data.scale_screen_pos ( e.data.global.y );

        let puzzle_ob = 
            new traverse.PuzzleObject ( this.template, grid_x, grid_y );

            add_puzzle_object ( puzzle_ob, create_data, traverse_data );
        }

        this.create_event.build_obj_button_clicked =
            ( template, create_data, traverse_data ) =>
        {
            this.template = template;
        };
    };

    let add_puzzle_object = function ( puzzle_ob, create_data, traverse_data )
    {

        let po_graphics = puzzle_ob.get_graphics ( traverse_data );

        po_graphics.enable ( 
            traverse_data.scale_coord ( puzzle_ob.x ),
            traverse_data.scale_coord ( puzzle_ob.y ),
            traverse_data
        );

    };

} ( window.traverse = window.traverse || {} ))

