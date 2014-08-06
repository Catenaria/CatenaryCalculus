describe("Feature: Cálculo mecánico de líneas eléctricas", function() {
    var cable;
    var initialConditions, finalConditions;
    var tramoTest;
    describe("Scenario: Comenzamos por esoger un cable de tipo HALCON, el cual:", function () {
	cable = new CableHalcon();
	it("debería estar definido tras usar 'new CableHalcon'", function() {
	    expect(cable).toBeDefined();
	});
	describe("y tener las siguientes características:", function () {
	    it("Modulo de Young .................................... $\\scriptsize E = 75830\\ MPa$ ", function () {
		expect(cable.elasticModulus/1000000).toBeBetween(75820, 75840);
	    });
	    it("Coeficiene de dilatación lineal .................... $\\scriptsize\\alpha = 0.00001899\\ ºC^{-1}$", function () {
		expect(cable.dilationCoefficient).toBe(0.00001899);
	    });
	    it("Sección ............................................ $\\scriptsize S = 281.10\\ mm^2$", function () {
		expect(cable.section).toBe(281.10);
	    });
	    it("Densidad lineal .................................... $\\scriptsize\\lambda = 0.9746\\ kg/m$", function () {
		expect(cable.linearDensity).toBe(0.9746);
	    });
	    it("Diámetro ........................................... $\\scriptsize d = 21.793\\ mm$", function () {
		expect(cable.diameter).toBe(21.793);
	    });
	});
    });

    describe("Scenario: Lo siguiente es dar las condiciones en las que se realiza la instalación, por tanto", function () {
	initialConditions = new Conditions();
	initialConditions.span = 300;
	initialConditions.temperature = -20;
	initialConditions.iceCoefficient = 0.36;
	initialConditions.tension = 2939 * G;

	it("initialConditions debería estar definido", function () {
	    expect(initialConditions).toBeDefined();
	});
	describe("y debería tener las siguientes características:", function () {
	    it("Vano ............................................... $\\scriptsize v = 300 \\ m$", function () {
		expect(initialConditions.span).toBe(300);
	    });
	    it("Temperatura ........................................ $\\scriptsize \\theta_1 = -20\\ ºC$", function () {
		expect(initialConditions.temperature).toBe(-20);
	    });
	    it("Manguito de hielo .................................. $\\scriptsize Coeficiente\\ de\\ manguito\\ de\\ hielo = 0.36$", function () {
		expect(initialConditions.iceCoefficient).toBe(0.36);
	    });
	    it("Tension ............................................ $\\scriptsize T_1 = 28831$", function () {
		expect(initialConditions.tension).toBeBetween(28825, 28835);
	    });
	});
    });

    describe("Scenario: Declaramos aquí las condiciones en las que queremos hacer cálculos. Obviamente irán variando, por ejemplo, en un rango de temperaturas.", function () {
	finalConditions = new Conditions();
	finalConditions.span = 300;
	finalConditions.temperature = 0;
	it("finalConditions debería estar definido", function () {
	    expect(finalConditions).toBeDefined();
	});
	describe("de momento ponemos las siguientes características:", function () {
	    it("Vano ............................................... $\\scriptsize v = 300 \\ m$", function () {
		expect(finalConditions.span).toBe(300);
	    });
	    it("Temperatura ........................................ $\\scriptsize \\theta_2 = 0\\ ºC$", function () {
		expect(finalConditions.temperature).toBe(0);
	    });
	    it("Manguito de hielo .................................. $\\scriptsize Coeficiente\\ de\\ manguito\\ de\\ hielo = 0$", function () {
		expect(finalConditions.iceCoefficient).toBe(0);
	    });
	});
    });

    describe("Scenario: Una vez establecidos estos tres puntos, vamos a juntarlos dentro de un tramo, así:", function () {
	tramoTest = new Tramo(cable, initialConditions, finalConditions);
	it("tramoTest debería estar definido", function () {
	    expect(tramoTest).toBeDefined();
	});
    });
});





// describe("Tramo", function() {
//   var tramo;
//   var refSpecs = {
//     span: 300,
//     height: 30,

//     elasticModulus: 7730*1000000*G,
//     dilationCoefficient: 0.00001899,
//     section: 281.10, // mm^2
//     linearDensity: 0.9746, // kg/m
//     diameter: 21.793, // mm

//     tension: 2939*G,
//     temperature: 20,
//     iceCoefficient: 0.36, // or 0.18 or 0.
//     iceWidth: 0, // needed when considering ice and wind together, in meters
//     windPressure: 0,

//     loadRate: function() {

//       var ph = this.iceCoefficient*Math.sqrt(this.diameter);
//       var pv = this.windPressure * (this.diameter/1000 + 2*this.iceWidth);
//       var p  = this.linearDensity;
//       pApparent = Math.sqrt((p+ph)*(p+ph) + pv*pv);
//       m = pApparent / p;

//       // esta linea redondea m a 2.72, con mas decimales resulta que otras pruebas fallan, pues los numeros se desvian un poco
//       m = Math.round(m*Math.pow(10,2))/Math.pow(10,2);
//       return m;
//     },
//     K: function() {
//       return 17.25;
//     }
//   };
//   var newSpecs = {
//     temperature: 20,
//     loadRate: 2.72,
//     tension: 2939*G
//   };
  
//   beforeEach(function() {
//     tramo = new Tramo(refSpecs, newSpecs);
//   });


//   describe("refSpecs", function() {
//     it("they should be defined", function() {
//       expect(tramo.refSpecs).toBeDefined();
//     });


//     it("should have span defined .............................(now span = 300 m)", function() {
//       expect(tramo.refSpecs.span).toBeDefined();
//     });
    
//     it("should have height defined ...........................(now height = 30 m)", function() {
//       expect(tramo.refSpecs.height).toBeDefined();
//     });
    
//     it("should have linearDensity defined ....................(now linearDensity = 0.9746 kg/m)", function() {
//       expect(tramo.refSpecs.linearDensity).toBeDefined();
//     });

//     it("should have section defined ..........................(now section = 281.10 mm^2)", function() {
//       expect(tramo.refSpecs.section).toBeDefined();
//     });

//     it("should have dilationCoefficient defined ..............(now dilationCoefficient = 0.00001899 ºC^-1)", function() {
//       expect(tramo.refSpecs.dilationCoefficient).toBeDefined();
//     });
    
//     it("should have tension defined ..........................(now tension = 2939*9.81 N = 28831 N)", function() {
//       expect(tramo.refSpecs.tension).toBeDefined();
//     });

//     it("should have temperature defined ......................(now temperature = 20 ºC)", function() {
//       expect(tramo.refSpecs.temperature).toBeDefined();
//     });

//     it("should have elasticModulus defined ...................(now elasticModulus = 7.5*10^10 Pa)", function() {
//       expect(tramo.refSpecs.elasticModulus).toBeDefined();
//     });
    
//     describe("#loadRate", function() {
//       it("this method should be defined", function() {
// 	expect(tramo.refSpecs.loadRate).toBeDefined();
//       });
//       it("at least in this example, it will return 2.72", function() {
// 	expect(tramo.refSpecs.loadRate()).toBeBetween(2.71, 2.73);
//       });
//     });

//   });



//   describe("newSpecs", function() {
//     it("they should be defined", function() {
//       expect(tramo.newSpecs).toBeDefined();
//     });

//     it("should have temperature defined ......................(now temperature = 20 ºC)", function() {
//       expect(tramo.newSpecs.temperature).toBeDefined();
//     });
    
//     // the following should be calcualated in terms of temperature, wind, ice, etc
//     it("should have loadRate defined .........................(now loadRate = 2.72)", function() {
//       expect(tramo.newSpecs.loadRate).toBeDefined();
//     });
//     // and the following should be calculated in terms of the loadRate
//     it("should have tension defined ..........................(now tension = 28831)", function() {
//       expect(tramo.newSpecs.tension).toBeDefined();
//     });
//   });


//   describe("#sag", function() {
//     it("this method should be defined", function() {
//       expect(tramo.sag).toBeDefined();
//     });
//     it("should return 10.13, (recall that sag = span^2 * linearDensity * m * G / (8*tension))", function () {
//       expect(tramo.sag()).toBeBetween(10.1,10.2);
//     });
//   });

//   describe("#a, which gives the parameter that defines the catenary", function() {
//     it("this method should be defined", function() {
//       expect(tramo.a).toBeDefined();
//     });
//     it("should return something close to 1.019, (recall that a = tension / (G * linearDensity * m))", function () {
//       expect(tramo.a()).toBeBetween(1106, 1109);
//     });
//   });

//   describe("#K, which gives the constant that appears in the changeEquation", function() {
//     it("this method should be defined", function() {
//       expect(tramo.K).toBeDefined();
//     });
//     it("it should be close to -13.06", function() {
//       expect(tramo.K()).toBeBetween(-14, -13);
//     });
//   });    

//   describe("#A, which gives one of the coefficients for the changeEquation", function() {
//     it("should be defined", function() {
//       expect(tramo.A).toBeDefined();
//     });
//     it("at least in this example, should return the same value as -K (i.e +13.06)", function() {
//       expect(tramo.A()).toBeBetween(13, 14);
//     });
//   });
  
//   describe("#B, which gives the other coefficient for the changeEquation", function() {
//     it("should be defined", function() {
//       expect(tramo.B).toBeDefined();
//     });
//   });

//   describe("#solveChangeEquation", function () {
//     it("should be defined", function() {
//       expect(tramo.solveChangeEquation).toBeDefined();
//     })
//     it("at least in this example, should return 28831 as a solution", function() {
//       expect(tramo.solveChangeEquation()).toBeBetween(28830, 28832);
//     });
//   });


// });


