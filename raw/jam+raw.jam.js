this.$jam_raw=
function( obj ){
        if( !obj ) return obj
        var klass= obj.constructor
        if( !klass ) return obj
        var superClass= klass.constructor
        if( superClass !== $jam_Class ) return obj
        return klass.raw( obj )
}
