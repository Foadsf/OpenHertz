# OpenHertz

OpenHertz is a Free, Libre, and Open Source Software (FLOSS) for Hertzian contact calculations. The software can be used to calculate contact area, deformation, maximum contact pressure, maximum von Mises and shear stresses, and their location between spears, cylinders, and flat surfaces. The software is named after [Heinrich Rudolf Hertz (1857-1894)](https://en.wikipedia.org/wiki/Heinrich_Hertz), to honor his pioneer work in the field of contact mechanics and tribology. I have written more about the software [here on Reddit](https://www.reddit.com/r/MechanicalEngineering/comments/m0r66y/introducing_openhertz_opensource_hertzian_contact/?utm_source=share&utm_medium=web2x&context=3).

## Instructions

The [OpenHertz webapp](https://foadsf.github.io/OpenHertz/) has been designed to be trivial to most of the users in the field. Basically:

<!-- ## Installation

- No installation is required. Just go to [the website](https://foadsf.github.io/OpenHertz/) and start using it.

- But if you want to use it locally, download this repository in ZIP format and unarchive it somewhere on your computer.

<!-- ![Download the zip](pics/download.png) -->
<!-- <pre>
<p align="center">
  <img src="pics/download.png" width="350" title="Download the zip">
</p>
</pre> -->

<!-- ## Instructions

- run the `index.html` file -->

- Choose the type of contact:

  - Sphere-Plane (R)
  - Sphere-Sphere (R<sub>1</sub>-R<sub>2</sub>)
  - Cylinder-Plane (R)
  - Cylinder-Cylinder (R<sub>1</sub>-R<sub>2</sub>)

- If the “Cylinder-Cylinder” option is selected, then the relative orientation of the cylinders needs to be determined:
  - Parallel
  - Perpendicular
    <!-- * Angled (α) -->

- Next, depending on the option selected on the first step, one or two radii should be determined
<!-- - If the two sides of the contact are different materials or the same will be determined next. -->
- Mechanical properties of the material(s) will be given to the software after that. Young elastic modulus (E), Poisson ratio (ν), and Yield strength (σ<sub>Y</sub>) will be given.
- After all, the software will report the results automatically

<!-- ## FAQ: -->

<!-- - Why not supporting the imperial system of units? Please grow up, US! -->
<!-- - Why not have a graphical user interface (GUI)? Who knows, maybe in the future it will be added -->
<!-- - Why writing a software in PowerShell? It seems like the only scripting language included in all the Windows corporate machines that the potential audience of this software use. -->

## Contribution

If you are interested, these are the areas I need the most help:

- I need to add Imperial system of units
- I know nothing about frontend development (i.e., HTML, JavaScript, CSS), or programing for that matter. My code is a text book example of spaghetti code. Please help me reformat it and make it more maintainable.
  - the CSS and JavaScript parts should be modularized
  - the web app must be mobile friendly
  - proper hints should be displayed when hovering mouse over different areas
- I need to add other contact types:

  - elliptical
  - perpendicular cylinders (only shear stresses need to be added)
  - sphere in a cup (already works with negative radii)
  - cylinder in a cylindrical groove (already works with negative radii)

## Support

If you can't contribute by code but you want to support the project, here are the things you can do, ordered from the easiest:

- Star this repository on the upper right corner of this page ☝
- Introduce this tool to your friends, colleagues, students, grandmas 😎, ...
- Put the link to this repo on your website, blog, social media ... spread the word
- Follow me on Twitter ![Twitter Follow](https://img.shields.io/twitter/follow/fsfarimani?label=Follow&style=social), or endorse me on LinkedIn [![LinkedIn](https://i.stack.imgur.com/gVE0j.png) LinkedIn](https://www.linkedin.com/in/fsfarimani/)

- If you do really use tool for profit you can [sponsor me up there](https://github.com/sponsors/Foadsf) 👆 as well, most probably I will pay most of it back to the FLOSS community again.

## Contact

The preferred way of contacting me regarding this project is to [open a new issue](https://github.com/Foadsf/OpenHertz/issues). But you can always [Tweet me](https://twitter.com/fsfarimani) as well.

<!-- ## Glossary

### Hardness

- Brinell - HB
- Rockwell C - HRC
- Rockwell B - HRB
- Vickers - HV -->
