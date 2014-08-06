var div = document.getElementById('divCatenaria');
var escena = new Scene(div);

var cable = new Cable();
cable.elasticModulus = 7.9641*Math.pow(10,10);     // Pa;
cable.dilationCoefficient = 0.00001910;            // ºC^-1
cable.section = 54.60;                             // mm^2
cable.linearDensity = 0.189;                       // kg/m
cable.diameter = 9.5;                              // mm

var conditions1 = new Conditions();
var conditions2 = new Conditions();



var tramo;
var range;
var sceneRange;
var constantes;
var catenariaInicalGraph;
var catenariaNuevaGraph;
var posteIzquierdoGraph;
var posteDerechoGraph;
var construido = false;


var construirDibujo = function (form) {

  construido = true;

  var span = form.span.value;
  var temperature = form.temperature.value;
  var windPressure = form.windPressure.value;
  var tension = form.tension.value;

  conditions1.span = span;
  conditions1.temperature = temperature;
  conditions1.windPressure = windPressure;
  conditions1.tension = tension;
  
  conditions2.span = span;
  conditions2.temperature = temperature;
  conditions2.windPressure = windPressure;

  range = new Range(-conditions1.span/2,conditions1.span/2, 0, 35);
  sceneRange = new Range(-conditions1.span/2 - 0.1*span,conditions1.span/2 + 0.1*span, 0, 40);
  
  tramo = new Tramo(cable, conditions1, conditions2);
  tramo.finalConditions.tension = tramo.solveChangeEquation();

  constantes = resuelvaParabola(tramo.a(), -conditions1.span/2,30, conditions1.span/2, 30);
  catenariaInicalGraph = new CatenaryGraph(tramo.a(), constantes[0], constantes[1]);
  catenariaNuevaGraph = new CatenaryGraph(tramo.a(), constantes[0], constantes[1]);
  posteIzquierdoGraph = new Pole(-conditions1.span, 0, 30);
  posteDerechoGraph   = new Pole(+conditions1.span, 0, 30);

  escena.add(catenariaInicalGraph);
  escena.add(posteIzquierdoGraph);
  escena.add(posteDerechoGraph);
  
  escena.range = sceneRange;
  catenariaInicalGraph.range = range;

  escena.plotSVG();
};

var actualizarDibujo = function (form) {
  var temperature = form.temperature.value;
  var windPressure = form.windPressure.value;

  tramo.finalConditions.temperature = temperature;
  tramo.finalConditions.windPressure = windPressure;

  tramo.finalConditions.tension = tramo.solveChangeEquation();
  
  constantes = resuelvaParabola(tramo.a(), -conditions1.span/2,30, conditions1.span/2, 30);

  
  catenariaNuevaGraph.a = tramo.a();
  catenariaNuevaGraph.c1 = constantes[0];
  catenariaNuevaGraph.c2 = constantes[1];

  escena.add(catenariaNuevaGraph);
  catenariaNuevaGraph.range = range;

  catenariaNuevaGraph.plotSVG();
};      

var tablaConstruida = false;
function tableCreate(){
  tablaConstruida = true;
  var body=document.getElementsByTagName('body')[0];
  var tbl=document.createElement('table');
  tbl.style.width='100%';
  tbl.setAttribute('border','1');
  var tbdy=document.createElement('tbody');
  var outputTable = tramo.table(0,40,5);
  var titulo = ['Temperatura (ºC)', 'Tension (N)', 'Flecha (m)']
  var tr=document.createElement('tr');

  for(var i=-1;i<outputTable.length;i++){
    var tr=document.createElement('tr');
    if(i==-1) {
      for(var j=0;j<titulo.length;j++){
	var td=document.createElement('td');
	td.appendChild(document.createTextNode(titulo[j]))
	tr.appendChild(td)
      }
    }
    else {
      for(var j=0;j<outputTable[i].length;j++){
	var td=document.createElement('td');
	td.appendChild(document.createTextNode(outputTable[i][j].toFixed(2)))
	tr.appendChild(td)
      }
    }
    tbdy.appendChild(tr);
  }
  tbl.appendChild(tbdy);
  body.appendChild(tbl)
}
