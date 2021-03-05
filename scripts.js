var globalEffectiveRadius;
var globalEffectiveElasticity;
var globalContactRadius;
var globalContactWidth;
var globalIndentation;
var globalMaximumPressure;
var globalForce;
var globalContactType;
var globalOrientationType;
var globalCylinderLength;


function contactTypeFun(inputOption) {
    // console.log(inputOption);
    // document.getElementById('contactType').src = inputOption;
    // var orientationList = document.getElementById("orientationList");
    // var contactTypePic = document.getElementById('contactType').src;
    globalContactType = inputOption;
    if (inputOption == "4") {
        document.getElementById("orientationList").style.display = "block";
        // document.getElementById('contactType').src = "pics/CylinderCylinderPerpendicular.PNG";
        orientationFun(document.getElementById("OrientationSelector").value);
        document.getElementById("secondRadius").style.display = "block";
        // document.getElementById("cylinderLength").style.display = "block";
        document.getElementById("effectiveRadius").style.display = 'table-row';
    } else {
        document.getElementById("orientationList").style.display = "none";
        switch (inputOption) {
            case "1":
                document.getElementById('contactType').src = "pics/SpherePlane.PNG";
                document.getElementById("secondRadius").style.display = "none";
                document.getElementById("effectiveRadius").style.display = "none";
                document.getElementById("cylinderLength").style.display = "none";
                document.getElementById("pointContact").style.display = "table-row";
                document.getElementById("lineContact").style.display = "none";
                // console.log("one");
                break;
            case "2":
                document.getElementById('contactType').src = "pics/SphereSphere.PNG";
                document.getElementById("secondRadius").style.display = "block";
                document.getElementById("effectiveRadius").style.display = 'table-row';
                document.getElementById("cylinderLength").style.display = "none";
                document.getElementById("pointContact").style.display = "table-row";
                document.getElementById("lineContact").style.display = "none";
                // console.log("two");
                break;
            case "3":
                document.getElementById('contactType').src = "pics/CylinderPlane.PNG";
                document.getElementById("secondRadius").style.display = "none";
                document.getElementById("effectiveRadius").style.display = "none";
                document.getElementById("cylinderLength").style.display = "block";
                document.getElementById("pointContact").style.display = "none";
                document.getElementById("lineContact").style.display = "table-row";
                // console.log("three");
                break;
        }
    }
    // calculateEffectiveRadius()
    updateResults();
}

function orientationFun(inputOption) {
    switch (inputOption) {
        case "1":
            document.getElementById('contactType').src = "pics/CylinderCylinderPerpendicular.PNG";
            document.getElementById("cylinderLength").style.display = "none";
            document.getElementById("pointContact").style.display = "table-row";
            document.getElementById("lineContact").style.display = "none";
            break;
        case "2":
            document.getElementById('contactType').src = "pics/CylinderCylinderParallel.PNG";
            document.getElementById("cylinderLength").style.display = "block";
            document.getElementById("pointContact").style.display = "none";
            document.getElementById("lineContact").style.display = "table-row";
            break;
    }
    updateResults();
}

function calculateEffectiveRadius() {
    var fradius = parseFloat(document.getElementById("firstRadius").value);

    // var localContactType = document.getElementById("contactTypeList").value;
    // console.log(globalContactType);

    // if (localContactType == "1" || localContactType == "3") {
    if (globalContactType == "1" || globalContactType == "3") {
        globalEffectiveRadius = fradius;
        // console.log(localContactType);
    } else {
        // console.log(localContactType);
        var sradius = parseFloat(document.getElementById("secondRadiusValue").value);
        // console.log(sradius);
        globalEffectiveRadius = fradius * sradius / (fradius + sradius);
        // console.log(globalEffectiveRadius);
    }

    // globalEffectiveRadius = calculationResult;
    // document.getElementById("effectiveRadiusValue").innerHTML = calculationResult.toFixed(2);
    return globalEffectiveRadius;
}

function calculateEffectiveElasticity() {
    var felastic = parseFloat(document.getElementById("firstElastic").value);
    var selastic = parseFloat(document.getElementById("secondElastic").value);
    var fPoisson = parseFloat(document.getElementById("firstPoisson").value);
    var sPoisson = parseFloat(document.getElementById("secondPoisson").value);
    globalEffectiveElasticity = felastic * selastic / (selastic * (1 - Math.pow(fPoisson, 2)) + felastic * (1 - Math.pow(sPoisson, 2)));
    // document.getElementById("effectiveElasticityValue").innerHTML = calculationResult.toFixed(0);
    // globalEffectiveElasticity = calculationResult;
    return globalEffectiveElasticity;
}

function calculateContactRadius() {
    // var effectiveElasticity = calculateEffectiveElasticity() * 1E9;
    // var effectiveElasticity = globalEffectiveElasticity * 1E9;
    // var effectiveRadius = calculateEffectiveRadius() / 1E3;
    // var effectiveRadius = globalEffectiveRadius / 1E3;
    // globalForce = parseFloat(document.getElementById("forceValue").value);
    globalContactRadius = Math.pow(3 * globalForce * globalEffectiveRadius / 1E3 / 4 / globalEffectiveElasticity / 1E9, (1 / 3)) * 1E6;
    // document.getElementById("contactRadius").innerHTML = calculationResult.toFixed(2);
    // globalContactRadius = calculationResult;
    return globalContactRadius;
}

function calculateContactWidth() {
    // globalForce = parseFloat(document.getElementById("forceValue").value);
    globalCylinderLength = parseFloat(document.getElementById("cylinderLengthValue").value);
    globalContactWidth = 2 * Math.sqrt(globalForce * globalEffectiveRadius / 1E3 / Math.PI / globalCylinderLength * 1E3 / globalEffectiveElasticity / 1E9) * 1E6;
    return globalContactWidth;
}


function calculateIndentation() {
    // var effectiveRadius = calculateEffectiveRadius() * 1E3;
    // var effectiveRadius = globalEffectiveRadius * 1E3;
    // var contactRadius = calculateContactRadius();

    // console.log(globalContactType);
    // console.log(globalOrientationType);


    if (globalContactType == "3" || (globalContactType == "4" && globalOrientationType == "2")) {
        globalIndentation = globalForce / Math.PI / globalEffectiveElasticity / 1E9 / globalCylinderLength * 1E3 * (Math.log(4 * Math.PI * globalEffectiveElasticity * 1E9 * globalEffectiveRadius / 1E3 * globalCylinderLength / 1E3 / globalForce) - 1) * 1E6;
        // globalIndentation = Math.pow(globalContactWidth, 2) / globalEffectiveRadius / 1E3;
        // console.log(globalContactWidth);
        // console.log(globalEffectiveRadius);
    } else {
        globalIndentation = Math.pow(globalContactRadius, 2) / globalEffectiveRadius / 1E3;
    }


    // document.getElementById("indentation").innerHTML = calculationResult.toFixed(2);
    return globalIndentation;
}

// 3 * $force / 2 / [Math]::PI / [Math]::Pow($contact_radius, 2)

function calculateMaximumPressure() {
    // var contactRadius = calculateContactRadius() / 1E6;
    // var force = parseFloat(document.getElementById("forceValue").value);
    if (globalContactType == "3" || (globalContactType == "4" && globalOrientationType == "2")) {
        globalMaximumPressure = 2 * globalForce / Math.PI / globalCylinderLength * 1E3 / globalContactWidth * 1E6 / 1E6;
    } else {
        globalMaximumPressure = 3 * globalForce / 2 / Math.PI / Math.pow(globalContactRadius / 1E6, 2) / 1E6;
    }

    // document.getElementById("maximumPressure").innerHTML = calculationResult.toFixed(0);
    // globalMaximumPressure = calculationResult;
    return globalMaximumPressure;
}

function updateResults() {
    globalForce = parseFloat(document.getElementById("forceValue").value);
    globalContactType = document.getElementById("contactTypeList").value;
    globalOrientationType = document.getElementById("OrientationSelector").value;
    document.getElementById("effectiveRadiusValue").innerHTML = calculateEffectiveRadius().toFixed(2);
    // calculateEffectiveRadius();
    document.getElementById("effectiveElasticityValue").innerHTML = calculateEffectiveElasticity().toFixed(2);
    // calculateEffectiveElasticity();
    document.getElementById("contactRadius").innerHTML = calculateContactRadius().toFixed(3);
    // calculateContactRadius();
    document.getElementById("contactWidth").innerHTML = calculateContactWidth().toFixed(3);
    document.getElementById("indentation").innerHTML = calculateIndentation().toFixed(3);
    // calculateIndentation()
    document.getElementById("maximumPressure").innerHTML = calculateMaximumPressure().toFixed(2);
    // calculateMaximumPressure()
}