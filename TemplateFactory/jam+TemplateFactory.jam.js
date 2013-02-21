this.$jam_TemplateFactory=
new function( ){

        var factory= function( arg ){
            if( !arg ) arg= {}
            
            var open= arg.tokens && arg.tokens[0] || '{'
            var close= arg.tokens && arg.tokens[1] || '}'
            
            var openEncoded= $jam_RegExp.escape( open )
            var closeEncoded= $jam_RegExp.escape( close )
            
            var Selector= arg.Selector || arg.encoder && factory.Selector( arg.encoder ) || factory.Selector()
    
            var parse= $jam_Parser( new function(){
                this[ openEncoded + openEncoded ]=
                $jam_Value( open )
                
                this[ closeEncoded +closeEncoded ]=
                $jam_Value( close )
                
                this[ '(' + openEncoded + '([^' + openEncoded + closeEncoded + ']*)' + closeEncoded + ')' ]=
                Selector
            })
    
            return $jam_Class( function( klass, proto ){
                
                proto.constructor=
                function( str ){
                    this.struct= parse( str )
                    this.fill( {} )
                    return this
                }
                
                proto.clone=
                function( ){
                    return klass( this.struct.slice( 0 ) )
                }
                
                proto.fill=
                function( data ){
                    for( var i= 0; i < this.struct.length; ++i ){
                        if( typeof this.struct[ i ] !== 'function' ) continue
                        this.struct[ i ]= this.struct[ i ]( data )
                    }
                    return this
                }
    
                proto.toString=
                function( ){
                    return this.struct.join( '' )
                }
    
            })
        }
        
        factory.Selector=
        $jam_Poly
        (   $jam_Lazy( function( ){
                return $jam_Value( factory.Selector( $jam_Pipe() ) )
            })
        ,   function( proc ){
                return function( str, key ){
                    var selector= function( data ){
                        if( key in data ){
                            return proc( data[ key ] )
                        } else {
                            return selector
                        }
                    }
                    selector.toString= $jam_Value( str )
                    return selector
                }
            }
        )
        
        return factory

}
