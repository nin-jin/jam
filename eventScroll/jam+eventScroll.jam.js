this.$jam_eventScroll=
new function(){
        var handler=
        function( event ){
            $jam_Event()
            .type( '$jam_eventScroll' )
            .wheel( event.wheel() )
            .scream( event.target() )
        }
        
        var docEl= $jam_Node( document.documentElement )
        docEl.listen( 'mousewheel', handler )
        docEl.listen( 'DOMMouseScroll', handler )
}
