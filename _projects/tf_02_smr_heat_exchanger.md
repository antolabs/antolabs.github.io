---
layout: project
title: SMR Heat Exchanger AI Topology Optimization
description: Deep RL + Topology optimization for PCHE design with 3D printing validation
img: assets/img/smr_heat_exchanger/fig_topology_result.png
importance: 2
category: Thermo-fluid devices
year: "2021 - 2023"
body_class: "project-view"
footer_static: true
card_title: "AI-designed heat exchangers"
project_type: "Design to fabrication"
institution: "KAERI"
featured: true
featured_order: 2
project_group: "Thermal-fluid engineering"
summary: "Reinforcement learning and topology optimization, connected to metal 3D printing and testing."
contribution: "Developed thermal-fluid topology optimization and reinforcement learning methods, with a metal-printed prototype tested experimentally."
evidence: "Simulation + experimental testing"
outcome: "14.8% higher simulated heat transfer than conventional topology optimization; metal-printed prototype tested."
---

## Challenge

**Printed Circuit Heat Exchangers (PCHEs)** are compact, high-performance heat exchangers used in Small Modular Reactors (SMRs). Optimizing their complex flow channel topology to maximize heat transfer while minimizing pressure drop is a significant challenge.

<div class="row justify-content-center">
    <div class="col-sm-8">
        {% include figure.liquid loading="eager" path="assets/img/smr_heat_exchanger/fig_pche_structure.png" zoomable=true alt="PCHE Structure" title="PCHE Structure" class="img-fluid rounded z-depth-1" %}
    </div>
</div>
<div class="caption">
    <strong>Fig.</strong> PCHE structure with hot/cold fluid plates and pseudo-3D optimization domains
</div>

---

## Approach: Topology Optimization + Deep RL

<div class="row justify-content-center">
    <div class="col-sm-8">
        {% include figure.liquid loading="lazy" path="assets/img/smr_heat_exchanger/fig_optimization_process.png" zoomable=true alt="Optimization Process" title="Optimization Process" class="img-fluid rounded z-depth-1" %}
    </div>
</div>
<div class="caption">
    <strong>Fig.</strong> DRL-assisted topology optimization: PPO generates initial design → SIMP topology optimization refines geometry
</div>

### Dual-Fluid Topology Optimization

- **Pseudo-3D method**: Hot plate, cold plate, and conduction plate domains
- **SIMP approach**: Solid Isotropic Material with Penalization
- **Pressure constraint**: Maximum pressure drop boundary condition
- **Objective**: Maximize total heat transfer rate

### Deep Reinforcement Learning Initial Design

- **PPO algorithm** with CNN for spatial pattern recognition
- **80 design cells** determining solid/fluid regions
- **Reward**: Temperature difference improvement at inlet/outlet

---

## Results

<div class="row justify-content-center">
    <div class="col-sm-8">
        {% include figure.liquid loading="lazy" path="assets/img/smr_heat_exchanger/fig_topology_result.png" zoomable=true alt="Topology Optimization Result" title="Topology Optimization Result" class="img-fluid rounded z-depth-1" %}
    </div>
</div>
<div class="caption">
    <strong>Fig.</strong> Topology optimization results showing fluid (white) and solid (black) regions
</div>

### Dual-fluid topology optimization (2023)

The 3D CFD study found **up to 66% higher heat transfer** in a specific case, and 32% on average, compared with a conventional PCHE at equal pumping power. These are simulation results from the low-pumping-power design study. [Study DOI](https://doi.org/10.1016/j.csite.2023.103318)

### DRL-assisted topology optimization (2024)

| Simulation comparison                               | Heat transfer improvement |
| :-------------------------------------------------- | :-----------------------: |
| DRL-assisted design vs. topology optimization alone |        **+14.8%**         |
| DRL-assisted design vs. original PCHE               |        **+32.2%**         |

These percentages use the baselines and conditions of the 2024 study; they are not cumulative improvements over the 2023 results. [Study DOI](https://doi.org/10.1016/j.icheatmasstransfer.2024.107991)

### 3D Printing Validation

<div class="row justify-content-center">
    <div class="col-sm-8">
        {% include figure.liquid loading="lazy" path="assets/img/smr_heat_exchanger/fig_3d_printed.png" zoomable=true alt="3D Printed Heat Exchanger" title="3D Printed Heat Exchanger" class="img-fluid rounded z-depth-1" %}
    </div>
</div>
<div class="caption">
    <strong>Fig.</strong> Metal 3D printed PCHE (SUS316L) with experimental validation
</div>

- Fabricated using **powder bed fusion** metal 3D printing
- Experimental verification with thermal loop system
- Confirmed feasibility of topology-optimized complex geometries

The DRL-assisted prototype was fabricated and tested in the 2024 study. The percentage improvements above refer to simulations, not measured prototype-to-prototype gains.

---

## Publications

**SCIE**

- **G. Lee**, Y. Joo, S.-U. Lee, T. Kim, Y. Yu, H.-G. Kim, "Design optimization of heat exchanger using deep reinforcement learning," _International Communications in Heat and Mass Transfer_, 159, 107991, 2024. [DOI](https://doi.org/10.1016/j.icheatmasstransfer.2024.107991)
- **G. Lee**, Y. Joo, Y. Yu, H.-G. Kim, "Dual-fluid topology optimization of printed-circuit heat exchanger with low-pumping-power design," _Case Studies in Thermal Engineering_, 49, 103318, 2023. [DOI](https://doi.org/10.1016/j.csite.2023.103318)

**Conferences**

- **G. Lee**, Y. Yu, H.-G. Kim, T. Kim, "Application of Deep Learning Reinforcement Learning for Enhancement of Thermal Fluid Topology Optimization Performance," _3rd Applied Artificial Intelligence Conference_, 2023.
- **G. Lee**, Y. Yu, H.-G. Kim, "Design of the Optimal Nuclear Heat Exchanger using Deep Reinforcement Learning," _10th Korea-China Workshop on Nuclear Reactor Thermal-Hydraulics_, 2023.
- **G. Lee**, Y. Yu, H.-G. Kim, "Optimal Design of Nuclear Heat Exchanger Using 3D Printing-Based Deep Learning Reinforcement Learning," _2023 Korean Institute of Metals and Materials Fall Conference_, 2023.
- **G. Lee**, Y. Yu, H.-G. Kim, "Development of 3D Printing AI-Based Component Optimization Design Technology for Small Nuclear Reactor Materials," _2022 Korean Institute of Metals and Materials Spring Conference_, 2022.
- **G. Lee**, Y. Joo, H.-G. Kim, Y. Yu, "The Analysis of Topology Optimized 3D Printing Heat Exchanger for the Small Nuclear Reactor," _2021 Korean Nuclear Society Autumn Meeting_, 2021.

---

## Research Project

**(2021-2023)** Development of Original 3D Printing Technology for Manufacturing Components of Small Nuclear Reactor Materials, KAERI.
