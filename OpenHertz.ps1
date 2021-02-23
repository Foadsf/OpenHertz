$host.ui.RawUI.WindowTitle = "OpenHertz 0.0.2"

"  ____                   _    _           _       
 /  __\                 | |  | |         | |      
 | |  ||_ __   ___ _ __ | |__| | ___ _ __| |_ ____
 | |  || '_ \ / _ \ '_ \|  __  |/ _ \ '__| __|_  /
 | |__|| |_) |  __/ | | | |  | |  __/ |  | |_ / / 
 \____/| .__/ \___|_| |_|_|  |_|\___|_|   \__/___|
       | |                                        
       |_|                                        
"

"Welcome to OpenHertz v 0.0.2 a Free Hertzian contact calculator." 
"If there are any issues please report them on github.com/Foadsf/OpenHertz/"
"Press Ctrl + c to terminate and quite"
"-----------------------------------------------------------"
"OpenHertz can calculate the below contact types:"
"  (0) Sphere-Plane"
"  (1) Sphere-Sphere"
"  (2) Cylinder-Plane"
"  (3) Cylinder-Cylinder"

Add-Type -TypeDefinition @"
   public enum contactTypes
   {
    Sphere_Plane,
    Sphere_Sphere,
    Cylinder_Plane,
    Cylinder_Cylinder
   }
"@

Add-Type -TypeDefinition @"
   public enum yesNo
   {
    y,
    n
   }
"@

do {
    try { [contactTypes]$contact_type = Read-Host 'Please select the contact type' }
    catch { "You have entered the wrong character(s). Please input an integer between 0 to 3." }
    
} until ($contact_type -is [contactTypes])

switch ($contact_type) {
    Sphere_Plane {
        'You selected (1) for a Sphere-Plane contact.'
        do {
            try { [decimal]$radius_s = (Read-Host 'Please specify the radius of the sphere in millimeters (mm)') / 1E3 }
            catch { "Please only put positive numbers." }
            
        } until ($radius_s -is [decimal] -and $radius_s -gt 0)

        Break
    }
    Sphere_Sphere {
        'You selected (2) for a Sphere-Sphere contact.'
        do {
            try { [decimal]$radius_1 = Read-Host 'Please specify the radius of the first sphere in millimeters (mm)' }
            catch { "Please only put positive numbers." }
            
        } until ($radius_1 -is [decimal] -and $radius_1 -gt 0)

        do {
            try { [decimal]$radius_2 = Read-Host 'Now specify the second radius in millimeters (mm)' }
            catch { "Please only put positive numbers." }
            
        } until ($radius_2 -is [decimal] -and $radius_2 -gt 0)
        
        [decimal]$radius_s = $radius_1 * $radius_2 / 2 / ($radius_1 + $radius_2) / 1E3
        Break
    }
    Cylinder_Plane {
        'You selected (2) for a Cylinder-Plane contact.'
        do {
            try { [decimal]$radius = (Read-Host 'Please specify the radius of the cylinder in millimeters (mm)') / 1E3 }
            catch { "Please only put positive numbers." }
            
        } until ($radius -is [decimal] -and $radius -gt 0)
        Break
    }
    Cylinder_Cylinder {
        'You selected (3) for a Cylinder-Cylinder contact.'
        # do {
        #     try { [yesNo]$radius_same = Read-Host 'Are the two cylinders of the same radius (y/n)?' }
        #     catch { "You put the wrong character(s). Please type y or n." }
            
        # } until ($radius_same -is [yesNo])

        # if ($radius_same -eq "y") {
        #     do {
        #         try { [decimal]$radius_s = (Read-Host 'Please specify the radius of the cylinders in millimeters (mm)') / 1E3 }
        #         catch { "Please only put positive numbers." }
                
        #     } until ($radius_s -is [decimal] -and $radius_s -gt 0)
        # } else {
            do {
                try { [decimal]$radius_1 = Read-Host 'Please specify the radius of the first cylinder in millimeters (mm)' }
                catch { "Please only put positive numbers." }
                
            } until ($radius_1 -is [decimal] -and $radius_1 -gt 0)
    
            do {
                try { [decimal]$radius_2 = Read-Host 'Now specify the second radius in millimeters (mm)' }
                catch { "Please only put positive numbers." }
                
            } until ($radius_2 -is [decimal] -and $radius_2 -gt 0)
            
        # }

        Add-Type -TypeDefinition @"
   public enum orientations
   {
    parallel,
    perpendicular,
    angeled
   }
"@
    }
}

"-----------------------------------------------------------"



do {
    try { [yesNo]$material_same = Read-Host 'Are the two side of the contact made of identical materials (y/n)?' }
    catch { "You put the wrong character(s). Please type y or n." }
    
} until ($material_same -is [yesNo])

if ($material_same -eq "y") {
    do {
        try { [decimal]$elastic_modulus = Read-Host 'Please specify the Young elastic modulus in GigaPascal (GPa)' }
        catch { "Please only put positive numbers." }
        
    } until ($elastic_modulus -is [decimal] -and $elastic_modulus -gt 0)

    $elastic_modulus = $elastic_modulus * 1E9
    
    do {
        try { [decimal]$poisson_ratio = Read-Host 'Please specify the Poisson ratio' }
        catch { "Please only put positive numbers between 0 and 0.5." }
        
    } until ($poisson_ratio -is [decimal] -and $poisson_ratio -ge 0 -and 0.5 -ge $poisson_ratio)

    [decimal]$elastic_modulus_s = $elastic_modulus / 2 / (1 - [Math]::Pow($poisson_ratio, 2))

    
    do {
        try { [decimal]$yield_strength = Read-Host 'Please specify the Yield strength in MegaPascal (MPa)' }
        catch { "Please only put positive numbers." }
        
    } until ($yield_strength -is [decimal] -and $yield_strength -gt 0)

    $yield_strength = $yield_strength * 1E6
}
else {

    do {
        try { [decimal]$elastic_modulus_1 = Read-Host 'Please specify the Young elastic modulus of the first material in GigaPascal (GPa)' }
        catch { "Please only put positive numbers." }
        
    } until ($elastic_modulus_1 -is [decimal] -and $elastic_modulus_1 -gt 0)
    
    $elastic_modulus_1 = $elastic_modulus_1 * 1E9

    do {
        try { [decimal]$poisson_ratio_1 = Read-Host 'Please specify the Poisson ratio of the first material' }
        catch { "Please only put positive numbers between 0 and 0.5." }
        
    } until ($poisson_ratio_1 -is [decimal] -and $poisson_ratio_1 -ge 0 -and 0.5 -ge $poisson_ratio_1)
    
    do {
        try { [decimal]$yield_strength_1 = Read-Host 'Please specify the Yield strength of the first material in MegaPascal (MPa)' }
        catch { "Please only put positive numbers." }
        
    } until ($yield_strength_1 -is [decimal] -and $yield_strength_1 -gt 0)

    $yield_strength_1 = $yield_strength_1 * 1E6

    do {
        try { [decimal]$elastic_modulus_2 = Read-Host 'Please specify the Young elastic modulus of the second material in GigaPascal (GPa)' }
        catch { "Please only put positive numbers." }
        
    } until ($elastic_modulus_2 -is [decimal] -and $elastic_modulus_2 -gt 0)

    $elastic_modulus_2 = $elastic_modulus_2 * 1E9
    
    do {
        try { [decimal]$poisson_ratio_2 = Read-Host 'Please specify the Poisson ratio of the second material' }
        catch { "Please only put positive numbers between 0 and 0.5." }
        
    } until ($poisson_ratio_2 -is [decimal] -and $poisson_ratio_2 -ge 0 -and 0.5 -ge $poisson_ratio_2)

    [decimal]$elastic_modulus_s = $elastic_modulus_1 * $elastic_modulus_2 / ((1 - [Math]::Pow($poisson_ratio_1, 2)) * $elastic_modulus_2 + (1 - [Math]::Pow($poisson_ratio_2, 2)) * $elastic_modulus_1)
    
    do {
        try { [decimal]$yield_strength_2 = Read-Host 'Please specify the Yield strength of the second material in MegaPascal (MPa)' }
        catch { "Please only put positive numbers." }
        
    } until ($yield_strength_2 -is [decimal] -and $yield_strength_2 -gt 0)

    $yield_strength_2 = $yield_strength_2 * 1E6

    $yield_strength = [Math]::Min($yield_strength_1, $yield_strength_2)
    
}
"-----------------------------------------------------------"

do {
    try { [decimal]$force = Read-Host 'Please specify the normal contact force in Newtons (N)' }
    catch { "Please only put positive numbers." }
    
} until ($force -is [decimal] -and $force -gt 0)

"-----------------------------------------------------------"

function convertFloat {
    param (
        [decimal]$inputFloat
    )

    $descimals = 3
    $order = [Math]::Floor([Math]::Log10($inputFloat))

    if (0 -gt $order) {
        $placeHolder = ""
    } else {
        $placeHolder = "0"        
    }
    
    return ([Math]::Round($inputFloat / [Math]::Pow(10, ($order - $descimals))) / [Math]::Pow(10, $descimals)), "E", $placeHolder, $order -join ""
    
}

if ($contact_type -eq "Sphere_Plane" -or $contact_type -eq "Sphere_Sphere") {

    [decimal]$contact_radius = [Math]::Pow((3 * $force * $radius_s / 4 / $elastic_modulus_s), (1 / 3))
    [decimal]$indentation = [Math]::Pow($contact_radius, 2) / $radius_s
    [decimal]$maximum_pressure = 3 * $force / 2 / [Math]::PI / [Math]::Pow($contact_radius, 2)
    [decimal]$safety_facor = [Math]::Floor($yield_strength / $maximum_pressure)

    "| Symbol | Unit |   Value  | Description                                    |"
    "|:------:|:----:|:--------:|------------------------------------------------|"
    Write-Host (-join("|    a   |  mm  | ", (convertFloat ($contact_radius * 1E3)), " | Radius of the contact circle                   |"))
    Write-Host (-join("|    d   |  mm  | ", (convertFloat ($indentation * 1E3)), " | Total deformation / indentation / displacement |"))
    Write-Host (-join("|  P_max |  MPa | ", (convertFloat ($maximum_pressure / 1E6)),  " | Maximum contact pressure                       |"))
    Write-Host (-join("|   SF   |  --- | ", $safety_facor, "        | Safety factor                                  |"))
    
}




"-----------------------------------------------------------"
"Press any key to continue..."
[void][System.Console]::ReadKey($true)


