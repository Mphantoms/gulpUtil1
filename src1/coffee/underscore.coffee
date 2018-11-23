global = this
global.push = Array::push
_ = ( obj ) ->
    global.wrap = obj
    if !(this instanceof _) then new _()
 ###   
_.uniq = ( arr,fn )->
    if _.isArray arr
       result = []
       result.push(num) for num in [1,2,3,4,5] when if 1 then result.indexOf num is -1 
 ###      
_.each = ( target,fn ) ->
    if _.isArray target
        fn.call(target,i,value) for value,i in target
    else
        fn.call(target,key,value) for key,value of target

_.isArray = (arr)->
    toString.call(arr) is '[object Array]'

_.each(['Function','Object','Number','String'],(i,val)->
    _['is' + val] = (arg)->
        toString.call(arg) is "[object #{val}]"
)

_.functions = ( stan )->
    if _.isFunction(stan) then value for value of stan
        
_.chain = ( obj )->
    instance = _(obj)
    instance._chain = true
    console.log  instance
    instance

results = ( instance,obj )->
    if instance._chain
        _(obj).chain()
    else
        obj
_::value = ()->
    global.wrap

_.mixins = ( obj )->
    _.each(_.functions(obj),(key,val)->
        func = _[val]
        _::[val] =()->
            wraps = [global.wrap]
            console.log wraps
            push.apply wraps,arguments
            results this,func.apply this,wraps
    )

_.mixins(_)
global._ = _