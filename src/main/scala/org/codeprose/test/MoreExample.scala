package org.codeprose.test
/*
*More Examples
*=============
*
* The source code in this file has been used to test Codeprose's handling of implicit conversions and parameters,  
* function arguments and currying as well as type arguments.
* 
* Content
* -------
* 
* 1. Implicit Conversions/Parameter
* 2. Function Arguments and Currying
* 3. Other Stuff
* 
*/
/*
* Implicit Conversions/Parameters
* -------------------------------  
*/
/*
 * A simple base class.
 */
class Base(){
	val a = 1
}
/*
 * ImplictStuff contains uses implicit parameters.
 */
class ImplicitStuff()(implicit c: Base){

 
  /**
   * bar uses an implicit parameter of SomeClass.
   */
  def bar(b: Int) : Int = {
		b+c.a
	}
  
  /**
   * add uses an implicit parameter of SomeClass and an implicit parameter shift.
   * @param a     Integer
   * @param b     Integer
   * @param shit  Integer 
   * @param       Additon of a,b,shift and c.a
   */
  def add(a: Int, b: Int)(implicit shift: Int) : Int = {
    a+b+c.a+shift
  }
}



object ImplicitSuff {
  
  def main(args: Array[String]): Unit = {

    // Implicit parameter
    implicit val implicitBase = new Base()

    val foo = new ImplicitStuff()

    foo.bar(1)  

    implicit val shift = 10
    
    val somenumber = foo.add(1,2)
    

  }
}

/*
 * Function Arguments and Currying
 * -------------------------------
 * 
 * CurryAndFunctionArg contains methods to test codeprose's support for currying and function arguments.
 */
class CurryAndFunctionArg(){
  /*
   * Function Argument.
   */
  def withFunctionArugment(a: Int,shifter: (Int) => Int) : Int = {
    shifter(a)
  }
  
  def currying(a: Int)(b: Int)(c: Int) : Int = {
    a+b+c
  }
  
  def curryWithFunctionArg(shifter: Int => Int)(a: Int)(b: Int) : Int = {
    shifter(b) + shifter(a)
  }
  
  def curryWithFuncArgImplArg(
      shifter: Int => Int)(a: Int)(b: Int)(implicit base: Int) : Int = {
    base + shifter(b) + shifter(a)
  }
  
}

object CurryAndFunctionArg{
  
    val foo = new CurryAndFunctionArg()
    
    
    val curryPartial = foo.currying(5)_
    val curryFull = curryPartial(5)(5)
    
    val shiftByOne = (x: Int) => x+1
    
    val curryWithFuncPartial = foo.curryWithFunctionArg(shiftByOne)_
    val curryWithFunc = curryWithFuncPartial(5)(5)
    
    implicit val base = 4
 
    val curryWithFuncAndImplicitPartial = foo.curryWithFuncArgImplArg(shiftByOne)_
    val curryWithFuncAndImplicit = curryWithFuncAndImplicitPartial(10)(10)
    
    
    val curryWithAnonFuncAndImplPart = foo.curryWithFuncArgImplArg((x: Int) => x + 314)_
    val curryWithAnonFuncAndImpl = curryWithAnonFuncAndImplPart(11)(11)
}


/*
 * Other Stuff
 * ----------- 
 */
class OtherStuff(){
    
  def notImplemented() = ???
  
  def doesNothing(a: Int) : Unit = {
    
  }
  
  def foo[T](a: Int, b: T) : T = {
    println(a)
    return b
  }
  
  
  class Key(name: Symbol){
    type Value
  }

  val someKey = new Key('someKey){ type Value = Int}
  
}



object OtherStuff{
  
  def main(args: Array[String]): Unit = {
    
    val a = 1985
    val other = new OtherStuff()
    other.doesNothing(a)
    
      
    // Implicit conversion
    val A = Rational(5)
    val B = 314 + A
    
    val double = other.foo[Double](1,1.0)
    
    
    val keyToDouble = new other.Key('keyToDouble){ type Value = Double }
    
  }
  
}