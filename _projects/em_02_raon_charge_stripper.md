---
layout: page
title: RAON Charge Stripper Development
description: Lightweight helical EM thruster for liquid lithium film formation in heavy-ion accelerator
img: assets/img/raon_charge_stripper/fig_lithium_film.png
importance: 2
category: Electromagnetic devices
year: 2020-2021
---

## Challenge

**RAON** (Rare isotope Accelerator complex for ON-line experiments), Korea's first heavy-ion accelerator, requires a charge stripper to increase uranium beam charge state from **34+ to 79+** for achieving 200 MeV/u energy. This requires forming a precise **22 μm thick liquid lithium film**. However, existing electromagnetic thrusters weighing **340 kg** make maintenance extremely difficult.

---

## Approach: Lightweight Helical EM Thruster

<div class="row justify-content-center">
    <div class="col-sm-10">
        {% include figure.liquid loading="eager" path="assets/img/raon_charge_stripper/fig_thruster_design.png" title="EM Thruster Design" class="img-fluid rounded z-depth-1" %}
    </div>
</div>
<div class="caption">
    <strong>Fig.</strong> Design evolution: conventional EM thruster (left) vs redesigned lightweight thruster (right)
</div>

### Electromagnetic Thruster Optimization
- **Helical-type MHD design** with Sm₂Co₁₇ permanent magnets
- **Single-direction magnet** arrangement for weight reduction
- **SUS316 construction** for lithium compatibility
- **FEM simulation** using COMSOL and ANSYS Maxwell

### Charge Stripper System
- **Nozzle optimization**: 0.7 mm diameter, 34° angle
- **Laser thickness measurement** (replacing electron gun method)
- **Curved deflector** design to minimize lithium droplet contamination

---

## Results

<div class="row justify-content-center">
    <div class="col-sm-9">
        {% include figure.liquid loading="eager" path="assets/img/raon_charge_stripper/fig_lithium_film.png" title="Lithium Film" class="img-fluid rounded z-depth-1" %}
    </div>
</div>
<div class="caption">
    <strong>Fig.</strong> Experimental test loop system (left) and successfully formed liquid lithium thin film (right)
</div>

| Parameter | Conventional | Redesigned |
|:----------|:------------:|:----------:|
| Weight | 340 kg | **21 kg (-94%)** |
| Input Current | 872 A | **500 A (-43%)** |
| Developed Pressure | 10.5 bar | **14.6 bar (+40%)** |

<br>

- Achieved **22 μm lithium film** thickness at 107 A input current
- **94% weight reduction** enabling easy maintenance
- **Laser-based measurement** eliminates radiation exposure concerns
- Successfully demonstrated **79+ charge state** capability

---

## Publication

**SCIE**
- T.U. Kang, **G. Lee**, H.R. Kim, "Experimental characterization of the flowline of a lithium film formed using an electromagnetic thruster for a RAON prototype charge stripper," *Nuclear Engineering and Design*, 412, 112481, 2023.

---

## Research Project

**(2020-2021)** Research on the development of prototype lithium charge stripper, Institute for Basic Science.
