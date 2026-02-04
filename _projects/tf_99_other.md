---
layout: page
title: Other Designs
importance: 99
category: Thermo-fluid devices
---

## Rotating Beam Dump (2024-2026)

<div class="row justify-content-center">
    <div class="col-sm-10">
        {% include figure.liquid loading="eager" path="assets/img/project/tf_other/rotating_beam_dump.png" title="Rotating Beam Dump Multi-physics Analysis" class="img-fluid rounded z-depth-1" %}
    </div>
</div>
<div class="caption">
    Rotating beam dump multi-physics analysis: magnetic flux density, coolant pressure, and temperature distribution
</div>

Static beam dumps have limitations for beam powers exceeding 100 kW, driving research into water-cooled rotating designs. Thermal-structural analysis evaluates high heat deposition, while also considering electromotive force effects on the motor from nearby dipole magnets.

---

## Post-Target Shielding (2025-2026)

<div class="row justify-content-center">
    <div class="col-sm-10">
        {% include figure.liquid loading="eager" path="assets/img/project/tf_other/pts_thermal.png" title="PTS Thermal-Structural Analysis" class="img-fluid rounded z-depth-1" %}
    </div>
</div>
<div class="caption">
    Post-target shielding analysis: cooling channel geometry, temperature distribution, and von Mises stress
</div>

As FRIB ramps up power, the post-target shielding (PTS) requires optimized cooling channel design and structural stress analysis due to thermal stresses. The heat distribution calculated from PHITS Monte Carlo simulations was coupled with COMSOL to minimize stress and develop a practical design for field implementation.

---

## Plasma Chamber (2025-2026)

<div class="row justify-content-center align-items-center">
    <div class="col-sm-7">
        {% include figure.liquid loading="eager" path="assets/img/project/tf_other/plasmachamber.png" title="Plasma Chamber Temperature Comparison" class="img-fluid rounded z-depth-1" %}
    </div>
    <div class="col-sm-4">
        {% include figure.liquid loading="eager" path="assets/img/project/tf_other/plasmachamber_gif.gif" title="Plasma Chamber Interference Fitting Analysis" class="img-fluid rounded z-depth-1" %}
    </div>
</div>
<div class="caption">
    Temperature comparison between ANSYS and COMSOL (left), and transient analysis for interference fitting (right)
</div>

To determine the RF power thermal limit of the plasma chamber, thermal and structural analyses were performed using both ANSYS and COMSOL for cross-validation to ensure reliability. Additionally, transient analysis was conducted for interference fitting to create cooling channels, analyzing the required temperature and assembly time during the fitting process.

---

## Low-Power Charge Selector (2025-2026)

<div class="row justify-content-center align-items-center">
    <div class="col-sm-4">
        {% include figure.liquid loading="eager" path="assets/img/project/tf_other/LPCS_gif.gif" title="LPCS Drift Tube Transient Temperature" class="img-fluid rounded z-depth-1" %}
    </div>
    <div class="col-sm-5">
        {% include figure.liquid loading="eager" path="assets/img/project/tf_other/lpcs_temperature.png" title="LPCS Temperature Comparison" class="img-fluid rounded z-depth-1" %}
    </div>
</div>
<div class="caption">
    Transient thermal simulation of the LPCS drift tube (left), and simulation-experiment temperature comparison for beam deposit prediction (right)
</div>

Performed transient and stationary thermal simulations of the Low-Power Charge Selector (LPCS) to determine power limits based on thermal stress. By comparing simulation results with experimental measurements, the beam deposit on the drift tube was predicted.

---

## Target System (2024-2026)

<div class="row justify-content-center">
    <div class="col-sm-10">
        {% include figure.liquid loading="eager" path="assets/img/project/tf_other/target_door.png" title="Target System Temperature Distribution" class="img-fluid rounded z-depth-1" %}
    </div>
</div>
<div class="caption">
    Target system temperature distribution: graphite target (left), target door (middle), and bearing system (right)
</div>

Performed system-level thermal analysis for the graphite-based rotating target, including radiation effects on the target door cooling and flow rate requirements. Simulations and experiments were conducted to evaluate the thermal conductance and operational limits of the bearing system.
