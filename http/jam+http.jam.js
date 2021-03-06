$jam_http= $jam_Class( function( klass, proto ){
    
    proto.constructor= function( uri ){
        this.$= { uri: uri }
        return this
    }
    
    proto.request= function( method, data ){
        var channel= new XMLHttpRequest
        channel.open( method, this.$.uri, false )
        if( data && !( data instanceof String ) && !( data instanceof FormData ) ){
            var chunks= []
            for( var key in data ){
                if( !data.hasOwnProperty( key ) )
                    continue
                chunks.push( encodeURIComponent( key ) + '=' + encodeURIComponent( data[ key ] ) )
            }
            data= chunks.join( '&' )
            channel.setRequestHeader( 'Content-Type', 'application/x-www-form-urlencoded' )
            channel.setRequestHeader( 'Accept', 'application/xhtml+xml, */*' )
        }
        channel.send( data )
        if( channel.responseXML ) return $jam_domx( channel.responseXML )
        return channel.responseText
    }
    
    proto.get= function( ){
        return this.request( 'get' )
    }
    
    proto.post= function( data ){
        return this.request( 'post', data )
    }
    
    proto.put= function( data ){
        return this.request( 'put', data )
    }
    
})
