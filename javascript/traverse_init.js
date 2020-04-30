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
            width  : 800,
            height : 800,
            view   : document.getElementById ( "pixi_canvas" ),
            transparent : false,
            backgroundColor : 0x000000,
        });

        return pixi_app;
    };

    
} ( window.traverse = window.traverse || {} ))
