this.$jam_eventClone=
new function(){
        var handler=
        function( event ){
            if( !event.keyMeta() ) return
            if( !event.keyShift() ) return
            if( event.keyAlt() ) return
            if( event.keyCode() != 13 ) return
            $jam_Event().type( '$jam_eventClone' ).scream( event.target() )
        }
        
        $jam_Node( document.documentElement )
        .listen( 'keyup', handler )
}
