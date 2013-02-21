this.$jam_Poly=
function(){
        var map= arguments
        return function(){
            return map[ arguments.length ].apply( this, arguments )
        }
}
