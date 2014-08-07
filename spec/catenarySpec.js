describe("catenaria", function() {

  describe("cuando pasas un argumento", function() {
    
    it("devuelve 1 en 0", function() {
      expect(catenaria(0)).toEqual(1.0);
    });

  });
  describe("cuando pasas dos argumentos", function() {
    
    it("devuelve 2 en 0", function() {
      expect(catenaria(0,2)).toEqual(2.0);
    });

  });

  describe("cuando pasas tres argumentos", function() {
    
    it("devuelve 3 en 1", function() {
      expect(catenaria(1,3,1)).toEqual(3.0);
    });

  });
  
  describe("cuando pasas cuatro argumentos", function() {
    
    it("devuelve 3 en 1", function() {
      expect(catenaria(1,2,1,1)).toEqual(3.0);
    });

  });
  
});

describe("parabola", function() {

  describe("cuando pasas un argumento", function() {
    
    it("devuelve 1 en 0", function() {
      expect(parabola(0)).toBeCloseTo(1.0,2);
    });

  });
  describe("cuando pasas dos argumentos", function() {
    
    it("devuelve 2 en 0", function() {
      expect(parabola(0,2)).toEqual(2.0);
    });

  });

  describe("cuando pasas tres argumentos", function() {
    
    it("devuelve 3 en 1", function() {
      expect(parabola(1,3,1)).toEqual(3.0);
    });

  });
  
  describe("cuando pasas cuatro argumentos", function() {
    
    it("devuelve 3 en 1", function() {
      expect(parabola(1,2,1,1)).toEqual(3.0);
    });

  });
  
});


describe("resuelveParabola", function() {
  var y1,y2;

  beforeEach(function() {
    y1 = parabola(1,1);
    y2 = parabola(2,1);
  });

  describe("cuando hay dos postes iguales",function() {
    describe("simetricos", function() {
      it("devuelva c1=0 y c2 = 0", function() {
	var c = resuelveParabola(1,-1,y1,1,y1);
	expect(c).toEqual([0,0]);
      })
      it("devuelva c1=0 y c2 = 1", function() {
	var c = resuelveParabola(1,-1,y1+1,1,y1+1);
	expect(c).toEqual([0,1]);
      })
    });
    describe("no simetricos", function() {
      it("devuelva c1 = 1, and c2=0", function() {
	var c = resuelveParabola(1,0,y1,2,y1);
	expect(c).toEqual([1,0]);
      })
    });
  });

  describe("cuando hay dos postes no iguales",function() {
    it("devuelva",function() {
      var c = resuelveParabola(1,-1,y1,2,y2);
      expect(c).toEqual([0,0]);
    });
  });
});




describe("Cable: It describes the following specifications of the cable, which should be defined", function() {

  var cable = new Cable();

  // Here we should initialize the cable specs, otherwise, the test will fail.
  cable.elasticModulus = 7730*1000000*G;     // Pa;
  cable.dilationCoefficient = 0.00001899;    // ºC^-1
  cable.section = 281.10;                    // mm^2
  cable.linearDensity = 0.9746;              // kg/m
  cable.diameter = 21.793;                   // mm

  it("#elasticModulus .............................(Pa)", function() {
    expect(cable.elasticModulus).toBeDefined();
  });
  it("#dilationCoefficient ........................(ºC^-1)", function() {
    expect(cable.dilationCoefficient).toBeDefined();
  });
  it("#section ....................................(mm^2)", function() {
    expect(cable.section).toBeDefined();
  });
  it("#linearDensity ..............................(Kg/m)", function() {
    expect(cable.linearDensity).toBeDefined();
  });
  it("#diameter ...................................(mm)", function() {
    expect(cable.diameter).toBeDefined();
  });
  
});

describe("Conditions: It describes the rest of the parameters required for the calculations", function() { 

  var conditions = new Conditions();
  
  describe("required conditions", function() {
    // Here we should initialize the required conditions, otherwise the test will fail.
    conditions.span = 300;         // m
    conditions.temperature = -20;  // ºC

    it("#span should be defined ...................(m)", function() {
      expect(conditions.span).toBeDefined();
    });
    it("#temperature should be defined ............(ºC)", function() {
      expect(conditions.temperature).toBeDefined();
    });
  });



  describe("optional conditions which are set to 0 by default", function() {
    it("#iceCoefficient ...........................(adimensional)", function() {
      expect(conditions.iceCoefficient).toBe(0);
    });
    it("#iceWidth .................................(m)", function() {
      expect(conditions.iceWidth).toBe(0);
    });
    it("#windPressure .............................(Pa)", function() {
      expect(conditions.windPressure).toBe(0);
    });
  });



  describe("output parameters which are set to 0 by default", function() {
    it("#loadRate .................................(adimensional)", function() {
      expect(conditions.loadRate).toBe(0);
    });
    it("#tension ..................................(N)", function() {
      expect(conditions.tension).toBe(0);
    });
    it("#sag ......................................(m)", function() {
      expect(conditions.sag).toBe(0);
    });
  });

});



describe("Tramo: created with a cable and two conditions (initial and final)", function() {

  var cable = new Cable();
    cable.elasticModulus = 7730*1000000*G;     // Pa;
    cable.dilationCoefficient = 0.00001899;    // ºC^-1
    cable.section = 281.10;                    // mm^2
    cable.linearDensity = 0.9746;              // kg/m
    cable.diameter = 21.793;                   // mm

  var conditions1 = new Conditions();
    conditions1.span = 300;                    // m
    conditions1.temperature = -20;             // ºC
    conditions1.iceCoefficient = 0.36;

  var conditions2 = new Conditions();
    conditions2.span = 300;
    conditions2.temperature = 10;

  var tramo = new Tramo(cable, conditions1, conditions2);

  it("should have #cable defined", function() {
    expect(tramo.cable).toBeDefined();
  });
  it("should have #initialConditions defined", function() {
    expect(tramo.initialConditions).toBeDefined();
  });
  it("should have #finalConditions defined", function() {
    expect(tramo.finalConditions).toBeDefined();
  });
  it("these two conditions should have the same span", function () {
    expect(tramo.initialConditions.span).toBe(tramo.finalConditions.span);
  });



  describe("#loadRate: given the conditions as a parameter, it returns the loadRate", function() {
    it("should be defined", function() {
      expect(tramo.loadRate).toBeDefined();
    });
    it("should return 2.72 with initialConditions (example from the book)", function () {
      expect(tramo.loadRate(tramo.initialConditions)).toBeBetween(2.71,2.73);
    });
    it("and set that value to the initialConditions.loadRate attribute", function () {
      expect(tramo.initialConditions.loadRate).toBe(tramo.loadRate(tramo.initialConditions));
    });
    it("should return 1 in the finalConditions of the example (when not considering neither wind nor ice)", function () {
      expect(tramo.loadRate(tramo.finalConditions)).toBe(1);
    });
    it("and set that value to the finalConditions.loadRate attribute", function () {
      expect(tramo.finalConditions.loadRate).toBe(tramo.loadRate(tramo.finalConditions));
    });
  });


  describe("#solveChangeEquation", function () {

    beforeEach(function() {
      spyOn(tramo, 'loadRate');
      tramo.solveChangeEquation();
    });

    it("should be defined", function () {
      expect(tramo.solveChangeEquation).toBeDefined();
    });
    it("should start calling loadRate twice:", function () {
      expect(tramo.loadRate).toHaveBeenCalled();
    });
    it(" --------> with initialConditions as an argument (i.e. loadRate(initialConditions))", function () {
      expect(tramo.loadRate).toHaveBeenCalledWith(conditions1);
    });
    it(" --------> with finalConditions as an argument (i.e. loadRate(finalConditions))", function () {
      expect(tramo.loadRate).toHaveBeenCalledWith(conditions2);
    });
  });


  describe("#sag", function () {
    it("should be defined", function () {
      expect(tramo.sag).toBeDefined();
    });
  });


  describe("#a", function () {
    it("should be defined", function () {
      expect(tramo.a).toBeDefined();
    });
  });

  
  describe("#table", function () {
    it("should be defined", function () {
      expect(tramo.table).toBeDefined();
    });
  });
});

