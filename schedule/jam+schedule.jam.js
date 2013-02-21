this.$jam_schedule=
function( timeout, proc ){
        var timerID= window.setTimeout( proc, timeout )
        return function( ){
            window.clearTimeout( timerID )
        }
}
