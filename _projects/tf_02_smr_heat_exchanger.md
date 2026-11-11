---
layout: project
title: AI-designed heat exchangers for small modular reactors
detail_title: AI-designed heat exchangers for small modular reactors
description: Reinforcement learning for heat-exchanger design, connected to metal 3D printing and experimental testing.
img: assets/img/smr_heat_exchanger/fig_topology_result.png
importance: 2
category: Thermo-fluid devices
year: "2021 - 2023"
body_class: "project-view"
footer_static: true
card_title: "AI-designed nuclear heat exchangers"
project_type: "Design to fabrication"
institution: "KAERI"
featured: true
featured_order: 3
project_group: "Thermal-fluid engineering"
summary: "Reinforcement learning for heat-exchanger design, connected to metal 3D printing and experimental testing."
detail_intro: "I developed a deep reinforcement learning approach for heat-exchanger optimization and contributed to topology-optimization analysis and experimental validation of a metal-printed prototype."
detail_summary_label: Study result
detail_summary: "14.8% higher simulated heat transfer than conventional topology optimization; metal-printed prototype tested."
contribution: "Developed a deep reinforcement learning approach for heat-exchanger optimization and contributed to topology-optimization analysis and experimental validation of a metal-printed prototype."
evidence: "Simulation + experimental testing"
outcome: "14.8% higher simulated heat transfer than conventional topology optimization; metal-printed prototype tested."
---

<div class="project-overview">
  <section class="project-overview-purpose" aria-labelledby="project-purpose">
    <h2 id="project-purpose">Purpose</h2>
    <p>Printed circuit heat exchangers (PCHEs) are compact heat exchangers used in small modular reactors (SMRs). Their channels must give high heat transfer at low pressure drop, which is hard to design by hand.</p>
  </section>
  <section class="project-overview-approach" aria-labelledby="project-approach">
    <h2 id="project-approach">Approach</h2>
    <p>Reinforcement learning generates initial channel layouts for topology optimization to refine. Metal 3D printing and thermal-loop testing connect the computational design study with experimental evaluation of a physical prototype.</p>
  </section>
</div>

## PCHE structure

<div class="row justify-content-center">
    <div class="col-sm-8">
        {% include figure.liquid loading="eager" path="assets/img/smr_heat_exchanger/fig_pche_structure.png" zoomable=true alt="PCHE Structure" title="PCHE Structure" class="img-fluid rounded z-depth-1" %}
    </div>
</div>
<div class="caption">
    PCHE structure with hot and cold fluid plates and pseudo-3D optimization domains
</div>

## Design method

<div class="row justify-content-center">
    <div class="col-sm-8">
        {% include figure.liquid loading="lazy" path="assets/img/smr_heat_exchanger/fig_optimization_process.png" zoomable=true alt="Optimization Process" title="Optimization Process" class="img-fluid rounded z-depth-1" %}
    </div>
</div>
<div class="caption">
    DRL-assisted topology optimization: PPO generates the initial design, then SIMP topology optimization refines the geometry
</div>

### Topology optimization setup

- Pseudo-3D model with hot-plate, cold-plate, and conduction-plate domains
- SIMP (solid isotropic material with penalization) density method
- Constraint on the maximum pressure drop
- Objective: maximize the total heat transfer rate

### Initial design by reinforcement learning

- PPO agent with a CNN for spatial pattern recognition
- 80 design cells, each assigned to solid or fluid
- Reward based on the improvement in the inlet-outlet temperature difference

## Results

<div class="row justify-content-center">
    <div class="col-sm-8">
        {% include figure.liquid loading="lazy" path="assets/img/smr_heat_exchanger/fig_topology_result.png" zoomable=true alt="Topology Optimization Result" title="Topology Optimization Result" class="img-fluid rounded z-depth-1" %}
    </div>
</div>
<div class="caption">
    Topology optimization results showing fluid (white) and solid (black) regions
</div>

### Dual-fluid topology optimization (2023)

The 3D CFD study found **up to 66% higher heat transfer** in a specific case, and 32% on average, compared with a conventional PCHE at equal pumping power. These are simulation results from the low-pumping-power design study. [Study DOI](https://doi.org/10.1016/j.csite.2023.103318)

### DRL-assisted topology optimization (2024)

| Simulation comparison                               | Heat transfer improvement |
| :-------------------------------------------------- | :-----------------------: |
| DRL-assisted design vs. topology optimization alone |        **+14.8%**         |
| DRL-assisted design vs. original PCHE               |        **+32.2%**         |

Both values are simulation results from the 2024 study. [Study DOI](https://doi.org/10.1016/j.icheatmasstransfer.2024.107991)

### 3D-printed prototype

<div class="row justify-content-center">
    <div class="col-sm-8">
        {% include figure.liquid loading="lazy" path="assets/img/smr_heat_exchanger/fig_3d_printed.png" zoomable=true alt="3D Printed Heat Exchanger" title="3D Printed Heat Exchanger" class="img-fluid rounded z-depth-1" %}
    </div>
</div>
<div class="caption">
    Metal 3D-printed PCHE (SUS316L) used for experimental validation
</div>

- Fabricated by powder bed fusion metal 3D printing
- Tested in a thermal-loop system
- Confirmed that the complex topology-optimized geometry can be fabricated

The DRL-assisted prototype was fabricated and tested in the 2024 study.

---

## Publications

**SCIE**

- **G. Lee**, Y. Joo, S.U. Lee, T. Kim, Y. Yu, H.G. Kim, "Design optimization of heat exchanger using deep reinforcement learning," _International Communications in Heat and Mass Transfer_, 159, 107991, 2024. [DOI](https://doi.org/10.1016/j.icheatmasstransfer.2024.107991)
- **G. Lee**, Y. Joo, Y. Yu, H.G. Kim, "Dual-fluid topology optimization of printed-circuit heat exchanger with low-pumping-power design," _Case Studies in Thermal Engineering_, 49, 103318, 2023. [DOI](https://doi.org/10.1016/j.csite.2023.103318)

**Conferences**

- **G. Lee**, Y. Yu, H.G. Kim, T. Kim, "Application of Deep Learning Reinforcement Learning for Enhancement of Thermal Fluid Topology Optimization Performance," _3rd Applied Artificial Intelligence Conference_, 2023.
- **G. Lee**, Y. Yu, H.G. Kim, "Design of the Optimal Nuclear Heat Exchanger using Deep Reinforcement Learning," _10th Korea-China Workshop on Nuclear Reactor Thermal-Hydraulics_, 2023.
- **G. Lee**, Y. Yu, H.G. Kim, "Optimal Design of Nuclear Heat Exchanger Using 3D Printing-Based Deep Learning Reinforcement Learning," _2023 Korean Institute of Metals and Materials Fall Conference_, 2023.
- **G. Lee**, Y. Yu, H.G. Kim, "Development of 3D Printing AI-Based Component Optimization Design Technology for Small Nuclear Reactor Materials," _2022 Korean Institute of Metals and Materials Spring Conference_, 2022.
- **G. Lee**, Y. Joo, H.G. Kim, Y. Yu, "The Analysis of Topology Optimized 3D Printing Heat Exchanger for the Small Nuclear Reactor," _2021 Korean Nuclear Society Autumn Meeting_, 2021.

---

## Research project

**(2021-2023)** Development of Original 3D Printing Technology for Manufacturing Components of Small Nuclear Reactor Materials, KAERI.
