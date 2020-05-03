//Handles inputs from buttons / forums from the html document

( function ( traverse, undefined )
{
    traverse.activate_tab = function ( event, tab_name )
    {
        let control_panel = 
            document.getElementById ( "control_panel_container" );

        //hide all content

        let content = control_panel.getElementsByClassName ( "tabcontent" );

        Array.from ( content ).forEach ( ( el ) =>
        {
            el.style.display = "none";
        });

        //set all tab header links as inactive (remove CSS class)
        
        let tablinks = control_panel.getElementsByClassName ( "tablinks" );

        Array.from ( tablinks ).forEach ( ( el ) =>
        {
            el.className = el.className.replace ( " active", "" );
        });

        //show the selected content and set the button to 'active'

        document.getElementById ( tab_name ).style.display = "block";

        event.currentTarget.className += "active";
    };

    traverse.set_control_panel_title = function ( text )
    {
        let el = document.getElementById ( "cp_title" );

        el.textContent = text;
    };

} ( window.traverse = window.traverse || {} ))
