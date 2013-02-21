this.$jam_DomRange=
$jam_Class( function( klass, proto ){
    
        proto.constructor=
        $jam_Poly
        (   function( ){
                var sel= $jam_selection()
                if( sel.rangeCount ) this.$= sel.getRangeAt( 0 ).cloneRange()
                else this.$= document.createRange()
                return this
            }
        ,   function( range ){
                if( !range ) throw new Error( 'Wrong TextRange object' )
                this.$= klass.raw( range )
                return this
            }
        )
        
        proto.select=
        function( ){
            var sel= $jam_selection()
            sel.removeAllRanges()
            sel.addRange( this.$ )
            return this
        }
        
        proto.collapse2end=
        function( ){
            this.$.collapse( false )
            return this
        }
        
        proto.collapse2start=
        function( ){
            this.$.collapse( true )
            return this
        }
        
        proto.dropContents=
        function( ){
            this.$.deleteContents()
            return this
        }
        
        proto.text=
        $jam_Poly
        (   function( ){
                return $jam_html2text( this.html() )
            }
        ,   function( text ){
                this.html( $jam_htmlEscape( text ) )
                return this
            }
        )
        
        proto.html=
        $jam_Poly
        (   function( ){
                return $jam_Node( this.$.cloneContents() ).toString()
            }
        ,   function( html ){
                var node= html ? $jam_Node.parse( html ).$ : $jam_Node.Text( '' ).$
                this.replace( node )
                return this
            }
        )
        
        proto.replace=
        function( node ){
            node= $jam_raw( node )
            this.dropContents()
            this.$.insertNode( node )
            this.$.selectNode( node )
            return this
        }
        
        proto.ancestorNode=
        function( ){
            return this.$.commonAncestorContainer
        }
        
        proto.compare=
        function( how, range ){
            range= $jam_DomRange( range ).$
            how= Range[ how.replace( '2', '_to_' ).toUpperCase() ]
            return range.compareBoundaryPoints( how, this.$ )
        }
        
        proto.hasRange=
        function( range ){
            range= $jam_DomRange( range )
            var isAfterStart= ( this.compare( 'start2start', range ) >= 0 )
            var isBeforeEnd= ( this.compare( 'end2end', range ) <= 0 )
            return isAfterStart && isBeforeEnd
        }
        
        proto.equalize=
        function( how, range ){
            how= how.split( 2 )
            var method= { start: 'setStart', end: 'setEnd' }[ how[ 0 ] ]
            range= $jam_DomRange( range ).$
            this.$[ method ]( range[ how[1] + 'Container' ], range[ how[1] + 'Offset' ] )
            return this
        }
        
        proto.move=
        function( offset ){
            this.collapse2start()
            if( offset === 0 ) return this
            var current= $jam_Node( this.$.startContainer )
            if( this.$.startOffset ){
                var temp= current.$.childNodes[ this.$.startOffset - 1 ]
                if( temp ){
                    current= $jam_Node( temp ).follow()
                } else {
                    offset+= this.$.startOffset
                }
            }
            while( current ){
                if( current.name() === '#text' ){
                    var range= $jam_DomRange().aimNode( current )
                    var length= current.$.nodeValue.length
                    
                    if( !offset ){
                        this.equalize( 'start2start', range )
                        return this
                    } else if( offset > length ){
                        offset-= length
                    } else {
                        this.$.setStart( current.$, offset )
                        return this
                    }
                }
                if( current.name() === 'br' ){
                    if( offset > 1 ){
                        offset-= 1
                    } else {
                        var range= $jam_DomRange().aimNode( current )
                        this.equalize( 'start2end', range )
                        return this
                    }
                }
                current= current.delve()
            }
            return this
        }
        
        proto.clone=
        function( ){
            return $jam_DomRange( this.$.cloneRange() )
        }
        
        proto.aimNodeContent=
        function( node ){
            this.$.selectNodeContents( $jam_raw( node ) )
            return this
        }
        
        proto.aimNode=
        function( node ){
            this.$.selectNode( $jam_raw( node ) )
            return this
        }
        
})
