---
layout: project
title: OLED Display AI Flow Channel Generation
description: PPO Reinforcement Learning for susceptor heat exchanger design in CVD manufacturing
img: assets/img/oled_display/fig_learning_progress.png
importance: 3
category: Thermo-fluid devices
year: 2022
body_class: "project-view"
footer_static: true
card_title: "Flow-channel design for OLED manufacturing"
institution: "KAERI"
project_group: "Thermal-fluid engineering"
summary: "Reinforcement learning for temperature uniformity in display-manufacturing susceptors."
contribution: "Designed susceptor flow channels using reinforcement learning and analyzed the liquid-metal circulation system."
evidence: "Design & simulation"
outcome: "Generated heat-exchanger flow paths targeting a more uniform susceptor temperature."
---

## Challenge

**OLED display manufacturing** requires precise temperature uniformity during the plasma CVD (Chemical Vapor Deposition) process. The susceptor heat exchanger must maintain uniform temperature across large glass substrates, but traditional design methods rely on engineer experience and repetitive manual analysis.

<div class="row justify-content-center">
    <div class="col-sm-6">
        {% include figure.liquid loading="eager" path="assets/img/oled_display/fig_susceptor_system.png" zoomable=true alt="Susceptor System" title="Susceptor System" class="img-fluid rounded z-depth-1" %}
    </div>
</div>
<div class="caption">
    <strong>Fig.</strong> Susceptor system schematic: Galinstan liquid metal circulation via electromagnetic pump
</div>

---

## Approach: PPO Reinforcement Learning

<div class="row justify-content-center">
    <div class="col-sm-6">
        {% include figure.liquid loading="lazy" path="assets/img/oled_display/fig_rl_environment.png" zoomable=true alt="RL Environment" title="RL Environment" class="img-fluid rounded z-depth-1" %}
    </div>
</div>
<div class="caption">
    <strong>Fig.</strong> Reinforcement learning environment with General, Record, and FDM spaces
</div>

### Flow Channel Optimization

- **PPO algorithm** with discrete action space (up/down/left/right)
- **FDM-based thermal simulation** for fast iteration (100,000+ episodes)
- **4-way symmetry** exploited to minimize computational domain
- **Reward function**: Temperature uniformity improvement

### Electromagnetic Pump Design

- **Helical-type EM pump** for high-pressure Galinstan delivery (10 bar)
- **FEM simulation** using COMSOL for MHD analysis
- Sm₂Co₁₇ permanent magnets with magnetic shielding

---

## Results

### Susceptor Heat Exchanger

<div class="row justify-content-center">
    <div class="col-sm-8">
        {% include figure.liquid loading="lazy" path="assets/img/oled_display/fig_learning_progress.png" zoomable=true alt="Learning Progress" title="Learning Progress" class="img-fluid rounded z-depth-1" %}
    </div>
</div>
<div class="caption">
    <strong>Fig.</strong> Flow path evolution during RL training: paths become more complex as learning progresses
</div>

- Generated flow-channel layouts targeting a more uniform susceptor temperature in the thermal model
- Investigated reinforcement learning as an alternative to repeated manual channel design

### Electromagnetic Pump

<div class="row justify-content-center">
    <div class="col-sm-7">
        {% include figure.liquid loading="lazy" path="assets/img/oled_display/fig_em_pump_pressure.png" zoomable=true alt="EM Pump Results" title="EM Pump Results" class="img-fluid rounded z-depth-1" %}
    </div>
</div>
<div class="caption">
    <strong>Fig.</strong> Helical EM pump analysis: magnetic flux density distribution (left) and pressure distribution achieving 10 bar (right)
</div>

- Predicted **10 bar** discharge pressure at 2 kg/s flow rate through MHD simulation
- Simulated average magnetic flux density: **0.25 T** (max 0.4 T)

---

## Publications

**Peer-reviewed Journal**

- **G. Lee**, T. Kim, Y. Kim, G. Kim, "Design and Analysis of an OLED Display Susceptor System Using Reinforcement Learning," _Journal of Korean Applied Artificial Intelligence_, 1(2), 1-6, 2025. [DOI](https://doi.org/10.23343/JAAI.2025.1.2.1)

**Conferences**

- **G. Lee**, T. Kim, "Formation of the LCD susceptor heat exchanger path using the deep reinforcement learning," _2nd Applied Artificial Intelligence Conference_, 2023.
- **G. Lee**, Y. Yu, T. Kim, S. Kim, "Formation of a thermofluid temperature equalization flow path using reinforcement learning," _1st Applied Artificial Intelligence Conference_, 2022.

---

## Software registration

- **G. Lee**, Y. Yu, T. Kim, "Heat exchanger path generation program through reinforcement learning," Republic of Korea – Registration No.: C-2022-049451, 2022.

---

## Research Project

**(2022)** Technical support for the application of artificial intelligence to lower module temperature uniformity on next-generation display manufacturing systems, KAERI.
