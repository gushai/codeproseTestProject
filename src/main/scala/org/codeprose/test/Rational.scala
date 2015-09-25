package org.codeprose.test
/*
 * Rational 
 * ========
 * 
 * **Rational** implements **rational numbers** in Scala to introduce some of the 
 * basic Scala concepts and highlight [codeprose](http://example.com/ "codeprose on github").
 *
 *It offers:
 *
 * +	Addition (<code>add()</code> and <code>+</code>)
 * +	Subtraction (<code>subtract()</code> and <code>-</code>)
 * +	Multiplication (<code>multiply()</code> and <code>*</code>)
 * +	Implicit conversion of <code>Int</code>
 * +	Automatic reduction
 * +	And more ...
 */
/*
 * Rational
 * --------
 *
 * Rational represents a rational number in Scala.
 * 
 */
class Rational (n: Int, d: Int){

  require(d!=0)
  private val g = gcd(n,d)
  val numerator   = n/g
  val denominator = d/g
  
  /*
   * Overloaded constructor to allow initialization via a single Int.
   */
  def this(n: Int) = this(n,1)
  
  /*
   * ### Addition 
   * 
   * Addition of 2 Rational numbers.
   */
  def add (that: Rational) : Rational = { 
    new Rational(
        this.numerator*that.denominator + that.numerator*this.denominator,
        this.denominator*that.denominator
        )
  }
  
  /*
   * Overloaded Addition
   * 
   * Allows the addition of an Int to a Rational number.
   */
  def add (that: Int) : Rational = {
    this.add(new Rational(that))
  }
    
  /*
   * ### Multiplication
   */
  def multiply (that: Rational) : Rational = {
      new Rational(
          this.numerator * that.numerator,
          this.denominator * that.denominator
          )
  }

  /*
   * Overloaded Multiplication
   * 
   * Allows the multiplication of a Rational number with an Int.
   */
  def multiply(that: Int) : Rational = this.multiply(new Rational(that))
  
  /*
   * ### Subtraction
   */
  def subtract (that: Rational) : Rational = {
    new Rational(
        this.numerator*that.denominator - this.denominator*that.numerator,
        this.denominator*that.numerator
        )
  }
  /*
   * Overloaded Subtraction
   * 
   * Allows the subtraction of an Int from a Rational number.
   */
  def subtract (that: Int) : Rational = this.subtract(new Rational(that))

  /*
   * ### Operator Overloading
   *
   * For:
   *
   * +	Addition
   * +	Subtraction
   * +	Multiplication
   */
  def + (that: Rational) : Rational = add(that)
  def + (that: Int) : Rational = add(that)

  def * (that: Rational) : Rational = multiply(that)  
  def * (that: Int) : Rational = multiply(that)

  def - (that: Rational) : Rational = subtract(that)
  def - (that: Int) : Rational = subtract(that)

  /*
   * Visibly appealing toString() output.
   */
  override def toString = "(" + numerator + "/" + denominator + ")"
  
  /*
   * ### GCD: Greatest Common Divisor
   *
   * Calculates the gcd. Used in the constructor to automatically reduce the represented fraction.
   *
   */
  /**
   * Calculates the greatest common divisor.
   * @param a A whole number
   * @param b A whole number
   * @return The largest positive integer that divides a and b without a remainder.
   */	
  private def gcd(a: Int, b: Int) : Int = {
    if(b==0) a else gcd(b, a % b)
  }
}

/*
 * Companion Object 
 * ----------------
 * 
 * The Rational companion object implements several factory methods.
 *
 */
object Rational {

  def apply(n: Int) = new Rational(n,1)
  def apply(n: Int, d: Int) = new Rational(n,d)

  implicit def intToRational(l: Int) = Rational(l)
}


