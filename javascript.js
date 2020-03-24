function Totaloversikt(url) {
  this.url = url;
  var xhttp = new XMLHttpRequest();
  xhttp.onreadystatechange = function () {
    if(this.readyState == 4 && this.status == 200){
      data = JSON.parse(xhttp.responseText)
    getNames(data) // kaller funksjonen og med et argument som er xhttp.responseText - data
    getId(data) // kaller funksjonen
    getInfo("0101",data) // kaller funksjonen
}
  };
  xhttp.open("GET",this.url,true) // Ønsker å hente dataen fra nettstedet(wildboy), Når det er "true", så starter prosessen
  xhttp.send(); // sender en forespørsel om å få hente data fra nettet
}

var befolkning = new Totaloversikt("http://wildboy.uib.no/~tpe056/folk/104857.json")
var sysselsatte = new Totaloversikt("http://wildboy.uib.no/~tpe056/folk/100145.json")
var utdanning = new Totaloversikt("http://wildboy.uib.no/~tpe056/folk/85432.json")


// Returnerer listen av alle kommunenavnene (som de fremtrer i datasettet).
function getNames(data) { //  Ett argument, data som henter dataen fra datasettet
  var komnavn = [] // oppretter en liste
  var kommunenavn = Object.keys(data.elementer) // lager en variabel kommunenavn og gir den verdien av alle nøklene i data objektet
  for(x in kommunenavn){ // for loop som går gjennom datanøkler objektene
    komnavn.push(kommunenavn) // legger til datanøkle objektene i en liste(komnavn)
}
//return kommmunenavn //retunerer listen
return komnavn[0]
};

//: Returnerer listen av alle kommunenummerene.
function getId(data){ //Ett argument, data som henter dataen fra datasettet
  var komnummer = getNames(data) // henter data fra XMLHttpRequest
  var komnumliste = [] // tom liste
  var teller = 0 // teller

  for(x in komnummer){ // for loop som går gjennom all dataen fra filen
    var kommune = String(komnummer[teller]) // gir variabelen kommune verdien som er referert til en kommune og teller som indikerer indexen i objektet og henter det ut
    komnumliste.push(data.elementer[kommune].kommunenummer) // legger til kommunenummeret i komnumliste
    teller +=1 // øker hver gang den blir loopet
  }
  return komnumliste // retunerer komnumlisten med kommunenummerene
};
// Tar et kommunenummer som argument, og returnerer informasjonen om denne kommunen
function getInfo(num,data) { //To argumenter, num er kommunenummeret og data retunerer dataen om datasettet
  var infoId = getId(data); // kaller på funksjonen som retunerer listen til getId og gir verdien til infoId
  var nameinfo = getNames(data) // kaller på funksjonen som retunerer listen til getnames og gir verdien til nameInfo

  if(infoId.includes(num)){
    var kommuneIndex = infoId.indexOf(num) // Finner indexen av num i listen til InfoId som er en liste med alle kommunenumerne
    var kommuneInfo = nameinfo[kommuneIndex] // kommuneinfo har fått tilegnet verdien som er kommuneindexen og refererer til kommunen
    komdata = data.elementer[kommuneInfo]
  }else {
    return console.log("Kommunenummer finnes ikke, dessverre")
  }
   // retunerer informasjon om en kommune
  return komdata
};
