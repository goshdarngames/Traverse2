( function ( traverse, undefined )
{
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
            width  : 1024,
            height : 1024,
            view   : document.getElementById ( "pixi_canvas" ),
            resizeTo   : document.getElementById ( "game_canvas_container" ),
            transparent : false,
            backgroundColor : 0xBBCFDD,
        });

        pixi_app.stage.interactive = true;

        return pixi_app;
    };

    
} ( window.traverse = window.traverse || {} ))
