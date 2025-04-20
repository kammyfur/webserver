String.prototype.replacei = function (search, replace) {
    var regex = new RegExp(search, "ig");
    return this.replace(regex, replace);
}

module.exports.ConvertirVersHTML = function (contenu) {

    // Définition des/du type(s)
    contenu = contenu.replacei('TYPEDOCUMENT','DOCTYPE')

    // Définition du balisage HTML
    contenu = contenu.replacei('<pageweb','<html')
        contenu = contenu.replacei('langue=','lang=')

    // En-têtes HTML
    contenu = contenu.replacei('<configuration','<head')
    contenu = contenu.replacei('<option','<meta')
        contenu = contenu.replacei('encodage=','charset=')
        contenu = contenu.replacei('nom=','name=')
        contenu = contenu.replacei('contenu=','content=')
        contenu = contenu.replacei('equivalent-http=','http-equiv=')
    contenu = contenu.replacei('<titre','<title')

    // Corps HTML
    contenu = contenu.replacei('<contenu','<body')

        // Titres
        contenu = contenu.replacei('<title1','<h1')
        contenu = contenu.replacei('<title2','<h2')
        contenu = contenu.replacei('<title3','<h3')
        contenu = contenu.replacei('<title4','<h4')
        contenu = contenu.replacei('<title5','<h5')
        contenu = contenu.replacei('<title6','<h6')

        // Retours et séparateurs
        contenu = contenu.replacei('<retourligne>','<br>')
        contenu = contenu.replacei('<separateur>','<hr>')

        // Containeurs
        contenu = contenu.replacei('<bloc','<div')
        contenu = contenu.replacei('<portion','<span')
        contenu = contenu.replacei('<paragraphe','<p')

        // Tableaux
        contenu = contenu.replacei('<tableau','<table')
        contenu = contenu.replacei('<tableau-ligne','<tr')
        contenu = contenu.replacei('<tableau-cellule','<td')
        contenu = contenu.replacei('<tableau-entete','<thead')
        contenu = contenu.replacei('<tableau-contenu','<tbody')
        contenu = contenu.replacei('<tableau-pieddepage','<tfoot')

        // Éléments actifs
        contenu = contenu.replacei('<lien','<a')
            contenu = contenu.replacei('cible=','href=')
            contenu = contenu.replacei('containeur=','target=')
            contenu = contenu.replacei('options=','rel=')
            contenu = contenu.replacei('courriel:','mailto:')
            contenu = contenu.replacei('appeler:','tel:')
            contenu = contenu.replacei('titre=','title=')
        contenu = contenu.replacei('<son','<audio')
            contenu = contenu.replacei('source=','src=')
        contenu = contenu.replacei('<bouton','<button')

        // Formattage
        contenu = contenu.replacei('<gras','<b')
        contenu = contenu.replacei('<italique','<i')
        contenu = contenu.replacei('<souligne','<u')
        contenu = contenu.replacei('<barre','<s')
        contenu = contenu.replacei('<grand','<big')
        contenu = contenu.replacei('<citationbloc','<blockquote')
        contenu = contenu.replacei('<citation','<cite')
        contenu = contenu.replacei('<centre','<center')
        contenu = contenu.replacei('<soustitre','<caption')
        contenu = contenu.replacei('<commande','<command')
        contenu = contenu.replacei('<police','<font')

        // Divers
        contenu = contenu.replacei('<grilledonnees','<datagrid')
        contenu = contenu.replacei('<listedonnees','<datalist')
        contenu = contenu.replacei('<dialogue','<dialog')
        contenu = contenu.replacei('<joindre','<embed')
        contenu = contenu.replacei('<listechamps','<fieldlist')
            contenu = contenu.replacei('desactive','disabled')
        contenu = contenu.replacei('<cadre','<frame')
        contenu = contenu.replacei('<pieddepage','<footer')
        contenu = contenu.replacei('<listecadres','<framelist')
        contenu = contenu.replacei('<entete','<header')
        contenu = contenu.replacei('<cadreintelligent','<iframe')
            contenu = contenu.replacei('bordurecadre=','frameborder=')
        contenu = contenu.replacei('<image','<img')
            contenu = contenu.replacei('description=','alt=')
            contenu = contenu.replacei('dimensions=','sizes=')
            contenu = contenu.replacei('listesources=','srcset=')
            contenu = contenu.replacei('hauteur=','height=')
            contenu = contenu.replacei('largeur=','width=')
        contenu = contenu.replacei('<champ','<input')
            contenu = contenu.replacei('identifiant=','id=')
        contenu = contenu.replacei('<gencle','<keygen')
        contenu = contenu.replacei('<etiquette','<label')
            contenu = contenu.replacei('pour=','for=')
        contenu = contenu.replacei('<principal','<main')
        contenu = contenu.replacei('<carte','<map')
        contenu = contenu.replacei('<navigation','<nav')
        contenu = contenu.replacei('<sanscadres','<noframes')
        contenu = contenu.replacei('<sansjs','<noscript')
        contenu = contenu.replacei('<objet','<object')
        contenu = contenu.replacei('<sortie','<output')
        contenu = contenu.replacei('<parametre','<param')
        contenu = contenu.replacei('<texteplain','<plaintext')
        contenu = contenu.replacei('<progression','<progress')
        contenu = contenu.replacei('<preceder','<pre')
        contenu = contenu.replacei('<selection','<select')
        contenu = contenu.replacei('<petit','<small')
        contenu = contenu.replacei('<fort','<strong')
        contenu = contenu.replacei('<zonedetexte','<textarea')
        contenu = contenu.replacei('<variable','<var')

        // Listes
        contenu = contenu.replacei('<conteneurliste','<ul')
        contenu = contenu.replacei('<elementliste','<li')

        // Balises fermantes
        contenu = contenu.replacei('</conteneurliste','</ul')
        contenu = contenu.replacei('</elementliste','</li')
        contenu = contenu.replacei('</grilledonnees','</datagrid')
        contenu = contenu.replacei('</listedonnees','</datalist')
        contenu = contenu.replacei('</dialogue','</dialog')
        contenu = contenu.replacei('</joindre','</embed')
        contenu = contenu.replacei('</listechamps','</fieldlist')
        contenu = contenu.replacei('</cadre','</frame')
        contenu = contenu.replacei('</pieddepage','</footer')
        contenu = contenu.replacei('</listecadres','</framelist')
        contenu = contenu.replacei('</entete','</header')
        contenu = contenu.replacei('</cadreintelligent','</iframe')
        contenu = contenu.replacei('</image','</img')
        contenu = contenu.replacei('</champ','</input')
        contenu = contenu.replacei('</gencle','</keygen')
        contenu = contenu.replacei('</etiquette','</label')
        contenu = contenu.replacei('</principal','</main')
        contenu = contenu.replacei('</carte','</map')
        contenu = contenu.replacei('</navigation','</nav')
        contenu = contenu.replacei('</sanscadres','</noframes')
        contenu = contenu.replacei('</sansjs','</noscript')
        contenu = contenu.replacei('</objet','</object')
        contenu = contenu.replacei('</sortie','</output')
        contenu = contenu.replacei('</parametre','</param')
        contenu = contenu.replacei('</texteplain','</plaintext')
        contenu = contenu.replacei('</progression','</progress')
        contenu = contenu.replacei('</preceder','</pre')
        contenu = contenu.replacei('</selection','</select')
        contenu = contenu.replacei('</petit','</small')
        contenu = contenu.replacei('</fort','</strong')
        contenu = contenu.replacei('</zonedetexte','</textarea')
        contenu = contenu.replacei('</variable','</var')
        contenu = contenu.replacei('</gras','</b')
        contenu = contenu.replacei('</italique','</i')
        contenu = contenu.replacei('</souligne','</u')
        contenu = contenu.replacei('</barre','</s')
        contenu = contenu.replacei('</grand','</big')
        contenu = contenu.replacei('</citationbloc','</blockquote')
        contenu = contenu.replacei('</citation','</cite')
        contenu = contenu.replacei('</centre','</center')
        contenu = contenu.replacei('</soustitre','</caption')
        contenu = contenu.replacei('</commande','</command')
        contenu = contenu.replacei('</police','</font')
        contenu = contenu.replacei('</lien','</a')
        contenu = contenu.replacei('</son','</audio')
        contenu = contenu.replacei('</bouton','</button')
        contenu = contenu.replacei('</title1','</h1')
        contenu = contenu.replacei('</title2','</h2')
        contenu = contenu.replacei('</title3','</h3')
        contenu = contenu.replacei('</title4','</h4')
        contenu = contenu.replacei('</title5','</h5')
        contenu = contenu.replacei('</title6','</h6')
        contenu = contenu.replacei('</retourligne>','</br>')
        contenu = contenu.replacei('</separateur>','</hr>')
        contenu = contenu.replacei('</bloc','</div')
        contenu = contenu.replacei('</portion','</span')
        contenu = contenu.replacei('</paragraphe','</p')
        contenu = contenu.replacei('</tableau','</table')
        contenu = contenu.replacei('</tableau-ligne','</tr')
        contenu = contenu.replacei('</tableau-cellule','</td')
        contenu = contenu.replacei('</tableau-entete','</thead')
        contenu = contenu.replacei('</tableau-contenu','</tbody')
        contenu = contenu.replacei('</tableau-pieddepage','</tfoot')
        contenu = contenu.replacei('</pageweb','</html')
        contenu = contenu.replacei('</configuration','</head')
        contenu = contenu.replacei('</option','</meta')
        contenu = contenu.replacei('</titre','</title')
        contenu = contenu.replacei('</contenu','</body')
        contenu = contenu.replacei('</title1','</h1')
        contenu = contenu.replacei('</title2','</h2')
        contenu = contenu.replacei('</title3','</h3')
        contenu = contenu.replacei('</title4','</h4')
        contenu = contenu.replacei('</title5','</h5')
        contenu = contenu.replacei('</title6','</h6')

    return contenu;
}

var exemple = `
<!TYPEDOCUMENT pageweb>
<pageweb langue="fr">
    <configuration>
        <option encodage="UTF-8">
        <!-- Options facultatives -->
        <option nom="viewport" contenu="width=device-width, initial-scale=1.0">
        <option equivalent-http="X-UA-Compatible" contenu="ie=edge">
        <titre>Mon site Web</titre>
    </configuration>
    <contenu>
        <titre1>Mon site Web</titre1>
        <paragraphe>
            Ceci est mon site Web<retourligne>
            C'est un super <gras>site Web</gras> que j'ai fait tout seul
        </paragraphe>
        <paragraphe>
            Il utilise le machin que j'ai découvert qui nous permet de programmer en français
        </paragraphe>
        </contenu>
</pageweb>
`