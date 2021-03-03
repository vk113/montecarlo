
const punkte = [];


var anzahl_punkte_innerhalb = 0;
var anzahl_punkte_ausserhalb = 0;

const radius = 100;
var cam;
var cnv; 


function setup(){
    let inside = document.getElementById("inside");
    let outside = document.getElementById("outside");
    let volume = document.getElementById("volume");
    document.getElementById("radius").innerHTML = radius;

    cnv = createCanvas(window.innerWidth, window.innerHeight, WEBGL);
    //cnv.mouseWheel(zoom);
    wuerfel = new Wuerfel(2*radius);

}

function draw(){
    background(0); 
    draw_points(); 

    orbitControl();

    // Wir zeichnen ein Koordinatensystem zur orientierung
    draw_coordinates(); 
    
    // Linien ("stroke") werden ab jetzt weiß gezeichnet 
    stroke(255); 
    
    // Flächen werden ab jetzt grau transparent gefüllt ("fill");
    fill(128, 128); 
    
    // Die Kugel ("sphere") mit Radius radius wird gezeichnet;
    sphere(radius); 
  
    // Der Würfel wird gezeichnet
    wuerfel.draw(); 
  
    p = new ZufallsPunkt(2*radius);
  
    // wir müssen zaehlen, ob der Punkt ausserhalb oder innerhalb liegt
    zaehler(p); 
    
    // wir fügen den Punkt p zu unserer Liste hinzu
    punkte.push(p); 
}


function draw_points() {
    for (let i = 0; i < punkte.length; i++) {
      if (punkte[i].ist_innerhalb(radius)) {
        punkte[i].draw(0, 255, 0);
      } else {
        punkte[i].draw(255, 0, 0);
      }
    }
  }
  
  
function zaehler(p) {
    if(p.ist_innerhalb(radius)){
      anzahl_punkte_innerhalb++;
    } else {
      anzahl_punkte_ausserhalb++;
    }
    let volumen_kugel = wuerfel.volumen() * anzahl_punkte_innerhalb/(anzahl_punkte_ausserhalb + anzahl_punkte_innerhalb);
    inside.innerHTML = anzahl_punkte_innerhalb;
    outside.innerHTML = anzahl_punkte_ausserhalb;
    volume.innerHTML = round(volumen_kugel, 2);
  }
  
  
  // Methode zum Zeichnen eines Koordinatensystems
function draw_coordinates() {
    stroke(255, 0, 0);
    line(-1000, 0, 0, 1000, 0, 0);
    stroke(0, 255, 0);
    line(0, -1000, 0, 0, 1000, 0);
    stroke(0, 0, 255);
    line(0, 0, -1000, 0, 0, 1000);
  }

class Wuerfel {

    constructor(s){
        this.s = s;
    }
  
  
    volumen() {
      return this.s*this.s*this.s; 
    }
  
    draw() {
      stroke(255);
      noFill();
      box(this.s);
    }
  } 


class ZufallsPunkt {

    constructor(s){
        this.x = round(random(-s/2, s/2)); //0 ist hier ein Platzhalter
        this.y = round(random(-s/2, s/2));
        this.z = round(random(-s/2, s/2)); 
    }       
  
    abstand() {
       return sqrt(this.x*this.x+this.y*this.y+this.z*this.z); //0 ist hier ein Platzhalter
    }
  
    ist_innerhalb(radius) {
      return this.abstand() < radius; //false ist hier ein Platzhalter
    }
  
    draw(r,g,b) {
      strokeWeight(5);
      stroke(r, g, b);
      point(this.x, this.y, this.z);
      strokeWeight(1);
    }
}


function zoom(event) {
    // zoom according to direction of mouseWheelDeltaY rather than value
    let sensitivityZoom = 0.0001;
    let scaleFactor = cnv.height;
    if (event.deltaY > 0) {
    cnv._curCamera._orbit(0, 0, sensitivityZoom * scaleFactor);
    } else {
    cnv._curCamera._orbit(0, 0, -sensitivityZoom * scaleFactor);
    }
}   


