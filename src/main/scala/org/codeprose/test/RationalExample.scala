package org.codeprose.test
/*
 * Example with Rational Numbers
 * -----------------------------
 *
 * A sample application highlighting some features of <strong>org.codeprose.test.Rational</strong>.
 * 
 * Codeprose is available on [github.com/gushai/codeprose](https://github.com/gushai/codeprose).
 */

object RationalExample {
  
  def main(args: Array[String]): Unit = {
  
    println("[org.codeprose.rational.Example]: Sample Application." )
    val A = new Rational(1,7) 
    val B = new Rational(1)
    val C = Rational(77,344)
    val G = A + B
    val D = A.add(B)
   
    // Implicit conversion
    val E = 5 + D  
    println(A + " + " + B + " = " + C)
    println(C + " + " + D + " = " + (C + D))
    println(5 + " + " + D + " = " + E)

  }
}
