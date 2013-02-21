this.$jam_domReady=
function( ){
        var state= document.readyState
        if( state === 'loaded' ) return true
        if( state === 'complete' ) return true
        return false
}

this.$jam_domReady.then=
function( proc ){
        var checker= function( ){
            if( $jam_domReady() ) proc()
            else $jam_schedule( 5, checker )
        }
        checker()
}
