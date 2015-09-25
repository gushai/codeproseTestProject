package org.codeprose.test

package object rational {
   
  /*
   * ### Implicit conversions
   *
   * The implicit conversion which allows a simple addition of an Int with a Rational number.
   */  
  implicit def intToRational(l: Int) = Rational(l)
  
}
