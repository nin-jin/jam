this.$jam_htmlDecode=
new function(){
        var fromCharCode= window.String.fromCharCode
        var parseInt= window.parseInt
        var replacer= function( str, isHex, numb, name ){
            if( name ) return $jam_htmlEntities[ name ] || str
            if( isHex ) numb= parseInt( numb, 16 )
            return fromCharCode( numb )
        }
        return function( str ){
            return String( str ).replace( /&(?:#(x)?(\d+)|(\w+));/g, replacer )
        }
}
