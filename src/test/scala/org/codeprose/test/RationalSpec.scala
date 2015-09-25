package org.codeprose.test

import org.scalatest.FunSpec

/*
 * Rational
 * --------
 * 
 * Tests and usage illustration. 
 * 
 */
class RationalSpec extends FunSpec {

  describe("A rational number"){
    
    it("should have an visibly appealing and correct toString()"){
      val A = new Rational(2)
      assert(A.toString() == "(2/1)")
      val B = new Rational(2,4)
      assert(B.toString() == "(1/2)")
      val C = new Rational(4,4)
      assert(C.toString() == "(1/1)")
      val D = new Rational(103,999)
      assert(D.toString() == "(103/999)")
      val E = new Rational(0,9)
      assert(E.toString() == "(0/1)")
    }
    
    it("should be initialized to the reduced fraction"){
      
      val A = new Rational(2,4)
      assert(A.numerator == 1 && A.denominator == 2)
      
      val B = new Rational(9,99)
      assert(B.numerator == 1 && B.denominator == 11)
      
      val C = new Rational(15,3)
      assert(C.numerator == 5 && C.denominator == 1)
    }
    
    it("should throw an exception "){
       intercept[IllegalArgumentException] { val A = new Rational(1,0) }
    }
    
    it("..."){
      fail("You ready should add more tests!")
    }
    
  }
  
}
