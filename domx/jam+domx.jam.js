this.$jam_domx=
$jam_Class( function( klass, proto ){
    
        proto.constructor=
        function( dom ){
            if( dom.toDOMNode ) dom= dom.toDOMNode()
            this.$= dom
            return this
        }
        
        proto.toDOMDocument=
        function( ){
            return this.$.ownerDocument || this.$
        }
        
        proto.toDOMNode=
        function( ){
            return this.$
        }
        
        proto.toString=
        $jam_support.xmlModel.select(
        {   'w3c': function( ){
                var serializer= new XMLSerializer
                var text= serializer.serializeToString( this.$ )
                return text
            }
        ,   'ms': function( ){
                return $jam_String( this.$.xml ).trim().$
            }
        })
        
        proto.transform=
        $jam_support.xmlModel.select(
        {   'w3c': function( stylesheet ){
                var proc= new XSLTProcessor
                proc.importStylesheet( $jam_raw( stylesheet ) )
                var doc= proc.transformToDocument( this.$ )
                return $jam_domx( doc )
            }
        ,   'ms': function( stylesheet ){
                var text= this.$.transformNode( $jam_raw( stylesheet ) )
                return $jam_domx.parse( text )
            }
        })
        
        proto.select=
        function( xpath ){
            result= this.toDOMDocument().evaluate( xpath, this.toDOMNode(), null, null, null ).iterateNext()
            return $jam_domx( result )
        }
        
        klass.parse=
        $jam_support.xmlModel.select(
        {   'w3c': function( str ){
                var parser= new DOMParser
                var doc= parser.parseFromString( str, 'application/xml' )
                return $jam_domx( doc )
            }
        ,   'ms': function( str ){
                var doc= new ActiveXObject( 'MSXML2.DOMDocument' )
                doc.async= false
                doc.loadXML( str )
                return $jam_domx( doc )
            }
        })
        
})
