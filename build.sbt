lazy val root = (project in file(".")).
  settings(
    name := "org.codeprose.testproject",
    version := "1.0",
    scalaVersion := "2.11.4"
  )

libraryDependencies ++= Seq(
   	"org.scalatest"	 %% "scalatest"	 % "2.2.1"	 % "test"
)
