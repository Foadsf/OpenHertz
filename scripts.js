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


    globalContactType = inputOption;
    if (inputOption == "4") {
        document.getElementById("orientationList").style.display = "block";
        orientationFun(document.getElementById("OrientationSelector").value);
        document.getElementById("secondRadius").style.display = "block";
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
                document.getElementById('indentationPicture').src = "pics/indentationSphere.svg";
                document.getElementById('maxPressurePicture').src = "pics/maxPressureSphere.svg";
                break;
            case "2":
                document.getElementById('contactType').src = "pics/SphereSphere.PNG";
                document.getElementById("secondRadius").style.display = "block";
                document.getElementById("effectiveRadius").style.display = 'table-row';
                document.getElementById("cylinderLength").style.display = "none";
                document.getElementById("pointContact").style.display = "table-row";
                document.getElementById("lineContact").style.display = "none";
                document.getElementById('indentationPicture').src = "pics/indentationSphere.svg";
                document.getElementById('maxPressurePicture').src = "pics/maxPressureSphere.svg";
                break;
            case "3":
                document.getElementById('contactType').src = "pics/CylinderPlane.PNG";
                document.getElementById("secondRadius").style.display = "none";
                document.getElementById("effectiveRadius").style.display = "none";
                document.getElementById("cylinderLength").style.display = "block";
                document.getElementById("pointContact").style.display = "none";
                document.getElementById("lineContact").style.display = "table-row";
                document.getElementById('indentationPicture').src = "pics/indentationLine.svg";
                document.getElementById('maxPressurePicture').src = "pics/maxPressureLine.svg";
                break;
        }
    }
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
            document.getElementById('indentationPicture').src = "pics/indentationLine.svg";
            document.getElementById('maxPressurePicture').src = "pics/maxPressureLine.svg";
            break;
    }
    updateResults();
}
function calculateEffectiveRadius() {
    var fradius = parseFloat(document.getElementById("firstRadius").value);


    if (globalContactType == "1" || globalContactType == "3") {
        globalEffectiveRadius = fradius;
    } else {
        var sradius = parseFloat(document.getElementById("secondRadiusValue").value);
        globalEffectiveRadius = fradius * sradius / (fradius + sradius);
        // LaTeX --> \frac{1}{R_*} = \frac{1}{R_1} + \frac{1}{R_2}
    }

    return globalEffectiveRadius;
}
function calculateEffectiveElasticity() {
    var felastic = parseFloat(document.getElementById("firstElastic").value);
    var selastic = parseFloat(document.getElementById("secondElastic").value);
    var fPoisson = parseFloat(document.getElementById("firstPoisson").value);
    var sPoisson = parseFloat(document.getElementById("secondPoisson").value);
    globalEffectiveElasticity = felastic * selastic / (selastic * (1 - Math.pow(fPoisson, 2)) + felastic * (1 - Math.pow(sPoisson, 2)));
    // LaTeX --> \frac{1}{E_*} = \frac{1 - \nu_1^2}{E_1} + \frac{1 - \nu_2^2}{E_2}
    return globalEffectiveElasticity;
}
function calculateContactRadius() {
    globalContactRadius = Math.pow(3 * globalForce * globalEffectiveRadius / 1E3 / 4 / globalEffectiveElasticity / 1E9, (1 / 3)) * 1E6;
    // LaTeX --> \sqrt[3]{\frac{3 F R_*}{4 E_*}}
    return globalContactRadius;
}

function calculateContactWidth() {
    globalCylinderLength = parseFloat(document.getElementById("cylinderLengthValue").value);
    globalContactWidth = 2 * Math.sqrt(globalForce * globalEffectiveRadius / 1E3 / Math.PI / globalCylinderLength * 1E3 / globalEffectiveElasticity / 1E9) * 1E6;
    // LaTeX --> 2 \sqrt{\frac{F R_*}{\pi L E_*}}
    return globalContactWidth;
}

function calculateIndentation() {
    if (globalContactType == "3" || (globalContactType == "4" && globalOrientationType == "2")) {
        globalIndentation = globalForce / Math.PI / globalEffectiveElasticity / 1E9 / globalCylinderLength * 1E3 * (Math.log(4 * Math.PI * globalEffectiveElasticity * 1E9 * globalEffectiveRadius / 1E3 * globalCylinderLength / 1E3 / globalForce) - 1) * 1E6;
        // LaTeX --> \frac{F}{\pi E_* L} \left( \ln{\left( \frac{4 \pi E_* R_* L}{F} \right)} - 1 \right)
    } else {
        globalIndentation = Math.pow(globalContactRadius, 2) / globalEffectiveRadius / 1E3;
        // LaTeX --> \frac{a^2}{R_*}
    }
    return globalIndentation;
}

function calculateMaximumPressure() {

    if (globalContactType == "3" || (globalContactType == "4" && globalOrientationType == "2")) {
        globalMaximumPressure = 2 * globalForce / Math.PI / globalCylinderLength * 1E3 / globalContactWidth * 1E6 / 1E6;
        // LaTeX --> \frac{2 F}{\pi b L}
    } else {
        globalMaximumPressure = 3 * globalForce / 2 / Math.PI / Math.pow(globalContactRadius / 1E6, 2) / 1E6;
        // LaTeX --> \frac{3 F}{2\pi R_*^2}
    }

    return globalMaximumPressure;
}
function updateResults() {
    globalForce = parseFloat(document.getElementById("forceValue").value);
    globalContactType = document.getElementById("contactTypeList").value;
    globalOrientationType = document.getElementById("OrientationSelector").value;
    document.getElementById("effectiveRadiusValue").innerHTML = calculateEffectiveRadius().toFixed(2);
    document.getElementById("effectiveElasticityValue").innerHTML = calculateEffectiveElasticity().toFixed(2);
    document.getElementById("contactRadius").innerHTML = calculateContactRadius().toFixed(3);
    document.getElementById("contactWidth").innerHTML = calculateContactWidth().toFixed(3);
    document.getElementById("indentation").innerHTML = calculateIndentation().toFixed(3);
    document.getElementById("maximumPressure").innerHTML = calculateMaximumPressure().toFixed(2);
}