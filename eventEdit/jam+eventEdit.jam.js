this.$jam_eventEdit=
new function(){
        
        var scream=
        $jam_Throttler
        (   50
        ,   function( target ){
                $jam_Event().type( '$jam_eventEdit' ).scream( target )
            }
        )
        
        var node=
        $jam_Node( document.documentElement )
        
        node.listen( 'keyup', function( event ){
            if( event.keyCode() >= 16 && event.keyCode() <= 18 ) return
            if( event.keyCode() >= 33 && event.keyCode() <= 40 ) return
            scream( event.target() )
        } )
        
        var handler= function( event ){
            scream( event.target() )
        }
        
        node.listen( 'cut', handler )
        node.listen( 'paste', handler )
        node.listen( 'drop', handler )

}
