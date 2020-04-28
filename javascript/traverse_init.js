( function ( traverse, undefined )
{
    traverse.init_prolog = function ()
    {
        window.console.log ( "Initialize traverse prolog..." );

        let request = new XMLHttpRequest ();

        request.open ( 'GET', 'prolog/traverse.pl' );

        request.responseType = 'text';

        request.onload = function ()
        {
            let s = pl.create ();
            s.consult ( request.response );

            s.query ("gamestate([[wall,10,10],[player,1,2],[wall,1,2]]).");

            let cb = function( answer ) 
            { 
                console.log( pl.format_answer( answer ) ); 
            };

            s.answer ( cb );
        };

        request.send ();
    };

    traverse.init_pixi = function ( pixi, document )
    {
        let type="WebGL";
        
        if ( !pixi.utils.isWebGLSupported () )
        {
            type = "canvas";
        }

        pixi.utils.sayHello ( type );

        pixi_app = new pixi.Application (
        {
            width  : 800,
            height : 800
        });

        document.body.appendChild ( pixi_app.view );

        return pixi_app;
    };

    
} ( window.traverse = window.traverse || {} ))
