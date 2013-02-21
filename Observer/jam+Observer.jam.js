this.$jam_Observer=
$jam_Class( function( klass, proto ){
        
        proto.constructor=
        function( ){
            this.$= {}
            return this
        }
        
        proto.clone=
        function( ){
            return klass()
            .eventName( this.eventName() )
            .node( this.node() )
            .handler( this.handler() )
        }
        
        proto.eventName=
        $jam_Poly
        (   function( ){
                return this.$.eventName
            }
        ,   function( name ){
                this.sleep()
                this.$.eventName= String( name )
                return this
            }
        )
        
        proto.node=
        $jam_Poly
        (   function( ){
                return this.$.node
            }
        ,   function( node ){
                this.sleep()
                this.$.node= $jam_raw( node )
                return this
            }
        )
        
        proto.handler=
        $jam_Poly
        (   function( ){
                return this.$.handler
            }
        ,   function( handler ){
                var self= this
                this.sleep()
                this.$.handler= handler
                this.$.internalHandler=
                function( event ){
                    return handler.call( self.node(), $jam_Event( event ) )
                }
                return this
            }
        )
        
        proto.listen=
        function( ){
            if( this.$.active ) return this
            this.$.node.addEventListener( this.$.eventName, this.$.internalHandler, false )
            this.$.active= true
            return this
        }
        
        proto.sleep=
        function( ){
            if( !this.$.active ) return this
            this.$.node.removeEventListener( this.$.eventName, this.$.internalHandler, false )
            this.$.active= false
            return this
        }
        
        proto.active=
        $jam_Poly
        (   function( ){
                return Boolean( this.$.active )
            }
        ,   function( val ){
                if( val ) this.listen()
                else this.sleep()
                return this
            }
        )
        
})
