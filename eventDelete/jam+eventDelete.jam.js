this.$jam_eventDelete=
new function( ){
        var handler=
        function( event ){
            if( !event.keyShift() ) return
            if( event.keyMeta() ) return
            if( event.keyAlt() ) return
            if( event.keyCode() != 46 ) return
            if( !window.confirm( 'Are you sure to delee this?' ) ) return
            $jam_Event().type( '$jam_eventDelete' ).scream( event.target() )
        }
        
        $jam_Node( document.documentElement )
        .listen( 'keyup', handler )
}
