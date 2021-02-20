var ohVersion = "0.0.1";

WScript.StdOut.WriteLine("Welcome to OpenHertz v" + ohVersion + ", a Free Hertzian contact calculator for Windows written in pure JScript. If there are issues please report them on https://github.com/Foadsf/OpenHertz/");
WScript.StdOut.WriteLine("Press Ctrl + c to terminate and quite");
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
            WScript.StdOut.WriteLine("You selected (1) Sphere-Plane");
            material_selection();
            break;
        case "2":
            WScript.StdOut.WriteLine("You selected (2) Sphere-Sphere");
            break;
        case "3":
            WScript.StdOut.WriteLine("You selected (3) Cylinder-Plane");
            break;
        case "4":
            WScript.StdOut.WriteLine("You selected (4) Cylinder-Cylinder");
            break;
        default:
            WScript.StdOut.WriteLine("You have entered the wrong character(s). Please input an integer between 1 to 4.");
            contact_type_status = 0;
    }
}


function material_selection() {
    WScript.StdOut.WriteLine("-----------------------------------------------------------");
    WScript.StdOut.Write("Are the two side of a same material? (y/n) ");
    var material_same = WScript.StdIn.ReadLine();
    WScript.StdOut.WriteLine(material_same);
}


