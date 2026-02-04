---
layout: page
title: FRIB Beam Dump AI Design Optimization
description: Hybrid GA + Reinforcement Learning optimization for 50 kW power upgrade
img: assets/img/frib_beam_dump/fig_temperature_comparison.png
importance: 1
category: Thermo-fluid devices
year: 2023-2025
---

## Challenge

The **FRIB** beam dump must be upgraded from **20 kW to 50 kW**. Heavy ion beams (²³⁸U) deposit energy in an extremely small surface volume, creating dangerous **hot spots** that exceed material limits at higher power.

<div class="row justify-content-center">
    <div class="col-sm-8">
        {% include figure.liquid loading="eager" path="assets/img/frib_beam_dump/fig_current_design.png" title="Current Beam Dump Design" class="img-fluid rounded z-depth-1" %}
    </div>
</div>
<div class="caption">
    <strong>Fig.</strong> Current FRIB beam dump with CuCrZr/Al2219 bi-metal plate and 3D-printed AlSi10Mg wings
</div>

---

## Approach: Hybrid GA + RL Optimization

<div class="row justify-content-center">
    <div class="col-sm-8">
        {% include figure.liquid loading="eager" path="assets/img/frib_beam_dump/fig_optimization_process.png" title="Optimization Framework" class="img-fluid rounded z-depth-1" %}
    </div>
</div>
<div class="caption">
    <strong>Fig.</strong> Two-stage optimization: GA global search → SAC reinforcement learning fine-tuning
</div>

- **Stage 1 (GA)**: 13 design parameters, 100 population → Max temp: 554.7°C → **345.9°C**
- **Stage 2 (SAC RL)**: 34 surface control points, CNN-based policy → **324.1°C**

---

## Results

<div class="row justify-content-center">
    <div class="col-sm-8">
        {% include figure.liquid loading="eager" path="assets/img/frib_beam_dump/fig_temperature_comparison.png" title="Temperature Comparison" class="img-fluid rounded z-depth-1" %}
    </div>
</div>
<div class="caption">
    <strong>Fig.</strong> Temperature comparison: Current design (left) vs Optimized design (right)
</div>

- **72% increase** in power-handling capability
- Meets **50 kW target** across operating range
- Hot spots eliminated with uniform temperature distribution

---

## Publications

**SCIE**
- **G. Lee**, J. Song, R. Quispe-Abad, M. Patil, T. Kanemura, "Optimization of the FRIB Beam Dump: A Hybrid Genetic Algorithm and Reinforcement Learning Approach," *Nuclear Science and Techniques*, 2026. (Accepted)

**Conferences**
- **G. Lee**, J. Song, M. Patil, R. Quispe-Abad, N. Bultman, T. Kanemura, "Design Improvements of a Minichannel Beam Dump Wing through AI-Driven Genetic Algorithms," *16th International Conference on Heavy Ion Accelerator Technology*, 2025.
- **G. Lee**, J. Song, M. Patil, R. Quispe-Abad, N. Bultman, T. Kanemura, "Design Optimization of the FRIB Beam Dump through Reinforcement Learning with Genetic Algorithm," *2025 American Nuclear Society Annual Conference*, 2025.

---

## Research Project

**(2023-2026)** AIP Mini-channel and Water beam dump, FRIB.
