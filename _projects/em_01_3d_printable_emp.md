---
layout: project
title: 3D-printable DC electromagnetic pump
description: A single-body DC pump concept designed for liquid-metal circulation and metal 3D printing.
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
detail_intro: "I designed a 3D-printable DC electromagnetic pump and analyzed its coupled electromagnetic and fluid performance."
detail_summary_label: Simulation result
detail_summary: "52% lower current demand at matched pressure and flow rate."
contribution: "Designed a 3D-printable DC electromagnetic pump and analyzed its coupled electromagnetic and fluid performance."
evidence: "Simulation result"
outcome: "52% lower simulated current demand at matched pressure and flow rate."
---

<div class="project-overview">
  <section class="project-overview-purpose" aria-labelledby="project-purpose">
    <h2 id="project-purpose">Purpose</h2>
    <p>Direct-current (DC) electromagnetic pumps circulate liquid metals without mechanical impellers, including liquid sodium for fast-reactor systems. This study addresses the high input current and multi-part manufacturing requirements of conventional helical pumps.</p>
  </section>
  <section class="project-overview-approach" aria-labelledby="project-approach">
    <h2 id="project-approach">Approach</h2>
    <p>A single-body concept for metal 3D printing combines opposing magnets and multiple force-generating flow segments. Coupled electromagnetic and flow simulations compare the design with a helical-pump baseline.</p>
  </section>
</div>

## Design context

<div class="row justify-content-center">
    <div class="col-sm-6">
        {% include figure.liquid loading="eager" path="assets/img/em_pump_3d/fig_helical_manufacturing.png" zoomable=true alt="Helical Manufacturing" title="Helical Manufacturing" class="img-fluid rounded z-depth-1" %}
    </div>
</div>
<div class="caption">
    A conventional helical-type EM pump requires a brazing process and special coatings
</div>

## Pump design

<div class="row justify-content-center">
    <div class="col-sm-8">
        {% include figure.liquid loading="lazy" path="assets/img/em_pump_3d/fig_pump_design.png" zoomable=true alt="3D Printable Pump Design" title="3D Printable Pump Design" class="img-fluid rounded z-depth-1" %}
    </div>
</div>
<div class="caption">
    3D-printable EM pump design and working principle
</div>

### Lorentz-force configuration

- Opposing magnets concentrate the magnetic flux around the flow paths
- Several force-generating segments raise the pressure step by step from inlet to outlet
- 67% of the current passes through the high-flux region

### Design for additive manufacturing

- Sized for the 180 mm × 180 mm build area of commercial 3D printers
- 45° ceiling angles remove the need for support structures
- Semi-cylindrical channels with a 5 mm diameter for Lorentz-force generation
- Single-piece build with no brazed joints

## Simulation results

<div class="row justify-content-center">
    <div class="col-sm-8">
        {% include figure.liquid loading="lazy" path="assets/img/em_pump_3d/fig_mhd_results.png" zoomable=true alt="MHD Results" title="MHD Results" class="img-fluid rounded z-depth-1" %}
    </div>
</div>
<div class="caption">
    MHD simulation results: magnetic flux density distribution (top) and pressure distribution (bottom)
</div>

| Parameter          |  Helical-type   |    3D-printable     |
| :----------------- | :-------------: | :-----------------: |
| Developed pressure |    10.5 bar     |    **10.5 bar**     |
| Input current      |      684 A      |  **330 A (-52%)**   |
| Size (mm)          | 123 × 195 × 405 | **166 × 195 × 106** |

- **52%** lower simulated current demand than the helical-type pump at matched pressure and flow rate
- Compact single-body concept designed for metal 3D printing
- The numerical model agrees with published helical-pump experimental data within 12%
- In the simulation, the maximum temperature near the magnets was **288 °C**, below the **350 °C** magnet limit

Fabrication and experimental testing of the pump are planned as future work.

---

## Publications

**SCIE**

- **G. Lee**, "Conceptual design of a 3D-Printable DC electromagnetic pump for additive manufacturing," _Nuclear Engineering and Technology_, 58, 103916, 2026. [DOI](https://doi.org/10.1016/j.net.2025.103916)
