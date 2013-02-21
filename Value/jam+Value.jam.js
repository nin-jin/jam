$jam_Value= function( val ){
    var value= function(){
        return val
    }
    value.toString= function(){
        return '$jam_Value: ' + String( val )
    }
    return value
}
