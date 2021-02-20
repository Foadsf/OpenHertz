var ohVersion = "0.0.1";

WScript.StdOut.WriteLine("Welcome to OpenHertz v" + ohVersion + ", a Free Hertzian contact calculator for Windows written in pure JScript. If there are issues please report them on https://github.com/Foadsf/OpenHertz/");
WScript.StdOut.WriteLine("Press Ctrl + c twice to terminate and quite");
WScript.StdOut.WriteLine("-----------------------------------------------------------");
WScript.StdOut.WriteLine("Please select the contact type:");
WScript.StdOut.WriteLine("  (1) Sphere-Plane");
WScript.StdOut.WriteLine("  (2) Sphere-Sphere");
WScript.StdOut.WriteLine("  (3) Cylinder-Plane");
WScript.StdOut.WriteLine("  (4) Cylinder-Cylinder");


var contact_type_status = 0;
while (!contact_type_status) {
    WScript.StdOut.Write("\nPlese input the number and press Enter: ");
    var contact_type = WScript.StdIn.ReadLine();
    contact_type_status = 1;
    switch (contact_type) {
        case "1":
            var R1_status = 0;
            while (!R1_status) {
                WScript.StdOut.Write("You selected (1) for a Sphere-Plane contact. Please specify the radius of the sphere in millimeters (mm): ");
                var R1 = readFloat() / 1000;
                if (typeof R1 === "number" && 0 < R1) {
                    R1_status = 1;
                } else {
                    WScript.StdOut.WriteLine("Please only put positive numbers.");
                }
            }

            break;
        case "2":
            var R1_status = 0;
            while (!R1_status) {
                WScript.StdOut.Write("You selected (2) for a Sphere-Sphere contact. Please specify the first radius in millimeters (mm): ");
                var R1 = readFloat() / 1000;
                if (typeof R1 === "number" && 0 < R1) {
                    R1_status = 1;
                } else {
                    WScript.StdOut.WriteLine("Please only put positive numbers.");
                }
            }
            var R2_status = 0;
            while (!R2_status) {
                WScript.StdOut.Write("Now specify the second radius in millimeters (mm): ");
                var R2 = readFloat() / 1000;
                if (typeof R2 === "number" && 0 < R2) {
                    R2_status = 1;
                } else {
                    WScript.StdOut.WriteLine("Please only put positive numbers.");
                }
            }
            break;
        case "3":
            var R1_status = 0;
            while (!R1_status) {
                WScript.StdOut.Write("You selected (3) for a Cylinder-Plane contact. Please specify the radius of the cylinder in millimeters (mm): ");
                var R1 = readFloat() / 1000;
                if (typeof R1 === "number" && 0 < R1) {
                    R1_status = 1;
                } else {
                    WScript.StdOut.WriteLine("Please only put positive numbers.");
                }
            }
            break;
        case "4":
            WScript.StdOut.WriteLine("You selected (4) for a Cylinder-Cylinder contact.");
            var orientation_status = 0;
            while (!orientation_status) {
                WScript.StdOut.Write("Please specify the relative orientation of the cylinders. Please put (1) for parallel and (2) for perpendicular: ");
                var orientation = WScript.StdIn.ReadLine();
                if (orientation === "1" || orientation === "2") {
                    orientation_status = 1;
                } else {
                    WScript.StdOut.WriteLine("You have entered the wrong character(s). Please input either of integers 1 or 2.");
                }
            }

            var R1_status = 0;
            while (!R1_status) {
                WScript.StdOut.Write("Now specify the first radius in millimeters (mm): ");
                var R1 = readFloat() / 1000;
                if (typeof R1 === "number" && 0 < R1) {
                    R1_status = 1;
                } else {
                    WScript.StdOut.WriteLine("Please only put positive numbers.");
                }
            }
            var R2_status = 0;
            while (!R2_status) {
                WScript.StdOut.Write("Now specify the second radius in millimeters (mm): ");
                var R2 = readFloat() / 1000;
                if (typeof R2 === "number" && 0 < R2) {
                    R2_status = 1;
                } else {
                    WScript.StdOut.WriteLine("Please only put positive numbers.");
                }
            }

            break;
        default:
            WScript.StdOut.WriteLine("You have entered the wrong character(s). Please input an integer between 1 to 4.");
            contact_type_status = 0;
    }
}

WScript.StdOut.WriteLine("-----------------------------------------------------------");
var material_same_status = 0;
while (!material_same_status) {
    WScript.StdOut.Write("Are the two side of the contact made of identical materials (y/n)? ");
    var material_same = WScript.StdIn.ReadLine();
    material_same_status = 1;
    switch (material_same) {
        case "y":
            var E_status = 0;
            while (!E_status) {
                WScript.StdOut.Write("Please specify the Young elastic modulus in GigaPascal (GPa): ");
                var E = readFloat() * 1E9;
                if (typeof E === "number" && 0 < E) {
                    E_status = 1;
                } else {
                    WScript.StdOut.WriteLine("Please only put positive numbers.");
                }
            }
            var nu_status = 0;
            while (!nu_status) {
                WScript.StdOut.Write("Please specify the Poisson ratio: ");
                var nu = readFloat();
                if (typeof nu === "number" && 0 <= nu && nu <= 0.5) {
                    nu_status = 1;
                } else {
                    WScript.StdOut.WriteLine("Please put a positive number below (0.5).");
                }
            }

            var Es = E / (2 * (1 - Math.pow(nu, 2)));


            var sigma_status = 0;
            while (!sigma_status) {
                WScript.StdOut.Write("Please specify the Yield strength in MegaPascal (MPa): ");
                var sigma = readFloat() * 1E6;
                if (typeof sigma === "number" && 0 < sigma) {
                    sigma_status = 1;
                } else {
                    WScript.StdOut.WriteLine("Please put a positive number.");
                }
            }
            break;
        case "n":
            var E1_status = 0;
            while (!E1_status) {
                WScript.StdOut.Write("Please specify the Young elastic modulus of the first material in GigaPascal (GPa): ");
                var E1 = readFloat() * 1E9;
                if (typeof E1 === "number" && 0 < E1) {
                    E1_status = 1;
                } else {
                    WScript.StdOut.WriteLine("Please only put positive numbers.");
                }
            }
            var nu1_status = 0;
            while (!nu1_status) {
                WScript.StdOut.Write("Please specify the Poisson ratio of the first material: ");
                var nu1 = readFloat();
                if (typeof nu1 === "number" && 0 <= nu1 && nu1 <= 0.5) {
                    nu1_status = 1;
                } else {
                    WScript.StdOut.WriteLine("Please put a positive number below (0.5).");
                }
            }


            var sigma1_status = 0;
            while (!sigma1_status) {
                WScript.StdOut.Write("Please specify the Yield strength of the first material in MegaPascal (MPa): ");
                var sigma1 = readFloat() * 1E6;
                if (typeof sigma1 === "number" && 0 < sigma1) {
                    sigma1_status = 1;
                } else {
                    WScript.StdOut.WriteLine("Please put a positive number.");
                }
            }


            var E2_status = 0;
            while (!E2_status) {
                WScript.StdOut.Write("Please specify the Young elastic modulus of the second material in GigaPascal (GPa): ");
                var E2 = readFloat() * 1E9;
                if (typeof E2 === "number" && 0 < E2) {
                    E2_status = 1;
                } else {
                    WScript.StdOut.WriteLine("Please only put positive numbers.");
                }
            }
            var nu2_status = 0;
            while (!nu2_status) {
                WScript.StdOut.Write("Please specify the Poisson ratio of the second material: ");
                var nu2 = readFloat();
                if (typeof nu2 === "number" && 0 <= nu2 && nu2 <= 0.5) {
                    nu2_status = 1;
                } else {
                    WScript.StdOut.WriteLine("Please put a positive number below (0.5).");
                }
            }


            var sigma2_status = 0;
            while (!sigma2_status) {
                WScript.StdOut.Write("Please specify the Yield strength of the second material in MegaPascal (MPa): ");
                var sigma2 = readFloat() * 1E6;
                if (typeof sigma2 === "number" && 0 < sigma2) {
                    sigma2_status = 1;
                } else {
                    WScript.StdOut.WriteLine("Please put a positive number.");
                }
            }

            var Es = E1 * E2 / (E2 * (1 - Math.pow(nu1, 2)) + E1 * (1 - Math.pow(nu2, 2)));
            var sigma = Math.min(sigma1, sigma2);

            break;

        default:
            WScript.StdOut.WriteLine("You put the wrong character(s). Please type y or n.");
            material_same_status = 0;
            break;
    }
}

WScript.StdOut.WriteLine("-----------------------------------------------------------");

var force_status = 0;
while (!force_status) {
    WScript.StdOut.Write("Please specify the normal contact force in Newtons (N): ");
    var force = readFloat();
    if (typeof force === "number" && 0 < force) {
        force_status = 1;
    } else {
        WScript.StdOut.WriteLine("Please put a positive number.");
    }
}

WScript.StdOut.WriteLine("-----------------------------------------------------------");

switch (contact_type) {
    case "1":
        var a = Math.pow((3 * force * R1 / (4 * Es)), (1 / 3));
        var d = Math.pow(a, 2) / R1;
        var P_max = 3 * force / (2 * Math.PI * Math.pow(a, 2));
        var safety_factor = sigma / P_max;

        WScript.StdOut.WriteLine("| Symbol | Unit |   Value  | Description                                    |");
        WScript.StdOut.WriteLine("|:------:|:----:|:--------:|------------------------------------------------|");
        WScript.StdOut.WriteLine("|    a   |  mm  | " + printFloat(a * 1E3) + " | Major radius of the contact ellipse            |");
        WScript.StdOut.WriteLine("|    d   |  mm  | " + printFloat(d * 1E3) + " | Total deformation / indentation / displacement |");
        WScript.StdOut.WriteLine("|  P_max |  MPa | " + printFloat(P_max / 1E6) + " | Maximum contact pressure                       |");
        WScript.StdOut.WriteLine("|   SF   |  --- | " + Math.floor(safety_factor) + "        | Safety factor                                  |");




        break;
}


function readFloat() {
    var inputValue = WScript.StdIn.ReadLine();
    return parseFloat(inputValue);
}

function printFloat(inputFloat) {
    var decimals = 3;
    var order = Math.floor(Math.log(inputFloat) / Math.log(10));

    if (order < 0) {
        var placeHolder = "";
    } else {
        var placeHolder = "0";
    }

    // return String(inputFloat / Math.pow(10, order)).slice(0, (2 + decimals)) + "E" + placeHolder + String(order);
    return (Math.round(inputFloat / Math.pow(10, order - decimals)) / Math.pow(10, decimals)) + "E" + placeHolder + String(order);
}