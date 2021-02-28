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
    } else {
        document.getElementById("orientationList").style.display = "none";
        switch (inputOption) {
            case "1":
                document.getElementById('contactType').src = "pics/SpherePlane.PNG";
                document.getElementById("secondRadius").style.display = "none";
                // console.log("one");
                break;
            case "2":
                document.getElementById('contactType').src = "pics/SphereSphere.PNG";
                document.getElementById("secondRadius").style.display = "block";
                // console.log("two");
                break;
            case "3":
                document.getElementById('contactType').src = "pics/CylinderPlane.PNG";
                document.getElementById("secondRadius").style.display = "none";
                // console.log("three");
                break;
        }
    }
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