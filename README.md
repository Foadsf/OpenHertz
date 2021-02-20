# OpenHertz
OpenHertz is a Free, Libre, and Open Source software for Hertzian contact calculations on Windows, written in pure Jscript.

## Instructions:

- Run the OpenHertz.bat
- Choose the type of contact:

    * Sphere-Plane (R)
    * Sphere-Sphere (R<sub>1</sub>-R<sub>2</sub>)
    * Cylinder-Plane (R)
    * Cylinder-Cylinder (R<sub>1</sub>-R<sub>2</sub>)

- If the “Cylinder-Cylinder” option is selected, then the relative orientation of the cylinders needs to be determined:
    * Parallel
    * Perpendicular
    <!-- * Angled (α) -->

- Next, depending on the option selected on the first step, one or two radii should be determined
- If the two sides of the contact are different materials or the same will be determined next.
- Mechanical properties of the material(s) will be given to the software after that. Young elastic modulus (E), Poisson ratio (ν), and Yield strength (σ<sub>Y</sub>) will be given.
- After all, the software will report the results automatically to the terminal

## FAQ:

- Why using a legacy language like Microsoft’s Jscript? Of course, it is practically a dead language; it is preinstalled on almost all corporate machines, at least in the field of mechanical engineering, who almost exclusively use Windows operating systems.
- Why not supporting the imperial system of units? Please grow up, US!
- Why not have a graphical user interface (GUI)? Who knows, maybe in the future it will be added

