package org.codeprose.test

/*
*Test Codeprose Features
*=======================
*
* Included are some code example to test Codeprose's supported features.
* 
* Overview
* --------
* 
* 1.  Simple Stuff
* 2.  Complex Stuff
* 3.  Companion Object
* 
*/
/*
* 
*Simple Stuff
*------------
*
* Let's start with simple code.
*
*/

object Example {
  
  def main(args: Array[String]): Unit = {
  
    val A = new Rational(1,7) 
    val B = new Rational(1)
    val C = A + B
   
    println(A + " + " + B + " = " + C)

  }
}

/*
*Complex stuff
*-------------
*
* We can even understand complex stuff. 
*
*/

trait Foo {

  trait Bar {
    val foo = 42
  }

  object innerobject {
    trait Baz {}
  }

  val x = () => {
    trait Boo
  }

  trait Boo

}

/*
*Companion Object
*================
*
* Test jump to companion object.
*
*/

class Companion(foo: String)

object Companion {
  def apply(foo: String) = new Companion(foo)
}

trait CompanionTest {

	def bar() : Unit = {
		val a = Companion("a");
	}

}
