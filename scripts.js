function contactTypeFun(inputOption) {
    // console.log(inputOption);
    // document.getElementById('contactType').src = inputOption;
    // var orientationList = document.getElementById("orientationList");
    // var contactTypePic = document.getElementById('contactType').src;
    if (inputOption == "4") {
        document.getElementById("orientationList").style.display = "block";
        // document.getElementById('contactType').src = "pics/CylinderCylinderPerpendicular.PNG";
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
                // console.log("one");
                break;
            case "2":
                document.getElementById('contactType').src = "pics/SphereSphere.PNG";
                document.getElementById("secondRadius").style.display = "block";
                document.getElementById("effectiveRadius").style.display = 'table-row';
                // console.log("two");
                break;
            case "3":
                document.getElementById('contactType').src = "pics/CylinderPlane.PNG";
                document.getElementById("secondRadius").style.display = "none";
                document.getElementById("effectiveRadius").style.display = "none";
                // console.log("three");
                break;
        }
    }
    calculateEffectiveRadius()
}

function orientationFun(inputOption) {
    switch (inputOption) {
        case "1":
            document.getElementById('contactType').src = "pics/CylinderCylinderPerpendicular.PNG";
            break;
        case "2":
            document.getElementById('contactType').src = "pics/CylinderCylinderParallel.PNG";
            break;
    }
}

function calculateEffectiveRadius() {
    var fradius = parseFloat(document.getElementById("firstRadius").value);
    var sradius = parseFloat(document.getElementById("secondRadiusValue").value);
    var calculationResult = fradius * sradius / (fradius + sradius);
    document.getElementById("effectiveRadiusValue").innerHTML = calculationResult.toFixed(2);
}

function calculateEffectiveElasticity() {
    var felastic = parseFloat(document.getElementById("firstElastic").value);
    var selastic = parseFloat(document.getElementById("secondElastic").value);
    var fPoisson = parseFloat(document.getElementById("firstPoisson").value);
    var sPoisson = parseFloat(document.getElementById("secondPoisson").value);
    var calculationResult = felastic * selastic / (selastic * (1 - Math.pow(fPoisson, 2)) + felastic * (1 - Math.pow(sPoisson, 2)));
    document.getElementById("effectiveElasticityValue").innerHTML = calculationResult.toFixed(0);
}

function updateresults() {
    calculateEffectiveRadius();
    calculateEffectiveElasticity()
}