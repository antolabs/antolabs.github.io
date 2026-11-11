---
layout: project
title: FRIB static beam dump AI optimization
description: Global and local AI search with thermal-model evaluation and 3D verification for static beam-dump design.
img: assets/img/frib_beam_dump/fig_temperature_comparison.png
importance: 1
category: Thermo-fluid devices
year: "2023 - 2025"
body_class: "project-view"
footer_static: true
card_title: "Static beam dump AI optimization"
project_type: "AI-driven optimization"
institution: "FRIB"
featured: true
featured_order: 1
project_group: "Thermal-fluid engineering"
summary: "Global and local AI search with thermal-model evaluation and 3D verification for static beam-dump design."
detail_intro: "I developed a hybrid genetic algorithm and reinforcement learning approach to optimize the static beam-dump geometry."
detail_summary_label: Simulation result
detail_summary: "72% higher average power-handling capability than the existing design."
contribution: "Developed a hybrid genetic algorithm and reinforcement learning approach to optimize the static beam-dump geometry."
evidence: "Simulation result"
outcome: "72% higher average power-handling capability than the existing design in simulation."
---

<div class="project-overview">
  <section class="project-overview-purpose" aria-labelledby="project-purpose">
    <h2 id="project-purpose">Purpose</h2>
    <p>The FRIB static beam dump absorbs intense heat from a heavy-ion beam. This study supports the upgrade from <span class="text-nowrap">20 kW</span> to <span class="text-nowrap">50 kW</span> by finding a geometry that limits localized hot spots across different beam sizes.</p>
  </section>
  <section class="project-overview-approach" aria-labelledby="project-approach">
    <h2 id="project-approach">Approach</h2>
    <p>A genetic algorithm (GA) explores the overall geometry, then reinforcement learning (RL) refines the surface. A two-dimensional finite-difference thermal model evaluates candidate designs, followed by separate three-dimensional finite-element verification in COMSOL.</p>
  </section>
</div>

## Optimization workflow

### 1. Genetic algorithm: global search

The GA varies the section dimensions, plate angle, and beam position, evaluating three representative beam sizes. The maximum temperature in the optimization model falls from **554.7 °C to 345.9 °C**, providing the starting geometry for RL.

<figure class="project-demo project-demo-wide">
  <video data-project-animation controls muted loop playsinline preload="metadata" width="1656" height="974" poster="{{ '/assets/img/frib_beam_dump/ga_search_poster.webp' | relative_url }}" aria-label="Genetic algorithm optimization of the static beam dump" aria-describedby="beam-dump-ga-caption">
    <source src="{{ '/assets/video/static-beam-dump-ga.mp4' | relative_url }}" type="video/mp4">
    Your browser does not support embedded video.
  </video>
  <figcaption class="caption" id="beam-dump-ga-caption">GA design evolution: maximum temperature by generation (left) and temperature fields for three beam sizes (right).</figcaption>
</figure>

### 2. Reinforcement learning: local refinement

Starting from the GA design, the RL agent adjusts **34 surface design points** using the temperature field as its state and lower peak temperature as its reward. Over **500 episodes**, the maximum temperature decreases further to **324.1 °C** in the optimization model.

<figure class="project-demo project-demo-wide">
  <video data-project-animation controls muted loop playsinline preload="metadata" width="1670" height="974" poster="{{ '/assets/img/frib_beam_dump/rl_refinement_poster.webp' | relative_url }}" aria-label="Reinforcement learning refinement of the static beam dump" aria-describedby="beam-dump-rl-caption">
    <source src="{{ '/assets/video/static-beam-dump-rl.mp4' | relative_url }}" type="video/mp4">
    Your browser does not support embedded video.
  </video>
  <figcaption class="caption" id="beam-dump-rl-caption">RL refinement: maximum temperature by training episode (left) and the evolving temperature fields (right).</figcaption>
</figure>

## Numerical verification and outcome

The optimized design is then checked with a separate 3D finite-element model, so the temperatures differ from the 2D values in the animations. Across the three representative beam sizes, the highest predicted temperature falls from **688.5 °C to 324.9 °C**, below the **350 °C design limit**.

<div class="row justify-content-center">
    <div class="col-12">
        {% include figure.liquid loading="lazy" path="assets/img/frib_beam_dump/fig_temperature_comparison.png" zoomable=true alt="3D finite-element temperature comparison of the original and optimized static beam dump for three beam sizes" title="3D finite-element temperature comparison" class="img-fluid rounded z-depth-1" %}
    </div>
</div>
<div class="caption">
    3D finite-element verification: original design (left) and optimized design (right) under the same three beam conditions.
</div>

In simulation, the optimized design has **72% higher average power-handling capability** than the existing design, which supports the 50 kW upgrade.

---

## Publications

**SCIE**

- **G. Lee**, J. Song, R. Quispe-Abad, M. Patil, T. Kanemura, "Optimization of the FRIB Beam Dump: A Hybrid Genetic Algorithm and Reinforcement Learning Approach," _Nuclear Science and Techniques_, 37, 184, 2026. [https://doi.org/10.1007/s41365-026-02020-2](https://doi.org/10.1007/s41365-026-02020-2)

**Conferences**

- **G. Lee**, N. Bultman, T. Kanemura, M. Patil, R. Quispe-Abad, J. Song, "Design Improvement of a Minichannel Beam Dump Wing through AI-Driven Genetic Algorithms," _16th International Conference on Heavy Ion Accelerator Technology_, 2025.
- **G. Lee**, J. Song, M. Patil, R. Quispe-Abad, N. Bultman, T. Kanemura, "Design Optimization of the FRIB Beam Dump through Reinforcement Learning with Genetic Algorithm," _2025 American Nuclear Society Annual Conference_, 2025.

---

## Research project

**(2023-2026)** AIP Mini-channel and Water Beam Dump, FRIB.
