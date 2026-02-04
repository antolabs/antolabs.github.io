---
layout: page
title: SMR Heat Exchanger AI Topology Optimization
description: Deep RL + Topology optimization for PCHE design with 3D printing validation
img: assets/img/smr_heat_exchanger/fig_topology_result.png
importance: 2
category: Thermo-fluid devices
year: 2021-2023
---

## Challenge

**Printed Circuit Heat Exchangers (PCHEs)** are compact, high-performance heat exchangers used in Small Modular Reactors (SMRs). Optimizing their complex flow channel topology to maximize heat transfer while minimizing pressure drop is a significant challenge.

<div class="row justify-content-center">
    <div class="col-sm-8">
        {% include figure.liquid loading="eager" path="assets/img/smr_heat_exchanger/fig_pche_structure.png" title="PCHE Structure" class="img-fluid rounded z-depth-1" %}
    </div>
</div>
<div class="caption">
    <strong>Fig.</strong> PCHE structure with hot/cold fluid plates and pseudo-3D optimization domains
</div>

---

## Approach: Topology Optimization + Deep RL

<div class="row justify-content-center">
    <div class="col-sm-8">
        {% include figure.liquid loading="eager" path="assets/img/smr_heat_exchanger/fig_optimization_process.png" title="Optimization Process" class="img-fluid rounded z-depth-1" %}
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
        {% include figure.liquid loading="eager" path="assets/img/smr_heat_exchanger/fig_topology_result.png" title="Topology Optimization Result" class="img-fluid rounded z-depth-1" %}
    </div>
</div>
<div class="caption">
    <strong>Fig.</strong> Topology optimization results showing fluid (white) and solid (black) regions
</div>

| Method | Heat Transfer Improvement |
|:-------|:-------------------------:|
| Topology Optimization (vs. Conventional) | **+66%** (equal pumping power) |
| DRL + Topology (vs. Topology only) | **+14.8%** additional |
| DRL + Topology (vs. Original PCHE) | **+32.2%** total |

<br>

### 3D Printing Validation

<div class="row justify-content-center">
    <div class="col-sm-8">
        {% include figure.liquid loading="eager" path="assets/img/smr_heat_exchanger/fig_3d_printed.png" title="3D Printed Heat Exchanger" class="img-fluid rounded z-depth-1" %}
    </div>
</div>
<div class="caption">
    <strong>Fig.</strong> Metal 3D printed PCHE (SUS316L) with experimental validation
</div>

- Fabricated using **powder bed fusion** metal 3D printing
- Experimental verification with thermal loop system
- Confirmed feasibility of topology-optimized complex geometries

---

## Publications

**SCIE**
- **G. Lee**, Y. Joo, S.-U. Lee, T. Kim, Y. Yu, H.-G. Kim, "Design optimization of heat exchanger using deep reinforcement learning," *International Communications in Heat and Mass Transfer*, 159, 107991, 2024.
- **G. Lee**, Y. Joo, Y. Yu, H.-G. Kim, "Dual-fluid topology optimization of printed-circuit heat exchanger with low-pumping-power design," *Case Studies in Thermal Engineering*, 49, 103318, 2023.

**Conferences**
- **G. Lee**, Y. Yu, H.-G. Kim, T. Kim, "Application of Deep Learning Reinforcement Learning for Enhancement of Thermal Fluid Topology Optimization Performance," *3rd Applied Artificial Intelligence Conference*, 2023.
- **G. Lee**, Y. Yu, H.-G. Kim, "Design of the Optimal Nuclear Heat Exchanger using Deep Reinforcement Learning," *10th Korea-China Workshop on Nuclear Reactor Thermal-Hydraulics*, 2023.
- **G. Lee**, Y. Yu, H.-G. Kim, "Optimal Design of Nuclear Heat Exchanger Using 3D Printing-Based Deep Learning Reinforcement Learning," *2023 Korean Institute of Metals and Materials Fall Conference*, 2023.
- **G. Lee**, Y. Yu, H.-G. Kim, "Development of 3D Printing AI-Based Component Optimization Design Technology for Small Nuclear Reactor Materials," *2022 Korean Institute of Metals and Materials Spring Conference*, 2022.
- **G. Lee**, Y. Joo, H.-G. Kim, Y. Yu, "The Analysis of Topology Optimized 3D Printing Heat Exchanger for the Small Nuclear Reactor," *2021 Korean Nuclear Society Autumn Meeting*, 2021.

---

## Research Project

**(2021-2023)** Development of Original 3D Printing Technology for Manufacturing Components of Small Nuclear Reactor Materials, KAERI.
