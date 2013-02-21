this.$jam_support=
new function(){
        var Support= function( state ){
            var sup= $jam_Value( state )
            sup.select= function( map ){
                return $jam_select( this(), map )
            }
            return sup
        }
    
        var node= document.createElement( 'div' )
        
        this.msie= Support( /*@cc_on!@*/ false )
        this.xmlModel= Support( ( window.DOMParser && window.XSLTProcessor ) ? 'w3c' : 'ms' )
}
