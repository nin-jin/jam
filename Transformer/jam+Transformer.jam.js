this.$jam_Transformer=
function( map ){
        
        var Selector= function( str, key ){
            var keyList= key.split( ':' )
            var fieldName= keyList.shift()
            var selector= function( data ){
                var value= ( fieldName === '.' ) ? data : data[ fieldName ]
                if( value ) return selector
            }
            selector.toString= $jam_Value( str )
            return selector
        }
        
        var Template= $jam_TemplateFactory({ Selector: Selector })
        for( var key in map ) map[ key ]= Template( map[ key ] )
        
        return 
}
