import { calculate } from './calculator.js';

const app = {
  state: {
    contactType: '1',
    orientation: '1',
    firstRadius: 10.0,
    secondRadius: 20.0,
    cylinderLength: 30.0,
    force: 20.0,
    firstElastic: 200,
    secondElastic: 200,
    firstPoisson: 0.3,
    secondPoisson: 0.3,
    workOfAdhesion: 0.1,
  },
  elements: {},
  init() {
    // Cache DOM elements
    this.elements.contactTypeList = document.getElementById('contactTypeList');
    this.elements.orientationSelector = document.getElementById('OrientationSelector');
    this.elements.firstRadius = document.getElementById('firstRadius');
    this.elements.secondRadiusValue = document.getElementById('secondRadiusValue');
    this.elements.cylinderLengthValue = document.getElementById('cylinderLengthValue');
    this.elements.forceValue = document.getElementById('forceValue');
    this.elements.firstElastic = document.getElementById('firstElastic');
    this.elements.secondElastic = document.getElementById('secondElastic');
    this.elements.firstPoisson = document.getElementById('firstPoisson');
    this.elements.secondPoisson = document.getElementById('secondPoisson');

    this.elements.orientationList = document.getElementById('orientationList');
    this.elements.contactTypeImg = document.getElementById('contactType');
    this.elements.secondRadiusP = document.getElementById('secondRadius');
    this.elements.effectiveRadiusTr = document.getElementById('effectiveRadius');
    this.elements.cylinderLengthP = document.getElementById('cylinderLength');
    this.elements.pointContactTr = document.getElementById('pointContact');
    this.elements.lineContactTr = document.getElementById('lineContact');
    this.elements.indentationPicture = document.getElementById('indentationPicture');
    this.elements.maxPressurePicture = document.getElementById('maxPressurePicture');

    this.elements.effectiveRadiusValue = document.getElementById('effectiveRadiusValue');
    this.elements.effectiveElasticityValue = document.getElementById('effectiveElasticityValue');
    this.elements.contactRadius = document.getElementById('contactRadius');
    this.elements.contactWidth = document.getElementById('contactWidth');
    this.elements.indentation = document.getElementById('indentation');
    this.elements.maximumPressure = document.getElementById('maximumPressure');
    this.elements.firstMises = document.getElementById('firstMises');
    this.elements.secondMises = document.getElementById('secondMises');
    this.elements.firstMisesDepth = document.getElementById('firstMisesDepth');
    this.elements.secondMisesDepth = document.getElementById('secondMisesDepth');
    this.elements.firstShear = document.getElementById('firstShear');
    this.elements.secondShear = document.getElementById('secondShear');
    this.elements.firstShearDepth = document.getElementById('firstShearDepth');
    this.elements.secondShearDepth = document.getElementById('secondShearDepth');
    this.elements.workOfAdhesion = document.getElementById('workOfAdhesion');
    this.elements.pullOffForceValue = document.getElementById('pullOffForceValue');
    this.elements.taborParameterValue = document.getElementById('taborParameterValue');
    this.elements.adhesionModelValue = document.getElementById('adhesionModelValue');

    // Add event listeners
    const inputs = [
      this.elements.contactTypeList, this.elements.orientationSelector,
      this.elements.firstRadius, this.elements.secondRadiusValue,
      this.elements.cylinderLengthValue, this.elements.forceValue,
      this.elements.firstElastic, this.elements.secondElastic,
      this.elements.firstPoisson, this.elements.secondPoisson,
      this.elements.workOfAdhesion
    ];
    inputs.forEach(input => {
        if(input) {
            input.addEventListener('change', () => this.update());
        }
    });

    // Initial update
    this.update();
  },
  readInputs() {
    this.state.contactType = this.elements.contactTypeList.value;
    this.state.orientation = this.elements.orientationSelector.value;
    this.state.firstRadius = parseFloat(this.elements.firstRadius.value);
    this.state.secondRadius = parseFloat(this.elements.secondRadiusValue.value);
    this.state.cylinderLength = parseFloat(this.elements.cylinderLengthValue.value);
    this.state.force = parseFloat(this.elements.forceValue.value);
    this.state.firstElastic = parseFloat(this.elements.firstElastic.value);
    this.state.secondElastic = parseFloat(this.elements.secondElastic.value);
    this.state.firstPoisson = parseFloat(this.elements.firstPoisson.value);
    this.state.secondPoisson = parseFloat(this.elements.secondPoisson.value);
    this.state.workOfAdhesion = parseFloat(this.elements.workOfAdhesion.value);
  },
  updateUI() {
    const { contactType, orientation } = this.state;
    const isCylinderCylinder = contactType === '4';

    this.elements.orientationList.style.display = isCylinderCylinder ? 'block' : 'none';

    if (isCylinderCylinder) {
      this.elements.secondRadiusP.style.display = 'block';
      this.elements.effectiveRadiusTr.style.display = 'table-row';
      if (orientation === '1') { // Perpendicular
        this.elements.contactTypeImg.src = 'pics/CylinderCylinderPerpendicular.PNG';
        this.elements.cylinderLengthP.style.display = 'none';
        this.elements.pointContactTr.style.display = 'table-row';
        this.elements.lineContactTr.style.display = 'none';
        this.elements.indentationPicture.src = 'pics/indentationSphere.svg';
        this.elements.maxPressurePicture.src = 'pics/maxPressureSphere.svg';
      } else { // Parallel
        this.elements.contactTypeImg.src = 'pics/CylinderCylinderParallel.PNG';
        this.elements.cylinderLengthP.style.display = 'block';
        this.elements.pointContactTr.style.display = 'none';
        this.elements.lineContactTr.style.display = 'table-row';
        this.elements.indentationPicture.src = 'pics/indentationLine.svg';
        this.elements.maxPressurePicture.src = 'pics/maxPressureLine.svg';
      }
    } else {
      switch (contactType) {
        case '1': // Sphere - Plane
          this.elements.contactTypeImg.src = 'pics/SpherePlane.PNG';
          this.elements.secondRadiusP.style.display = 'none';
          this.elements.effectiveRadiusTr.style.display = 'none';
          this.elements.cylinderLengthP.style.display = 'none';
          this.elements.pointContactTr.style.display = 'table-row';
          this.elements.lineContactTr.style.display = 'none';
          this.elements.indentationPicture.src = 'pics/indentationSphere.svg';
          this.elements.maxPressurePicture.src = 'pics/maxPressureSphere.svg';
          break;
        case '2': // Sphere - Sphere
          this.elements.contactTypeImg.src = 'pics/SphereSphere.PNG';
          this.elements.secondRadiusP.style.display = 'block';
          this.elements.effectiveRadiusTr.style.display = 'table-row';
          this.elements.cylinderLengthP.style.display = 'none';
          this.elements.pointContactTr.style.display = 'table-row';
          this.elements.lineContactTr.style.display = 'none';
          this.elements.indentationPicture.src = 'pics/indentationSphere.svg';
          this.elements.maxPressurePicture.src = 'pics/maxPressureSphere.svg';
          break;
        case '3': // Cylinder - Plane
          this.elements.contactTypeImg.src = 'pics/CylinderPlane.PNG';
          this.elements.secondRadiusP.style.display = 'none';
          this.elements.effectiveRadiusTr.style.display = 'none';
          this.elements.cylinderLengthP.style.display = 'block';
          this.elements.pointContactTr.style.display = 'none';
          this.elements.lineContactTr.style.display = 'table-row';
          this.elements.indentationPicture.src = 'pics/indentationLine.svg';
          this.elements.maxPressurePicture.src = 'pics/maxPressureLine.svg';
          break;
        case '5': // Elliptical
          this.elements.contactTypeImg.src = 'pics/Elliptical.PNG';
          break;
      }
    }
  },
  calculate() {
    return calculate(this.state);
  },
  displayResults(results) {
    const toFixed = (val, places) => (val && isFinite(val)) ? val.toFixed(places) : 'N/A';

    this.elements.effectiveRadiusValue.innerHTML = toFixed(results.effectiveRadius, 2);
    this.elements.effectiveElasticityValue.innerHTML = toFixed(results.effectiveElasticity, 2);
    this.elements.contactRadius.innerHTML = toFixed(results.contactRadius, 3);
    this.elements.contactWidth.innerHTML = toFixed(results.contactWidth, 3);
    this.elements.indentation.innerHTML = toFixed(results.indentation, 3);
    this.elements.maximumPressure.innerHTML = toFixed(results.maximumPressure, 2);
    this.elements.firstMises.innerHTML = toFixed(results.firstMises, 2);
    this.elements.secondMises.innerHTML = toFixed(results.secondMises, 2);
    this.elements.firstMisesDepth.innerHTML = toFixed(results.firstMisesDepth, 3);
    this.elements.secondMisesDepth.innerHTML = toFixed(results.secondMisesDepth, 3);
    this.elements.firstShear.innerHTML = toFixed(results.firstShear, 2);
    this.elements.secondShear.innerHTML = toFixed(results.secondShear, 2);
    this.elements.firstShearDepth.innerHTML = toFixed(results.firstShearDepth, 3);
    this.elements.secondShearDepth.innerHTML = toFixed(results.secondShearDepth, 3);

    // Adhesion results
    this.elements.pullOffForceValue.innerHTML = toFixed(results.pullOffForce, 3);
    this.elements.taborParameterValue.innerHTML = toFixed(results.taborParameter, 3);
    this.elements.adhesionModelValue.innerHTML = results.adhesionModel;
  },
  update() {
    this.readInputs();
    this.updateUI();
    const results = this.calculate();
    this.displayResults(results);
  },
};

window.addEventListener('load', () => app.init());