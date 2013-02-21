this.$jam_eventURIChanged=
new function(){
        
        var lastURI= document.location.href
        
        var refresh=
        function( ){
            var newURI= document.location.href
            if( lastURI === newURI ) return
            lastURI= newURI
            $jam_Event().type( '$jam_eventURIChanged' ).scream( document )
        }
        
        window.setInterval( refresh, 20)
}
