this.$jam_Pipe=
new function(){
        var simple= function( data ){
            return data
        }
        return function( ){
            var list= arguments
            var len= list.length
            if( len === 1 ) return list[0]
            if( len === 0 ) return simple
            return function(){
                if( !arguments.length ) arguments.length= 1
                for( var i= 0; i < len; ++i ) arguments[0]= list[ i ].apply( this, arguments )
                return arguments[0]
            }
        }
}
