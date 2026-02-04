---
layout: page
title: 3D Printable DC Electromagnetic Pump
description: Novel DfAM design with multiple Lorentz forces for liquid metal circulation
img: assets/img/em_pump_3d/fig_pump_design.png
importance: 1
category: Electromagnetic devices
year: 2023-2024
---

## Challenge

**Direct-current (DC) electromagnetic pumps** drive liquid metals using Lorentz forces without mechanical impellers, making them ideal for high-temperature and corrosive fluid applications, such as Sodium Fast Reactors (SFR). However, conventional helical-type DC pumps require high input currents and complex manufacturing processes involving multiple brazed segments.

<div class="row justify-content-center">
    <div class="col-sm-6">
        {% include figure.liquid loading="eager" path="assets/img/em_pump_3d/fig_helical_manufacturing.png" title="Helical Manufacturing" class="img-fluid rounded z-depth-1" %}
    </div>
</div>
<div class="caption">
    <strong>Fig.</strong> Conventional helical-type EM pump requires complex brazing process and specialized coatings
</div>

---

## Approach: Design for Additive Manufacturing

<div class="row justify-content-center">
    <div class="col-sm-8">
        {% include figure.liquid loading="eager" path="assets/img/em_pump_3d/fig_pump_design.png" title="3D Printable Pump Design" class="img-fluid rounded z-depth-1" %}
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
        {% include figure.liquid loading="eager" path="assets/img/em_pump_3d/fig_mhd_results.png" title="MHD Results" class="img-fluid rounded z-depth-1" %}
    </div>
</div>
<div class="caption">
    <strong>Fig.</strong> MHD simulation results: magnetic flux density distribution (top) and pressure distribution (bottom)
</div>

| Parameter | Helical-type | 3D-Printable |
|:----------|:------------:|:------------:|
| Developed Pressure | 10.5 bar | **10.5 bar** |
| Input Current | 684 A | **330 A (-52%)** |
| Size (mm) | 123 × 195 × 405 | **166 × 195 × 106** |

<br>

- **52% current reduction** compared to conventional helical-type pump
- **Compact design** with simplified monolithic fabrication
- Validated against experimental data (< 12% difference)
- Thermal analysis confirms safe operation (288°C < 350°C magnet limit)

---

## Publication

**SCIE**
- **G. Lee**, "Conceptual design of a 3D-Printable DC electromagnetic pump for additive manufacturing," *Nuclear Engineering and Technology*, 58, 103916, 2026.

