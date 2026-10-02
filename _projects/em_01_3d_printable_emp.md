---
layout: project
title: 3D Printable DC Electromagnetic Pump
description: Novel DfAM design with multiple Lorentz forces for liquid metal circulation
img: assets/img/em_pump_3d/fig_pump_design.png
importance: 1
category: Electromagnetic devices
year: "2023 - 2024"
body_class: "project-view"
footer_static: true
card_title: "3D-printable electromagnetic pump"
project_type: "Liquid-metal systems"
institution: "KAERI"
featured: false
project_group: "Liquid-metal & electromagnetic systems"
summary: "A single-body DC pump concept designed for liquid-metal circulation and metal 3D printing."
contribution: "Designed a 3D-printable DC electromagnetic pump and analyzed its coupled electromagnetic and fluid performance."
evidence: "Simulation result"
outcome: "52% lower simulated current demand at matched pressure and flow rate."
---

## Challenge

**Direct-current (DC) electromagnetic pumps** drive liquid metals using Lorentz forces without mechanical impellers, making them ideal for high-temperature and corrosive fluid applications, such as Sodium Fast Reactors (SFR). However, conventional helical-type DC pumps require high input currents and complex manufacturing processes involving multiple brazed segments.

<div class="row justify-content-center">
    <div class="col-sm-6">
        {% include figure.liquid loading="eager" path="assets/img/em_pump_3d/fig_helical_manufacturing.png" zoomable=true alt="Helical Manufacturing" title="Helical Manufacturing" class="img-fluid rounded z-depth-1" %}
    </div>
</div>
<div class="caption">
    <strong>Fig.</strong> Conventional helical-type EM pump requires complex brazing process and specialized coatings
</div>

---

## Approach: Design for Additive Manufacturing

<div class="row justify-content-center">
    <div class="col-sm-8">
        {% include figure.liquid loading="lazy" path="assets/img/em_pump_3d/fig_pump_design.png" zoomable=true alt="3D Printable Pump Design" title="3D Printable Pump Design" class="img-fluid rounded z-depth-1" %}
    </div>
</div>
<div class="caption">
    <strong>Fig.</strong> Novel 3D-printable EM pump design with working principle
</div>

### Multiple Lorentz Force Design

- **Opposing magnet arrangement**: Concentrated magnetic flux around flow paths
- **Multiple force segments**: Progressive pressure buildup from inlet to outlet
- **Optimized current path**: 67% of current concentrated in high-flux region

### Design for Additive Manufacturing (DfAM)

- **Build volume**: 180 mm × 180 mm constraint for commercial 3D printers
- **45° ceiling angle**: Eliminates need for support structures
- **Semi-cylindrical channels**: 5 mm diameter for optimal Lorentz force generation
- **Monolithic fabrication**: No brazed joints required

---

## Results

<div class="row justify-content-center">
    <div class="col-sm-8">
        {% include figure.liquid loading="lazy" path="assets/img/em_pump_3d/fig_mhd_results.png" zoomable=true alt="MHD Results" title="MHD Results" class="img-fluid rounded z-depth-1" %}
    </div>
</div>
<div class="caption">
    <strong>Fig.</strong> MHD simulation results: magnetic flux density distribution (top) and pressure distribution (bottom)
</div>

| Parameter          |  Helical-type   |    3D-Printable     |
| :----------------- | :-------------: | :-----------------: |
| Developed Pressure |    10.5 bar     |    **10.5 bar**     |
| Input Current      |      684 A      |  **330 A (-52%)**   |
| Size (mm)          | 123 × 195 × 405 | **166 × 195 × 106** |

<br>

- **52% lower simulated current demand** than the helical-type pump at matched pressure and flow rate
- **Compact concept** designed for monolithic metal 3D printing
- The numerical model was checked against published **helical-pump experimental data**, with less than 12% difference; the new pump design was evaluated by simulation
- Under the simulated conditions, the maximum temperature near the magnets was **288°C**, below the specified **350°C** magnet limit

Fabrication and experimental testing of the proposed 3D-printable pump remain future work.

---

## Publication

**SCIE**

- **G. Lee**, "Conceptual design of a 3D-Printable DC electromagnetic pump for additive manufacturing," _Nuclear Engineering and Technology_, 58, 103916, 2026. [DOI](https://doi.org/10.1016/j.net.2025.103916)
