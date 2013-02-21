this.$jam_eventCommit=
new function(){
        var handler=
        function( event ){
            if( !event.keyMeta() ) return
            if( event.keyShift() ) return
            if( event.keyAlt() ) return
            if( event.keyCode() != 13 && event.keyCode() != 'S'.charCodeAt( 0 ) ) return
            event.defaultBehavior( false )
            $jam_Event().type( '$jam_eventCommit' ).scream( event.target() )
        }
        
        $jam_Node( document.documentElement )
        .listen( 'keydown', handler )
        
        this.toString= $jam_Value( '$jam_eventCommit' )
}
