package org.codeprose.test.text
/*
 * Codeprose Test Project 
 * ======================
 *
 *
 * Content
 * -------
 * 
 * 1. What is Codeprose?
 * 2. How to Use Codeprose?
 * 3. Supported Markdown Features
 *  
 * 
 * What is Codeprose?
 * ------------------
 * 
 * Codeprose is a literate programming tool for Scala. It generates HTML output including 
 * syntax highlighting and source code annotated with compile time information. 
 * 
 * Tokens are enriched with detailed type information, links to declaration and 
 * type definition as well as information about implicit conversions and parameters. 
 * 
 * Further, both type and package summaries as well as 'where used' information is provided.
 *  
 * In the spirit of literate programming Codeprose allows syntax formatting via Markdown 
 * in comments. Compile time information is obtained by interfacing with the editor 
 * service ENSIME which guarantees independence from the Scala compiler and improves 
 * re-usability and maintenance.
 *   
 * Codeprose's design makes it easily extendible to other or mixtures of languages and 
 * offers the possibility of introducing other output formats such as, for example, LaTeX.
 *
 *
 */
/*
 * How to Use Codeprose?
 * ---------------------
 * 
 *  
 * ### How to write code?
 * 
 * To get the most out of Codeprose you should use Markdown in mutli-line comments to make them visually appealing.
 * Thats it! Instructions for Markdown can be found in the next section. All the rest, like summary pages and 
 * compile time information comes for free.
 * 
 * 
 * 
 * ### How to get output?
 * 
 * Install and usage instruction for Codeprose can be found in the Readme.md on [github.com/gushai/codeprose](https://github.com/gushai/codeprose).
 * 
 */
/*
 * 
 * Markdown Feature Overview
 * -------------------------
 * 
 *
 * This is taken from [John Gruber's markdown basics on daringfireball](http://daringfireball.net/projects/markdown/basics).
 *
 * 
 * A First Level Header
 * ====================
 * 
 * A Second Level Header
 * ---------------------
 * 
 * Now is the time for all good men to come to
 * the aid of their country. This is just a
 * regular paragraph.
 * 
 * The quick brown fox jumped over the lazy
 * dog's back.
 * 
 * ### Header 3 
 * 
 * > This is a blockquote.
 * > 
 * > This is the second paragraph in the blockquote.
 * >
 * > ## This is an H2 in a blockquote
 * 
 * 
 * ### Phrase Emphasis
 * 
 * Some of these words *are emphasized*.
 * Some of these words _are emphasized also_.
 * 
 * Use two asterisks for **strong emphasis**.
 * Or, if you prefer, __use two underscores instead__.
 * 
 * Lists
 * -----
 * 
 * ### Unordered Lists
 * 
 * *   Candy.
 * *   Gum.
 * *   Booze.
 * 
 * +   Candy.
 * +   Gum.
 * +   Booze
 * 
 * -   Candy.
 * -   Gum.
 * -   Booze.
 * 
 * ### Ordered Lists
 * 
 * 1. Red 
 * 2. Green
 * 3. Blue
 * 
 * 
 * ### List with paragraphs
 * 
 * *   A list item.
 * 
 *     With multiple paragraphs.
 * 
 * *   Another item in the list.
 * 
 * Links
 * -----
 * 
 * This is an [example link](http://example.com/).
 * 
 * ### Reference style
 * 
 * I get 10 times more traffic from [Google][1] than from
 * [Yahoo][2] or [MSN][3].
 * 
 * [1]: http://google.com/        "Google"
 * [2]: http://search.yahoo.com/  "Yahoo Search"
 * [3]: http://search.msn.com/    "MSN Search"
 * 
 * 
 * Code 
 * ----
 *
 * I strongly recommend against using any `<blink>` tags. 
 *
 * I wish SmartyPants used named entities like `&mdash;`
 * instead of decimal-encoded entites like `&#8212;`.
 *
 *
 */


