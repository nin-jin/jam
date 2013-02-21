this.$jam_Throttler=
function( latency, func ){
        var self
        var arg
        var stop
        return function(){
            self= this
            arg= arguments
            if( stop ) return
            stop= $jam_schedule( latency, function(){
                stop= null
                func.apply( self, arg )
            })
        }
}
