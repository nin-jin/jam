this.$jam_Lazy=
function( gen ){
        var proc= function(){
            proc= gen.call( this )
            return proc.apply( this, arguments )
        }
        var lazy= function(){
            return proc.apply( this, arguments )
        }
        lazy.gen= $jam_Value( gen )
        return lazy
}
