( function ( traverse, undefined )
{
    traverse.init_pixi = function ( pixi, document, traverse_data )
    {
        let type="WebGL";
        
        if ( !pixi.utils.isWebGLSupported () )
        {
            type = "canvas";
        }

        pixi.utils.sayHello ( type );

        pixi_app = new pixi.Application (
        {
            width  : traverse_data.canvas_size,
            height : traverse_data.canvas_size,
            view   : document.getElementById ( "pixi_canvas" ),
            transparent : false,
            backgroundColor : 0xBBCFDD,
        });

        return pixi_app;
    };

    
} ( window.traverse = window.traverse || {} ))
