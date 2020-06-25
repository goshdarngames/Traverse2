( function ( traverse, undefined )
{
    traverse.PlayState = function ( 
        {  
           initial_puzzle_state,
           title,
           back_text,
           back_handler,
           traverse_data  
        }
    )
    {
        let play_data = {};

        play_data.state = new StartState ();

        play_data.puzzle_object_graphics = new Map ();

        play_data.initial_puzzle_state = initial_puzzle_state;

        play_data.puzzle_state = undefined;

        play_data.title = title;

        play_data.back_text = back_text;

        play_data.back_handler = back_handler;

        this.tick = function ( traverse_data )
        {
            play_data.state.play_event
                .tick ( play_data, traverse_data );
        };

        this.enter_state = function ( traverse_data )
        {
            this.set_puzzle_state ( undefined, initial_puzzle_state );
        };

        this.exit_state = function ( traverse_data )
        {
        };

        //TODO move this logic to state state?
        this.set_puzzle_state = function ( old_state, new_state )
        {
            if ( old_state != undefined )
            {
                //TODO keep graphics that have not changed
            }
            else
            {
                play_data.puzzle_state = new_state;


                new_state.get_objects ().forEach ( o =>
                {
                    let po_graphics = o.get_graphics ( traverse_data );

                    po_graphics.enable ( 
                        traverse_data.scale_coord ( o.position.x ),
                        traverse_data.scale_coord ( o.position.y ),
                        traverse_data
                    );

                });

            }
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
    let PlayEvent = function ()
    {
        this.enter = ( play_data, traverse_data ) => {};

        this.tick = ( play_data, traverse_data ) => {};

        this.dir_button_clicked = ( dir ) => {};

    };

    /************************************************************************
     * Start State
     * - Initialize data and DOM interface
     ***********************************************************************/

    let StartState = function ()
    {
        this.play_event = new PlayEvent ();

        this.play_event.tick = ( play_data, traverse_data ) =>
        {

            play_data.puzzle_state = new traverse.PuzzleState ();

            init_dom ( play_data, traverse_data );

            play_data.state = new InputWaitState ();

        }
    };

    //TODO make this re-usable between play and test
    let init_dom = function ( play_data, traverse_data )
    {
        let cp = traverse_data.dom_elements.control_panel;

        cp.set_title ( play_data.title );

        cp.clear_content ();

        let root_div = traverse.create_flex_column_div ();

        cp.add_content ( root_div );

        let dir_button_cb = ( dir ) =>
        {
            play_data.state.play_event.dir_button_clicked ( dir );
        };

        let direction_controls = traverse
            .create_direction_controls ( dir_button_cb );

        root_div.appendChild ( direction_controls.container );

        let obj_div = document.createElement ( "DIV" );

        obj_div.classList.add ( "flex_row" );
        obj_div.classList.add ( "flex_centered" );

        root_div.appendChild ( obj_div );

        //TODO move to shared dom file
        [ traverse.PuzzleObjects.Types.Bogey, 
          traverse.PuzzleObjects.Types.Boo ]
            .forEach ( ( template ) =>
        {
            let button = traverse.create_object_button ( template,
                ( n ) => play_data.play_event.dir_button_clicked ( n ) );

            obj_div.appendChild ( button );

        });

        let back_button = 
            traverse.create_menu_button ( "Edit", 
                () => play_data.back_handler ( play_data ) );

        root_div.appendChild ( back_button );
    
    };

    /************************************************************************
     * Input Wait State
     * - Waiting for input from user or proceeding if 'none' is a valid
     *   input.
     ***********************************************************************/

    let InputWaitState = function ()
    {
        this.play_event = new PlayEvent ();

        this.play_event.dir_button_clicked = ( dir ) => console.log ( dir );

        this.play_event.tick = ( play_data, traverse_data ) =>
        {

            this.play_event.tick = () => {};
        }

         
    };


} ( window.traverse = window.traverse || {} ))
