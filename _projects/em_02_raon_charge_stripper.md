---
layout: project
title: RAON charge stripper development
description: Electromagnetic thruster development and experimental characterization of liquid-lithium films.
img: assets/img/raon_charge_stripper/fig_lithium_film.png
importance: 2
category: Electromagnetic devices
year: "2020 - 2021"
body_class: "project-view"
footer_static: true
card_title: "Liquid-lithium charge stripper"
institution: "UNIST"
project_group: "Liquid-metal & electromagnetic systems"
summary: "Electromagnetic thruster development and experimental characterization of liquid-lithium films."
detail_intro: "I worked on electromagnetic circulation and charge-stripper design, combining multiphysics analysis with experimental characterization."
detail_summary_label: Prototype study
detail_summary: "Liquid-lithium film formation characterized for a prototype heavy-ion charge stripper."
contribution: "Worked on electromagnetic circulation and charge-stripper design, combining multiphysics analysis with experimental characterization."
evidence: "Prototype & experimental work"
outcome: "Characterized liquid-lithium film formation for a prototype heavy-ion charge stripper."
---

<div class="project-overview">
  <section class="project-overview-purpose" aria-labelledby="project-purpose">
    <h2 id="project-purpose">Purpose</h2>
    <p>RAON's prototype charge stripper requires a thin liquid-lithium film to support the target uranium charge state. This study addresses film formation and the maintenance burden of a heavy electromagnetic thruster.</p>
  </section>
  <section class="project-overview-approach" aria-labelledby="project-approach">
    <h2 id="project-approach">Approach</h2>
    <p>A lighter helical electromagnetic thruster supplies the lithium loop. Multiphysics analysis, nozzle and deflector design, and laser thickness measurements support experimental characterization of the film.</p>
  </section>
</div>

## System requirements

The RAON design targets a uranium beam charge-state increase from **34+ to 79+** to reach 200 MeV/u, which requires a **22 μm liquid-lithium film**. The conventional electromagnetic thruster weighed **340 kg**, so a lighter design was needed for maintenance.

## Thruster and film system

<div class="row justify-content-center">
    <div class="col-sm-10">
        {% include figure.liquid loading="eager" path="assets/img/raon_charge_stripper/fig_thruster_design.png" zoomable=true alt="EM Thruster Design" title="EM Thruster Design" class="img-fluid rounded z-depth-1" %}
    </div>
</div>
<div class="caption">
    Conventional EM thruster (left) and redesigned lightweight thruster (right)
</div>

### Electromagnetic thruster optimization

- Helical-type MHD design with Sm₂Co₁₇ permanent magnets
- Single-direction magnet arrangement to reduce weight
- SUS316 body for compatibility with lithium
- Finite-element simulation in COMSOL and ANSYS Maxwell

### Charge-stripper system

- Nozzle with a 0.7 mm diameter and a 34° angle
- Laser thickness measurement in place of the electron-gun method
- Curved deflector to limit lithium droplet contamination

## Results

<div class="row justify-content-center">
    <div class="col-sm-9">
        {% include figure.liquid loading="lazy" path="assets/img/raon_charge_stripper/fig_lithium_film.png" zoomable=true alt="Lithium Film" title="Lithium Film" class="img-fluid rounded z-depth-1" %}
    </div>
</div>
<div class="caption">
    Experimental test loop (left) and the liquid-lithium film formed in the loop (right)
</div>

| Parameter          | Conventional |     Redesigned      |
| :----------------- | :----------: | :-----------------: |
| Weight             |    340 kg    |  **21 kg (-94%)**   |
| Input current      |    872 A     |  **500 A (-43%)**   |
| Developed pressure |   10.5 bar   | **14.6 bar (+39%)** |

- Formed a **22 μm** lithium film at 107 A input current
- **94%** weight reduction, which makes maintenance easier
- Laser-based thickness measurement replaces the electron-beam method
- Reached the film thickness required for a **79+** uranium charge state

---

## Publications

**SCIE**

- T.U. Kang<sup>†</sup>, **G. Lee**<sup>†</sup>, H.R. Kim, "Experimental characterization of the flowline of a lithium film formed using an electromagnetic thruster for a RAON prototype charge stripper," _Nuclear Engineering and Design_, 412, 112481, 2023. [DOI](https://doi.org/10.1016/j.nucengdes.2023.112481) (<sup>†</sup>equal contribution)

---

## Research project

**(2020-2021)** Research on the Development of Prototype Lithium Charge Stripper, Institute for Basic Science.
