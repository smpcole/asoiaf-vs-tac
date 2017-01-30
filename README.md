# *A Song of Ice and Fire* vs. *The Accursed Kings*

Interactive infographic comparing characters in George R.R. Martin's *A Song of Ice and Fire* and Maurice Druon's *The Accursed Kings*

http://theoriginalgot.com

## Adding a connection between two existing characters
1. Locate the characters in chars.js and find their IDs.  For example, Joffrey Baratheon's ID is joffrey.
2. Create the file blurbs/*tac_id*-*asoiaf_id* (or edit it if it already exists), where *tac_id* and *asoiaf_id* stand for the IDs of the *Accursed Kings* and *Song of Ice and Fire* characters, respectively.
3. Add connections to the file, one per line.  Each connection should be a few sentences long, and separate connections (separated by new lines) will appear as bullet points on the site.

## Adding a new character
1.  Add the character to the appropriate list in chars.js in the form `[`*Name*`, `*ID*`, `*Wiki_handle*`]`.
  * *Name* is the character's name, e.g. Robert Baratheon.
  * ID is a unique identifier for the character which you make up.  It should be short and easy to identify the character from the ID.  For example, if you were to add the character Arya Stark, a natural ID would be 'arya'.
  * *Wiki_handle* is the name of the character's page on Wikipedia (for *The Accursed Kings*) or [A Wiki of Ice and Fire](http://awoiaf.westeros.org) (for *A Song of Ice and Fire*) *if it is different from his/her name*.  For example, Jeanne of Burgundy's Wikipedia page is https://en.wikipedia.org/wiki/Joan_II,_Countess_of_Burgundy, so her Wiki handle must be listed as `Joan_II,_Countess_of_Burgundy'.
2.  If there is no Wikipedia/Wiki of Ice and Fire article for the character, or if you are unsatisfied with the description there, you can add your own description in blurbs/*id*, e.g. blurbs/aunays.  This will replace the description pulled from the Wiki.
3.  If you wish to add a picture of the character, save as a JPEG it in pics/*id*.jpg.  Pictures should be small (< 100 kb).
